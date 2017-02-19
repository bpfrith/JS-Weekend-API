var app = function(){
  var mapDiv = document.querySelector("#map");
  var mapStyle = new MapStyle();
  var map = new MapWrapper(mapDiv, {lat: -34.427812, lng: 150.893061}, 12, mapStyle.getStyle());
  // var cityNow = {};
  // var builtCities = {};
  // var ukCities = new UkCities();
  var coordinator = new Coordinator();

  var ukCitiesCoords = {};

  var postCurrentTime = function(timeObject){
    var localTime = document.querySelector("#time");
    localTime.innerText = timeObject.formatted;
  }

  var getCurrentTime = function(lat, lng){
    var url = "https://api.timezonedb.com/v2/get-time-zone?key=AFQAZRVOAIDL&format=json&by=position&lat=" + lat + "&lng=" + lng;
    makeRequest(url, function(){
      // console.log(JSON.parse(this.responseText));
      postCurrentTime(JSON.parse(this.responseText));
    })
  }

  var setUkCoords = function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // console.log(results);
      output = {
        name: results[0].formatted_address,
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
        object: results[0]
      }
      // console.log(output);
      var nameP = document.querySelector("#name");
      var coordsP = document.querySelector("#coords");
      // thisDiv.appendChild(nameP);
      // thisDiv.appendChild(coordsP);
      // test.appendChild(thisDiv);
      nameP.innerText = output.name;
      coordsP.innerText = output.lat + ", " + output.lng;
      map.moveCenter({lat: output.lat, lng: output.lng});
      getCurrentTime(output.lat, output.lng);
    } else {
      alert("Argh! Here there be monsters! : " + status);
    }
  }

  var requestUkCoords = function(city, country){
    coordinator.geocode(city, country, setUkCoords);
  }

  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  var round = function(number){
    return (Math.round(number*100))/100;
  }

  var getWeather = function(name, country){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "," + country + "&APPID=07830595d15fabfc0b091e97443be419";
    // console.log(url);
    makeRequest(url, function(){
      if (this.status !== 200){
        return;
      } else {
        var response = JSON.parse(this.responseText);
        // console.log(response);
        var weatherP = document.querySelector("#weather");
        var temp = round(response["main"]["temp"]-273.15);
        var description = response["weather"][0]["description"].capitalize();
        weatherP.innerText = description + ", " + temp + "°C.";
      }
    });
  }

  var getWiki = function(name, country){
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + name + "&origin=*";
    makeRequest(url, function(){
      if (this.status !== 200){
        return;
      } else {
        var response = JSON.parse(this.responseText);
        // console.log("wikiResponse:")
        var pages = response.query.pages;
        pagesArray = [];
        for(page in pages) {pagesArray.push(pages[page])};
          // console.log(pagesArray);
          // console.log(pagesArray[0].extract)
          var wikiP = document.querySelector("#wiki");
          wikiP.innerHTML = "From Wikipedia:<br/><br/>" + pagesArray[0].extract;
        }
      });
  }

  var cityGet = function(name, country){
    requestUkCoords(name, country);
    getWeather(name, country);
    getWiki(name, country);
  }

  var newCity = function(name, country){
    cityGet(name, country);
  }

  newCity("Edinburgh", "uk");

  var go = function(){
    var cityChoice = document.querySelector("#city-chooser");
    var cityChoiceArr = cityChoice.value.split(" ");
    var capsFixed = [];
    for(word of cityChoiceArr){
      capsFixed.push(word.capitalize());
    }
    var queryString = capsFixed.join(" ");
    newCity(queryString, "");
  }

  var cityChoice = document.querySelector("#city-chooser");
  cityChoice.onkeyup = function(event){
    if (event.keyCode === 13) {
      // console.log("cityChoice");
      go();
    }
  }

  var hideNotes = document.querySelector("#hide-notes");
  hideNotes.style.display = "none";

  var notesDiv = document.querySelector("#notes");
  notesDiv.style.display = "none";

  var showNotes = document.querySelector("#show-notes");
  showNotes.onclick = function(){
    notesDiv.style.display = "block";
    hideNotes.style.display = "inline";
    hideNotes.onclick = function(){
      notesDiv.style.display = "none";
      hideNotes.style.display = "none";
    }
  }

  var hideNotes = document.querySelector("#hide-notes");
  hideNotes.style.display = "none";

  var notesDiv = document.querySelector("#notes");
  notesDiv.style.display = "none";

  var description = document.querySelector("#wiki");
  wiki.style.display = "none";

  var hideDescription = document.querySelector("#hide-description");
  hideDescription.style.display = "none";

  var input = document.querySelector("#input");

  var showDescription = document.querySelector("#show-description");
  showDescription.onclick = function(){
    showDescription.style.display = "none";
    input.style.display = "none";
    hideDescription.style.display = "block";
    description.style.display = "block";
    hideDescription.onclick = function(){
      showDescription.style.display = "block";
      input.style.display = "block";
      hideDescription.style.display = "none";
      description.style.display = "none";
    }
  }

  var swapStyleSheet = function(sheet){
    document.getElementById('main-style').setAttribute('href', sheet);
  }

  var changeStyle = document.querySelector("#change-style");
  changeStyle.onclick = function(){
    var chooseStyle = document.querySelector("#choose-style");
    swapStyleSheet(chooseStyle.value + '.css');
  }

}

window.onload = app;