const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const path = require('path');

const { handlePasswordReset, handleNewUser } = require('./email');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/user');
const router = express.Router();
const client = mongoose.connection;
const pathToBuild = path.join(__dirname, '../build');

router.get('/', (req, res) => { res.render('index.ejs') });

router.get('/app', ensureAuthenticated, (req, res) => {
  router.use(express.static(pathToBuild));
  res.sendFile('index.html', { root: './build' });
});

router.post('/pass', (req, res) => {
  if (req.body.word == 'Colorfiler6!') {
    res.send(JSON.stringify({msg: 'Password correct'}));
  } else {
    res.send(JSON.stringify({msg: 'Incorrect password'}));
  }
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  let errors = [];

  if (!username || !email || !password) {
    errors.push({ msg: 'All fields are required' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be 6 characters or more' });
  }

  if (errors.length > 0) {
    res.render('signup.ejs', {
      data: {
        errors: errors,
        username: username,
        email: email
      }
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'An account with that email already exists' });
          res.render('signup.ejs', {
            data: {
              errors: errors,
              username: username,
              email: email
            }
          });
        } else {
          const newUser = new User({ username, email, password });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You have successfully registered');
                  handleNewUser(email);
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: failureRoute(),
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logged out');
  res.redirect('/');
});

let loginError = '';
router.get('/signup', (req, res) => {
  loginError = '';
  res.render('signup.ejs', {
    data: 'sign up'
  });
});

router.get('/login', (req, res) => {
  res.render('login.ejs', {
    data: 'log in',
    error: loginError
  });
});

function failureRoute() {
  loginError = 'Invalid email/password';
  return '/login';
}

router.get('/password-reset', (req, res) => {
  res.render('password-reset.ejs', {
    error: null
  });
});

module.exports = router;
