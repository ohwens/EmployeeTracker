const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection.js");
require("console.table");

const employeeTracker = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Role",
          "View All Employees By Department",
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
  
          case "View All Employees By Role":
            employeesByRole();
            break;
  
          case "View All Employees By Department":
            employeeByDept();
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
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;"
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      employeeTracker();
    });
  
  };

  employeeTracker();