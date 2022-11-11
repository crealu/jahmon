const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const atlas = mongoose.connection;

router.get('/login', (req, res) => {
  res.render('login.ejs', {
    data: 'log in',
    error: 'Invalid email/password'
  });
});

router.get('/logins', (req, res) => {
  res.render('login.ejs', {
    data: 'log in',
    error: 'Session expired'
  });
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logged out');
  res.redirect('/');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// router.post('/api/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });

module.exports = router;
