// Dependencies
// ----------------------------------------------------

// npm path - joins paths with out platform specific delimiters
const path = require("path");

// npm express - web framework for node
const express = require('express');

// npm express-handlebars - handlebars templating engine for express
const exphbs = require('express-handlebars');

// npm cors - enables cross origin resource sharing
const cors = require('cors');

// npm cookie-parser - parse HTTP request cookies
const cookieParser = require('cookie-parser');

// require models folder - defaults to index.js
const db = require('./models');


// ----------------------------------------------------

// starting the server
// const app = express();
const app = express(),

  hbs = exphbs.create({

    // default layout is main.handlebars
    defaultLayout: 'main',

    // hbs helpers
    helpers: {

      // helper for log in modal
      loginModal: function (name, options) {
        if (!this._loginModal) { this._loginModal = {} };
        this._loginModal[name] = options.fn(this);
        return null;
      }
    }
  });

// setting the port
const PORT = process.env.PORT || 3000;

// Middleware
// ----------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
// ----------------------------------------------------

// Handlebars
// ----------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// ----------------------------------------------------

// Routes
// ----------------------------------------------------
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
// ----------------------------------------------------

// 
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
