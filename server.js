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
    employeeTracker();
  });

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
      const query = "SELECT employee.id from employee";
      connection.query(query, (err, res) => {
          console.table(res);
          employeeTracker();
      });
  };

  employeeTracker();