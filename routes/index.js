const express = require('express');
const path = require('path');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const pathToBuild = path.join(__dirname, '../build');

router.get('/', (req, res) => {
  res.render('index.ejs')
});

router.get('/app', ensureAuthenticated, (req, res) => {
  router.use(express.static(pathToBuild));
  res.sendFile('index.html', { root: './build' });
});

module.exports = router;
