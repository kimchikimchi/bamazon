/*
Create another Node app called bamazonSupervisor.js.
*/

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    listMenu();
});

/*
Running this application will list a set of menu options:
View Product Sales by Department
Create New Department
*/
function listMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select a choice',
            choices: [
                {
                    name: 'View Product Sales by Department',
                    value: 'viewSalesByDept'
                }, {
                    name: 'Create New Department',
                    value: 'createNewDept'
                }

            ]
        }
    ])
    .then(function(answer) {
        switch (answer.action) {
            case 'viewSalesByDept':
                viewSalesByDept();
                break;
            case 'createNewDept':
                createNewDept();
                break;
            default:
        }
    });
}

/*
When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

department_id	department_name	over_head_costs	product_sales	total_profit
01	Electronics	10000	20000	10000
02	Clothing	60000	100000	40000

The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.


Hint: You may need to look into aliases in MySQL.
Hint: You may need to look into GROUP BYs.
Hint: You may need to look into JOINS.
HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)
*/
function viewSalesByDept() {

}

function createNewDept() {

    
}
