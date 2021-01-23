module.exports = class OperationNotAllowed extends Error {
    constructor(message) {
        super(message);
        this.name = 'OperationNotAllowed';
        this.statusCode = 500;
    }

    toString() {
        return JSON.stringify(this.toJson);
    }

    toJson() {
       return  {error: {code: this.statusCode, message: this.message}};
    }
}