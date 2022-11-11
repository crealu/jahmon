const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = mongoose.connection;

router.get('/api-save-g-jahms', (req, res) => {
  client.db.collection('jahms')
    .find().toArray((err, result) => {
      if (err) { return console.log(err) }
      res.send(result);
    })
});

// router.post('/api-save-type', (req, res) => {
//   console.log(req.body);
//   client.db.collection('tef')
//     .insertOne(req.body, (err, result) => {
//       if (err) { return console.log(err) }
//       res.redirect('/');
//       // res.send(result);
//     })
// });
//
// router.post('/api-delete-type', (req, res) => {
//   console.log(req.body);
//   client.db.collection('tef')
//     .deleteOne(req.body, (err, result) => {
//       res.send(result);
//     });
// });
//
// router.get('/api-get-type', (req, res) => {
//   client.db.collection('tef')
//     .find().toArray((err, result) => {
//       if (err) { return console.log(err) }
//       res.send(result);
//     })
// });

module.exports = router;
