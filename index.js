//dependencies
const db = require('./helpers/db.js');
const inquirer = require('inquirer');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
require('console.table');

clearScreen();
startQuestions();
//function used to clear screen during user interaction to keep the viewing area clear.
function clearScreen() {
    process.stdin.on('keypress', (str, key) => {
        if (key) {
            console.clear();
        }
    });
}
//initiates app and starts user input selection
function startQuestions() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'initPrompt',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Departments:',
                        value: 'viewDept',
                    },
                    {
                        name: 'View employees by role:',
                        value: 'viewRoles',
                    },
                    {
                        name: 'View all employees:',
                        value: 'viewEmps',
                    },
                    {
                        name: 'Add department:',
                        value: 'addDept',
                    },
                    {
                        name: 'Add a role:',
                        value: 'addRole',
                    },
                    {
                        name: 'Add an employee:',
                        value: 'addEmp',
                    },
                    {
                        name: 'Update existing manager:',
                        value: 'updateMan',
                    },
                    {
                        name: "Update existing employee's role:",
                        value: 'updateRole',
                    },
                    {
                        name: 'Delete a department:',
                        value: 'delDept',
                    },
                    {
                        name: 'Delete a role:',
                        value: 'delRole',
                    },
                    {
                        name: 'Delete an employee:',
                        value: 'delEmp',
                    },
                    {
                        name: 'Exit',
                        value: 'EXIT',
                    },
                ],
            },
        ])
        .then((res) => {
            let answer = res.initPrompt;
            console.log(answer);
            switch (answer) {
                case 'viewDept':
                    viewDepts();
                    break;
                case 'viewRoles':
                    viewRoles();
                    break;
                case 'viewEmps':
                    viewEmps();
                    break;
                case 'addDept':
                    addDept();
                    break;
                case 'addRole':
                    createRole();
                    break;
                case 'addEmp':
                    addEmp();
                    break;
                case 'updateMan':
                    updateEmpMan();
                    break;
                case 'updateRole':
                    updateEmpRole();
                    break;
                case 'delDept':
                    delDept();
                    break;
                case 'delRole':
                    delRole();
                    break;
                case 'delEmp':
                    delEmp();
                    break;
                default:
                    exit();
            }
        });
}

// function that calls to the db file and selects all departments then shows the entries in the console table.
function viewDepts() {
    db.selectDept()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(clearScreen())
        .then(() => startQuestions());
}
//function that adds department based on user input
function addDept() {
    inquirer
        .prompt([
            {
                name: 'department_name',
                message: 'What department would you like to add?',
            },
        ])
        .then((res) => {
            db.createDept(res).then(() => startQuestions());
        });
}

//function that deletes department based on user selection
function delDept() {
    db.selectDept().then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));

        inquirer
            .prompt({
                type: 'list',
                name: 'deptId',
                message: 'Which department would you like to remove?',
                choices: departmentChoices,
            })
            .then((res) => db.delDept(res.deptId))
            .then(() => startQuestions());
    });
}

//function that selects all roles and shows entries in console table
function viewRoles() {
    db.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(clearScreen())
        .then(() => startQuestions());
}

//function that adds a role based on user input
function createRole() {
    db.selectDept().then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(
            ({ id, department_name }) => ({
                name: department_name,
                value: id,
            })
        );

        inquirer
            .prompt([
                {
                    name: 'emp_role',
                    message: 'What is the name of the role?',
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role?',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
                    choices: departmentChoices,
                },
            ])
            .then((emp_role) => {
                db.createRole(emp_role).then(() => startQuestions());
            });
    });
}

//function that deletes a role based on user selection
function delRole() {
    db.viewRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Select a role to delete:',
                    choices: roleChoices,
                },
            ])
            .then((res) => db.delRole(res.roleId))
            .then(() => startQuestions());
    });
}

//function that updates department based on user selection and input
function updateEmpRole() {
    db.viewEmps().then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(
            ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
            })
        );

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices,
                },
            ])
            .then((res) => {
                let empId = res.employeeId;
                db.viewRoles().then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id,
                    }));

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message:
                                    'Which role do you want to assign the selected employee?',
                                choices: roleChoices,
                            },
                        ])
                        .then((res) => db.updateEmpRole(empId, res.roleId))
                        .then(() => startQuestions());
                });
            });
    });
}

//function that selects all employees and shows the entries in a console table
function viewEmps() {
    db.viewEmps()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(clearScreen())
        .then(() => startQuestions());
}

//function that adds an employee based on user input
function addEmp() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                name: 'last_name',
                message: "What is the employee's last name?",
            },
        ])
        .then((res) => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.viewRoles().then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id,
                }));

                inquirer
                    .prompt({
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: roleChoices,
                    })
                    .then((res) => {
                        let roleId = res.roleId;

                        db.viewEmps().then(([rows]) => {
                            let employees = rows;
                            const managerChoices = employees.map(
                                ({ id, first_name, last_name }) => ({
                                    name: `${first_name} ${last_name}`,
                                    value: id,
                                })
                            );

                            managerChoices.unshift({
                                name: 'None',
                                value: null,
                            });

                            inquirer
                                .prompt({
                                    type: 'list',
                                    name: 'manager_id',
                                    message: "Who is the employee's manager?",
                                    choices: managerChoices,
                                })
                                .then((res) => {
                                    let employee = {
                                        manager_id: res.managerId,
                                        role_id: roleId,
                                        first_name: firstName,
                                        last_name: lastName,
                                    };

                                    db.createEmp(employee);
                                })
                                .then(() => startQuestions());
                        });
                    });
            });
        });
}

//function that deletes an employee based on user selection
function delEmp() {
    db.viewEmps().then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(
            ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
            })
        );

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select an employee to delete:',
                    choices: employeeChoices,
                },
            ])
            .then((res) => db.delEmp(res.employeeId))
            .then(() => startQuestions());
    });
}

//function updates an employee's manager based on user selection and input
function updateEmpMan() {
    db.viewEmps().then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(
            ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
            })
        );

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: "Which employee's manager do you want to update?",
                    choices: employeeChoices,
                },
            ])
            .then((res) => {
                let employeeId = res.employeeId;
                db.viewMan(employeeId).then(([rows]) => {
                    let managers = rows;
                    const managerChoices = managers.map(
                        ({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id,
                        })
                    );

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'managerId',
                                message:
                                    'Which employee do you want to set as manager for the selected employee?',
                                choices: managerChoices,
                            },
                        ])
                        .then((res) =>
                            db.updateEmpMan(employeeId, res.managerId)
                        )
                        .then(() => startQuestions());
                });
            });
    });
}

// Function that closes the application
function exit() {
    console.log('Ta ta for now!');
    process.exit();
}
