const { json, urlencoded } = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

module.exports = function CommonMiddleware(app) {
    app.use([
        json(),
        urlencoded({extended: false}),
        morgan('common'),
        cors(),
        helmet()
    ]);
}
