const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8001;
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

app.use(express.urlencoded());
app.use(cookieParser());

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
    name: "Consultancy",
    //ToDo change the secret before deployment in production mode
    secret: "blahsomething",
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

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
