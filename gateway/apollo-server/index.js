const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils');
const { readFileSync } = require('fs');
const path = require('path');

function apolloServerInit(app) {
    const schemaFile = path.join(__dirname, '..', 'schemas/schema.graphql');

    const typeDefs = gql(readFileSync(schemaFile, {encoding:'utf8'}));
    const resolvers = require('../resolvers/resolvers');
    
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

    return apolloServer;
}

module.exports = {
    apolloServerInit
};