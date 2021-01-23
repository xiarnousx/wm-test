const { json, urlencoded } = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const expressJwt = require('express-jwt');
const { jwtSecret } = require('../utils');

module.exports = function CommonMiddleware(app) {
    app.use([
        json(),
        urlencoded({extended: false}),
        morgan('common'),
        cors(),
        expressJwt({
            secret: jwtSecret,
            credentialsRequired: false,
            algorithms: ['sha1','RS256', 'HS256']
        }),
        helmet()
    ]);
}
