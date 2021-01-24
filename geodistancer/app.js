const createError = require('http-errors');
const express = require('express');
const { CommonMiddleware, ApplicationErrorMiddleware } = require('./middleware')
const { errorWrapper } = require('./utils');
const { globalConfig } = require('./config');
const { PartnerCalcFactory } = require('./services');

const app = express();

// Apply common middleware
CommonMiddleware(app);

// Subscribe To Redis Channels
PartnerCalcFactory.create(globalConfig.typeRedis).subscribe();

// Apply application error middleware
ApplicationErrorMiddleware(app);

// Forward 404 not found error to handler.
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(errorWrapper(err.message, err.status));
});

module.exports = app;
