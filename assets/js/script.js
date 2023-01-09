var APIKey = "72ddd287ed4d6c4333abbfd25983a46c";

var city = "London"
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

function geoLocation(locationURL,APIKey){
  fetch(locationURL,
    {
        cache: "reload"
    })
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        var lat=data[0].lat;
        var lon=data[0].lon;
        weather(lon,lat,APIKey)
        });
}

function weather(lon,lat,APIKey){
  var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

  fetch(weatherURL,
  {
    cache: "reload"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[0].main.temp-273.15)
      console.log(data.list[8].main.temp-273.15)
      console.log(data.list[16].main.temp-273.15)
      console.log(data.list[24].main.temp-273.15)
      console.log(data.list[32].main.temp-273.15)
    });
}


geoLocation(locationURL,APIKey);