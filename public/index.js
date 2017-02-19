var app = function(){
  var mapDiv = document.querySelector(#map);
  var mapStyle = new MapStyle();
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
  
}

window.onload = app;