/*global google:true*/

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(38.88, -89.19, 4);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });
  function addMarker(slat, slng, start){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
    var name    = $(tr).attr('data-name'),
        lat     = $(tr).attr('data-lat'),
        lng     = $(tr).attr('data-lng'),
        pos     = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
    return pos;
  });
    return positions;
  }

  function initMap(lat, lng, zoom){
    var styles      = [{'featureType':'road','elementType':'geometry.fill','stylers':[{'lightness':-100}]},{'featureType':'road','elementType':'geometry.stroke','stylers':[{'lightness':-100},{'visibility':'off'}]},{'featureType':'road','elementType':'labels.text.fill','stylers':[{'lightness':100}]},{'featureType':'road','elementType':'labels.text.stroke','stylers':[{'visibility':'off'}]},{'featureType':'water','stylers':[{'visibility':'on'},{'saturation':100},{'hue':'#006eff'},{'lightness':-19}]},{'featureType':'landscape','elementType':'geometry.fill','stylers':[{'saturation':-100},{'lightness':-16}]},{'featureType':'poi','elementType':'geometry.fill','stylers':[{'hue':'#2bff00'},{'lightness':-39},{'saturation':8}]},{'featureType':'poi.attraction','elementType':'geometry.fill','stylers':[{'lightness':100},{'saturation':-100}]},{'featureType':'poi.business','elementType':'geometry.fill','stylers':[{'saturation':-100},{'lightness':100}]},{'featureType':'poi.government','elementType':'geometry.fill','stylers':[{'lightness':100},{'saturation':-100}]},{'featureType':'poi.medical','elementType':'geometry.fill','stylers':[{'lightness':100},{'saturation':-100}]},{'featureType':'poi.place_of_worship','elementType':'geometry.fill','stylers':[{'lightness':100},{'saturation':-100}]},{'featureType':'poi.school','elementType':'geometry.fill','stylers':[{'saturation':-100},{'lightness':100}]},{'featureType':'poi.sports_complex','elementType':'geometry.fill','stylers':[{'saturation':-100},{'lightness':100}]}],
        mapOptions  = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
