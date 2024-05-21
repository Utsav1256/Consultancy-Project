const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = require("./serverConfig")


// tell passport to use the new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
      GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value })

        .then((user) => {
          if (user) {
            // if found, set this user as req.user (means sign in that user)
            return done(null, user);
          } else {
            // if not found, create the user and set it as req.user
            return User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
          }
        })

        .catch((err) => {
          console.log("error in google strategy-passport", err);
          return done(err);
        });
    }
  )
);

module.exports = passport;
