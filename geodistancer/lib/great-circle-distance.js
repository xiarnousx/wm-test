const PI = Math.PI;
const RADIUS_OF_EARTH = 6371e3;

/**
 * @Todo create a factory method for greatCircleDistance based on Calculation Method Signature 
 *  - BASE64_COMPLIENT // to implement.
 *  - VINCENTY_FORMULA // the current implimentation.
 *  - HAVERSINE_FROMULA // to implement.
 */
function greatCircleDistance(options) {
  const { lat1, lng1, lat2, lng2 } = options;

  const x1 = getRadians(lat1);
  const y1 = getRadians(lng1);

  const x2 = getRadians(lat2);
  const y2 = getRadians(lng2);

  const deltaX = Math.abs(x1 - x2);

  const a = Math.pow(Math.cos(y2) * Math.sin(deltaX), 2);
  const b = Math.pow(Math.cos(y1) * Math.sin(y2) - Math.sin(y1) * Math.cos(y2) * Math.cos(deltaX), 2);
  const vincentyNumerator = Math.sqrt(a + b);

  const a1 = Math.sin(y1) * Math.sin(y2);
  const b1 = Math.cos(y1) * Math.cos(y2) * Math.cos(deltaX);
  const vincentyDominator = a1 + b1;

  const deltaSigma = Math.atan(vincentyNumerator / vincentyDominator);

  const distance = RADIUS_OF_EARTH * deltaSigma;
  
  // distance in KM.
  return Math.abs(distance / 1000);
};

const getRadians = degrees => {
  return (degrees * PI) / 180;
};

module.exports = {
  greatCircleDistance: greatCircleDistance
};
