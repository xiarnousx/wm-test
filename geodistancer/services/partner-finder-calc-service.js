const { getDistanceUpto } = require('./distance-upto');

class PartnerFinderCalcService {
    
    deduce(origin, partners, distanceWithin) {
        return getDistanceUpto(origin, partners, distanceWithin);
    }
}

module.exports = PartnerFinderCalcService;