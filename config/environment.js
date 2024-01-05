const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "consultancy_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "coder.utsav64@gmail.com",
      pass: "lclpwohlzxiqfdpk",
    },
  },
  google_client_id:
    "986617047700-5f6lijv8bopu73str7phecsuua3avvc3.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8001/users/auth/google/callback",
};
const production = {
  name: "production",
};
module.exports = development;
