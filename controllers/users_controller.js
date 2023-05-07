const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAythenticated()) {
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Sign_In",
  });
};

// get sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        User.create(req.body).then(function (user) {
          return res.redirect("/users/sign-in");
        });
      } else {
        return res.redirect("back");
      }
    })
    .catch(function (err) {
      console.log("Error in signing up", err);
      return res.redirect("back");
    });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
