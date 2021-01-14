import gql  from 'graphql-tag';

export const PAYLOAD_KEY_PARTNERS_FINDER = 'partnersFinder';
export const partnersFinderQuery = gql`
    query PartnersFinderQuery($input: PartnersFinderInput!){
        partnersFinder(input: $input) {
            status
        }
    }
`;

export const PAYLOAD_KEY_LOCATIONS = 'cities';
export const locationsQuery = gql`
    query LocationsQuery {
        cities {
            id
            city
            coordinates
        }
    }
`;

export const PAYLOAD_KEY_USER = 'user';
export const meQuery = gql`
    query MeQuery {
        user {
            id
            name
            username
        }
    }
`;

export const PAYLOAD_KEY_PARTNERS_MATCHED = 'partnerFinderMatched';
export const partnerFinderMatchedSubscription = gql`
    subscription {
        partnerFinderMatched {
            id
            organization
            offices {
                location
            }
        }
    }
`;