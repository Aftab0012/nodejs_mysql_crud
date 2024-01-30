const service = require('../services/employee.service.js');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await service.getAllEmployees();
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await service.getEmployeeById(id);
    if (employee == undefined) {
      return res
        .status(404)
        .json({ message: `couldn't find employee for give id: ${id}` });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await service.deleteEmployeeById(id);
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `couldn't find employee for give id: ${id}` });
    }
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.log(error);
  }
};

const addEmployee = async (req, res) => {
  try {
    await service.addOrUpdateEmployee(req.body);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.log(error);
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await service.addOrUpdateEmployee(req.body, id);
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No employee found for given id: ${id}` });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  addEmployee,
  updateEmployeeById,
};
