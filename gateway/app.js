require('dotenv').config();
const createError = require('http-errors');
const { readFileSync } = require('fs');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { ApolloServer, gql } = require('apollo-server-express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const loginRouter = require('./routes/login');
const jwtSecret = require('./utils/jwt-secret');

const app = express();
app.use(logger(process.env.ENVIRONMENT));
app.use(cors());
app.use(express.json());
app.use(expressJwt({ secret: jwtSecret, credentialsRequired: false, algorithms: ['sha1','RS256', 'HS256']}));


const typeDefs = gql(readFileSync('./schemas/schema.graphql', {encoding:'utf8'}));
const resolvers = require('./resolvers/resolvers');

const context = ({ req, connection }) => {

    if (req && req.user) {
        return {loggedInUser: req.user.sub};
    }

    if (connection && connection.context && connection.context.accessToken) {
        const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret);
        return {loggedInUser: decodedToken.sub }
    }

    return {};
};

const apolloServer = new ApolloServer({typeDefs, resolvers, context});
apolloServer.applyMiddleware({app, path:'/gql' });

// Login 
app.use('/login', loginRouter);

// Forward 404 not found error to handler.
app.use((req, res, next) => {
    next(createError(404));
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err.message});
});

module.exports = {app, apolloServer};