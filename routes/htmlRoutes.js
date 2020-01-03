// const expressjwt = require("express-jwt");

// const jwtCheck = expressjwt({
//   secret: "secretkey"
// });

const jwt = require("jsonwebtoken");



module.exports = function (app) {

  // render home page if user is authenticated
  app.get('/', (req, res) => {

    // obtain jwt from cookie
    const token = req.cookies.jwt;

    // decode token
    const decoded = jwt.verify(token, "secretkey");

    // if the decoded token contains an id then render home.handlebars
    if (decoded.id) {
      res.render('home');
    }
    else {
      // needs to open reroute to log in modal
      console.log("Authentication error");
    }
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

