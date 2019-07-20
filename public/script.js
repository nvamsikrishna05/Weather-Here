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
  });
} else {
  console.log('Geolocation is not available');
}
document.querySelector('#submit').addEventListener('click', sendLocation);
