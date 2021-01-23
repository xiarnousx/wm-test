const { Location } = require('../models');
module.exports = class LocationService {
    async findAll() {
        const locations = await Location.findAll();

        const result = locations.map((location) => {
            // Don't break contract with graphql gateway.
            return {
                id: location.id,
                city: location.city,
                country: location.country,
                coordinates: location.point
            };
        });
    
        return result;
    }
}