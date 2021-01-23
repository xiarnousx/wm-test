module.exports = class AccessDeniedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AccessDeniedError';
        this.statusCode = 403;
    }

    toString() {
        return JSON.stringify(this.toJson);
    }

    toJson() {
       return  {error: {code: this.statusCode, message: this.message}};
    }
}