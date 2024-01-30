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

module.exports = {
  getAllEmployees,
  getEmployeeById,
};
