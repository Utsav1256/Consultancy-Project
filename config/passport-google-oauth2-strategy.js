const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use the new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "986617047700-5f6lijv8bopu73str7phecsuua3avvc3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8001/users/auth/google/callback",
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
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          console.log("error in google strategy-passport", err);
          return done(err);
        });
    }
  )
);

module.exports = passport;
