const Joi = require('joi');
const { PartnerFinderValidator } = require('../validators');
const { ValidationError } = require('../errors');

const validatorTypes = {
    PartnerFinder: PartnerFinderValidator
};

function ValidationMiddleware(type) {
    return (req, res, next) => {
        const validationResult = validatorTypes[type].validate(req.body);

        if (validationResult.error) {
            throw new ValidationError(validationResult.error.message);
        }

        next();
    }
}
const exported = {
    ValidationMiddleware
};

const keys = Object.keys(validatorTypes).forEach(item => exported[item] = item);

module.exports = exported