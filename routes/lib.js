const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const atlas = mongoose.connection;

router.get('/api-get-lib', (req, res) => {
  atlas.db.collection('library')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.post('/api-save-chord', (req, res) => {
  atlas.db.collection('library')
    .insertOne(req.body, (err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    });
});

module.exports = router;
