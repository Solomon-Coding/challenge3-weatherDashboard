var APIKey = "72ddd287ed4d6c4333abbfd25983a46c";

var city = "London"
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

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
        console.log(lat)
        console.log(lon)
        weather(lat,lon)
        });

console.log(lon)
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
  });


// //   starting files:
//   touch index.html
//   mkdir assets 
//   cd assets/ 
//   mkdir css 
//   mkdir js 
//   mkdir images 
//   cd css/ 
//   touch style.css
//   cd .. 
//   cd js/
//   touch script.js 
