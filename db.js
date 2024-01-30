const mysql = require('mysql2/promise');

const mysqlpool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aftab123',
  database: 'employee_db',
});

module.exports = mysqlpool;
