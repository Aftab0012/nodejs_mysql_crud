require('dotenv').config();

const mysql = require('mysql2/promise');

const mysqlpool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = mysqlpool;
