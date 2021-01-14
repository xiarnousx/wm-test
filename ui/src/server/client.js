require('dotenv').config();
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost';
import { WebSocketLink, WenSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getToken, isLoggedIn } from './auth';

const httpEndPoint = process.env.REACT_APP_REMOTE_GQL;
const wsEndPoint = process.env.REACT_APP_REMOTE_GQL_WS;

const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
        if (isLoggedIn()) {
            operation.setContext({
                headers: {
                    'authorization': 'Bearer ' + getToken()
                }
            });
        }
    
        return forward(operation);
    }),
    new HttpLink({uri: httpEndPoint })
]);

const wsLink = new WebSocketLink({uri: wsEndPoint, options:{
    connectionParams: () =>({
        accessToken: getToken()
    }),
    lazy: true,
    reconnect: true
}});

const isSubscription = (operation) =>{
    const definition = getMainDefinition(operation.query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
}

export const client = new ApolloClient({
    link: split(isSubscription, wsLink, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {query: {fetchPolicy: 'no-cache'}}
});