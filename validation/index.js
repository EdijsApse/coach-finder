const User = require('../models/User');
const { UserSchema } = require('../joi-schemas');

function validateUser(req, res, next) {
  const { error } = UserSchema.validateAsync(req.body, { abortEarly: false });

  if (error) {
    const errors = prepareErrors(error.details);
    return res.json({
      success: false,
      errors: errors
    });
  }

  next();
}

async function isUniqueEmail(req, res, next) {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.json({
      success: false,
      errors: [{
        field: 'email',
        message: 'Email already taken!'
      }]
    })
  }

  next();
}

/**
 * 
 * @param {*} joiErrorDetails === [{message: 'Email value is invalid', path: ['email']}] 
 * @returns { field: 'email', error: 'Email value is invalid' }
 */
function prepareErrors(joiErrorDetails) {
  return joiErrorDetails.map((error) => {
    const [ field ] = error.path;
    return {
      field: field,
      message: error.message
    };
  })
}

module.exports = {
  validateUser: validateUser,
  isUniqueEmail: isUniqueEmail
}