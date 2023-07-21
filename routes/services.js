const express = require("express");
const router = express.Router();
// const passport = require("passport");
console.log("Router loaded");
const serviceController = require("../controllers/services_controller");
router.get("/training", serviceController.training);

module.exports = router;
