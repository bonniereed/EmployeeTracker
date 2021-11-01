USE workplace_db;

INSERT INTO
        department (department_name)
VALUES
        ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales ");

INSERT INTO
        emp_role (emp_role, salary, department_id)
VALUES
        ("Sales Lead", 100000, 1),
        ("Sales Person", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO
        employee (first_name, last_name, role_id, manager_id)
VALUES
        ('bonnie', 'reed', 1, 1),
        ('amanda', 'kunz', 2, 1),
        ('travis', 'reed', 3, 1),
        ('justin', 'kunz', 4, 1),
        ('artie', 'reed', 5, 1),
        ('asdf', 'asdf', 6, 1),
        ('asdf', 'asdf', 7, 1);