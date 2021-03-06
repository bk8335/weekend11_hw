var app = function(){
  // var weather = document.getElementById('weather');
  var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=d1da5efdf6bd32c103ff303597e79de2"
  makeRequest(url, requestComplete)

  var edinburghButton = document.getElementById('Edinburgh-weather');
  edinburghButton.addEventListener('click', edWeatherClick);
}

var edWeatherClick = function(){
  var edUrl = "http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=d1da5efdf6bd32c103ff303597e79de2";
  makeRequest(edUrl, requestComplete);
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var location = JSON.parse(jsonString);
  populateWeather(location);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest()
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var timeConverter = function (UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var timeToday = hour + ':' + min + ':' + sec ;
  return timeToday;
}

var populateWeather = function(location){
  var ul = document.getElementById("weather");
  var li1 = document.getElementById("sunrise")
  var li2 = document.getElementById("sunset")
  var li3 = document.getElementById("temperature")
  var li4 = document.getElementById("weather-type")

  console.log(location.sys.sunrise);
  console.log(Date.now()/1000);

  var li0 = document.createElement('li');
  li0.innerText = "City name: " + location.name;

  var li1 = document.createElement('li');
  li1.innerText = "Sunrise: " + timeConverter(location.sys.sunrise)

  var li2 = document.createElement('li');
  li2.innerText = "Sunset: " + timeConverter(location.sys.sunset)

  var isLight = document.createElement('li');
  if(Date.now()/1000 > location.sys.sunrise && Date.now()/1000 < location.sys.sunset)
    isLight.innerText = "not dark!";
  else
    isLight.innerText = "dark";

  

  var li3 = document.createElement('li');
  var tempCelsius = Math.round((location.main.temp - 273.15))
  li3.innerText = "Temperature (celsius): " + tempCelsius
  console.log(tempCelsius)

  var isCool = document.createElement('li');
  if(tempCelsius > 0 && tempCelsius < 30){
    isCool.innerText = "not freezing and not boiling!"
  }
  else if(tempCelsius > 30){
    isCool.innerText = "too hot - gor for a BBQ not a run!"
  }
  else
    isCool.innerText = "brrr, it's too chilly outside!"


  var isDry = document.createElement('li');
  if(location.weather[0].main === 'Rain'){
    isDry.innerText = "it is wet outside"
  }
  else if(location.weather[0].main === "Snow"){
    isDry.innerText = "it's snowing - don't go running!"
  }
  else
    isDry.innerText = "it is not wet or snowing - ideal!"

  var goodToRun = document.createElement('li');
  if(isDry.innerText === "it is not wet or snowing - ideal!" && isCool.innerText === "not freezing and not boiling!" && isLight.innerText === "not dark!"){
    goodToRun.innerText = "Good to run - enjoy!"
  }


  var li4 = document.createElement('li');
  li4.innerText = "Weather type: " + location.weather[0].main

  var li5 = document.createElement('li');
  li5.innerText = ".....................................................";

  ul.appendChild(goodToRun)
  ul.appendChild(li0)
  ul.appendChild(li1)
  ul.appendChild(li2)
  ul.appendChild(li3)
  ul.appendChild(li4)

  ul.appendChild(isLight)
  ul.appendChild(isCool)
  ul.appendChild(isDry)

  ul.appendChild(li5)

}


window.addEventListener('load', app);