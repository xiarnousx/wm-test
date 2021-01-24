const { globalConfig } = require('../config');
const PartnerCalculatedServiceRedis = require('./partner-calc-redis');
const PartnerCalculatedServiceAMPQ = require('./partner-calc-ampq');
const { OperationNotAllowedError } = require('../errors');

class PartnerCalculatedFactory {

    static create(type) {
        switch (type) {
            case globalConfig.typeRedis:
                return new PartnerCalculatedServiceRedis();
            case globalConfig.typeAMPQ:
                return new PartnerCalculatedServiceAMPQ()
            default:
                throw new OperationNotAllowedError(`Not Implemented Type ${type}`);
        }
    }
}

module.exports = PartnerCalculatedFactory;




