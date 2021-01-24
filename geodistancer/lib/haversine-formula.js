const GreatCircleDistance = require('./great-circle-base');

class HaversineFormula extends GreatCircleDistance {
    constructor(options) {
        super(options);
    }

    calculate() {
        const a = Math.pow(Math.sign(this.deltaY / 2), 2);
        const b = Math.cos(this.y1) * Math.cos(this.y2) * Math.pow(Math.sin(this.deltaX / 2), 2);
        const deltaSigma = 2 * Math.asin(Math.sqrt(a + b)) || 0;

        return Math.abs(GreatCircleDistance.earthRadius * deltaSigma) / GreatCircleDistance.KM;
    }
}

module.exports = HaversineFormula;