const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql');

const Department = require('./lib/department.js');
const Employee = require('./lib/employee.js');
const Role = require('./lib/role.js');

const connect = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'workplace_db',
});

connect.connect(function (err) {
    if (err) throw err;
    console.log('You are connected as: ' + connection.threadId)();
});

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
                    'Update employee role',
                    'View all roles',
                    'View all departments',
                    'Quit',
                ],
            },
        ])
        .then(function (answers) {
            switch (answers.choice) {
                case 'View employees:':
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
                    viewAllRoles();
                    break;

                case 'View all employees by Deparment:':
                    viewDept();
                    break;
            }
        });
}

function viewEmps() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, emp_role.emp_role, emp_role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN emp_role on emp_role.id = employee.emp_role.id INNER JOIN department on department.id = emp_role.departments_id left join employee on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startQuestions();
        }
    );
}
function addDept() {
    inquirer.prompt([
        {
            name: 'addDept',
            type: 'input',
            message: 'Which department would you like to add?',
        },
    ]).then;
    (function (answers) {
        var query = connection.query(
            'INSERT INTO department SET ? ',
            {
                name: answers.addDept,
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                startQuestions();
            }
        );
    });
}
function addRole() {
    inquirer.prompt([
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
    ]).then;
    (function (answers) {
        var query = connection.query(
            'INSERT INTO department SET ? ',
            {
                name: answers.addRole,
                name: answers.addSal,
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                startQuestions();
            }
        );
    });
}
function addEmp() {
    inquirer.prompt([
        {
            name: 'addFName',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'addLName',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'empRole',
            type: 'list',
            message: "What is the new employee's role? ",
            choices: selectRole(),
        },
        {
            name: 'empMan',
            type: 'rawlist',
            message: 'Who will this employee report to?',
            choices: selectMan(),
        },
    ]).then;
    (function (answers) {
        var newEmpMan = selectManager().indexOf(answers.empMan) + 1;
        var query = connection.query(
            'INSERT INTO employee SET ? ',
            {
                first_name: answers.addFName,
                last_name: answers.addLName,
                manager_id: newEmpMan,
            },
            function (answers) {
                var newEmpRole = selectRole().indexOf(answers.empRole) + 1;
                'INSERT INTO emp_role SET ? ',
                    {
                        emp_role: newEmpRole,
                    };
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                startQuestions();
            }
        );
    });
}
