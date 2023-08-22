// const Service = require("../models/services");

module.exports.training = function (req, res) {
  // if (req.isAuthenticated()) {
  //   return res.redirect("/users/profile");
  // }
  return res.render("training", {
    title: "Training",
  });
};

const Service = require("../models/services");
// Render the "Add Service" page
module.exports.renderAddService = function (req, res) {
  return res.render("add_service", {
    title: "Add Service",
  });
};

// Add a new service
module.exports.addService = async function (req, res) {
  try {
    const { title, id_number, description, duration, price } = req.body;

    // Create a new service instance
    const newService = new Service({
      title: title,
      id_number: id_number,
      description: description,
      duration: duration,
      price: price,
    });

    // Save the new service to the database
    const savedService = await newService.save();

    return res.status(201).json({
      message: "Service added successfully",
      service: savedService,
    });
  } catch (err) {
    console.error("Error adding service:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
