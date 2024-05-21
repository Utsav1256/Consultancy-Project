const dotenv = require("dotenv");
dotenv.config();

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: "consultancy_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_USERNAME,
      pass: process.env.AUTH_PASSWORD,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
};
const production = {
  name: "production",
  asset_path: process.env.CONSULTANCY_ASSET_PATH,
  session_cookie_key: process.env.CONSULTANCY_SESSION_COOKIE_KEY,
  db: "consultancy_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CONSULTANCY_GMAIL_USERNAME,
      pass: process.env.CONSULTANCY_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CONSULTANCY_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CONSULTANCY_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CONSULTANCY_GOOGLE_CALLBACK_URL,
};
module.exports =
  eval(process.env.CONSULTANCY_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CONSULTANCY_ENVIRONMENT);
