const express = require("express");
const router = express.Router();
const passport = require("passport");
console.log("Router loaded");

const userController = require("../controllers/users_controller");
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
); //a user should not be able to view profile page before signed in
router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get("/register/:id", userController.register);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.get("/sign-out", userController.destroySession);
router.post("/create", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

router.get("/sign-out", userController.destroySession);

// it takes me to google to fetch uer data from there
router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google sends the data to me through this route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
module.exports = router;
