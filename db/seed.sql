use employee_tracker;

INSERT INTO department
    (name)
VALUES
    ('IT'),
    ('Accounting'),
    ('Operations'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Help Desk 1', 55000, 1),
    ('Help Desk Manager', 80000, 1),
    ('CFO', 150000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Owens", 2, NULL), ("Catherine", "Owens", 3, NULL), ("Bob", "Smith", 1, 2);