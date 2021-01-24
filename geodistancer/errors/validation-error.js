module.exports = class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 422;
    }

    toString() {
        return JSON.stringify(this.toJson);
    }

    toJson() {
       return  {error: {code: this.statusCode, message: this.message}};
    }
}