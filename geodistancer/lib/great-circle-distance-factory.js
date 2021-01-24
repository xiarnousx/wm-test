const ArcFormula = require('./arc-formula');
const HaversineFormula = require('./haversine-formula');
const VincentyFormula = require('./vincenty-formula');
const { globalConfig } = require('../config');

class GreatCircleDistanceFactory {
    static create(type, options) {
        switch(type) {
            case globalConfig.arcFormula:
                return new ArcFormula(options);
            case globalConfig.haversineFormula:
                return new HaversineFormula(options);
            case globalConfig.vincentyFormula:
                return new VincentyFormula(options);
            default:
                return new VincentyFormula(options);
        }
    }
}

module.exports = GreatCircleDistanceFactory;