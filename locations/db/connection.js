const config = require('../config/config');
const { Sequelize } = require('sequelize');

let dbInstance = null;

class Connection {
    constructor() {
        this.db = new Sequelize(config);
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