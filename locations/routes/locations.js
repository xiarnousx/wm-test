const express = require('express');
const router = express.Router();
const locations = require('../data/cities.json')

router.get('/', (req, res, next) => {
    res.json(locations);
});

module.exports = router;