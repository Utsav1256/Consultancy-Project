const express = require("express");
const router = express.Router();
// const passport = require("passport");
console.log("Router loaded");

const servicesController = require("../controllers/services_controller");

const serviceController = require("../controllers/services_controller");
router.get("/training", serviceController.training);

// Route to render the "Add Service" page
router.get("/add", serviceController.renderAddService);

// Add a new service
router.post("/add-service", servicesController.addService);

module.exports = router;
