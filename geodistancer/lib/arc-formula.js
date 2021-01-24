const GreatCircleDistance = require('./great-circle-base');

class ArcFormula extends GreatCircleDistance {
    constructor(options) {
        super(options);
    }

    calculate() {
        const a = Math.sin(this.y1) * Math.sin(this.y2);
        const b = Math.cos(this.y1) * Math.cos(this.y2) * Math.cos(this.deltaX);
        const deltaSigma = Math.acos(a + b);

        return Math.abs(GreatCircleDistance.earthRadius * deltaSigma) / GreatCircleDistance.KM;
    }
}

module.exports = ArcFormula;