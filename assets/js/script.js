var APIKey = "72ddd287ed4d6c4333abbfd25983a46c";
var lat=44;
var lon=32;
var city = "London"
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

fetch(locationURL,
    {
      cache: "reload"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.lat)
        console.log(data.lon)
      });



fetch(weatherURL,
{
  cache: "reload"
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
