'use strict';

const server = require('./server')();
const config = require('./config');
// TODO: возможно стоит вынести в какое-то отдельное место
// const db = require('./config/db');
const db = require('./dbEnv.json');

server.create(config, db);
server.start();