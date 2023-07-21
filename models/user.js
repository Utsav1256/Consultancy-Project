const mongoose = require("mongoose");
const multer = require("multer"); // imports the Multer package which is used for handling file uploads.
const path = require("path"); //  imports the Node.js path module which provides utilities for working with file and directory paths.
const AVATAR_PATH = path.join("/uploads/users/avatars");
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
    avatar: {
      type: String,
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

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// statics methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model("User", userSchema);
module.exports = user;
