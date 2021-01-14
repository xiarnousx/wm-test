require('dotenv').config();
const axios = require('axios');
const { RedisPubSub } = require('graphql-redis-subscriptions');
const  Redis  = require('ioredis');
const { requireAuth } = require('../utils/auth-verifier');

const { PARTNER_FINDER_MATCHED } = require('../events/listeners');

const options = ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy: times => {
        return Math.min(times * 50, 2000)
    }
});

const redisPubSub = new RedisPubSub({
    subscriber: new Redis(options),
    publisher: new Redis(options)
});

/**
 *  Root Query Resolvers:
 */

const Query = {
    partners: async (root, args, { loggedInUser }) => {
        
        requireAuth(loggedInUser);

        const { data } = await axios.get(process.env.PARTNERS_SVC);
        return data;
    },

    cities: async (root, args, { loggedInUser }) => {
        requireAuth(loggedInUser);

        const { data } = await axios.get(process.env.LOCATIONS_SVC);
        return data;
    },

    user: async (root, args, { loggedInUser }) => {
        
        requireAuth(loggedInUser);

        redisPubSub.publish(PARTNER_FINDER_MATCHED, {partnerFinderMatched: msg});
        return { 
            id: loggedInUser.id, 
            name: loggedInUser.name, 
            username: loggedInUser.username
         };
    },

    partnersFinder: async (root, { input }, { loggedInUser }) => {
        
        requireAuth(loggedInUser);

        const { origin, distanceWithin } = input;

        // Basic validation, a better aproach would be having a validation folder
        // that validates input.
        // Validation should be done at gateway.
        // Microservices are exposed only thru Graphql Gateway.
        // @todo create validation entities.
        if (! (origin || distanceWithin) ) {
            return [];
        }

        const { data } = await axios.post(process.env.PARTNERS_FIND_SVC, {userId: loggedInUser.id, ...input}, {"content-type": "application/json"});
        
        return data;
    }
}

/**
 * Subscriptions Resolvers:
 */

 const Subscription = {
    partnerFinderMatched: {
        subscribe: (root, args, { loggedInUser }) => {
            requireAuth(loggedInUser);
            
            return redisPubSub.asyncIterator(PARTNER_FINDER_MATCHED + "_" + loggedInUser.id)
        }
    }
 }

/**
 * Entities Resolvers:
 */

const Partner = {
    offices: (parentPartner, args, { loggedInUser }) => {
        
        requireAuth(loggedInUser);

       return parentPartner.offices
    }
}

module.exports = {Query, Partner, Subscription}



