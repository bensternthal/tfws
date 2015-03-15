'use strict';

var levelup = require('level');
var livefeed = require('level-livefeed');
var WriteStream = require("write-stream")
var moment = require('moment');
var db = levelup('./db/tfdata');



exports.saveTfData = function (data, callback) {
  var timestamp = Math.round(+new Date()/1000);

  db.put(timestamp, data, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    return(callback(null));
  })
};

exports.getTfData = function() {
  var stream = livefeed(db)

  stream.pipe(WriteStream(function (chunk) {
    console.log("chunk", chunk.type, chunk.key.toString()
      , chunk.value && chunk.value.toString())
  }))

  stream.on("loaded", function () {
    console.log("finished loading from disk")
  })

};
