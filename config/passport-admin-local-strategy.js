const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin"); // Assuming you have an Admin model

// Authentication using passport
passport.use(
  "local-admin",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    function (req, email, password, done) {
      // Find an admin and establish the identity
      console.log(Admin);
      // console.log(admin);
      console.log(email);
      Admin.findOne({ email: email })
        .then(function (admin) {
          console.log("admin", admin);
          console.log("admin.password", admin.password);
          console.log("password", password);
          if (!admin || admin.password != password) {
            console.log("Invalid Username/Password");
            req.flash("error", "Invalid Username/Password");
            return done(null, false);
          }
          console.log("Admin-> ", Admin);

          return done(null, admin);
        })
        .catch(function (err) {
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

// Serializing the admin to decide which key is to be kept in the cookies
passport.serializeUser(function (admin, done) {
  console.log(email);

  done(null, admin.id);
});

// Deserializing the admin from the key in the cookies
passport.deserializeUser(function (id, done) {
  Admin.findById(id)
    .then(function (admin) {
      console.log(email);

      return done(null, admin);
    })
    .catch(function (err) {
      console.log("Error in finding admin --> Passport");
      return done(err);
    });
});

// Check if the admin is authenticated
passport.checkAdminAuthentication = function (req, res, next) {
  // If the admin is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("checkAdminAuthentication");
  // If the admin is not signed in
  return res.redirect("'/admin/sign-in'");
};

passport.setAuthenticatedAdmin = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in admin from the session cookie and we are just sending this to the locals for the views
    res.locals.admin = req.user;
  }
  next();
};

module.exports = passport;
