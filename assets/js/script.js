var cityName = "Austin";

var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=`;
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=`;



function currentWeatherApi(requestUrl) {
    fetch(requestUrl)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("error code " + response.status);
            } else {
                return response.json();
            }
        })
        .then(function(data) {
            // console.log(data);
            console.log("temp: " + data.main.temp);
            console.log("wind: " + data.wind.speed);
            console.log("humidity: " + data.main.humidity);
        })
}

function forecastWeatherApi(requestUrl) {
    fetch(requestUrl)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("error code " + response.status);
            } else {
                return response.json();
            }
        })
        .then(function(data) {
            console.log("temp: " + data.list[0].main.temp);
            console.log("humidity" + data.list[0].main.humidity);
            console.log("wind: " + data.list[0].wind.speed);
        })
}
// callApi(fiveDayForecast);
currentWeatherApi(currentWeather);
forecastWeatherApi(fiveDayForecast);