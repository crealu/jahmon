const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const { initPassport } = require('./config/passport');
// const uri = require('./config/keys').MongoURI;
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3220;
const app = express();

initPassport(passport);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Connected to database'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true },
  maxAge: 360000
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.errors = req.flash('error');
  next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/save'));
// app.use('/', require('./routes/fun'));
app.use(cookieParser());

app.listen(port, console.log('listening on ' + port));
