'use strict';

var Hapi = require('hapi');
var conf = require('./lib/conf');

var server = new Hapi.Server();


if (!conf.get('port')) {
  console.error('\n\'port\' is a required local.json field');
  console.error('If you don\'t have a local.json file set up, please copy local.json-dist and fill in your config info before trying again\n');
  process.exit(1);
}

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});
