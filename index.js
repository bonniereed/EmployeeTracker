const inquirer = require('inquirer');
const fs = require('fs');

const Department = require('./lib/department.js');
const Employee = require('./lib/employee.js');
const Role = require('./lib/role.js');

const beginTable = ``;

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
            'Add role',
            'Add employee',
            'Update employee role',
            'View all roles',
            'View all departments',
            'Quit',
        ],
    },
    {
        // Employee name
        type: 'input',
        name: 'empName',
        message: "What is the employee's name?",
    },
    {
        // Employee ID number
        name: 'id',
        type: 'input',
        message: "What is the employee's ID number?",
    },
    {
        // Employee email
        type: 'input',
        name: 'email',
        message: "What is the employee's email address?",
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
            case 'Intern': {
                //genrate Intern card html
                const intern = new Intern(
                    answers.empName,
                    answers.id,
                    answers.email,
                    answers.school
                );
                const cardStr = cardCreationIntern(intern);
                checkAddAnother(answers, cardStr);
                break;
            }
        }
    });
}
