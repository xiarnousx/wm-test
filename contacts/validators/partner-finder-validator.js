const Joi = require('joi');

const PartnerFinderValidator = Joi.object().keys({
    userId: Joi.string().required(),
    origin: Joi.string().regex(/^[+-]?\d+(\.\d+),[+-]?\d+(\.\d+)$/).required(),
    distanceWithin: Joi.number().required()
});

module.exports = PartnerFinderValidator;