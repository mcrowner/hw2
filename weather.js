let getWeather = function() {
  // let latitude = '41.8781';
  // let longitude = '-87.6298';
  //commented out as suggested on slack

navigator.geolocation.getCurrentPosition(function(location) {
  console.log("Latitude is " + location.coords.latitude);
  console.log("Longitude is " + location.coords.longitude);

  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + location.coords.latitude
  openweathermap_api_url += '&lon=' + location.coords.longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
});
}

let displayError = function(error) {
  console.debug(error);
  window.alert("Uh Oh... Refresh the page and try again.");
}

let weatherLink =  document.getElementById("get_forecast")
weatherLink.addEventListener("click", getWeather);

let convertToJSON = function(response) {
  return response.json();
}

let updateWeather = function(dataFromService) {
  console.debug(dataFromService)
  city = dataFromService.name;
  temperature = dataFromService.main.temp.toPrecision(2);
  icon = dataFromService.weather[0].icon;
  document.querySelector('.card-title').innerHTML = city;
  document.querySelector('.card-text').innerHTML = "It is " + temperature + " degrees outside.";
  document.querySelector('.card-img-top').src = "http://openweathermap.org/img/w/" + icon + ".png";
}

// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.
