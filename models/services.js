const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Programming", "Design", "Marketing", "Other"],
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const service = mongoose.model("Service", serviceSchema);
module.exports = service;
