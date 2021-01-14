const Redis = require('ioredis');
const { options } = require('../config/redis');
const { PARTNER_FINDER_CALCULATED } =  require('../events/listeners');
const { PARTNER_FINDER_MATCHED } = require('../events/publishers');
const partners = require('../data/partners.json');

const redis = new Redis(options);

const graphqlSubscriptionKey = 'partnerFinderMatched';

const partnerFinderCalculatedListener = (channel, message) => {

    if (channel !== PARTNER_FINDER_CALCULATED) {
        return;
    }

    const { loggedInUserId, payload }  = JSON.parse(message);

    let  matched = [];

    payload.forEach((item) => {
        matched.push(...partners.filter((partner) => partner.id == item.id))
    });

    matched = matched.sort((a, b) => (a.organization < b.organization) ? -1 : 0);

    const jsonPayload = {};
    jsonPayload[graphqlSubscriptionKey] = matched;

    const result = JSON.stringify(jsonPayload);

    redis.publish(PARTNER_FINDER_MATCHED + "_" + loggedInUserId, result);
};


module.exports = { partnerFinderCalculatedListener };