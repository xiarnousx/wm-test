function extractCoordinates(str) {
    const latlng = str.split(',');
    return {lat: latlng[0], lng: latlng[1]};
}

module.exports = { extractCoordinates };