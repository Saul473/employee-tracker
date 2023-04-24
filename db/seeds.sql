
INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Information Systems"),
       ("Information Technology"),
       ("Finance"),
       ("Titles"),
       ("Corporate Underwriting"),
       ("Online and Mobile");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 78000, 1),
       ("IS Helpdesk", 68000, 2),
       ("IT Helpdesk", 48000, 3),
       ("Accountant", 103900, 4),
       ("Title Processor", 52000, 5),
       ("Loan Underwriter", 57000, 6),
       ("Mobile Representative", 45000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Happi", "Ny", 1, NULL),
       ("Bla", "Stoise", 5, 1),
       ("Staka", "Taka", 2, 1),
       ("Celeste", "Ela", 2, 1),
       ("Chari", "Zard", 4, 1),
       ("Toto", "Dile", 6, 1),
       ("Venus", "Aur", 7, 1);
