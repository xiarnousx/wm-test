const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../utils');
const { LocationService } = require('../services');

const locationService = new LocationService();

router.get('/', asyncWrapper(async (req, res, next) => {
    const resp =  await locationService.findAll();
    res.json(resp);
}));

module.exports = router;