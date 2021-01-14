const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const locationsRouter = require('./routes/locations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Main Microservice responsibility to send locations to clients.
app.use('/locations', locationsRouter);

// Forward 404 not found error to handler.
app.use((req, res, next) => {
    next(createError(404));
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err.message});
});

module.exports = app;

