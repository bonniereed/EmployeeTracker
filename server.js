const questions = [
    {
        // Make a selection:
        type: 'list',
        name: 'initPrompt',
        message: 'What woukld you like to do? (use arrow keys)',
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
