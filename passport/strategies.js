const PassportLocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const UnauthorizedError = require('../utils/UnauthorizedError');
const UnhandledError = require('../utils/UnhandledError');

const tokenValidationStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.SECRET_STRING_FOR_TOKEN_GEN, // Secret which is used to generate token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Methods used to search for token
  },
  // Callback
  async (token, done) => {
    try {
      // trying to access user in token object.
      // If success user, will be available in auth routes
      done(null, token.user);
    } catch(err) {
      // If fails, pass error to middleware, which is defined in auth routes
      done(new UnauthorizedError('Token is not valid!', err));
    }
  }
)

const loginStrategy = new PassportLocalStrategy(
  {
    usernameField: 'email', // Will search email key in req.body, to get email
    passwordField: 'password' // Will search password key in req.body, to get password
  },
  // Callback for login in user
  // Gets email, password and done callback
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isValidPassword = await user.isSamePassword(password);

      if (!isValidPassword) {
        return done(null, false);
      }

      //User found successfully, and passing it to auth routes
      done(null, user);

    } catch(err) {
      done(new UnhandledError('Something went wrong!', err), false);
    }
  }
)

const registerStrategy = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Will need req object to callback, thats why this option is set to true
  },
  async (req, email, password, done) => {
    try {
      const { name, surname } = req.body;
      const user = await User.create({name, surname, email, password});
      done(null, user);
    } catch(err) {
      done(new UnhandledError('Something went wrong!', err));
    }
  }
)

module.exports = {
  tokenValidationStrategy: tokenValidationStrategy,
  loginStartegy: loginStrategy,
  registerStrategy: registerStrategy
}