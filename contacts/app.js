const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const Redis = require('ioredis');
const { options } = require('./config/redis');
const contactsRouter = require('./routes/contacts');
const finderRouter = require('./routes/finder');
const { PARTNER_FINDER_CALCULATED } = require('./events/listeners');
const { partnerFinderCalculatedListener } = require('./subscribers/partner-finder-calculated');

const redis = new Redis(options);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Main Microservice responsibility to send contacts to clients.
app.use('/contacts', contactsRouter);
app.use('/find', finderRouter);

// Listen to Redis events
redis.subscribe(PARTNER_FINDER_CALCULATED, (err, count) => {
    redis.on('message', partnerFinderCalculatedListener);
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