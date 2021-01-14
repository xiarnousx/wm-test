const { greatCircleDistance } = require('./great-circle-distance');
const { extractCoordinates } = require('./coordinates-extractor');

function getDistanceUpto(origin, destinations, distanceKM) {
    
    const center = extractCoordinates(origin);

    return destinations
            .map(dest => {
                    const distances = dest.coordinates.map((coordinate) => {
                        const target = extractCoordinates(coordinate);
                        const distance = greatCircleDistance({
                            lat1: center.lat,
                            lng1: center.lng,
                            lat2: target.lat,
                            lng2: target.lng
                        });
                        
                        return distance;
                    });
                    
                    return {id: dest.id, distances};
                })
            .map((targets) => {
                return { id: targets.id, distances: targets.distances.filter((distance) => distance <= distanceKM) };
            })
            .filter((targets) => targets.distances.length > 0)
    };

module.exports = {
    getDistanceUpto: getDistanceUpto
  };
  