const request = require('supertest');
const app = require('../index');
const mysql = require('mysql2/promise');
const { run } = require('jest');
require('dotenv').config();

let connection;

beforeAll(async () => {
  connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
});

afterAll(async () => {
  if (connection) {
    await connection.end();
  }
});

describe('GET /api/employees', () => {
  it('should return all employees', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body.employees.length).toBeGreaterThan(0);
  });
});

describe('GET /api/employees/:id', () => {
  it('should return employee by Id', async () => {
    const employeeId = 39;
    const res = await request(app).get(`/api/employees/${employeeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('employee');
    expect(res.body.employee).toHaveProperty('id', employeeId);
    expect(res.body.employee).toHaveProperty('name');
  });

  it('should return 404 if employee with ID is not found', async () => {
    const nonExistentEmployeeId = 999; // Don't change
    const res = await request(app).get(
      `/api/employees/${nonExistentEmployeeId}`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/employees/:id', () => {
  it('should delete an employee record by Id', async () => {
    const employeeId = 40;
    const res = await request(app).delete(`/api/employees/${employeeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Deleted Successfully');
  });

  // keep the (id) here as it is
  it('should return 404 if employee with ID is not found', async () => {
    const nonExistentEmployeeId = 999; // Don't change
    const res = await request(app).get(
      `/api/employees/${nonExistentEmployeeId}`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/employees/', () => {
  it('should add an employee record', async () => {
    const employeeData = {
      name: 'Sample test case',
      employee_code: 'EMP01709', // change after every test case
      salary: 50000,
    };

    const res = await request(app).post(`/api/employees`).send(employeeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Employee added successfully');
  });

  it('should return 409 if employee with the same employee_code already exists', async () => {
    const existingEmployeeData = {
      name: 'Sample test case',
      employee_code: 'EMP01709',
      salary: 50000,
    };

    const res = await request(app)
      .post(`/api/employees`)
      .send(existingEmployeeData);

    expect(res.statusCode).toBe(409);
  });
});

describe('PUT /api/employees/:id', () => {
  it('should update an employee record', async () => {
    const employeeData = {
      name: 'Name got updated',
      employee_code: 'EMP0153',
      salary: 50000,
    };
    const employeeId = 42;
    const res = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(employeeData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Updated successfully');
  });

  it('should return 404 if employee with the given Id not found', async () => {
    const EmployeeData = {
      name: 'some random name',
      employee_code: 'EMP0120',
      salary: 50000,
    };
    const employeeId = 21898; // Don't change
    const res = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(EmployeeData);

    expect(res.statusCode).toBe(404);
  });
});




// please add the (emoloyee_id) according 
// to your database table I'd the current
// written I'd are according to my db

// NOTE/Attention: After each successful execution of the test cases,
// it is essential to update the IDs of the test cases.
// Specifically, ensure that the IDs for the,
// "Get Employee by ID," "Delete Employee by ID," and "Update Employee by ID"
// test cases are meticulously rewritten in ascending order.
// This practice guarantees the seamless functioning of the test suite
// during subsequent runs.
