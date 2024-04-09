const mysql = require('mysql2')

const DBconfig = require('../../dbEnv.json');
// TODO: old version of connection
// const connection = mysql.createConnection(DBconfig)

const connection = mysql.createPool(DBconfig).promise()

module.exports = { conn: connection };