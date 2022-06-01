const apiKey = "5b69c3d8f369d5f1a210756576ee1267";
let cities = JSON.parse(localStorage.getItem("cities")) || [];
let today = new Date().toLocaleDateString();
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toLocaleDateString();
}

document.querySelectorAll('.submit').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    var cityName = document.getElementById("cityName").value;
    console.log(cityName);
    weatherForecast(cityName);
  })
})

function saveHistory(cityName) {
  //check if cities exists in local storage
  // if (localStorage.getItem("cities")) {
  //   cities == localStorage.getItem(JSON.parse("cities"));
  //   console.log(cities);
  // }
  let notSavedCity = true;
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  //check if city has already been searched
  for (let i = 0; i < cities.length; i++) {
    if(cityName === cities[i]){
      notSavedCity = false;
    }
  }
  //push city to local storage if it hasnt been searched
  if(notSavedCity) {
    cities.unshift(cityName);
    if (cities.length > 12) {
      cities.pop();
    }
    localStorage.setItem('cities', JSON.stringify(cities));
  }
  document.getElementById('history').innerHTML = `<hr>`;
  displayHistory();
}

function displayHistory () {
  //create buttons for searched cities
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  for (let i = 0; i < cities.length; i++){
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "text-center", "bg-light", "border-info", "text-info");
    button.textContent = cities[i];
    button.addEventListener("click", function(e) {
      e.preventDefault();
      weatherForecast(cities[i]);
    })
    document.getElementById('history').appendChild(button);
  }
}

function weatherForecast(cityName) {
  console.log(cityName);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then(result => result.json())
    .then((apiResponse) => {
      console.log(apiResponse);
      var lat = apiResponse.coord.lat;
      var long = apiResponse.coord.lon;
      var cityName = apiResponse.name;
      weatherLatLong(lat, long, cityName);
      saveHistory(cityName);
    })
}

function weatherLatLong(lat, long, cityName) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(result => result.json())
    .then((apiResponse) => {
      console.log(apiResponse);
      document.getElementById('forecast').innerHTML = `
      <div class="card bg-warning">
        <img src="http://openweathermap.org/img/wn/${apiResponse.current.weather[0].icon}@2x.png" class="card-img-top" style="flex-direction:row;width:3vw" alt="${apiResponse.current.weather[0].description}">
        <div class="card-body">
          <h3 class="city m-2 p-2">${cityName} ${today}</h3>
          <h5 class="card-title">Temperature: ${apiResponse.current.temp} F</h5>
          <p class="card-text">Humidity: ${apiResponse.current.humidity}</p>
          <p class="card-text">Wind Speed: ${apiResponse.current.wind_speed} mph</p>
          <p class="card-text">Description: ${apiResponse.current.weather[0].description}</p>
          <p class="card-text">UV Index: ${apiResponse.current.uvi}</p>
        </div>
      </div>
      `
      let htmlcode = "";
      for (let i = 1; i <= 5; i++) {
        htmlcode += `
        <div class="card bg-info text-white mt-3" style="width: 13rem;">
          <div class="card-body">
            <h3>${addDays(today,i)}</h3>
            <img src="http://openweathermap.org/img/wn/${apiResponse.daily[i].weather[0].icon}@2x.png" class="card-img-top" alt="${apiResponse.current.weather[0].description}">
            <h5 class="card-title">Temperature: ${apiResponse.daily[i].temp.day} F</h5>
            <p class="card-text">Humidity: ${apiResponse.daily[i].humidity}%</p>
            <p class="card-text">Wind Speed: ${apiResponse.daily[i].wind_speed} MPH</p>
            <p class="card-text">Description: ${apiResponse.daily[i].weather[0].description}</p>
            <p class="card-text">UV Index: ${apiResponse.daily[i].uvi}</p>
          </div>
        </div>
        `
      }
      document.getElementById('5dayForecast').innerHTML = htmlcode;
    })
}

displayHistory();