const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

router.post('/save', (req, res) => {
  console.log(req.body);
  client.db.collection('jahms')
    .insertOne(req.body, (err, result) => {
      if (err) { return console.log(err) }
      res.redirect('/');
    });
});

module.exports = router;
