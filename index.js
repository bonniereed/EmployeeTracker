const inquirer = require('inquirer');
const fs = require('fs');

const Department = require('./lib/department.js');
const Employee = require('./lib/employee.js');
const Role = require('./lib/role.js');

const beginTable = ``;
//function to delete role from database
function deleteRole() {
    con.connect(function (err) {
        if (err) throw err;
        var sql = `DELETE FROM emp_role WHERE emp_role = ${emp_role.getRole()}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Number of records deleted: ' + result.affectedRows);
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
            console.log('Number of records deleted: ' + result.affectedRows);
        });
    });
}
// function to retrieve all employees
function getEmployee() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM employee', function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}
// function to retrieve all departments
function getDepartment() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM department', function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}
//
function getRole() {
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM emp_role', function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}

const questions = [
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
    {
        //Add new Department prompt
        type: 'input',
        name: 'addDept',
        message: 'What is the name of the new department?',
        when(answers) {
            return answers.initPrompt === 'Add department';
        },
    },
    {
        //Add role to new department
        type: 'input',
        name: 'addRole',
        message: 'What is the name of the new role? ',
    },
    {
        //add salary to new role
        type: 'input',
        name: 'roleSal',
        message: 'What is the starting salary for this new role?',
    },
    {
        // join role salary and department to correct department
        type: 'input',
        name: 'whichDept',
        message: 'which department does this role belong to?',
    },
    {
        // Make a selection:
        type: 'list',
        name: 'initPrompt',
        message: 'What would you like to do? (use arrow keys)',
        choices: [
            'View all employees',
            'Add department',
            'Add employee',
            'Update employee role',
            'View all roles',
            'View all departments',
            'Quit',
        ],
    },
    {
        //Add new Department prompt
        type: 'input',
        name: 'addFirstEmp',
        message: 'What is the first name of the employee?',
        when(answers) {
            return answers.initPrompt === 'Add employee';
        },
    },
    {
        //Add new Department prompt
        type: 'input',
        name: 'addLastEmp',
        message: 'What is the last name of the employee?',
        when(answers) {
            return answers.initPrompt === 'Add department';
        },
    },
    {
        // Make a selection:
        type: 'list',
        name: 'initPrompt',
        message: 'What would you like to do? (use arrow keys)',
        choices: [
            'View all employees',
            'Add department',
            'Add employee',
            'Update employee role',
            'View all roles',
            'View all departments',
            'Quit',
        ],
    },
    {
        //Add new Department prompt
        when(answers) {
            getRole();
            return answers.initPrompt === 'Update employee role';
        },
        type: 'input',
        name: 'updateRole',
        message: 'Which role would you like to update?',
    },
    {
        // Confirm if another employee needs to be added
        name: 'addAnother',
        type: 'confirm',
        message: 'Do you have another employee to add?',
        choices: ['Yes', 'No'],
    },
];

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
