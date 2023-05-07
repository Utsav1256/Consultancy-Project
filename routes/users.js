const express = require("express");
const router = express.Router();
const passport = require("passport");
console.log("Router loaded");

const userController = require("../controllers/users_controller");
router.get("/profile", userController.profile);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);

router.post("/create", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
