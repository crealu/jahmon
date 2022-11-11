const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const atlas = mongoose.connection;
const { findUser } = require('../config/user');

router.get('/api-get-jahms', async (req, res) => {
  const username = await findUser(req, res);
  atlas.db.collection('jahms')
    .find({owner: username}).toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.post('/api-save-seq', async (req, res) => {
  const username = await findUser(req, res);
  const newCollection = {...req.body, onwer: username};
  atlas.db.collection('jahms')
    .insertOne(newCollection, (err, result) => {
      if (err) { return console.log(err) }
      res.send('Save successful');
      // res.redirect('/');
    });
});

router.post('/api-update-seq', (req, res) => {
  atlas.db.collection('jahms')
    .findOneAndUpdate(
      { title: req.body.title },
      { $set: {
        steps: req.body.steps,
        lyrics: req.body.lyrics
       }},
      { sort: { _id: 1 }, upsert: true }
    )
  res.send('Save successful');
});

module.exports = router;
