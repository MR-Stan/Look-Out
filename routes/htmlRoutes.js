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
  app.get("/login", (req, res) => {
    res.render("login");
  });

  // render sign up modal
  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  // render change location modal
  app.get("/location", (req, res) => {
    res.render("location");
  });

  // render favorites modal
  app.get("/favorites", (req, res) => {
    res.render("favorites");
  });

  // render new favorite modal
  app.get("/newfavorite", (req, res) => {
    res.render("newFavorite");
  });

  // render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

