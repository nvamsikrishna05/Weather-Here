async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  data.forEach(element => {
    const root = document.createElement('p');
    const location = document.createElement('div');
    const date = document.createElement('div');

    location.textContent = `Latitude: ${element.lat}  Longitudue: ${
      element.long
    }`;
    date.textContent = `Date: ${new Date(element.timeStamp).toLocaleString()}`;
    root.append(location, date);
    document.body.append(root);
  });

  console.log(data);
}

getData();
