require('dotenv').config();

module.exports = {
    typeRedis: 'type_redis',
    typeAMPQ: 'type_ampq',
    greatCircleCalculationMethod: process.env.CALCULATION_METHOD,
    arcFormula: 'arcFormula',
    vincentyFormula: 'vincentyFormula',
    haversineFormula: 'haversineFormula'
}