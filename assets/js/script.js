function getApi(cityName) {
    var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=537c5082f054c67490bdd35711142b24`;

    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=537c5082f054c67490bdd35711142b24`;

    $.ajax({
        url: currentWeather,
        method: 'GET',
    }).then(function (response) {
        // console.log("current weather")
        let temp = response.main.temp;
        let wind = response.wind.speed;
        let humidity = response.main.humidity;
        console.log(temp, wind, humidity);
        $(".temp").text("Temp: " + temp + String.fromCharCode(176) + "F");
        $(".wind").text("Wind: " + wind + " MPH");
        $(".humidity").text("Humditiy: " + humidity + "%");
        let dailyIconCode = response.weather[0].icon;
        let dailyIconUrl = `http://openweathermap.org/img/wn/${dailyIconCode}@2x.png`;
        let img = $("<img>")
        img.attr("src", dailyIconUrl);
        img.appendTo("#city");
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=mintutely,hourly,daily,alerts&appid=537c5082f054c67490bdd35711142b24`;

        $.ajax({
            url: oneCall,
            method: 'GET'
        }).then(function (res) {
            $(".uvHeader").text("UV Index: ");
            $("#uvIndex").text(res.current.uvi);
            if(res.current.uvi <= 2) {
                $("#uvIndex").attr("class", "safe");
            } else if(res.current.uvi <= 5) {
                $("#uvIndex").attr("class", "warning");
            } else if(res.current.uvi <= 7) {
                $("#uvIndex").attr("class", "orange");
            } else {
                $("#uvIndex").attr("class", "danger");
            }
        }).catch(function (error) {
            console.log(error.responseJSON.cod, error.responseJSON.message);
        })
    }).catch(function (error) {
        console.log(error.responseJSON.cod, error.responseJSON.message);
    })

    $.ajax({
        url: fiveDayForecast,
        method: 'GET'
    }).then(function (response) {
        let currentDate = moment().format("M/DD/YYYY");
        $("#city").text(response.city.name + " " + currentDate);
        for (i = 5; i < response.list.length; i += 8) { // contribution Sue Lee
            let j = i.toString();
            let dateEl = $("<li>");
            dateEl.text(moment(response.list[i].dt_txt).format('M/D/YYYY')); // contribution Sue Lee
            dateEl.attr("class", "bolder");
            let tempEl = $("<li>");
            tempEl.text("Temp: " + response.list[i].main.temp + String.fromCharCode(176) + "F"); 
            let windEl = $("<li>");
            windEl.text("Wind: " + response.list[i].wind.speed + " MPH");
            let humidityEl = $("<li>");
            humidityEl.text("Humidity: " + response.list[i].main.humidity + "%");
            let iconEl = $("<img>");
            iconEl.attr("class", "futureIcon");
            let iconCode = response.list[i].weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
            iconEl.attr("src", iconUrl);
            $("#" + j).append(dateEl);
            $("#" + j).append(iconEl);
            $("#" + j).append(tempEl);
            $("#" + j).append(windEl);
            $("#" + j).append(humidityEl);
        }

    }).catch(function (error) {
        console.log(error.responseJSON.cod, error.responseJSON.message);
    })
}

function searchHandler(event) {
    event.preventDefault();
    let searchInput = $(".searchBody").val();
    // console.log(searchInput);
    clearCard();
    getApi(searchInput);
}

function storeHistory(string) {

}

function clearCard() {
    $("li").remove();
    $(".futureIcon").remove();
}

$(".search").on("click", ".searchButton", searchHandler);
// console.log($(".searchButton"));

// bg-success (green), bg-warning (yellow), bg-danger (red), bg-orange