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
const atlas = mongoose.connection;
const pathToBuild = path.join(__dirname, '../build');

router.get('/', (req, res) => {
  res.render('index.ejs')
});

router.get('/app', ensureAuthenticated, (req, res) => {
  userInSession(req.session);
  router.use(express.static(pathToBuild));
  res.sendFile('index.html', { root: './build' });
});

const userInSession = (session) => {
  console.log(session.cookie._expires.getTime());
}

// atlas.db.collection('jahms').updateMany({}, { $set: { owner: ''}})

module.exports = router;
