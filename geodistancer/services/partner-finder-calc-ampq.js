const { PARTNER_FINDER_RECIEVED } =  require('../events/listeners');
const { PARTNER_FINDER_CALCULATED } = require('../events/publishers');
const PartnerFinderCalcService = require('./partner-finder-calc-service');

class PartnerFinderCalcAMPQ extends PartnerFinderCalcService {
    constructor(calculationMethod) {
        super(calculationMethod);
    }

    listen() {

    }

    subscribe() {

    }
}

module.exports = PartnerFinderCalcAMPQ;