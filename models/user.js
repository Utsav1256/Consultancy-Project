const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: Number,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
