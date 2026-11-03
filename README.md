# employee-app
A full-stack Employee app using React, Node.js, Express.js, and MySQL.

## Features
- Display employee records in a DataTable.
- Fetch employee data from a REST API.
- Search employees by name.
- Loading state while fetching data.
- Error handling for failed API requests.
- MySQL database integration.

## Tech Stack

**Frontend**
- React.js
- React Data Table Component
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- MySQL2

**Database**
- MySQL

## Project Structure
- frontend/ – React application
- backend/ – Express REST API
- database/ – Database schema and sample data

## API Endpoint
`GET /api/employees`
Returns employee records from the MySQL database.

## Database Setup

1. **Create a MySQL database named `employee_db`:**
   ```sql
   CREATE DATABASE employee_db;
   ```

2. **Execute the SQL script inside the database:**
   
   * **Select the database:**
     ```sql
     USE employee_db;
     ```
   
   * **Create the `employees` table:**
     ```sql
     CREATE TABLE employees (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         email VARCHAR(150) NOT NULL UNIQUE,
         department VARCHAR(100) NOT NULL,
         designation VARCHAR(100) NOT NULL,
         salary DECIMAL(10, 2) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         INDEX idx_employee_name (name),
         INDEX idx_employee_department (department)
     );
     ```
   
   * **Insert initial data:**
     ```sql
     INSERT INTO employees (name, email, department, designation, salary) 
     VALUES 
         ('Rahul Sharma', 'rahul@example.com', 'Engineering', 'Frontend Developer', 50000),
         ('Priya Singh', 'priya@example.com', 'HR', 'HR Manager', 45000),
         ('Amit Verma', 'amit@example.com', 'Engineering', 'Backend Developer', 60000),
         ('Neha Gupta', 'neha@example.com', 'Design', 'UI Designer', 40000),
         ('Rohit Kumar', 'rohit@example.com', 'Engineering', 'Full Stack Developer', 65000),
         ('Anjali Mehta', 'anjali@example.com', 'Marketing', 'Marketing Manager', 55000),
         ('Karan Malhotra', 'karan@example.com', 'Finance', 'Accountant', 48000),
         ('Sneha Kapoor', 'sneha@example.com', 'Design', 'UI/UX Designer', 52000),
         ('Vikas Yadav', 'vikas@example.com', 'Engineering', 'DevOps Engineer', 70000),
         ('Pooja Sharma', 'pooja@example.com', 'HR', 'HR Executive', 35000);
     ```

3. **Configure database credentials in `backend/.env`.**


## Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Security – Explanation
The endpoint can be secured using:
- JWT authentication to verify users.
- Role-Based Access Control (RBAC) to restrict access.
- Parameterized SQL queries to prevent SQL injection.
- Input validation to reject invalid requests.
- HTTPS to encrypt communication.
- Rate limiting to prevent excessive requests.

## Pagination – Explanation
Pagination can be implemented using `LIMIT` and `OFFSET` in MySQL.

Example:
`GET /api/employees?page=1&limit=10`
The backend calculates the offset and returns only the requested records.

## Author
Developed as a full-stack technical assignment.
