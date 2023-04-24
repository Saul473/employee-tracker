const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees_db",
});

function start() {
    inquirer.prompt({
        name: "prompt",
        type: "list",
        message: "What would you like to do?",
        choices:
            [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Quit"
            ],
    }).then(function (response) {
        switch (response.prompt) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "Quit":
                connection.end;
                break;
        }
    });
}

const viewDepartments = () => {
    let query = "SELECT * FROM DEPARTMENT"

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    let query = "SELECT role.title, role.salary, role.id, department.name FROM role RIGHT JOIN department ON role.department_id = department.id";

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewEmployees = () => {
    let query = "SELECT t1.first_name, t1.last_name, t2.first_name AS manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id = t2.id";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "last name?"
            },
            {
                name: "managerId",
                type: "input",
                message: "manager ID?"
            },
            {
                name: "addRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({
                        name: role.title,
                        value: role.id
                    }));
                },
                message: "What is the employee's role?",
            },
        ]).then(function (response) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    manager_id: response.managerId,
                    role_id: response.addRole,
                }),
                start();
        });
    });


};

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "employeeId",
                type: "input",
                message: "employee ID?"
            },
            {
                name: "updatedRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({
                        name: role.title,
                        value: role.id
                    }));
                },
                message: "What is the employee's new role?",
            }
        ]).then(function (response) {
            connection.query("UPDATE employee SET ? WHERE ?",
                [
                    { role_id: response.updatedRole },
                    { id: response.employeeId }
                ]);
                start();
        });
    });
};

const addDepartment = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        inquirer.prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "What department would you like to add?"
            }
        ]).then(function(response) {
            connection.query("INSERT INTO department SET ?",
            [
                { name: response.newDepartment}
            ]);
            start();
        });
    });
};

const addRole = () => {
    connection.query("SELECT * FROM department", function (err,res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "newRole",
                type: "input",
                message: "Which role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the annual salary?"
            },
            {
                name: "department",
                type: "list",
                choices: function () {
                    return res.map((department) => ({
                        name: department.name,
                        value: department.id
                    }));
                },
                message: "which department does this role belong in?"
            }
        ]).then(function (response) {
            connection.query("INSERT INTO role SET ?", {
                title: response.newRole,
                salary: response.salary,
                department_id: response.department
            });
            start();
        });
    });
};


start()

