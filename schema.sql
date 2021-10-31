DROP DATABASE IF EXISTS workplace_db;

CREATE DATABASE IF NOT EXISTS workplace_db;

USE workplace_db;

DROP TABLE IF EXISTS department;

DROP TABLE IF EXISTS emp_role;

DROP TABLE IF EXISTS employee;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
) AUTO_INCREMENT = 100;

CREATE TABLE emp_role(
  id INT NOT NULL AUTO_INCREMENT,
  emp_role VARCHAR(30) NOT NULL,
  salary INT,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
) AUTO_INCREMENT = 100;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES emp_role(id)
) AUTO_INCREMENT = 100;