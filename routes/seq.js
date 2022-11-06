const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

router.post('/api-save-seq', (req, res) => {
  console.log(req.body);
  client.db.collection('jahms')
  .insertOne(req.body, (err, result) => {
    if (err) { return console.log(err) }
    res.redirect('/');
  });
});

router.post('/api-update-seq', (req, res) => {
  console.log(req.body);
  client.db.collection('jahms')
    .findOneAndUpdate(
      { title: req.body.title },
      { $set: { steps: req.body.steps }},
      { sort: { _id: 1 }, upsert: true }
    )
  res.send('Save Successful');
});

module.exports = router;
