const express = require('express');
const router = express.Router();
const { PartnerReceivedService } = require('../services');
const { ValidationMiddleware, PartnerFinder } = require('../middleware');
const { asyncWrapper } = require('../utils');



router.post('/partners', ValidationMiddleware(PartnerFinder), asyncWrapper(async (req, res, next) => {
    const {userId, origin, distanceWithin } = req.body;
    PartnerReceivedService.calculationRequest(userId, origin, distanceWithin);
    res.json({"status": true});
}));

module.exports = router;