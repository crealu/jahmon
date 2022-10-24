const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

// router.post('/save', (req, res) => {
//   console.log(req.body);
//   client.db.collection('/jahms')
//     .insertOne(req.body, (err, result) => {
//       if (err) { return console.log(err) }
//       res.redirect('/');
//     });
// });
//
// router.post('/update', (req, res) => {
//   console.log(req.body);
//   client.db.collection('jahms').findOneAndUpdate(
//     { title: req.body.title },
//     { $set: { steps: req.body.steps, noteids: req.body.noteids }},
//     { sort: { _id: 1 }, upsert: true }
//   )
//   res.redirect('/');
// });
function organizeData(reqBody) {
  let stepsArray = [];
  for (let i = 0; i < reqBody.step.length; i++) {
    stepsArray.push({
      title: reqBody.step[i],
      noteids: reqBody.noteids[i],
      mode: reqBody.mode[i],
      fretnums: reqBody.fretnums[i]
    });
  }
  return {
    name: reqBody.name,
    steps: stepsArray
  }
}

router.post('/save', (req, res) => {
  console.log(req.body);
  const sequence = organizeData(req.body);
  client.db.collection('formtest')
    .insertOne(sequence, (err, result) => {
      if (err) { return console.log(err) }
      res.redirect('/');
    });
});

// router.post('/update', (req, res) => {
//   console.log(req.body);
//   client.db.collection('jahms').findOneAndUpdate(
//     { title: req.body.title },
//     { $set: { steps: req.body.steps, noteids: req.body.noteids }},
//     { sort: { _id: 1 }, upsert: true }
//   )
//   res.redirect('/');
// });

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
