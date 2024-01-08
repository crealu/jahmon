const express = require('express');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || require('./config/keys').MongoURI;
const port = process.env.PORT || 3220;
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(uri)
  .then(console.log('Connected to database'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/lib'));

app.listen(port, console.log('listening on ' + port));
