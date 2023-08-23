module.exports.home = function (req, res) {
  return res.render("home", { title: "home" });
};
module.exports.about = function (req, res) {
  return res.render("about_us", { title: "about" });
};
