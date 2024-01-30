const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db.js');
const app = express();
const employeeRoute = require('./routes/employee.routes.js');
require('express-async-errors');

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/employees', employeeRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send('Something went wrong');
});

db.query('SELECT 1')
  .then(() => {
    console.log('Connection to db succeeded');
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  })
  .catch((err) => {
    console.log('DB connection failed', err);
    // Still attempt to start the server even if DB connection fails
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  });
