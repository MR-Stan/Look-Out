const jwt = require("jsonwebtoken");

module.exports = function (app) {

  // render home page if user is authenticated
  app.get('/', (req, res) => {

    // obtain jwt from cookie
    const token = req.cookies.jwt;

    // if jwt.verify does not yield an error then render home.handlebars
    try {
      jwt.verify(token, "secretkey");
      res.render("home");
    }
    // if jwt.verify yields an error then yield login.handlebars
    catch (err) {
      res.redirect("/login");
    }
  });

  // render log in modal
  app.get("/login", function (req, res) {
    res.render("login");
  });

  // render sign up modal
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};

