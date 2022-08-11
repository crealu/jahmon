const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

// const { handlePasswordReset, handleNewUser } = require('./email');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/user');
const router = express.Router();
const client = mongoose.connection;

const library = [
  {
    name: 'A',
    noteids: 's6f0,s5f2,s4f2,s3f2,s2f0'
  }
];

router.get('/', (req, res) => {
  client.db.collection('jahms')
    .find().toArray((err, result) => {
      res.render('index.ejs', {
        data: {
          jahms: result,
          lib: library
        }
      });
  });
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

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  client.db.collection('jahms').find().toArray((err, res1) => {
    client.db.collection('jahms').find().toArray((err, res2) => {
      res.cookie();
      res.render('index.ejs', {
        data: {
          user: req.user,
          kanjisets: res1,
          kanjitests: res2
        }
      });
    });
  });
});

router.get('/password-reset', (req, res) => {
  res.render('password-reset.ejs', {
    error: null
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logged out');
  res.redirect('/');
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
                  // handleNewUser(email);
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
    successRedirect: '/dashboard',
    failureRedirect: failureRoute(),
    failureFlash: true
  })(req, res, next);
});

// router.post('/password-reset', (req, res) => {
//   const email = req.body.email;
//   User.findOne({ email: email }).then(user => {
//     if (!user) {
//       res.render('password-reset.ejs', {
//         error: 'No account found with that email'
//       });
//     } else {
//       handlePasswordReset(email);
//       res.redirect('/');
//     }
//   })
// });

// router.post('/updateset', (req, res) => {
//   console.log(req.body);
//   client.db.collection('jahms').updateMany(
//     { setName: req.body.setname },
//     { $pull: { kanji: { $in: req.body.kanji }}}
//   )
//   res.redirect('/');
// });
//

module.exports = router;
