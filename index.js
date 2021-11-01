//dependencies:
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const connection = require('./helpers/connection.js');
const db = require('./helpers/db.js');
let roleArr = [];
let empArr = [];
let manArr = [];

//user selected to view all employees. This list of SQL in template literals will
//show the end user the employee's name, role, salary, and department.
startQuestions();

function viewEmps() {
    console.log('view emps is working!!');
    connection.query('SELECT * FROM employee;', function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    startQuestions();
}
function viewRoles() {
    console.log('view roles is working!!');
    connection.query('SELECT * FROM emp_role;', function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    startQuestions();
}
function viewDept() {
    console.log('view dept is working!!');
    connection.query('SELECT * FROM department;', function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    startQuestions();
}

//user selected to add a department.
//this function will add a insert the user unput as a department.
function addDept() {
    console.log('Add depts is working!!');
    inquirer
        .prompt([
            {
                name: 'addDept',
                type: 'input',
                message: 'Which department would you like to add?',
            },
        ])
        .then(function (answers) {
            console.log(answers);
            connection.query(
                'INSERT INTO department SET ? ',
                {
                    department_name: answers.addDept,
                },
                function (err, res) {
                    console.log(err);
                    if (err) throw err;
                    // console.table(res);
                    console.log(res);
                }
            );
            startQuestions();
        });
}

//user selected add role
//this function will promp the user to enter the name of the role and the salary.
function addRole() {
    ('Add role is working!!');
    inquirer
        .prompt([
            {
                name: 'addRole',
                type: 'input',
                message: 'What is the name of the role?',
            },
            {
                name: 'addSal',
                type: 'input',
                message: 'What is the salary for this role?',
            },
            {
                name: 'addToDepartment',
                type: 'input',
                message: 'Which department does this role belong to?',
            },
        ])
        .then(function (answers) {
            let deptId;
            for (let de = 0; de < res.length; de++) {
                if (res[de].department_id == answer.addToDepartment) {
                    deptId = res[de].department_id;
                }
            }
            connection.query(
                'INSERT INTO emp_role SET ? ',
                {
                    emp_role: answers.addRole,
                    salary: answers.addSal,
                    department_id: deptId,
                },
                function (err) {
                    if (err) throw err;
                    console.table(res);
                }
            );
            startQuestions();
        });
}

//user selected add an employee.
//this function will add the new employee's first name, lastname, and role based on the user's input.
//the manager will be added based on user selection.
function addEmp() {
    ('Add emp is working!!');
    connection.query(
        `SELECT  employee.first_name, " ", employee.last_name AS name FROM employee`,
        function (err, res) {
            if (err) throw err;
            empArr = [];
            for (i = 0; i < employee.length; i++) {
                empArr.push(employee[i].name);
            }
        }
    );
    connection.query(`SELECT * FROM emp_role`, function (err, res2) {
        if (err) throw err;
    });
    inquirer
        .prompt([
            {
                name: 'empRole',
                type: 'list',
                message: "What is the new employee's role? ",
                choices: roleArr,
            },
            {
                name: 'empMan',
                type: 'rawlist',
                message: 'Who will this employee report to?',
                choices: manArr,
            },
        ])
        .then(function (answers) {
            let roleId;
            for (let ro = 0; ro < res.length; ro++) {
                if (res[ro].role_id == answer.empRole) {
                    roleId = res[ro].emp_role;
                }
            }
            var manId;
            for (let man = 0; man < res2.length; man++) {
                if (res2[man].manager_id == answer.empMan) {
                    manId = res2[man].manager_id;
                }
            }
            connection.query(
                `UPDATE employee SET role_id = ? WHERE employee.id = (SELECT employee.id FROM(SELECT employee.id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS name)`,
                [roleID, answer.empArr],

                function (err) {
                    if (err) throw err;
                }
            );
            startQuestions();
        });
}

function updateEmp() {
    ('Update emp is working!!');
    connection.query(
        `SELECT concat employee.first_name, " ", employee.last_name AS name FROM employee`,
        function (err, res) {
            if (err) throw err;
            empArr = [];
            for (i = 0; i < employee.length; i++) {
                empArr.push(employee[i].name);
            }
        }
    );
    connection.query(`SELECT * FROM emp_role`, function (err, res2) {
        if (err) throw err;
    });
    inquirer
        .prompt([
            {
                name: 'empChoice',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: empArr,
            },
            {
                name: 'empRole',
                type: 'list',
                message: 'What is the employees role?',
                choices: roleArr,
            },
        ])
        .then(function (answers) {
            let roleId;
            for (let ro = 0; ro < res.length; ro++) {
                if (res[ro].role_id == answer.empRole) {
                    roleId = res[ro].emp_role;
                }
            }
            connection.query(
                `UPDATE employee SET role_id = ? WHERE employee.id = (SELECT employee.id FROM(SELECT employee.id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS name)`,
                [roleID, answer.empRole],
                function (err) {
                    if (err) throw err;
                }
            );
            startQuestions();
        });
}

//user selected view all departments
//this function will retrieve the first name, last name, department name, employee role and department id.
function viewDept() {
    console.log('view dept is working!!');
    connection.query('SELECT * FROM department;', function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    startQuestions();
}
function startQuestions() {
    inquirer
        .prompt([
            {
                // Make a selection:
                type: 'list',
                name: 'initPrompt',
                message: 'What would you like to do? (use arrow keys)',
                choices: [
                    'View all employees',
                    'Add department',
                    'Add role',
                    'Add employee',
                    'Update employee',
                    'View employees by role:',
                    'View all employees by department:',
                    'Quit',
                ],
            },
        ])
        //switch statement that moves into next set of prompts based on user input:
        .then(function (answers) {
            console.log(answers.initPrompt);
            switch (answers.initPrompt) {
                case 'View all employees':
                    viewEmps();
                    break;

                case 'Add department':
                    addDept();
                    break;

                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmp();
                    break;

                case 'Update employee':
                    updateEmp();
                    break;

                case 'View employees by role:':
                    viewRoles();
                    break;

                case 'View all employees by Deparment:':
                    viewDept();
                    break;
            }
        });
}
