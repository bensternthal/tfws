'use strict';

var conf = require('./lib/conf');
var tfws = require('./lib/tfws');
//var tfdata = require('./lib/tfdata');
var Hapi = require('hapi');
var SocketIO = require('socket.io');
var global_socket;

var server = new Hapi.Server();

require('log-timestamp');


/** Web Server **/
if (!conf.get('port')) {
  console.error('\n\'port\' is a required local.json field');
  console.error('If you don\'t have a local.json file set up, please copy local.json-dist and fill in your config info before trying again\n');
  process.exit(1);
}

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});

server.views({
  engines: {
    jade: require('jade')
  },
  isCached: process.env.node === 'production',
  path: __dirname + '/views',
  compileOptions: {
    pretty: true
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply.view('index');
  }
});

server.route({
  path: '/{p*}',
  method: 'GET',
  handler: {
    directory: {
      path: './public',
      listing: false,
      index: false
    }
  }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);

    var io = SocketIO.listen(server.listener);

    // Store refernce to io to use elsewhere, I suspect I am
    // doing this wrong.
    global_socket = io;
    io.on('connection', function(socket){

    });


    // Weather Station Stuff
    tfws.start();
    process.stdin.on('data', function(data) {
      tfws.stop();
    });

    // Delay 5 Seconds For Weather Station To Start
    setTimeout(function() {
       tfwsLoop();
    }
    , 1000);

    //fdata.getTfData();

});


// Update loop
function tfwsLoop() {
  var json = tfws.gettfwsJSON();
  global_socket.sockets.emit('tfdata', json);
  setTimeout(tfwsLoop, conf.get('interval'));

  // var json = tfws.gettfwsJSON();

  // tfdata.saveTfData(json, function(error) {
  //   if (error) {
  //     errorHandler(error);
  //   } else {
  //     console.log('DB Updated');
  //     setTimeout(tfwsLoop, conf.get('interval'));
  //   }
  // });
}

/** /Weather Station **/

function errorHandler(error) {
  console.error('Error: ' + error);
}
