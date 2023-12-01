const fs = require('fs');
// const libraryData = require('../library.json');

function reStringLib(str) {
  return str
    .replace('}]}', '}')
    .replace(/{"n/g, '\n\t\t{\n\t\t\t"n')
    .replace(/"no/g, '\n\t\t\t"no')
    .replace(/:/g, ': ')
    .replace(/},/g, '\n\t\t},')
}

function reStringNew(str) {
  return str
    .replace('{', ',\n\t\t{\n\t\t\t')
    .replace(/"type":"chord",/g, '\n\t\t\t')
    .replace(/:/g, ': ')
    .replace('}', '\n\t\t}')
}

function getJsonEnd() {
  return '\n\t]\n}';
}

// router.post('/lib', (req, res) => {
//   let libData = reStringLib(JSON.stringify(libraryData));
//   let newData = reStringNew(JSON.stringify(req.body));
//   let jsonEnd = getJsonEnd();
//   let data = libData + newData + jsonEnd;
//   fs.writeFile('library.json', data, (err) => {
//     if (err) return console.log(err)
//   });
//   res.redirect('/');
// });
