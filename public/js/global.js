'use strict';

(function () {
  var socket = io();
  var timestamp =  ((new Date()).getTime() / 1000)|0;

  var lineChartData = [
    {
      label: "Series 1",
      values: [ {time: timestamp, y: 0} ]
    }
  ];

  var humidity = $('#humidity').epoch({
    type: 'time.line',
    historySize: 50,
    data: lineChartData,
    axes: ['left', 'bottom', 'right']
  });

  var airpress = $('#airpress').epoch({
    type: 'time.line',
    historySize: 50,
    data: lineChartData,
    axes: ['left', 'bottom', 'right']
  });

  var temp = $('#temp').epoch({
    type: 'time.line',
    historySize: 50,
    data: lineChartData,
    axes: ['left', 'bottom', 'right']
  });

  var illuminance = $('#illuminance').epoch({
    type: 'time.line',
    historySize: 50,
    data: lineChartData,
    axes: ['left', 'bottom', 'right']
  });

  socket.on('tfdata', function (data) {
    var mytime =  parseInt(((new Date()).getTime() / 1000)|0);

    humidity.push([{time: mytime, y: data.humidity}]);
    airpress.push([{time: mytime, y: data.air_pressure}]);
    temp.push([{time: mytime, y: data.temperature}]);
    illuminance.push([{time: mytime, y: data.illuminance}]);
  });

})();




