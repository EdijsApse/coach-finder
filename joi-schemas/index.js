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

module.exports.UserSchema = UserSchema;
module.exports.CredentialsSchema = CredentialsSchema;