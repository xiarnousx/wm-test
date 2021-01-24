const { globalConfig } = require('../config');
const PartnerFinderCalcRedis = require('./partner-finder-calc-redis');
const PartnerFinderCalcAMPQ = require('./partner-finder-calc-ampq');
const { OperationNotAllowedError } = require('../errors');

class PartnerCalcFactory {
    
    static create(type) {
        switch (type) {
            case globalConfig.typeRedis:
                return new PartnerFinderCalcRedis();
            case globalConfig.typeAMPQ:
                return new PartnerFinderCalcAMPQ();
            default:
                throw new OperationNotAllowedError(`Not Implemented Type ${type}`);
        }
    }
}

module.exports = PartnerCalcFactory;