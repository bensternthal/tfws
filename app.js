'use strict';

var conf = require('./lib/conf');
var service = conf.get('service');
var interval = conf.get(service + ":interval");
var tfws = require('./lib/tfws');
var endpoint;
require('log-timestamp');

/*  TODO - make this just dependent on the require of the library.
    Depending on service defined in conf we do different things
*/

switch(service) {
  case "xively":
    endpoint = require('./services/xively');
    break;
  case "local":
    endpoint = require('./services/xively');
    break;
  default:
    errorHandler("No Or Invalid Service Defined");
    break;
}

/* Start Weather Station */
tfws.start();

/* Allow Enter Key To Stop Process*/
process.stdin.on('data', function(data) {
  tfws.stop();
});

/* Allow 5 Seconds For Weather Station To Start */
setTimeout(tfwsLoop,5000);


/* Update According To Interval In Settings */
function tfwsLoop() {
  var json = tfws.gettfwsJSON();

  /* All services need an update command */
  endpoint.update(json, function(error) {
    if (error) {
      errorHandler(error);
    } else {
      console.log(service + 'Updated');
      setTimeout(tfwsLoop, interval);
    }
  });
}


function errorHandler(error) {
  console.error('Error: ' + error);
}
