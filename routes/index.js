const express = require('express');
const path = require('path');
const router = express.Router();
const pathToBuild = path.join(__dirname, '../build');

router.get('/', (req, res) => {
  router.use(express.static(pathToBuild));
  res.sendFile('index.html', { root: './build' });
});

// router.get('/app', ensureAuthenticated, (req, res) => {
//   router.use(express.static(pathToBuild));
//   res.sendFile('index.html', { root: './build' });
// });

module.exports = router;
