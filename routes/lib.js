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

// ♯ °

// const rewrite = (fixthese) => {
//   for (let i = 0; i < fixthese.length; i++) {
//     atlas.db.collection('library')
//       .findOneAndUpdate(
//         { name: fixthese[i][0] },
//         { $set: {
//           name: fixthese[i][1],
//          }},
//         { sort: { _id: 1 }, upsert: true }
//       )
//   }
// }
//
// router.post('/api-save-chord', async (req, res) => {
//   let fixthese = [];
//   atlas.db.collection('library')
//     .find().toArray((err, result) => {
//       if (err) { return console.log(err) }
//       for (let r = 0; r < result.length; r++) {
//         if (result[r].name.includes('Bb')) {
//           fixthese.push([result[r].name, result[r].name.replace('Bb', 'A♯')]);
//         }
//       }
//       console.log(fixthese);
//       rewrite(fixthese);
//     });
// });

module.exports = router;
