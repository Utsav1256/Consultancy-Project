const User = require("../models/user");
const fs = require("fs");
const path = require("path");

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
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    //  checks if the user who made the request matches the user ID in the URL.
    try {
      let user = await User.findById(req.params.id); // tries to find the user by the ID passed in the URL
      User.uploadedAvatar(req, res, function (err) {
        // console.log(req);

        if (err) {
          console.log("****** Multer Error: ", err);
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          // checks if a file has been uploaded as part of the request.
          if (user.avatar) {
            // checks if the user already has an avatar by verifying if the avatar field of the user model is not null.
            const avatarPath = path.join(__dirname, "..", user.avatar); // creates the path of the existing avatar file by joining the current directory (__dirname), the parent directory (..) and the avatar field of the user model.
            if (fs.existsSync(avatarPath)) {
              // checks if the avatar file exists in the file system by calling the fs.existsSync() method with the avatarPath variable.
              // the avatar path exists, you can safely delete it
              fs.unlinkSync(avatarPath); // deletes the existing avatar file synchronously using the fs.unlinkSync() method.
            }
          }
          // this is saving the path of the uploaded file into the avatar field
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized!");
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
