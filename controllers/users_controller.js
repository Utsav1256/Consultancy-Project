const User = require("../models/user");

// module.exports.profile = function (req, res) {
//   // check in cookies if user id is present
//   if (req.cookies.user_id) {
//     // finding the user
//     User.findById(req.cookies.user_id, function (err, user) {
//       // if user is found
//       if (user) {
//         return res.render("users_profile", {
//           title: "User Profile",
//           user: user, //sending user to the profile page
//         });
//       } else {
//         return res.redirect("/users/sign-in");
//       }
//     });
//   } else {
//     // if in cookies user id is not present then
//     return res.redirect("/users/sign-in");
//   }
// };
module.exports.profile = function (req, res) {
  // check in cookies if user id is present
  if (req.cookies.user_id) {
    // finding the user
    User.findById(req.cookies.user_id)
      .then(function (user) {
        if (user) {
          return res.render("user_profile", {
            title: "User Profile",
            user: user, //sending user to the profile page
          });
        } else {
          return res.redirect("/users/sign-in");
        }
      })
      .catch(function (err) {
        return res.redirect("/users/sign-in");
      });
  } else {
    // if in cookies user id is not present then
    return res.redirect("/users/sign-in");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
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
// User.findOne({ email: req.body.email }, function (err, user) {
//   if (err) {
//     console.log("Error in finding user in signing up");
//     return;
//   }
//   if (!user) {
//     User.create(req.body, function (err, user) {
//       if (err) {
//         console.log("Error in creating user while signing up");
//         return;
//       }
//       return res.redirect("/users/sign-in");
//     });
//   } else {
//     return res.redirect("back");
//   }
// });
// };

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

//sign in and create a session for the user
// module.exports.createSession = function (req, res) {
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("Error in finding the user while signing in");
//     }
//     if (user) {
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

// using .then() fn.
module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (user) {
        if (user.password != req.body.password) {
          return res.redirect("back");
        }
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        return res.redirect("back");
      }
    })
    .catch(function (err) {
      console.log("Error in finding the user while signing in");
      return;
    });
};

//sign out
module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/users/sign-in");
};
