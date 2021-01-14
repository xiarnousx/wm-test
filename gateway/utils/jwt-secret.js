require('dotenv').config();
const jwtSecret = Buffer.from(process.env.JWT_SECRET, 'base64');

module.exports = jwtSecret;