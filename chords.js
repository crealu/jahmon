const { MongoClient } = require('mongodb');

async function getSets(res) {
  const uri = require('./config/keys').MongoURI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('jahm');
    const co = db.collection('library');
    const docs = await co.find().toArray();
    console.log(docs);
    // res.send('connection worked');
    // res.send(docs);
  } finally {
    await client.close();
  }
}

async function getChords() {
  const uri = require('./config/keys').MongoURI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('jahmdb');
    const co = db.collection('library');
    const docs = await co.find().toArray();
    console.log(docs);
    // res.send('connection worked');
    // res.send(docs);
  } finally {
    await client.close();
  }
}

getChords();
