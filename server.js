const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: '1qaz!QAZ',
    database: 'employee_tracker',
  });
  
  connection.connect((err) => {
    if (err) throw err;
  });

const employeeTracker = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
          "exit",
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case "View All Employees":
            viewEmployees();
            break;
  
          case "View All Roles":
            viewRoles();
            break;
  
          case "View All Departments":
            viewDepartments();
            break;
  
          case "Add Employee":
            addEmployee(answer);
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Add Department":
            addDepartment();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Exit":
            connection.end();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };

  const viewEmployees = () => {
      const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;";
      connection.query(query, (err, res) => {
          console.table(res);
          employeeTracker();
      });
  };

  const viewRoles = () => {
    const query = "SELECT * from role";
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      employeeTracker();
    });
  };

  const viewDepartments = () => {
    const query = `SELECT * from department`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      employeeTracker(); 
    });
  };

  const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the Employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the Employee's last name?",
        },
        {
          name: "roleName",
          type: "input",
          message: "What is the Employee's Role ID?",
        },
        {
          name: "managerID",
          type: "input",
          message: "What is the Employee's Manager ID?",
        }
      ])
      .then((answer) => {
        let firstName = answer.firstName;
        let lastName = answer.lastName;
        let roleName = answer.roleName;
        let managerID = answer.managerID;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${firstName}', '${lastName}', '${roleName}', '${managerID}')`;
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        });
        
      });
    
  };

  const addRole = () => {

    inquirer
      .prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the Title of the Role you would like to add?",
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary of this role?",
        },
        {
          name: "Department",
          type: "input",
          message: "What is the Department ID of this role?",
        },        
      ])
      .then((answer) => {
        const title = answer.Title;``
        const salary = answer.Salary;
        const departmentID = answer.Department;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        });
      });
  };

  const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: "Name",
          type: "input",
          message: "What is the Name of the Department you'd like to add?",
        },      
      ])
      .then((answer) => {
        const name = answer.Name;
        const query = `INSERT INTO department (name) VALUES ("${name}")`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        });
      });
  };

  const updateEmployeeRole = () => {
    inquirer
      .prompt([
        {
          name: "Employee",
          type: "input",
          message: "Which Employee ID would you like to update?"
        },
        {
          name: "Role",
          type: "input",
          message: "What is the new Role ID?"
        },
      ])
      .then((answer) => {
        let employee = answer.Employee;
        let role = answer.Role;
        const query = `UPDATE employee SET role_id = ${role} where id = ${employee}`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        });
      console.log(
        `${res.affectedRows} role for the employee has been updated!\n`
      );
    });
  };

  employeeTracker();