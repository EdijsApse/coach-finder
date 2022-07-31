const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  password: Joi.string().required().min(5),
  email: Joi.string().required().email(),
  confirm_password: Joi.string().required().valid(Joi.ref('password'))
})

module.exports.UserSchema = UserSchema;