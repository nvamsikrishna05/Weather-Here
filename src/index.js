'use strict';

require('dotenv').config();
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

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

app.get('/weather/:latlong', async (req, res) => {
  const latlong = req.params.latlong.split(',');
  const lat = latlong[0];
  const long = latlong[1];
  console.log(latlong);
  const api_url = `https://api.darksky.net/forecast/${
    process.env.DARK_SKY_API_KEY
  }/${lat},${long}`;
  const response = await fetch(api_url);
  const weather_json = await response.json();
  res.json(weather_json);
});
