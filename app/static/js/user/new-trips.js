/* global geocode */
/* global google */
(function(){
  'use strict';

  $(document).ready(function(){
    $('button[type=submit]').click(addTrip);

  });

  function addTrip(e){
    var start = $('#start').val(),
        end   = $('#end').val();
    geocode(start, function(start, slat, slng){
      geocode(end, function(end, elat, elng){
        console.log('START', start, slat, slng, end, elat, elng);
        $('#start').val(start);
        $('#slat').val(slat);
        $('#slng').val(slng);

        $('#end').val(end);
        $('#elat').val(elat);
        $('#elng').val(elng);

        $('form').submit();
      });
    });
    e.preventDefault();
  }
  function calculateDistance(start, end){
    start   = new google.maps.LatLng(slat, slng),
    end     = new google.maps.LatLng(elong, elng),
    service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
          origins: [start],
          destination: [end],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status){
        });
  }
})();
