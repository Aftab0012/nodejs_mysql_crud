const db = require('../db.js');

module.exports.getAllEmployees = async () => {
  const [records] = await db
    .query('SELECT * FROM employees')
    .catch((err) => console.log(err));
  return records;
};

module.exports.getEmployeeById = async (id) => {
  const [[record]] = await db
    .query('SELECT * FROM employees WHERE id = ?', [id])
    .catch((err) => console.log(err));
  return record;
};
