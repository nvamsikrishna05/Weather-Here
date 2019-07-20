const sendLocation = async () => {
  const lat = document.querySelector('#latitude').textContent;
  const long = document.querySelector('#longitude').textContent;
  const data = {
    lat,
    long
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
};

if ('geolocation' in navigator) {
  console.log('Geolocation is available');
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    document.querySelector('#latitude').textContent = lat;
    document.querySelector('#longitude').textContent = long;
    document
      .querySelector('#submit')
      .setAttribute('style', 'visibility: visible');

    const api_url = `/weather/${lat},${long}`;
    const response = await fetch(api_url);
    const weather_data = await response.json();
    console.log(weather_data);
  });
} else {
  console.log('Geolocation is not available');
}
document.querySelector('#submit').addEventListener('click', sendLocation);
