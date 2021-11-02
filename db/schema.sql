DROP DATABASE IF EXISTS workplace_db;

CREATE DATABASE workplace_db;

USE workplace_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    emp_role VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET
        NULL
);

CREATE TABLE employee (
    id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES emp_role(id) ON DELETE
    SET
        NULL,
        manager_id INT,
        FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
    SET
        NULL
);