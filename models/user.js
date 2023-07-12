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
    Service_selected: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    postal_code: {
      type: Number,
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
