const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('nosignup.ejs', {data: 'sign up'});
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: 'Password must be 6 characters or more' });
  }

  if (errors.length > 0) {
    res.render('signup.ejs', {
      data: { errors: errors, username: username, email: email }
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'An account with that email already exists' });
          res.render('signup.ejs', {
            data: { errors: errors, username: username, email: email }
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
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

module.exports = router;
