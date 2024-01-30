const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller.js');

router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.delete('/:id', employeeController.deleteEmployeeById);
router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployeeById);

module.exports = router;
