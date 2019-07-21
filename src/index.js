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
  const weather_url = `https://api.darksky.net/forecast/${
    process.env.DARK_SKY_API_KEY
  }/${lat},${long}`;
  const weather_response = await fetch(weather_url);
  const weather_json = await weather_response.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}`;
  const aq_response = await fetch(aq_url);
  const aq_json = await aq_response.json();

  const data = {
    weather: weather_json,
    air_quality: aq_json
  };

  res.json(data);
});
