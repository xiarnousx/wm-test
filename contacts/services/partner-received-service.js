const Redis = require("ioredis");
const { redisConfig } = require('../config');
const partners = require('../data/partners.json')
const { PARTNER_FINDER_RECIEVED } = require('../events/publishers')
const pub = new Redis(redisConfig);

class PartnerReceivedService {
    static calculationRequest(userId, origin, distanceWithin) {

        const reducedPartners = partners.map((partner, index) => {
            const coordinates = partner.offices.map((office, index) => office.coordinates);
            return {id: partner.id, coordinates}
        });
    
        const payload = {userId, origin, distanceWithin, partners:reducedPartners };
    
        pub.publish(PARTNER_FINDER_RECIEVED, JSON.stringify(payload));
    }
}

module.exports = PartnerReceivedService;