'use strict';

(function () {
  var socket = io();

  // var mychart = $('#gaugeChart').epoch({
  //   type: 'time.gauge',
  //   domain: [0, 500],
  //   tickSize: 10,
  //   format: function(v) { return (v*100).toFixed(2) + '%'; }
  // });
  var timestamp =  ((new Date()).getTime() / 1000)|0;

var lineChartData = [
  // First series
  {
    label: "Series 1",
    values: [ {time: timestamp, y: 100} ]
  }
];

var count = 100;


  var lineChart = $('#lineChart').epoch({
    type: 'time.line',
    data: lineChartData,
    axes: ['left', 'bottom', 'right']
  });

  socket.on('tfdata', function (data) {
    var mytime =  parseInt(((new Date()).getTime() / 1000)|0);
    var entry = [
    {
      time: mytime, y: data.illuminance
    }
    ];

    console.log(data.illuminance + " : " + mytime);
   // mychart.push(data.illuminance);
    lineChart.push(entry);
    count + 20;
  });

})();




