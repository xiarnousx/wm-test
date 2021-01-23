require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const loginRouter = require('./routes/login');
const { CommonMiddleware, ApplicationErrorMiddleware } = require('./middleware');
const { errorWrapper } = require('./utils');
const { apolloServerInit } = require('./apollo-server');

const app = express();

CommonMiddleware(app);

// Initialize apollo server
const apolloServer = apolloServerInit(app);

// Login 
app.use('/login', loginRouter);

ApplicationErrorMiddleware(app);

// Forward 404 not found error to handler.
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(errorWrapper(err.message, err.status));
});

module.exports = {app, apolloServer};