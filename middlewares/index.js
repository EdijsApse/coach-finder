const UnauthorizedError = require('../utils/UnauthorizedError');
const UnhandledError = require('../utils/UnhandledError');
const passport = require('passport');

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
  next();
}

function tokenValidationMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(new UnhandledError('Something went wrong!', err));
    }
    if (!user) {
      return next(new UnauthorizedError('You are not authorized to see this resource!'));
    }
    next();
  })(req, res, next);
}

module.exports = {
  defaultErrorHandler: defaultErrorHandler,
  setHeaderMiddleware: setHeaderMiddleware,
  tokenValidationMiddleware: tokenValidationMiddleware
}