const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const Redis = require('ioredis');
const { options } = require('./config/redis');
const { PARTNER_FINDER_RECIEVED } =  require('./events/listeners');
const { partnerFinderReceivedListener } = require('./subscribers/partner-finder-received');

const redis = new Redis(options);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Subscribe To Redis Channels
redis.subscribe(PARTNER_FINDER_RECIEVED, (err, count) => {
    if (err) {
        console.log(err);
    }

    // Process The Recieved Payload
    redis.on('message', partnerFinderReceivedListener);
});


// Forward 404 not found error to handler.
app.use((req, res, next) => {
    next(createError(404));
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err.message});
});

module.exports = app;
