const express = require('express');
const router = express.Router();
const partners = require('../data/partners.json')

router.get('/', (req, res, next) => {
    res.json(partners);
});

module.exports = router;