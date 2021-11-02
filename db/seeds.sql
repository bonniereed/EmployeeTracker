USE workplace_db;

INSERT INTO
        department (department_name)
VALUES
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO
        emp_role (emp_role, salary, department_id)
VALUES
        ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO
        employee (first_name, last_name, role_id, manager_id)
VALUES
        ('Norm', 'McCoy', 1, NULL),
        ('David', 'Pumpkins', 2, 1),
        ('Steve', 'Jobs', 3, NULL),
        ('Wes', 'Anderson', 4, 3),
        ('Jack', 'Black', 5, NULL),
        ('Whip', 'Lash', 6, 5),
        ('John', 'Truman', 7, NULL),
        ('Jimi', 'Hendrix', 8, 7);