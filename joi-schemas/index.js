const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  password: Joi.string().required().min(5),
  email: Joi.string().required().email(),
  confirm_password: Joi.string().required().valid(Joi.ref('password'))
})

const CredentialsSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
})

const CoachSchema = Joi.object({
  jobtitle: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  fields: Joi.array().items(Joi.string()).min(1).required(),
  location: Joi.string().required(),
  about: Joi.string().allow('').optional()
})

module.exports.UserSchema = UserSchema;
module.exports.CredentialsSchema = CredentialsSchema;
module.exports.CoachSchema = CoachSchema;