const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// Render the profile page
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "Profile Page",
      profile_user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Update user profile
module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);

      // Handle uploaded avatar
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("****** Multer Error: ", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            const avatarPath = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(avatarPath)) {
              fs.unlinkSync(avatarPath);
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } else {
      req.flash("error", "Unauthorized!");
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    return res.redirect("back");
  }
};

// Render the sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// Render the register page
module.exports.register = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
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
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Render the sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile/:id");
  }
  return res.render("user_sign_in", {
    title: "Sign_In",
  });
};

// Create a new user
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in signing up", err);
    return res.redirect("back");
  }
};

// Create a session for user login
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// Sign out
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
