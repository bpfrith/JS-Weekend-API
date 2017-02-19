var MapWrapper = function(container, coords, zoom, styleArray){
  this.googleMap = new google.maps.Map(container, {center: coords, zoom: zoom, styles: styleArray});
}

MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    return marker
  },
  addInfoWindow: function(marker, infoText){
    var infoWindow = new google.maps.InfoWindow({content: infoText});
    marker.addListener('click', function(){
      infoWindow.open(this.googleMap, marker);
    });
  },
  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event) {
      // console.log('You clicked the map.');
      // console.log(event.latLng.lat());
      var position = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      var marker = this.addMarker(position);
      this.addInfoWindow(marker, "Warning! Here there be Monsters!");
    }.bind(this));
  },
  moveCenter: function(coords){
    this.googleMap.setCenter(new google.maps.LatLng({lat: coords.lat, lng: coords.lng}));
    this.googleMap.setZoom(11);
  },
  
}