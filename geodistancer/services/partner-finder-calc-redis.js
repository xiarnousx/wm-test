const Redis = require('ioredis');
const { globalConfig, redisConfig } = require('../config');
const { PARTNER_FINDER_RECIEVED } =  require('../events/listeners');
const { PARTNER_FINDER_CALCULATED } = require('../events/publishers');
const PartnerFinderCalcService = require('./partner-finder-calc-service');
const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class PartnerFinderCalcRedis extends PartnerFinderCalcService {

    constructor(calculationMethod) {
        super(calculationMethod);
    }

    listen(channel, message) {

        if (channel !== PARTNER_FINDER_RECIEVED) {
            return;
        }

        const { userId, origin, distanceWithin, partners } = JSON.parse(message);

        const data = this.deduce(origin, partners, distanceWithin);

        const result = JSON.stringify({loggedInUserId: userId, payload: data});

        pub.publish(PARTNER_FINDER_CALCULATED, result);

    }

    subscribe() {
        sub.subscribe(PARTNER_FINDER_RECIEVED, (err, count) => {
            if (err) {
                console.log(err);
            }

            // Process The Recieved Payload
            sub.on('message', this.listen.bind(this));
        });
    }
}

module.exports = PartnerFinderCalcRedis;