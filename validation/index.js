const { UserSchema } = require('../joi-schemas');

function validateUser(req, res, next) {
  const { error } = UserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = prepareErrors(error.details);
    return res.json({
      success: false,
      errors: errors
    });
  }

  next();
}

/**
 * 
 * @param {*} joiErrorDetails === [{message: 'Email value is invalid', path: ['email']}] 
 * @returns { email: 'Email value is invalid' }
 */
function prepareErrors(joiErrorDetails) {
  return joiErrorDetails.map((error) => {
    const [ field ] = error.path;
    const returnErr = {};

    returnErr[field] = error.message;

    return returnErr;
  })
}

module.exports = {
  validateUser: validateUser
}