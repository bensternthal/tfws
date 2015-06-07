'use strict';

(function () {
  var socket = io();

  var humidity = $('#humidity').epoch({
    type: 'time.gauge',
    domain: [0, 100],
    ticks: 50,
    format: function(v) { return (v).toFixed(1) + ' %'; }
  });

  var airpress = $('#airpress').epoch({
    type: 'time.gauge',
    domain: [0, 1500],
    ticks: 50,
    format: function(v) { return (v).toFixed(3) + ' hPa'; }
  });

  var temp = $('#temp').epoch({
    type: 'time.gauge',
    domain: [0, 50],
    ticks: 50,
    format: function(v) { return (v).toFixed(2) + ' °C'; }
  });

  var illuminance = $('#illuminance').epoch({
    type: 'time.gauge',
    domain: [0, 500],
    ticks: 50,
    format: function(v) { return (v).toFixed(1) + ' Lux';}
  });


  socket.on('tfdata', function (data) {
   humidity.push(data.humidity);
   airpress.push(data.air_pressure);
   temp.push(data.temperature);
   illuminance.push(data.illuminance);
  });


  $('.temp').click(function(){
    var $button = $('.temp');

    if($button.hasClass('cels')) {
      $($button).toggleClass('cels').html('Make Fahrenheit');
      temp.options.format = function(v) { return (Math.round(v.value * 9 / 5 + 32)).toFixed(2) + ' °C'; };
    } else {
      $($button).toggleClass('cels').html('Make Celsius');
      temp.options.format = function(v) { return (v).toFixed(2) + ' °C'; };
    }

  });

})();




