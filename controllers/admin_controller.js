const Admin = require("../models/admin");
const {ADMIN_EMAIL, ADMIN_PASSWORD} = require("../config/serverConfig")


// Create a new admin account
const newAdminData = new Admin({
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
});

// Check if the admin already exists in the database
Admin.findOne({ email: newAdminData.email }).then((existingAdmin) => {
  if (existingAdmin) {
    console.log("Admin already exists:", existingAdmin);
  } else {
    // If the admin does not exist, create a new admin account and save it to the database
    const newAdmin = new Admin(newAdminData);
    newAdmin
      .save()
      .then((admin) => {
        console.log("Admin created successfully:", admin);
      })
      .catch((err) => {
        console.error("Error creating admin:", err);
      });
  }
});

// Render the dashboard page
module.exports.dashboard = async function (req, res) {
  try {
    // console.log(req.params);
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    return res.render("admin_dashboard", {
      title: "Dashboard",
      admin: admin,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
// Create a session for admin login
module.exports.createAdminSession = function (req, res) {
  // Redirect to admin dashboard upon successful authentication
  console.log("createAdminSession");
  console.log(req.user.id);

  return res.redirect(`/admin/dashboard/${req.user.id}`);
};

// Render the sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    console.log("signIn");
    return res.redirect("/admin/dashboard/:id");
  }
  return res.render("admin_login", {
    title: "Login",
  });
};

// Logout admin and redirect to the sign-in page
module.exports.destroyAdminSession = function (req, res) {
  req.logout();
  return res.redirect("/admins/sign-in");
};
