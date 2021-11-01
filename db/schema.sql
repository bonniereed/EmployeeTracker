DROP DATABASE IF EXISTS workplace_db;

CREATE DATABASE IF NOT EXISTS workplace_db;

USE workplace_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    emp_role VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET
        NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES emp_role(id) ON DELETE
    SET
        NULL,
        FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
    SET
        NULL
);