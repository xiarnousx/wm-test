const Redis = require('ioredis');
const { globalConfig, redisConfig } = require('../config');
const { PARTNER_FINDER_CALCULATED } =  require('../events/listeners');
const { PARTNER_FINDER_MATCHED } = require('../events/publishers');
const PartnerFinderMatcherService  = require('./partner-finder-matcher-service');
const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class PartnerCalculatedServiceRedis extends PartnerFinderMatcherService {
    constructor() {
        super();
    }

    listen (channel, message) {
        
        if (channel !== PARTNER_FINDER_CALCULATED) {
            return;
        }

        const { loggedInUserId, payload } = JSON.parse(message);

        let matched =  this.match(payload);

        const jsonPayload = {};
        jsonPayload[globalConfig.graphqlSubscriptionKey] = matched;
    
        const result = JSON.stringify(jsonPayload);
    
        pub.publish(PARTNER_FINDER_MATCHED + "_" + loggedInUserId, result);
    }

    subscribe() {
        sub.subscribe(PARTNER_FINDER_CALCULATED, (err, count) => {
            sub.on('message', this.listen.bind(this));
        });
    }
}

module.exports = PartnerCalculatedServiceRedis;