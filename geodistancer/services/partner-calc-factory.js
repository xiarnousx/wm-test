const { globalConfig } = require('../config');
const PartnerFinderCalcRedis = require('./partner-finder-calc-redis');
const PartnerFinderCalcAMPQ = require('./partner-finder-calc-ampq');
const { OperationNotAllowedError } = require('../errors');

class PartnerCalcFactory {
    
    static create(type) {
        switch (type) {
            case globalConfig.typeRedis:
                return new PartnerFinderCalcRedis('default');
            case globalConfig.typeAMPQ:
                return new PartnerFinderCalcAMPQ('default');
            default:
                throw new OperationNotAllowedError(`Not Implemented Type ${type}`);
        }
    }
}

module.exports = PartnerCalcFactory;