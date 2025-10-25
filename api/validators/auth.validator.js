const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().max(200).required(),
  password: Joi.string().min(8).max(128)
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[0-9]/, 'number')
    .pattern(/[\W_]/, 'special')
    .required(),
  first_name: Joi.string().max(100).allow('', null),
  last_name: Joi.string().max(100).allow('', null)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
