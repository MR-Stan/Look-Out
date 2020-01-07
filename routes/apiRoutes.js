// database
const db = require('../models');

// npm jsonwebtoken - JSON Web Tokens for authentication
const jwt = require('jsonwebtoken');

// npm bcryptjs - password encryption
const bcrypt = require('bcryptjs');

module.exports = function (app) {

  // parsing form data
  app.post('/login/submit', (req, res) => {
    res.redirect('/login/' + req.body.username + '/' + req.body.password)
  });

  // user login
  app.get('/login/:username/:password', (req, res) => {
    // check db for username
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (user) {
      // if username does not exist
      if (!user) {
        // redirect to login modal
        // need to add text saying username not found
        res.redirect('/login');
      }
      // if username exists
      else {
        // compare input pw with stored hash pw
        bcrypt.compare(req.params.password, user.userpw, function (err, response) {
          // if passwords match
          if (response) {
            // sign the json web token
            jwt.sign({
              id: user.id,
              username: user.username
            }, 'secretkey', (err, token) => {
              res
                // asset created status
                .status(201)
                // create cookie
                .cookie('jwt', token, {
                  // cookie expires after 8 hours
                  expires: new Date(Date.now() + 8 * 3600000)
                }).redirect('/')
            });
          }
          // if passwords do not match
          else {
            // redirect to login modal
            // need to add text saying passwords do not match
            res.redirect('/login');
          }
        });
      }
    });
  });

  // create a new user
  app.post('/create/user', (req, res) => {
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
          userpw: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          // defaultlocation: ,
          // favorites: [],
        }).then(function (response) {
          if (response) {
            res.redirect('/');
          }
        });
      });
    });
  });

  // log out and clear cookies
  app.post('/logout', (req, res) => {

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
  // app.delete('/delete/:id', function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // change location
  app.post('/location', (req, res) => {
    // returning empty object
    console.log(req.body.location);

  });

  // get user's favorites
  app.get('/favorites', (req, res) => {

  });

  // add a favorite
  app.post('/favorites/add', (req, res) => {

  });

  // location data
  app.post('/current/location', (req, res) => {
    console.log(req.body);
  });

}
