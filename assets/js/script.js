var APIKey = "72ddd287ed4d6c4333abbfd25983a46c";
var city = "London"
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
var dateEl = document.querySelectorAll('.card-title');
var tempEl = document.querySelectorAll('.temp');
var windEl = document.querySelectorAll('.wind');
var humidityEl = document.querySelectorAll('.humidity');
var iconEl = document.querySelectorAll(".card-img-top");

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
      for (var i=1;i<dateEl.length;i++) {
        dateEl[i].textContent=new Date(data.list[i*8].dt_txt).toLocaleDateString();
        iconEl[i].src= "http://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon + ".png";
        tempEl[i].textContent=Math.round(data.list[i*8].main.temp-273.15) + "\u00B0" + "F";
        windEl[i].textContent=data.list[i*8].wind.speed + " MPH";
        humidityEl[i].textContent=data.list[i*8].main.humidity + "%";
      }
    });
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    fetch(currentWeatherURL,
      {
        cache: "reload"
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            dateEl[0].textContent=new Date(data.dt).toLocaleDateString();
            tempEl[0].textContent=Math.round(data.main.temp-273.15) + "\u00B0" + "F";
            windEl[0].textContent=data.wind.speed + " MPH";
            humidityEl[0].textContent=data.main.humidity + "%";
            iconEl[0].src= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        });
}

geoLocation(locationURL,APIKey);