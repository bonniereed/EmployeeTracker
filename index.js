//dependencies:
const inquirer = require('inquirer');
const mysql = require('mysql');
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

//function that starts database application:
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
        //switch statement that moves into next set of prompts based on user input:
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
                    viewRoles();
                    break;

                case 'View all employees by Deparment:':
                    viewDept();
                    break;
            }
        });
}
startQuestions();
//user selected to view all employees. This list of SQL in template literals will
//show the end user the employee's name, role, salary, and department.
function viewEmps() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, emp_role.emp_role, emp_role.salary, department.department_name, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager FROM employee INNER JOIN emp_role on emp_role.id = employee.emp_role.id INNER JOIN department on department.id = emp_role.departments_id left join employee on employee.manager_id = emp_role.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startQuestions();
        }
    );
}
//user selected to add a department.
//this function will add a insert the user unput as a department.
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
//user selected add role
//this function will promp the user to enter the name of the role and the salary.
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
//user selected add an employee.
//this function will add the new employee's first name, lastname, and role based on the user's input.
//the manager will be added based on user selection.
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
            (function (answers) {
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
            })
        );
    });
}
//user selected update employee role
//this function will allow the user to select the target employee
//from a raw list then pushes the updated data based on user entry.
function updateEmp() {
    connection.query(
        'SELECT employee.first_name, employee.last_name, emp_role.emp_role FROM employee JOIN role ON employee.roles_id = emp_role.id;',
        function (err, res) {
            // console.log(res)
            if (err) throw err;
            console.log(res);
            inquirer
                .prompt([
                    {
                        name: 'updateFName',
                        type: 'rawlist',
                        choices: function () {
                            var updateFName = [];
                            for (var i = 0; i < res.length; i++) {
                                updateFName.push(res[i].first_name);
                            }
                            return updateFName;
                        },
                        message: "What is the employee's first name? ",
                    },
                    {
                        name: 'updateLName',
                        type: 'rawlist',
                        choices: function () {
                            var updateLName = [];
                            for (var i = 0; i < res.length; i++) {
                                updateLName.push(res[i].last_name);
                            }
                            return updateLName;
                        },
                        message: "What is the employee's last name? ",
                    },
                    {
                        name: 'updateRole',
                        type: 'rawlist',
                        message: "What is the Employee's new role? ",
                        choices: selectRole(),
                    },
                ])
                .then(function (answers) {
                    var updateRole =
                        selectRole().indexOf(answers.updateRole) + 1;
                    connection.query(
                        'UPDATE employee SET WHERE ?',
                        {
                            role_id: updateRole,
                        },
                        function (err) {
                            if (err) throw err;
                            console.table(answers);
                            startPrompt();
                        }
                    );
                });
        }
    );
}
//user selected view all roles
//this function will retrieve the first name, last name, employee role, and role id.
function viewRoles() {
    connection.query(
        'SELECT employee.first_name, employee.last_name, emp_role.emp_role AS Role FROM employee JOIN role ON employee.roles_id = emp_role.id;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        }
    );
}
//user selected view all departments
//this function will retrieve the first name, last name, department name, employee role and department id.
function viewDept() {
    connection.query(
        'SELECT employee.first_name, employee.last_name, department.department_name AS Department FROM employee JOIN role ON employee.roles_id = emp_role.id JOIN department ON emp_role.departments_id = department.id ORDER BY employee.id;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startQuestions();
        }
    );
}
