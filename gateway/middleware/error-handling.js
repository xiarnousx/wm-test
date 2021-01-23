const { ValidationError, AuthenticationError, AccessDeniedError } = require('../errors');

function logger(err, req, res, next) {
    if ( err instanceof AuthenticationError
        || err instanceof ValidationError
        || err instanceof AccessDeniedError
    
    ) {
        console.log(err.toString());
    } 
    
    if (err.stack) {
        console.log(err.message);
    }

    next(err);
}

function handler(err, req, res, next) {
    if ( err instanceof AuthenticationError
        || err instanceof ValidationError
        || err instanceof AccessDeniedError
    
    ) {
        return res.status(err.statusCode).json(err.toJson());
    }

    next(err);
}

module.exports = function ApplicationErrorMiddleware(app) {
    app.use([logger, handler]);
}