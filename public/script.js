if ('geolocation' in navigator) {
  console.log('Geolocation is available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, long, weather, air_quality;
    try {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      document.querySelector('#latitude').textContent = lat;
      document.querySelector('#longitude').textContent = long;

      const api_url = `/weather/${lat},${long}`;
      const response = await fetch(api_url);
      const data = await response.json();

      weather = data.weather.currently;
      air_quality = data.air_quality.results[0].measurements[0];

      document.querySelector('#summary').textContent = weather.summary;
      document.querySelector('#temperature').textContent = weather.temperature;
      document.querySelector('#aq_parameter').textContent =
        air_quality.parameter;
      document.querySelector('#aq_value').textContent = air_quality.value;
      document.querySelector('#aq_units').textContent = air_quality.unit;
      document.querySelector('#aq_date').textContent = air_quality.lastUpdated;
    } catch (error) {
      document.querySelector('#mainData').textContent =
        'Error Occured while Fetching data. Try Again';
      air_quality = {
        value: -1
      };
      console.error(error);
    }

    const db_data = {
      lat,
      long,
      weather,
      air_quality
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(db_data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
  });
} else {
  console.log('Geolocation is not available');
}
