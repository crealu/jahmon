const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const client = mongoose.connection;

router.get('/api-get-lib', (req, res) => {
  client.db.collection('library')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.post('/api-save-chord', (req, res) => {
  client.db.collection('library')
    .insertOne(req.body, (err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    });
});


module.exports = router;
