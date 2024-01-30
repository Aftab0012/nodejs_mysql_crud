const db = require('../db.js');

module.exports.getAllEmployees = async () => {
  try {
    const [records] = await db.query('SELECT * FROM employees');
    return records;
  } catch (error) {
    console.error('Error in getAllEmployees:', error);
    throw error;
  }
};

module.exports.getEmployeeById = async (id) => {
  try {
    const [[record]] = await db.query('SELECT * FROM employees WHERE id = ?', [
      id,
    ]);
    return record;
  } catch (error) {
    console.error('Error in getEmployeeById:', error);
    throw error;
  }
};

module.exports.deleteEmployeeById = async (id) => {
  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM employees WHERE id = ?',
      [id]
    );
    return affectedRows;
  } catch (error) {
    console.error('Error in deleteEmployeeById:', error);
    throw error;
  }
};

module.exports.addOrUpdateEmployee = async (obj, id = 0) => {
  try {
    const [[[{ affectedRows }]]] = await db.query(
      'CALL usp_employee_add_or_edit(?,?,?,?)',
      [id, obj.name, obj.employee_code, obj.salary]
    );
    return affectedRows;
  } catch (error) {
    console.error('Error in addOrUpdateEmployee:', error);
    throw error;
  }
};
