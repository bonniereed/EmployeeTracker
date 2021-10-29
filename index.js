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
const beginTable = ``;
//function to delete role from database
function deleteRole() {
    con.connect(function (err) {
        if (err) throw err;
        var sql = `DELETE FROM emp_role WHERE emp_role = ${emp_role.getRole()}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.table('Number of records deleted: ' + result.affectedRows);
        });
    });
}
//function to update role in database
function updateRole() {
    con.connect(function (err) {
        if (err) throw err;
        var sql = `UPDATE emp_role SET emp_role = ${emp_role.getRole()}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.table('Number of records deleted: ' + result.affectedRows);
        });
    });
}
// function to retrieve all employees
function getEmployee() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM employee', function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}
// function to retrieve all departments
function getDepartment() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM department', function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}
//
function getRole() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM emp_role', function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
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
        var newEmpMan = selectManager().indexOf(answers.choice) + 1;
        var query = connection.query(
            'INSERT INTO employee SET ? ',
            {
                first_name: answers.addFName,
                last_name: answers.addLName,
                manager_id: answers.empMan,
            },
            function (answers) {
                var newEmpRole = selectRole().indexOf(answers.empRole) + 1;
                'INSERT INTO emp_role SET ? ',
                    {
                        emp_role: answers.empRole,
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

const dbArr = [];
const checkAddAnother = (answers, dbStr) => {
    if (!answers.addAnother) {
        cardArr.push(dbStr);
        console.log(dbArr);
        //construct html
        const generatedDB = beginTable + dbArr.join() + dbHtml;
        fs.writeFileSync('./db/seeds.sql', generatedDB);
        //write your file
        return;
    } else {
        dbArr.push(dbStr);
        return getAnswers();
    }
};

function getAnswers() {
    return inquirer.prompt(questions).then((answers) => {
        // console.log(answers.addAnother);
        console.log(answers.addDept);
        switch (answers.initPrompt) {
            case 'Add department': {
                //1. make a new instance of manager
                const department = new Department(answers.addDept);
                const whichDepartment = new Department(answers.whichDept);
                const dbStr = dbAnsCreation(department, whichDepartment);

                checkAddAnother(answers, dbStr);
                //createManagerCard(manager)
                //2. generate manager card html using your methods
                //3. checkAddAnother
                //5.
                break;
            }
            case 'Add Role': {
                //generate Engineer card html
                //
                const emp_role = new Role(answers.addRole, answers.roleSal);
                const dbStr = dbAnsCreation(emp_role);
                checkAddAnother(answers, dbStr);
                break;
            }
            case 'Add employee': {
                //genrate Intern card html
                const newEmp = new Employee(
                    answers.addFirstEmp,
                    answers.addLastEmp
                );
                const cardStr = cardCreationIntern(intern);
                checkAddAnother(answers, cardStr);
                break;
            }
        }
    });
}
