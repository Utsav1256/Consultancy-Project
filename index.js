const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {PORT, SESSION_NAME, SESSION_SECRET_KEY} = require("./config/serverConfig")
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportAdmin = require("./config/passport-admin-local-strategy");
const MongoStore = require("connect-mongo");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./assets"));
// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the usage of session middleware
// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: SESSION_NAME,
    //ToDo change the secret before deployment in production mode
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: mongoose.connection._connectionString,
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      // if the connection is not established
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(passport.setAuthenticatedAdmin);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT}`);
});
