const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = function (app) {

  // parsing form data
  app.post("/login/submit", (req, res) => {
    res.redirect('/login/' + req.body.username + '/' + req.body.password)
  });

  // existing user login
  app.get("/login/:username/:password", (req, res) => {
    db.User.findOne({
      where: {
        username: req.params.username,
        userpw: req.params.password
      }
      // if the username and password are found in the database
    }).then((response) => {
      //console.log(response.dataValues);
      // create json web token
      jwt.sign({
        id: response.dataValues.id,
        username: response.dataValues.username
      }, "secretkey", (err, token) => {
        res
          // asset created status
          .status(201)
          // create cookie
          .cookie('jwt', token, {
            // cookie expires after 8 hours
            expires: new Date(Date.now() + 8 * 3600000)
          }).redirect('/')
      });
      // if the username and password combination do not exist in the database
    }).catch((err) => {
      console.log(err);
      //console.log("Incorrect username or password.");
    });
  });

  // create a new user
  app.post("/create/user", (req, res) => {
    let textPassword = req.body.password;
    // salt round = cost factor i.e. how much time is needed to calculate a single bcrypt hash
    // increasing the cost factor by 1 doubles the necessary time
    // more time means harder to brute force crack the password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(textPassword, salt, function (err, hash) {
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

  // log out and clear cookies
  app.post("/logout", (req, res) => {

    // set cookie to all req.cookies
    cookie = req.cookies;

    // check if cookies have prop attribute
    for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
        continue;
      }
      // if so, change expiration date to now
      res.cookie(prop, '', { expires: new Date(0) });
    }

    // redirect to login
    res.redirect('/login');

  });

  // // delete a user by id
  // app.delete("/delete/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // change location
  app.post("/location", (req, res) => {

  });

  // get user's favorites
  app.get("/favorites", (req, res) => {

  });

  // add a favorite
  app.get("/favorites", (req, res) => {

  });

}
