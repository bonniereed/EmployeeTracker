const connection = require('./connection.js');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // Find all departments
    selectDept() {
        return this.connection
            .promise()
            .query('SELECT department.id, department_name FROM department;');
    }

    // Create a new department
    createDept(department) {
        return this.connection
            .promise()
            .query('INSERT INTO department SET ?', department);
    }

    // Remove a department
    delDept(deptId) {
        return this.connection
            .promise()
            .query('DELETE FROM department WHERE id = ?', deptId);
    }

    // View roles with employee info and department info
    viewRoles() {
        return this.connection
            .promise()
            .query(
                'SELECT emp_role.id, emp_role.emp_role, department.department_name AS department, emp_role.salary FROM emp_role LEFT JOIN department on emp_role.department_id = department.id;'
            );
    }

    // Create a new role
    createRole(emp_role) {
        return this.connection
            .promise()
            .query('INSERT INTO emp_role SET ?', emp_role);
    }

    // Deletes role
    delRole(roleId) {
        return this.connection
            .promise()
            .query('DELETE FROM emp_role WHERE id = ?', roleId);
    }

    // View all employees
    viewEmps() {
        return this.connection
            .promise()
            .query(
                "SELECT employee.id, employee.first_name, employee.last_name, emp_role.emp_role, department.department_name AS department, emp_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN emp_role on employee.role_id = emp_role.id LEFT JOIN department on emp_role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            );
    }

    // Create a new employee
    createEmp(emp) {
        return this.connection
            .promise()
            .query('INSERT INTO employee SET ?', emp);
    }

    // Deletes employee by ID
    delEmp(empId) {
        return this.connection
            .promise()
            .query('DELETE FROM employee WHERE id = ?', empId);
    }

    // view managers
    viewMan(empId) {
        return this.connection
            .promise()
            .query(
                'SELECT id, first_name, last_name FROM employee WHERE id != ?',
                empId
            );
    }

    // Update employee manager
    updateEmpMan(empId, manId) {
        return this.connection
            .promise()
            .query('UPDATE employee SET manager_id = ? WHERE id = ?', [
                manId,
                empId,
            ]);
    }

    // Update employee's role
    updateEmpRole(empId, roleId) {
        return this.connection
            .promise()
            .query('UPDATE employee SET role_id = ? WHERE id = ?', [
                roleId,
                empId,
            ]);
    }
}

module.exports = new DB(connection);
