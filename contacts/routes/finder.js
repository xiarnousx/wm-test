const express = require('express');
const http = require('axios');
const router = express.Router();
const Redis = require("ioredis");
const { options } = require('../config/redis');
const partners = require('../data/partners.json')
const { PARTNER_FINDER_RECIEVED } = require('../events/publishers')
const pub = new Redis(options);

router.post('/partners', async (req, res, next) => {
    const {userId, origin, distanceWithin } = req.body;

    const reducedPartners = partners.map((partner, index) => {
        const coordinates = partner.offices.map((office, index) => office.coordinates);
        return {id: partner.id, coordinates}
    });

    const payload = {userId, origin, distanceWithin, partners:reducedPartners };

    pub.publish(PARTNER_FINDER_RECIEVED, JSON.stringify(payload));

    res.json({"status": true});
});

module.exports = router;