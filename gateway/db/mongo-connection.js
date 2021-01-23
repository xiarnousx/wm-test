const { connectionUri } = require('../config/config');
const MongoClient = require('mongodb').MongoClient;

let dbInstance = null;

class Connection {
    constructor() {
        this.db = new MongoClient(connectionUri);
    }

    get connection() {
        return this.db
    }

    static getInstance() {
        if (!dbInstance) {
            dbInstance = new Connection();
        }

        return dbInstance;
    }
}

module.exports = Connection;