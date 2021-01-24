const createError = require('http-errors');
const express = require('express');
const { CommonMiddleware, ApplicationErrorMiddleware } = require('./middleware');
const { PartnerCalculatedFactory } = require('./services');
const { globalConfig } = require('./config');
const { errorWrapper } = require('./utils');
const contactsRouter = require('./routes/contacts');
const finderRouter = require('./routes/finder');

const app = express();

// Apply common middleware.
CommonMiddleware(app);

// Main Microservice responsibility to send contacts to clients.
app.use('/contacts', contactsRouter);
app.use('/find', finderRouter);

// Listen to Redis events
PartnerCalculatedFactory.create(globalConfig.typeRedis).subscribe();

// Handle Application wide error
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