require('dotenv').config();
const createError = require('http-errors');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const router = express.Router();
const assert = require('assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../utils/jwt-secret');

const dbUrl = process.env.MONGO_URI;
const client = new MongoClient(dbUrl);


router.post('/', (req, res, next) => {
    const { username, password } = req.body;

    client.connect((err, client) => {
        assert.strictEqual(null, err);
        const db = client.db(process.env.MONGO_DB);
        const authGatewayCol = db.collection(process.env.MONGO_DB_AUTH_COLLECTION);

        authGatewayCol.findOne({username}, (err, user) => {

            console.log(err);

                
            if (!(user && bcrypt.compareSync(password, user.password))) {
                next(createError(403));
                return;
            }
            const payload = {id: user._id, name: user.name, username: user.username, roles: user.roles};
            const token = jwt.sign({sub: payload}, jwtSecret);
            res.send({token, uuid: payload.id});
        });
    });
});

module.exports = router;