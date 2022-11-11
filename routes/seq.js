const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

router.get('/api-get-jahms', (req, res) => {
  client.db.collection('jahms')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.post('/api-save-seq', (req, res) => {
  client.db.collection('jahms')
  .insertOne(req.body, (err, result) => {
    if (err) { return console.log(err) }
    res.redirect('/');
  });
});

router.post('/api-update-seq', (req, res) => {
  client.db.collection('jahms')
    .findOneAndUpdate(
      { title: req.body.title },
      { $set: {
        steps: req.body.steps,
        lyrics: req.body.lyrics
       }},
      { sort: { _id: 1 }, upsert: true }
    )
  res.send('Save Successful');
});

module.exports = router;
