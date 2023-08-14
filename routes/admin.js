const express = require("express");
const router = express.Router();
const passport = require("passport");
console.log("Router loaded");

const adminController = require("../controllers/admin_controller");
router.get("/sign-in", adminController.signIn);

router.post(
  "/create-admin-session",
  passport.authenticate("local-admin", { failureRedirect: "/admin/sign-in" }),
  adminController.createAdminSession
);

router.get(
  "/dashboard/:id",
  // passport.checkAdminAuthentication,
  adminController.dashboard
);
module.exports = router;
