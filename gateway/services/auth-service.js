const client = require('../db/mongo-connection').getInstance().connection;
const assert = require('assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils');
const { AccessDeniedError, OperationNotAllowed } = require('../errors');

class AuthService {
    
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    async login(username, password) {

        const conn = await client.connect();

        if (!conn) {
            throw new OperationNotAllowed('Not able to connect to database instance.');
        }

        const schema = conn.db(this.db);
        const collection = schema.collection(this.collection);
        const user = await collection.findOne({username});

        if (!(user && bcrypt.compareSync(password, user.password))) {
            throw new AccessDeniedError('Invalid username and password');
        }

        const payload = {id: user._id, name: user.name, username: user.username, roles: user.roles};
        const token = jwt.sign({sub: payload}, jwtSecret);

        return {token, uuid: payload.id};
    }

}

module.exports = AuthService;