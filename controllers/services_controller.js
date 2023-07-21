// const Service = require("../models/services");

module.exports.training = function (req, res) {
  // if (req.isAuthenticated()) {
  //   return res.redirect("/users/profile");
  // }
  return res.render("training", {
    title: "Training",
  });
};
