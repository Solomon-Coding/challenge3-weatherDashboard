// Variables
var APIKey = "72ddd287ed4d6c4333abbfd25983a46c";
var city = "London";

var dateEl = document.querySelectorAll('.card-title');
var tempEl = document.querySelectorAll('.temp');
var windEl = document.querySelectorAll('.wind');
var humidityEl = document.querySelectorAll('.humidity');
var iconEl = document.querySelectorAll(".card-img-top");
var cityEl = document.querySelector(".city");
var searchBtnEl = document.querySelector(".search-btn");
var searchValEl = document.querySelector(".form-control");
var searchHistoryEl = document.querySelector(".searchHistory");
var count = 0;

function geoLocation(city,APIKey){
  var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
  fetch(locationURL,
    {
        cache: "reload"
    })
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
          console.log(data)
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
      for (var i=0;i<dateEl.length-1;i++) {
        dateEl[i+1].textContent=new Date(data.list[i*8].dt_txt).toLocaleDateString();
        iconEl[i+1].src= "http://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon + ".png";
        tempEl[i+1].textContent=Math.round(data.list[i*8].main.temp-273.15) + " \u00B0" + "F";
        windEl[i+1].textContent=data.list[i*8].wind.speed + " MPH";
        humidityEl[i+1].textContent=data.list[i*8].main.humidity + " %";
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
          
          var today = dayjs();
          // $('#currentDay').text(today.format('DD/MM/YYYY'));

            tempEl[0].textContent= Math.round(data.main.temp-273.15) + " \u00B0" + "F";
            windEl[0].textContent= data.wind.speed + " MPH";
            humidityEl[0].textContent=data.main.humidity + " %";
            iconEl[0].src= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            dateEl[0].textContent = today.format('M/DD/YYYY');
            cityEl.textContent= data.name;
            
        });
}

geoLocation(city,APIKey);

// On click events
searchBtnEl.addEventListener("click", function() {
  city = searchValEl.value;
  console.log(city)
  geoLocation(city,APIKey);
  localStorage.setItem("city"+count, city);
  count=count+1;
  var searchEntryEl = $('<div>').text(city);
  // var searchEntryEl = $('<div>').text(city);
  searchHistoryEl.append(searchEntryEl)
});


function readCitiesFromStorage() {
  var cities = localStorage.getItem('cities');
  if (cities) {
    cities = JSON.parse(cities);
  } else {
    cities = [];
  }
  return cities;
}

function saveCitiesToStorage(cities) {
  localStorage.setItem('cities', JSON.stringify(cities));
}

// Gets project data from local storage and displays it
function printCityData() {

  // get cities from localStorage
  var cities = readCitiesFromStorage();

    // Create row and columns for project
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text(project.name);


    // append elements to DOM to display them
    rowEl.append(nameEL, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  
}