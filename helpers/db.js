const connection = require('./helpers/connection.js');
class db {
    constructor(connection) {
        this.connection = connection;
    }
    addDept(dept) {
        return this.connection
            .promise()
            .query(`INSERT INTO department SET ? `, dept);
    }
    addRole(role) {
        return this.connection
            .promise()
            .query(`INSERT INTO emp_role SET ?`, role);
    }
    addEmp(emp) {
        return this.connection
            .promise()
            .query(`INSERT INTO employee SET ?`, emp);
    }
    viewDept() {
        return this.connection.promise().query(`SELECT * FROM department;`);
    }
    viewRoles() {
        return this.connection.promise().query(`SELECT * FROM emp_role;`);
    }
    viewEmps() {
        return this.connection.promise().query(`SELECT * FROM employee;`);
    }
    updateEmp(updateEmp) {
        return this.connection
            .promise()
            .query(
                `SELECT concat employee.first_name, " ", employee.last_name AS name FROM employee`,
                updateEmp
            );
    }
}

module.exports = db;
