DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;

USE workplace_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role (
    id INT PRIMARY KEY,
    emp_role VARCHAR(30) NOT NULL,
    salary DECIMAL,
    FOREIGN KEY (departments_id),
    REFERENCES department(id),
);

CREATE TABLE employee(
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  FOREIGN KEY (roles_id),
  REFERENCES emp_role(id),
  
)

--You might want to use a separate file that contains 
--functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a seeds.sql file to pre-populate your database, making the 
--development of individual features much easier.