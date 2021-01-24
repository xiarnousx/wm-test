const GreatCircleDistanceFactory = require('../lib/great-circle-distance-factory');
const { extractCoordinates } = require('../utils/coordinates-extractor');
const { globalConfig } = require('../config');

function getDistanceUpto(origin, destinations, distanceKM) {
    
    const center = extractCoordinates(origin);

    return destinations
            .map(dest => {
                    const distances = dest.coordinates.map((coordinate) => {
                        const target = extractCoordinates(coordinate);
                        const options = {
                            lat1: center.lat,
                            lng1: center.lng,
                            lat2: target.lat,
                            lng2: target.lng
                        };

                        const distance =  GreatCircleDistanceFactory
                                        .create(globalConfig.greatCircleCalculationMethod, options)
                                        .calculate();
                                        
                        return distance;
                    });
                    
                    return {id: dest.id, distances};
                })
            .map((targets) => {
                return { id: targets.id, distances: targets.distances.filter((distance) => (distance > 0 && distance <= distanceKM)) };
            })
            .filter((targets) => targets.distances.length > 0)
    };

module.exports = {
    getDistanceUpto: getDistanceUpto
  };
  