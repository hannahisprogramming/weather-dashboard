const apiKey = "5b69c3d8f369d5f1a210756576ee1267";


var submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  var cityName = document.getElementById("cityName").value;
  console.log(cityName);
  weatherForecast(cityName);
});


function weatherForecast(cityName) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then(result => result.json())
    .then((apiResponse) => {
      console.log(apiResponse);
      var lat = apiResponse.coord.lat;
      var long = apiResponse.coord.lon;
      weatherLatLong(lat, long, cityName);
    })
}

function weatherLatLong(lat, long, cityName) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(result => result.json())
    .then((apiResponse) => {
      console.log(apiResponse);
      document.getElementById('forecast').innerHTML = `
    <div class="card" style="width: 18rem;">
      <h3 class="city">${cityName}</h3>
      <div class="card-body">
        <img src="http://openweathermap.org/img/wn/${apiResponse.current.weather[0].icon}@2x.png" class="card-img-top" alt="${apiResponse.current.weather[0].description}">
        <h5 class="card-title">Temperature: ${apiResponse.current.temp} F</h5>
        <p class="card-text">Humidity: ${apiResponse.current.humidity}</p>
        <p class="card-text">Wind Speed: ${apiResponse.current.wind_speed} mph</p>
        <p class="card-text">Description: ${apiResponse.current.weather[0].description}</p>
        <p class="card-text">UV Index: ${apiResponse.current.uvi}</p>
      </div>
    </div>
    `
    })
}