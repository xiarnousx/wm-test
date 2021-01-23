
const express = require('express');
const router = express.Router();
const { AuthService } = require('../services');
const { asyncWrapper } = require('../utils');
const config = require('../config/config');


router.post('/', asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const authService = new AuthService(config.authDB, config.authCollection);
    const result = await authService.login(username, password);
    res.json(result);
}));

module.exports = router;