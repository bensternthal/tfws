'use strict';

var conf = require('./lib/conf');
var tfws = require('./lib/tfws');
var xively = require('./lib/xively');

var xivelyURL = conf.get('xively:url');
var xivelyAPIKey = conf.get('xively:api_key');

/* Add Timestamps To Logging */
require('log-timestamp');

/* Utility Method To Update Xively Every 5 Minutes */
var updateXively = function() {
  var xivelyJSON = tfws.getXivelyJSON();

  /* Don't Exit Loop On Error: Xively Sometimes Goes Down And We Don't Want To Exit */
  xively.updateXively(xivelyURL, xivelyAPIKey, xivelyJSON, function(error) {
    if (error) {
      errorHandler(error);
    } else {
      console.log('Updated Xively');
    }
      setTimeout(updateXively,300000);
  });
};

/* Start Weather Station */
tfws.start();

/* Allow Enter Key To Stop Process*/
process.stdin.on('data', function(data) {
  tfws.stop();
});

/* Call Xively After 5 Seconds Start 5 Minute Loop */
setTimeout(updateXively,5000);


function errorHandler(error) {
  console.error('Error: ' + error);
}
