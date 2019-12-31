//
const db = require("../models");

// npm bcrypt used to hash password
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  // get all crime data
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // existing user login
  app.get("/login/:username/:password", function (req, res) {
    db.Users.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function (response) {
      res.json(response);
    });
  });

  // create a new user
  app.post("/create/user", function (req, res) {
    let myPlaintextPassword = req.body.password;
    // salt round = cost factor i.e. how much time is needed to calculate a single bcrypt hash
    // increasing the cost factor by 1 doubles the necessary time
    // more time means harder to brute force crack the password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        if (err) {
          throw err;
        }
        // need to fill in missing fields
        db.User.create({
          username: req.body.username,
          firstname: req.body.firtname,
          lastname: req.body.lastname,
          userpw: hash,
          email: req.body.email,
          // defaultlocation: ,
          // favorites: [],
          // created: ,
          // lastlogin:
        }).then(function (response) {
          res.json({ status: "success" });
          console.log(response);
        });
      });
    });
  });

  // delete a user by id
  app.delete("/delete/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
