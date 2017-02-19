var app = function(){
  // var mapDiv = document.querySelector(#map);
  // var mapStyle = new MapStyle();
  // var map = new MapWrapper(mapDiv, {lat: -34.427812, lng: 150.893061}, 12, mapStyle.getStyle());
  // var cityNow = {};
  // var builtCities = {};
  // var ukCities = new UkCities();
  // var coordinator = new Coordinator();

  var ukCitiesCoords = {};

  var postCurrentTime = function(timeObject){
    var localTime = document.querySelector("#time");
    localTime.innerText = timeObject.formatted;
  }

  var getCurrentTime = function(lat, lng){
    var url = "https://api.timezonedb.com/v2/get-time-zone?key=AFQAZRVOAIDL&format=json&by=position&lat=" + lat + "&lng=" + lng;
    makeRequest(url, function(){
      console.log(JSON.parse(this.responseText));
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

}

window.onload = app;