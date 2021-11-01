//dependencies:
const db = require('./helpers/db.js');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

let roleArr = [];
let empArr = [];
let manArr = [];

//user selected to view all employees. This list of SQL in template literals will
//show the end user the employee's name, role, salary, and department.
startQuestions();

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
        .then((res) => {
            let answers = res.initPrompt;
            console.log(answers);
            switch (answers) {
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

function addDept() {
    inquirer
        .prompt([
            {
                name: 'addDept',
                type: 'input',
                message: 'Which department would you like to add?',
            },
        ])
        .then((res) => {
            db.addDept(res.addDept);
        });
}
