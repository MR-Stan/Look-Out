const user = require("../models");

module.exports = function (app) {

  // load main.handlebars body = index.handlebars
  app.get('/', (req, res) => {
    res.render('home');
  });

  // render login page - need to make this a modal that pops up if not logged in
  app.get("/login", function (req, res) {
    res.render("login");
  });

  // render signup page
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
  
};

