const express = require('express');
const router = express.Router();
const fs = require('fs');
const libraryData = require('../library.json');

function reStringLib(str) {
  return str.replace('}]}', '}').replace(/{"n/g, '\n\t{"n');
}

function reString(str) {
  return str.replace('{', ',\n\t{')
}

function getJsonEnd() {
  return '\n\t]\n}';
}

router.post('/lib', (req, res) => {
  console.log(req.body);
  let libData = reStringLib(JSON.stringify(libraryData));
  let newData = reString(JSON.stringify(req.body));
  let jsonEnd = getJsonEnd();
  let data = libData + newData + jsonEnd;
  fs.writeFile('library.json', data, (err) => {
    if (err) return console.log(err)
  });
  res.redirect('/');
});

router.get('/library', (req, res) => {
  res.send(JSON.stringify(libraryData));
});

module.exports = router;
