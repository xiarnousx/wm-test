class GreatCircleDistance {

    constructor(options) {
        this.lat1 = options.lat1;
        this.lng1 = options.lng1;
        this.lat2 = options.lat2;
        this.lng2 = options.lng2;
    }

    static get KM() {
        return 1000;
    }

    static get earthRadius() {
        return 6371e3;
    }

    static get PI() {
        return Math.PI;
    }

    static radians(degrees) {
        return (degrees * GreatCircleDistance.PI) / 180;
    }

    get x1() {
        return GreatCircleDistance.radians(this.lat1);
    }

    get y1() {
        return GreatCircleDistance.radians(this.lng1);
    }

    get x2() {
        return GreatCircleDistance.radians(this.lat2);
    }

    get y2() {
        return GreatCircleDistance.radians(this.lng2);
    }

    get deltaX() {
        const delta = GreatCircleDistance.radians(this.lat1) - GreatCircleDistance.radians(this.lat2);
        return Math.abs(delta);
    }

    get deltaY() {
        const delta = GreatCircleDistance.radians(this.lng1) - GreatCircleDistance.radians(this.lng2);
        return Math.abs(delta);
    }
}

module.exports = GreatCircleDistance;