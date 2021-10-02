var cityName = "Austin";

var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=537c5082f054c67490bdd35711142b24`;
//var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=mintutely,hourly,daily,alerts&appid=537c5082f054c67490bdd35711142b24`;



$.ajax({
    url: fiveDayForecast,
    method: 'GET',
}).then(function (response) {
    // console.log(response);
    // console.log(response.city.coord.lat);
    // console.log(response.city.coord.lon);
    let cityDate = $("<div>");
    cityDate.text(cityName);
    

    let latitude = response.city.coord.lat;
    let longitude = response.city.coord.lon;
    console.log(latitude);
    console.log(longitude);
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=mintutely,hourly,daily,alerts&appid=537c5082f054c67490bdd35711142b24`;

    $.ajax({
        url: oneCall,
        method: 'GET'
    }).then(function (res) {
        console.log(res);
    }).catch(function (error) {
        console.log(error.responseJSON.cod, error.responseJSON.message);
    })
}).catch(function (error) {
    console.log(error.responseJSON.cod, error.responseJSON.message);
})
// 