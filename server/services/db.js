const mysql = require('mysql2')

const DBconfig = require('../../config/db.json');

const connection = mysql.createPool(DBconfig).promise()

module.exports = { conn: connection };