const UnauthorizedError = require('../utils/UnauthorizedError');
const UnhandledError = require('../utils/UnhandledError');
const passport = require('passport');
const User = require('../models/User');

function defaultErrorHandler(err, req, res, next) {
  let message = err.message ? err.message : 'Something went wrong!';
  const code = err.code || 500;

  if (process.env.MODE === 'dev') {
    console.log(err)
  }

  res.status(code);
  res.json({
    error: message,
    code: code
  });
}

function setHeaderMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  next();
}

function tokenValidationMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err) {
      return next(new UnhandledError('Something went wrong!', err));
    }
    if (!user) {
      return next(new UnauthorizedError('You are not authorized to see this resource!'));
    }
    try {
      const userModel = await User.findById(user._id);
      if (userModel) {
        console.log(userModel)
        req.user = userModel.getApiData();

        return next();
      } else {
        return next(new UnauthorizedError('You are not authorized to see this resource!'));
      }
    } catch(err) {
      next(new UnhandledError('Something went wrong!', err));
    }
  })(req, res, next);
}

module.exports = {
  defaultErrorHandler: defaultErrorHandler,
  setHeaderMiddleware: setHeaderMiddleware,
  tokenValidationMiddleware: tokenValidationMiddleware
}