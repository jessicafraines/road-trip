/* global geocode */
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
})();
