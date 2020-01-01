const user = require("../models");

module.exports = function (app) {
  // app.get("/", function (req, res) {
  //   user.all(function (data) {
  //     const hbsObject = {
  //       users: data
  //     }
  //     console.log(hbsObject);
  //     res.render("index", hbsObject);
  //   });
  // });

  // load main.handlebars body = index.handlebars
  app.get('/', (req, res) => {
    res.render('index');
  });


  //
  app.get("/", function (req, res) {
    models.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    models.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // render login page
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
