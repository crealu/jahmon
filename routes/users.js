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
                  req.flash('sussess_msg', 'You have successfully registered')
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

router.post('/password-reset', (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      res.render('password-reset.ejs', {
        error: 'No account found with that email'
      });
    } else {
      handlePasswordReset(email);
      res.redirect('/');
    }
  })
})
