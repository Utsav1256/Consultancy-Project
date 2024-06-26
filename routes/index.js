const express = require("express");
const router = express.Router();
console.log("Router loaded");

const homeController = require("../controllers/home_controller");
router.get("/", homeController.home);
router.get("/about", homeController.about);
router.use("/users", require("./users"));
router.use("/services", require("./services"));
router.use("/payments", require("./payments"));
router.use("/admin", require("./admin"));

module.exports = router;
