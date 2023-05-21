const express = require("express");
const router = express.Router();
const passport = require("passport");
console.log("Router loaded");

const userController = require("../controllers/users_controller");
router.get("/profile", passport.checkAuthentication, userController.profile); //a user should not be able to view profile page before signed in
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);

router.post("/create", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

router.get("/sign-out", userController.destroySession);

module.exports = router;