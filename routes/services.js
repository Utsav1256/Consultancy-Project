const express = require("express");
const router = express.Router();
const passport = require("passport");
const Service = require("../models/services");

// const passport = require("passport");
console.log("Router loaded");

const servicesController = require("../controllers/services_controller");

const serviceController = require("../controllers/services_controller");
router.get("/training", serviceController.training);
router.get("/consultancy", serviceController.consultancy);

// Route to render the "Add Service" page
router.get(
  "/add",
  // passport.checkAdminAuthentication,
  serviceController.renderAddService
);

// Add a new service
router.post(
  "/add-service",
  passport.checkAdminAuthentication,
  servicesController.addService
);

// Fetch all services
router.get("/all", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
