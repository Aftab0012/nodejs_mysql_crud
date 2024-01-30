const request = require('supertest');
const app = require('../index');
const mysql = require('mysql2/promise');
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
    const employeeId = 23;
    const res = await request(app).get(`/api/employees/${employeeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('employee');
    expect(res.body.employee).toHaveProperty('id', employeeId);
    expect(res.body.employee).toHaveProperty('name');
  });

  it('should return 404 if employee with ID is not found', async () => {
    const nonExistentEmployeeId = 999;
    const res = await request(app).get(
      `/api/employees/${nonExistentEmployeeId}`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/employees/:id', () => {
  it('should delete an employee record by Id', async () => {
    const employeeId = 23;
    const res = await request(app).delete(`/api/employees/${employeeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Deleted Successfully');
  });

  it('should return 404 if employee with ID is not found', async () => {
    const nonExistentEmployeeId = 999;
    const res = await request(app).get(
      `/api/employees/${nonExistentEmployeeId}`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/employees/', () => {
  it('should add an employee record', async () => {
    const employeeData = {
      name: 'sample changed data',
      employee_code: 'EMP0153',
      salary: 50000,
    };

    const res = await request(app).post(`/api/employees`).send(employeeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Employee added successfully');
  });

  it('should return 409 if employee with the same employee_code already exists', async () => {
    const existingEmployeeData = {
      name: 'John Doe',
      employee_code: 'EMP0123',
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
      name: 'sample data',
      employee_code: 'EMP0153',
      salary: 50000,
    };
    const employeeId = 21;
    const res = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(employeeData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Updated successfully');
  });

  it('should return 404 if employee with the given Id not found', async () => {
    const EmployeeData = {
      name: 'some random name',
      employee_code: 'EMP0128',
      salary: 50000,
    };
    const employeeId = 21898;
    const res = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(EmployeeData);

    expect(res.statusCode).toBe(404);
  });
});
