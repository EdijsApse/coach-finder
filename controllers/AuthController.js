const jwt = require("jsonwebtoken");
const passport = require("passport");
const UnhandledError = require("../utils/UnhandledError");

//passport.authenticate login points to method which is configured in passport/strategies.js
// callback params coming from registered strategies (done method call)

async function login(req, res, next) {
  passport.authenticate(
    "login",
    {
      session: false,
      failWithError: true
    },
    async (err, user) => {
      try {
        if (err) {
          return next(new UnhandledError("Something went wrong!", err));
        }

        if (!user) {
          return res.send({
            success: false,
            message: 'User not found!'
          });
        }

        req.login(user, { session: false }, async (error) => {
          if (error)
            return next(new UnhandledError("Something went wrong!", error));

          // Creating token from secret and user info
          const token = jwt.sign(
            {
              user: {
                _id: user.id,
                email: user.email,
              },
            },
            process.env.SECRET_STRING_FOR_TOKEN_GEN,
            {
              expiresIn: '1y'
            },
          );

          return res.json({ user: user.getApiData(), token: token });
        });
      } catch (error) {
        return next(new UnhandledError("Something went wrong!", error));
      }
    }
  )(req, res, next);
}

function register(req, res, next) {
  //passport.authenticate will return function which then will be executed by express with req,res, next params
  passport.authenticate(
    "register",
    {
      session: false,
      failWithError: true
    }
  )(req, res, next);
}

function refreshUser(req, res) {
  res.json({
    success: true,
    user: req.user
  })
}

module.exports = {
  login: login,
  register: register,
  refreshUser: refreshUser
};
