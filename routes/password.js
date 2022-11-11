const express = require('express');
const router = express.Router();

router.post('/pass', (req, res) => {
  if (req.body.word == 'Colorfiler6!') {
    res.send(JSON.stringify({msg: 'Password correct'}));
  } else {
    res.send(JSON.stringify({msg: 'Incorrect password'}));
  }
});

router.get('/password-reset', (req, res) => {
  res.render('password-reset.ejs', {
    error: null
  });
});

module.exports = router;
