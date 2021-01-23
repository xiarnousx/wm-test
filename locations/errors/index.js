const ValidationError = require('./validation-error');
const AuthenticationError = require('./authentication-error');
const AccessDeniedError = require('./access-denied-error');
const OperationNotAllowed = require('./operation-not-allowed-error');

module.exports = {
    ValidationError,
    AuthenticationError,
    AccessDeniedError,
    OperationNotAllowed
};