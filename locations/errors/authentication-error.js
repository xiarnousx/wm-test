module.exports = class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }

    toString() {
        return JSON.stringify(this.toJson);
    }

    toJson() {
       return  {error: {code: this.statusCode, message: this.message}};
    }
}