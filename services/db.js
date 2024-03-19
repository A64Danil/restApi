const mysql = require('mysql')

const DBconfig = require('../dbEnv.json');

const connection = mysql.createConnection(DBconfig)

connection.connect();

module.exports = connection;