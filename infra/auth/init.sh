mongoimport --authenticationDatabase=admin --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --mode upsert --db graphql --collection gatewayAuth --file /seed/users.json --jsonArray