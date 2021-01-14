const Redis = require('ioredis');
const { options } = require('../config/redis');
const { PARTNER_FINDER_RECIEVED } =  require('../events/listeners');
const { PARTNER_FINDER_CALCULATED } = require('../events/publishers');
const { getDistanceUpto } = require('../lib/distance-upto');

const redis = new Redis(options);



const partnerFinderReceivedListener = (channel, message) => {
    
    if (channel !== PARTNER_FINDER_RECIEVED) {
        return;
    }

    const { userId, origin, distanceWithin, partners } = JSON.parse(message);

    const data = getDistanceUpto(origin, partners, distanceWithin);

    const result = JSON.stringify({loggedInUserId: userId, payload: data});

    redis.publish(PARTNER_FINDER_CALCULATED, result);
};


module.exports = { partnerFinderReceivedListener };