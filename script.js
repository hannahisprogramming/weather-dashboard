const apiKey = "5b69c3d8f369d5f1a210756576ee1267";


var submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  var cityName = document.getElementById("cityName").value;
  console.log(cityName);
  weatherLatLong(cityName);
});


function weatherLatLong (cityName) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(url)
  .then(result => result.json())
  .then((apiResponse) => {
    console.log(apiResponse);
    var lat = apiResponse.coord.lat;
    var long = apiResponse.coord.lon;
  })
}
