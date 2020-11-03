// Change date time while reloading page
let timeNow = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let yearNow = timeNow.getFullYear();
let dayNow = days[timeNow.getDay()];
let monthNow = months[timeNow.getMonth()];
let dateNow = timeNow.getDate();
let hourNow = timeNow.getHours();
let minutesNow = timeNow.getMinutes();

let date = document.querySelector("#currentTime");
date.innerHTML = `${dayNow}, ${monthNow} ${dateNow}, ${yearNow} - ${hourNow}: ${minutesNow}H `;

function celciusButton(event) {
  event.preventDefault();
  let clickCelcius = document.querySelector("#current-temp");
  clickCelcius.innerHTML = "32°c";
}
let celsiusTemp = document.querySelector("#celcius-button");
celsiusTemp.addEventListener("click", celciusButton);

function fahrenheitButton(event) {
  event.preventDefault();
  let clickfahrenheit = document.querySelector("#current-temp");
  clickfahrenheit.innerHTML = "90°f";
}
let fahrenheitTemp = document.querySelector("#fahrenheit-button");
fahrenheitTemp.addEventListener("click", fahrenheitButton);

// weather conditions by city
function showConditionsCity(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°c`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity:${response.data.main.humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#windSpeed"
  ).innerHTML = `WindSpeed:${response.data.wind.speed}mph`;
}

function showCity(city) {
  let apiKey = "5c57e0689379640fccf1044191d9a54c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showConditionsCity);
}

function searchButtonInput(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-text-input").value;
  showCity(citySearch);
}

function findCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "5c57e0689379640fccf1044191d9a54c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showConditionsCity);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPosition);
}

let searchForm = document.querySelector(".searchBar");
searchForm.addEventListener("submit", searchButtonInput);

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentPosition);

showCity("Sevilla");
