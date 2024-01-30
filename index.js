require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db.js');
const app = express();
const employeeRoute = require('./routes/employee.routes.js');

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/employees', employeeRoute);

db.query('SELECT 1')
  .then(() => {
    console.log('Connection to db succeeded');
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  })
  .catch((err) => {
    console.log('DB connection failed', err);
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  });

module.exports = app;
