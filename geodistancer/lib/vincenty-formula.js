const GreatCircleDistance = require('./great-circle-base');

class VincentyFormula extends GreatCircleDistance {
    constructor(options) {
        super(options);
    }

    calculate() {
        const a = Math.pow(Math.cos(this.y2) * Math.sin(this.deltaX), 2);
        const b = Math.pow(Math.cos(this.y1) * Math.sin(this.y2) - Math.sin(this.y1) * Math.cos(this.y2) * Math.cos(this.deltaX), 2);
        const vincentyNumerator = Math.sqrt(a + b);
      
        const a1 = Math.sin(this.y1) * Math.sin(this.y2);
        const b1 = Math.cos(this.y1) * Math.cos(this.y2) * Math.cos(this.deltaX);
        const vincentyDominator = a1 + b1;
      
        const deltaSigma = Math.atan(vincentyNumerator / vincentyDominator);

        return Math.abs(GreatCircleDistance.earthRadius * deltaSigma) / GreatCircleDistance.KM;
    }
}

module.exports = VincentyFormula;