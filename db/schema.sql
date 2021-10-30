DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;

USE workplace_db;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS emp_role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emp_role VARCHAR(30) NOT NULL,
    salary INT,
    department_id NOT NULL,
    PRIMARY Key (id),
    FOREIGN KEY (department_id),
    REFERENCES department(id)
    ON DELETE SET NULL
);


CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id),
  REFERENCES emp_role(id)
  ON DELETE SET NULL
);
