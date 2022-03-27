INSERT INTO department (name)
VALUES
('Engineer'),
('Sales'),
('Finance'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
('Engineer', 70000, 1),
('Engineer Intern', 25000, 1),
('Sales Manager', 100000, 2),
('Sales Intern', 50000, 2),
('Finance Manager', 125000, 3),
('Finance Intern', 75000, 3),
('Marketing Manager', 150000, 4),
('Marketing Intern', 100000,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Derek', 'Jeter', 1, NULL),
('Aaron', 'Judge', 1, NULL),
('DJ', 'LeMahieu', 2, 2),
('Gleyber', 'Torres', 2, NULL),
('Giancarlo', 'Stanton', 3, 3),
('Joey', 'Gallo', 3, NULL),
('Brian', 'Cashman', 4, 4),
('Garret', 'Cole', 4, NULL);
