'use strict';

require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');

// Setup a Server using Expess
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

//SetUp Database
const database = new Datastore('weatherCheckIns.db');
database.loadDatabase();

// Configure Middleware
// Serve the Static Assets
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// SetUp Routes
app.post('/api', (req, res) => {
  const data = req.body;
  const timeStamp = Date.now();
  data.timeStamp = timeStamp;

  //Store the data into Database
  database.insert(data);

  res.json(data);
});

app.get('/api', (req, res) => {
  database.find({}, (error, data) => {
    if (error) {
      return res.status(500).send('Error Occured While Fetching the data');
    }
    res.json(data);
  });
});
