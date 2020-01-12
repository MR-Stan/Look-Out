// database
const db = require('../models');

// npm jsonwebtoken - JSON Web Tokens for authentication
const jwt = require('jsonwebtoken');

// npm bcryptjs - password encryption
const bcrypt = require('bcryptjs');

// npm spotcrime - crime api
const spotcrime = require('spotcrime');

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

  // get user's favorites
  app.get('/favorites/all', (req, res) => {
    // obtain jwt from cookie
    const token = req.cookies.jwt;
    // if jwt.verify does not yield an error then 
    try {
      // set username to username from decoded jwt
      const username = (jwt.verify(token, "secretkey")).username;
      // search database for username
      db.User.findOne({
        where: {
          username: username
        }
        // return data where username is found
      }).then(function (data) {
        // if favorites exist
        if (data.favorites) {
          res.json(data.favorites);
        }
        else {
          // need to return no favorites message
          res.json('No data');
        }
      });
    }
    // if jwt.verify yields an error 
    catch (err) {
      throw err;
    }
  });

  // add a favorite
  app.post('/favorites/add', (req, res) => {
    // set location to formatted current location
    const location = '(' + req.body.lat + ', ' + req.body.lng + ')';
    // obtain jwt from cookie
    const token = req.cookies.jwt;
    // if jwt.verify does not yield an error then 
    try {
      // set username to username from decoded jwt
      const username = (jwt.verify(token, "secretkey")).username;
      // search database for username
      db.User.findOne({
        where: {
          username: username
        }
        // return data where username is found
      }).then(function (data) {
        // if returned data has not null favorites then
        if (data.favorites) {
          // create an array of store favorites string
          let favorites = data.favorites.split(';');
          // check if one favorite exists
          if (favorites.length === 1) {
            // check if the one favorite matches current location
            if (favorites[0] === location) {
              // if so, do nothing
            }
            // if the stored favorite doesn't match current location
            else {
              // add current location to stored favorites
              data.update({
                favorites: data.favorites + ';' + location
              }).then(function (user) {
                // redirect home
                res.redirect('/');
              });
            }
          }
          // if more than one favorites exist
          else {
            let flag = false;
            // for each of the favorites
            for (let i = 0; i < favorites.length; i++) {
              // check if current location matches
              if (favorites[i] === location) {
                flag = true;
              }
            }
            if (!flag) {
              data.update({
                favorites: data.favorites + ';' + location
              })
            }
            res.redirect('/');
          }
        }
        // if favorites is null then
        else {
          // replace null with current location
          data.update({
            favorites: location
          }).then(function (user) {
            // redirect to home page 
            res.redirect('/');
          });
        }
      });
    }
    // if jwt.verify yields an error 
    catch (err) {
      throw err;
    }
  });

  // get crime data for current location
  app.post('/location/current', (req, res) => {
    // location data from autocomplete
    const loc = {
      lat: req.body.lat,
      lon: req.body.lng
    }

    // radius for crime data
    const radius = 0.1; // this is miles

    // api call
    spotcrime.getCrimes(loc, radius).then((crimes) => {
      res.send(crimes);
    });

  });

  // update location
  app.post('/location/new', (req, res) => {
    // redirect home
    res.redirect('/');
  });



}
