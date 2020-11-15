// Change date time while reloading page
function formatDate(timestamp) {
    let date = new Date(timestamp);
   
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
    let yearNow = date.getFullYear();
    let dayNow = days[date.getDay()];
    let monthNow = months[date.getMonth()];
    let dateNow = date.getDate();

    return `${dayNow}, ${monthNow} ${dateNow}, ${yearNow} - ${formatHours(timestamp)}h`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
  let hourNow = date.getHours();
    if (hourNow < 10) {
        hourNow = `0${hourNow}`;
    }
    let minutesNow = date.getMinutes();
    if (minutesNow < 10) {
        minutesNow = `0${minutesNow}`;
    }
    return ` ${hourNow}: ${minutesNow}`;
}

// weather conditions by city
function showConditionsCity(response) {
    let dateFormat = document.querySelector("#currentTime");
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML = `${Math.round(
        response.data.main.temp
    )}°c`;
     document.querySelector(
        "#sunrise"
    ).innerHTML = `Sunrise:${formatHours(response.data.sys.sunrise * 1000)}h`;
    document.querySelector(
        "#sunset"
    ).innerHTML = `Sunset:${formatHours(response.data.sys.sunset * 1000)}h`;
    document.querySelector(
        "#humidity"
    ).innerHTML = `Humidity:${response.data.main.humidity}%`;
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    document.querySelector(
        "#windSpeed"
    ).innerHTML = `WindSpeed:${Math.round(response.data.wind.speed)}Km/h`;
    document.querySelector("#topIcon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    topIcon.setAttribute("alt", response.data.weather[0].description);

    dateFormat.innerHTML = formatDate(response.data.dt * 1000);
  celciusTemperature = Math.round(response.data.main.temp);
}

function showDailyForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    

    for (let index = 0; index < 5; index++) {
        forecast = response.data.list[index];
        console.log(forecast);
        forecastElement.innerHTML += 
        `<div id=daily class="day col-2">
          <p id= timeDaily><strong>${formatHours(forecast.dt * 1000)}</strong></p>
             <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon
            }@2x.png"/>
         <p>${Math.round(forecast.main.temp_min)}<strong>/${Math.round(forecast.main.temp_max)}°</strong></p>
            </div>`;
    }
}

function showCity(city) {
  let apiKey = "5c57e0689379640fccf1044191d9a54c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showConditionsCity);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showDailyForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showDailyForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPosition);
}
//convertion Buttons from Celcius to Fahrenheit

function celciusButton(event) {
    event.preventDefault();
  let clickCelcius = document.querySelector("#current-temp");
    clickCelcius.innerHTML =`${Math.round(celciusTemperature)}°C`;
}
function fahrenheitButton(event) {
    event.preventDefault();
  let clickFahrenheit = document.querySelector("#current-temp");
    let fahrenheitTemp = (celciusTemperature*9)/5+32;
    clickFahrenheit.innerHTML =`${ Math.round(fahrenheitTemp)}°F`;
}

let celciusTemperature = null;

let celsiusTemp = document.querySelector("#celcius-button");
celsiusTemp.addEventListener("click", celciusButton);

let fahrenheitTemp = document.querySelector("#fahrenheit-button");
fahrenheitTemp.addEventListener("click", fahrenheitButton);

let searchForm = document.querySelector(".searchBar");
searchForm.addEventListener("submit", searchButtonInput);

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentPosition);

showCity("Sevilla");
