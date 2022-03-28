//Import inquirer
const inquirer = require('inquirer');
//Import mysql
const mysql = require('mysql2');
//Import console table
const cTable = require('console.table');

//Connection to the employees sql server
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees'
    },
);
//Connection to the database. This is a function
connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to the employee database.')


    startPrompt()
});

// ASK USER  view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const startPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'userResponse',
            message: 'Select one to view :',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Would you like to add a department?',
                'Would you like to add a role?',

                'Exit'
            ]
        }


        //.then is a promise. Once user answers promise will be delivered.   
    ]).then((answer) => {

        // if user chooses to view all departments, then answer.userResponse = 'View all Departments'

        //answers return data type object
        console.log(answer.userResponse);
        //evaluate the value of answer.userResponse
        if (answer.userResponse === 'View all Departments') {
            //Make a sql query to get the data from the departments
            connection.query('SELECT * FROM department',
                (error, res) => {
                    //if successful response 
                    if (res) {
                        //res is an array of objects. Loop to access array
                        res.forEach(function (value) {
                            console.log(value.department_name);
                        });

                        // run program again
                        startPrompt();

                    } else {
                        console.log(error)
                    }
                });
        } else if (answer.userResponse === 'View all Roles') {
            connection.query('SELECT * FROM roles',
                (error, res) => {
                    if (res) {
                        res.forEach(function (value) {
                            console.log(
                                value.title,
                                value.salary,
                                value.department_id);
                        });

                        startPrompt();
                    } else {
                        console.log(error)
                    }
                });
        } else if (answer.userResponse === 'View all Employees') {
            connection.query('SELECT * FROM employee',
             (error, res) => {
                 if (res) {
                     res.forEach(function (value) {
                        console.log(
                            value.first_name, 
                            value.last_name 
                            )
                     })
                 }
             })
        } else if (answer.userResponse === 'Exit') {
            console.log('Closing database connection')
            connection.end()
        } else if (answer.userResponse === 'Would you like to add a department?') {
            inquirer.prompt({
                type: 'input',
                name: 'userResponse',
                message: 'What department would you like to add?'
            }).then((answer) => {
                console.log('The user has just added a new department:', answer.userResponse)
                connection.query(`INSERT INTO department (department_name) VALUES ('${answer.userResponse}')`)

                startPrompt();
                
            }) 

            
        } else if (answer.userResponse === 'Would you like to add a role?') {
            inquirer.prompt({
                type: 'input',
                name: 'userResponse',
                message: 'What role would you like to add?'
            }).then((answer) => {
                console.log('The user has just added a new role:', answer.userResponse)
                connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.userResponse}', '50000', 1)`)
            })
        }
    })
}




// console.log("hello world")
// console.log("hello", "world", "this", "works", "too")

// const x = 10
// const y = 20

// console.log("variable x = ", x, "variable y = ", y)