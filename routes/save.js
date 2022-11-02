const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

function organizeData(reqBody) {
  let stepsArray = [];
  let steps = reqBody.steps.split('.');
  let fretnums = reqBody.fretnums.split('.');
  let noteids = reqBody.noteids.split('.');
  let modes = reqBody.modes.split('.');
  for (let i = 0; i < steps.length; i++) {
    stepsArray.push({
      title: steps[i],
      mode: modes[i],
      noteids: noteids[i],
      fretnums: fretnums[i]
    });
  }
  return {
    title: reqBody.title,
    steps: stepsArray
  }
}

router.get('/save-g-jahms', (req, res) => {
  client.db.collection('jahms')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.get('/save-get-type', (req, res) => {
  client.db.collection('tef')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

router.post('/save-seq', (req, res) => {
  console.log(req.body);
  client.db.collection('jahms')
  .insertOne(req.body, (err, result) => {
    if (err) { return console.log(err) }
    res.redirect('/');
  });
});

router.post('/save-update-seq', (req, res) => {
  console.log(req.body);
  client.db.collection('jahms')
    .findOneAndUpdate(
      { title: req.body.title },
      { $set: { steps: req.body.steps }},
      { sort: { _id: 1 }, upsert: true }
    )
  res.send('Save Successful');
});

router.post('/save', (req, res) => {
  const sequence = organizeData(req.body)
  client.db.collection('jahms')
    .insertOne(sequence, (err, result) => {
      if (err) { return console.log(err) }
      res.redirect('/');
    });
});

router.post('/update', (req, res) => {
  const sequence = organizeData(req.body);
  client.db.collection('jahms').findOneAndUpdate(
    { title: sequence.title },
    { $set: { steps: sequence.steps }},
    { sort: { _id: 1 }, upsert: true }
  )
  res.redirect('/');
});

router.post('/save-type', (req, res) => {
  console.log(req.body);
  client.db.collection('tef')
    .insertOne(req.body, (err, result) => {
      if (err) { return console.log(err) }
      res.redirect('/');
      // res.send(result);
    })
});

router.post('/save-delete', (req, res) => {
  console.log(req.body);
  client.db.collection('tef').deleteOne(req.body, (err, result) => {
      res.send(result);
    });
});

module.exports = router;
