const apiKey = "b08dd92be19b47cf8d5144117251406"; // Replace with your actual API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const currentUrl = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&q=${encodeURIComponent(city)}&format=json&num_of_days=5`;

  fetch(currentUrl)
    .then(res => res.json())
    .then(data => {
      if (data.data.error) {
        throw new Error(data.data.error[0].msg);
      }
      displayCurrent(data);
      displayForecast(data);
    })
    .catch(err => {
      document.getElementById("weatherContainer").innerHTML = `<div class="col-md-6"><div class="alert alert-danger">${err.message}</div></div>`;
      document.getElementById("forecastContainer").innerHTML = "";
    });
}

function displayCurrent(data) {
  const weather = data.data.current_condition[0];
  const location = data.data.request[0].query;

  const html = `
    <div class="col-md-6">
      <div class="weather-card animate__animated animate__fadeInUp">
        <h2>${location}</h2>
        <p><strong>Temperature:</strong> ${weather.temp_C}°C</p>
        <p><strong>Feels Like:</strong> ${weather.FeelsLikeC}°C</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
        <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
        <p><strong>Weather:</strong> ${weather.weatherDesc[0].value}</p>
        <p><strong>Wind:</strong> ${weather.windspeedKmph} km/h</p>
      </div>
    </div>`;
  document.getElementById("weatherContainer").innerHTML = html;
}

function displayForecast(data) {
  let forecastHTML = "";
  const forecastList = data.data.weather;

  forecastList.forEach(day => {
    forecastHTML += `
      <div class="col-md-3">
        <div class="forecast-card animate__animated animate__fadeInUp">
          <h5>${day.date}</h5>
          <img src="${day.hourly[0].weatherIconUrl[0].value}" alt="icon">
          <p><strong>${day.avgtempC}°C</strong></p>
          <p>${day.hourly[0].weatherDesc[0].value}</p>
          <p>Wind: ${day.hourly[0].windspeedKmph} km/h</p>
        </div>
      </div>`;
  });

  document.getElementById("forecastContainer").innerHTML = forecastHTML;
}
