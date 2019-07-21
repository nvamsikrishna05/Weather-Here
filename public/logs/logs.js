const myMap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.long]).addTo(myMap);

    let txt = `The weather here at ${item.lat}&deg;
    ${item.long}&deg; is ${item.weather.summary} with a
    temperature of ${item.weather.temperature}&deg;F.`;

    if (item.air_quality.value < 0) {
      txt += `No air quality information available`;
    } else {
      txt += `The concentration of
      particulate matter (${item.air_quality.parameter}) is
      ${item.air_quality.value} ${item.air_quality.unit} last read on
      ${item.air_quality.lastUpdated}.`;
    }

    marker.bindPopup(txt);
  }

  console.log(data);
}

getData();
