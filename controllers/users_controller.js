const User = require("../models/user");

// render the profile  page
module.exports.profile = function (req, res) {
  // return res.render("user_profile", {
  //   title: "User Profile",
  // });
  User.findById(req.params.id)
    .then((user) => {
      return res.render("user_profile", {
        title: "Profile Page",
        profile_user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //    function (err, user) {
  //   return res.render("users_profile", {
  //     title: "Profile Page",
  //     profile_user: user,
  //   });
  // });
};
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    // User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //   //  req.body -> {name: req.body.name, email: req,body.email}
    //   return res.redirect("back");
    // });
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((user) => {
        // req.body -> {name: req.body.name, email: req.body.email}
        return res.redirect("back");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render the register page
module.exports.register = function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.render("user_register", {
          title: "Registration",
          profile_user: user,
        });
      } else {
        return res.render("user_sign_up", {
          title: "Sign Up",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile/:id");
  }
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

// sign out
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
