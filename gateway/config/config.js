require('dotenv').config();

module.exports = {
    connectionUri: process.env.MONGO_URI,
    authDB: process.env.MONGO_DB,
    authCollection: process.env.MONGO_DB_AUTH_COLLECTION
}