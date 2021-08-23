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
            viewEmployeesByRole();
            break;
  
          case "View All Employees By Department":
            viewEmployeeByDept();
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

  const viewEmployeesByRole = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;";
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      employeeTracker();
    });
  };

  const viewEmployeeByDept = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;`;
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
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "roleName",
          type: "input",
          message: "What is the Employee's Role?",
        },
        {
          name: "managerID",
          type: "input",
          message: "What is the Employees Manager ID?",
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
          message: "What is the Salary you would like to add?",
        },
        {
          name: "Department",
          type: "input",
          message: "What is the Department you would like to add?",
        },        
      ])
      .then((answer) => {
        console.log(answer)
        const title = answer.Title;
        const salary = answer.Salary;
        const departmentID = answer.Department;
        console.log(title, salary, departmentID)
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          employeeTracker();
        });
      });
  };

  employeeTracker();