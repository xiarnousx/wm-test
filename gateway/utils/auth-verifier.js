const httpErrors = require('http-errors');

function requireAuth( loggedInUser ) {
    if (!loggedInUser) {
        throw new Error(httpErrors(403));
    }
}

module.exports = { requireAuth };