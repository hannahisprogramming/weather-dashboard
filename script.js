var submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  var cityName = document.getElementById("cityName").value;
  console.log(cityName);
});