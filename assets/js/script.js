var cityName = "Austin";

var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=537c5082f054c67490bdd35711142b24`;

// moment().format("MM DD YYYY");
// console.log(Date());

// let date = new Date(1633132800 * 1000);
// console.log(date);
// generate html dynamically in for loop for five day forecast check first card to see how append ***** or use the current weather api call to get lat and lon for one call
// separate ajax call for fivedayforecast so don't worry about scope
// ajax goes into function which is called by event listener on submit button, grab input text for template literal
$("#dateFive").text(9);


$.ajax({
    url: fiveDayForecast,
    method: 'GET',
}).then(function (response) {
    // console.log(response);
    // console.log(response.city.coord.lat);
    // console.log(response.city.coord.lon);
    $("#city").text(cityName);
    console.log(response.list[0].weather[0].icon);
    console.log(response.list.length);
    console.log(response.list[0].dt_txt);
    let newString = response.list[0].dt_txt;
    console.log(newString);
    // for (i = 5; i < response.list.length; i+=8) { // contribution Sue
    //  console.log(response.list[i].weather[0].icon);
    // }
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
        // console.log(error);
        console.log(error.responseJSON.cod, error.responseJSON.message);
    })
}).catch(function (error) {
    // console.log(error);
    console.log(error.responseJSON.cod, error.responseJSON.message);
})

// http://openweathermap.org/img/wn/10d@2x.png