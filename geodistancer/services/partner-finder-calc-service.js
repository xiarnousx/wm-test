const { getDistanceUpto } = require('../lib/distance-upto');

class PartnerFinderCalcService {
    constructor(calculationMethod) {
        this.calculationMethod = calculationMethod;
    }

    deduce(origin, partners, distanceWithin) {
        return getDistanceUpto(origin, partners, distanceWithin);
    }
}

module.exports = PartnerFinderCalcService;