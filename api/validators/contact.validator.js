const Joi = require('joi');

const contactSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  company: Joi.string().max(150).allow('', null),
  phone: Joi.string().max(30).allow('', null),
  email: Joi.string().email().max(200).required(),
  message: Joi.string().max(2000).required(),
  consent_personal_data: Joi.boolean().valid(true).required() // force true
});

module.exports = { contactSchema };
