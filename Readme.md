# Employee Management System

Welcome to the Employee Management System, a Node.js and Express application with MySQL as the database. This backend system allows you to efficiently manage employee data through various API endpoints. Whether you're retrieving employee information, adding new employees, updating salaries, or deleting employees, this Employee Management System provides the necessary functionality.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation-for-local-environment)
- [API Reference](#api-reference)

### Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Installation for Local Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/Aftab0012/Employee_Management_System.git
   ```

2. Change to the project directory:

   ```bash
   cd Employee_Management_System
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Add a .env file with the following content to run the server:

   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=employee_db
   ```

## API Reference

### Employee API's

#### Retrieve all employees

- **Endpoint**: `GET http://localhost:3004/api/employees/`
- **Response**: Returns a JSON array of all employees.

  ```
  {
  "employees": [
      {
      "id": 9,
      "name": "Erina nakiri",
      "employee_code": "EMP008",
      "salary": 400000
      },
      {
      "id": 11,
      "name": "Alice Johnson",
      "employee_code": "EMP003",
      "salary": 80000
      }
  ]
  }

  ```

#### Retrieve an employee by ID

- **Endpoint**: `GET http:/localhost:3004/api/employees/:{add_employee_id}`

  ```
  {
  "employee": {
      "id": 9,
      "name": "Erina nakiri",
      "employee_code": "EMP008",
      "salary": 400000
  }
  }
  ```

- **Response**: Returns a JSON object of the employee with the specified ID.

#### Delete an employee by ID

- **Endpoint**:

  `DELETE http://localhost:3004/api/employees/:{add_employee_id}`

  ```
  {
  "message": "Deleted Successfully"
  }
  ```

- **Response**: Deletes the employee with the specified ID and returns 'deleted successfully' if successful.

#### Add a new employee

- **Endpoint**: `POST http://localhost:3004/api/employees/`
- **Request Body Format**:

  ```json
  {
    "name": "John Doe",
    "employee_code": "EMP001",
    "salary": 50000
  }
  ```

- **Response**: Returns a JSON object with the message 'Employee added successfully' if successful.

#### Update an employee by ID

- **Endpoint**:

  `PUT http://localhost:3004/api/employees/:id`

- **Request Body Format**:

  ```json
  {
    "name": "Updated Name",
    "employee_code": "EMP002",
    "salary": 60000
  }
  ```

- **Response**: Returns a JSON object with the message 'Updated successfully' if successful.

### Below is the database screenshot example:-

![Alt text](image.png)
