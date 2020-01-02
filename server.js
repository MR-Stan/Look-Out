// Dependencies
// ----------------------------------------------------

// npm dotenv -
require("dotenv").config();

// npm express -
const express = require("express");

// npm express-handlebars - 
const exphbs = require("express-handlebars");

const jwt = require("jsonwebtoken");

const cors = require("cors");

// npm bcrypt used to hash password
const bcrypt = require("bcryptjs");

// require models folder - defaults to index.js
const db = require("./models");
// ----------------------------------------------------

//
const app = express();

//
const PORT = process.env.PORT || 3000;

// Middleware
// ----------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
// ----------------------------------------------------

// Handlebars
// ----------------------------------------------------
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  })
);
app.set("view engine", "handlebars");
// ----------------------------------------------------

// Routes
// ----------------------------------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// ----------------------------------------------------

// 
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
