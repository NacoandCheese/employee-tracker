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
                            console.log(value.roles);
                        });

                        // startPrompt();
                    } else {
                        console.log(error)
                    }
                });
        } else if (answer.userResponse === 'View all Employees') {
            console.log("User want to view all employess")
        } else if (answer.userResponse === 'Exit') {
            console.log('Closing database connection')
            connection.end()
        }
    })
}



