'use strict';

var conf = require('../lib/conf');
var request = require('request');
var xivelyURL = conf.get('xively:url');
var xivelyAPIKey = conf.get('xively:api_key');

/* Utilities for working with Xively */

exports.update = function(xivelyJSON, callback) {

  var payloadJSON = {
    "version":"1.0.0",
    "datastreams" : [
      {
        "id" : "Air_Pressure",
        "current_value" : xivelyJSON.air_pressure
      },
      {
        "id" : "Humidity",
        "current_value" : xivelyJSON.humidity
      },
      {
        "id" : "Illumination",
        "current_value" : xivelyJSON.illuminance
      },
      {
        "id" : "Temperature",
        "current_value" : xivelyJSON.temperature
      }
    ]
  };

  var options = {
    method: 'PUT',
    url: xivelyURL,
    json: payloadJSON,
    headers: {
        'X-ApiKey': xivelyAPIKey
    }
  }


  request(options, function (error, response, body) {
    if (error) return callback('xively - ' + error)
    return callback(null);
  });

}
