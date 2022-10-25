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

router.post('/save', (req, res) => {
  console.log(req.body);
  const sequence = organizeData(req.body)
  client.db.collection('jahms')
    .insertOne(sequence, (err, result) => {
      if (err) { return console.log(err) }
      res.redirect('/');
    });
});

router.post('/update', (req, res) => {
  const sequence = organizeData(req.body);
  console.log(req.body);
  client.db.collection('jahms').findOneAndUpdate(
    { title: sequence.title },
    { $set: { steps: sequence.steps }},
    { sort: { _id: 1 }, upsert: true }
  )
  res.redirect('/');
});

// router.post('/update', (req, res) => {
//   console.log('update called');
//   const jahms = client.db.collection("jahms")
//     .findOneAndUpdate({steps: req.body.steps}, {
//       $set: {
//         steps: req.body.steps
//       }
//     }, {
//       sort: {_id: 1},
//       upsert: true
//     }, (err, result) => {
//       if (err) { return res.send(err) }
//       res.send(result);
//       // res.redirect('/');
//     });
//     res.redirect('/');
//
// });

module.exports = router;
