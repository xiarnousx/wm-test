const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const locationsRouter = require('./routes/locations');
const { ApplicationErrorMiddleware } = require('./middleware');
const { errorWrapper } = require('./utils');

const app = express();

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Main Microservice responsibility to send locations to clients.
app.use('/locations', locationsRouter);


// Handle Application Custom Errors
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

