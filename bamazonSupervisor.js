/*
Create another Node app called bamazonSupervisor.js.
*/

var inquirer = require("inquirer");
var mysql = require("mysql");
const {table} = require("table");  // https://www.npmjs.com/package/table

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
*/
function viewSalesByDept() {
    // It's generally faster to do calculation within DB, if possible.
    var query = "SELECT department_id, d.department_name, over_head_costs, SUM(p.product_sales) AS department_sales, (SUM(p.product_sales) - over_head_costs) AS total_profit  " +
                "FROM department d " +
                "LEFT JOIN product p ON LOWER(d.department_name) = LOWER(p.department_name) " +
                "GROUP BY department_id, d.department_name, over_head_costs ";

    var data = [
        ['department_id', 'department_name', 'over_head_costs', 'department_sales', 'total_profit']
    ];

    connection.query(query, function(err, res) {
        if (err) throw err;

        res.forEach(function(result) {

            data.push([
                result.department_id,
                result.department_name,
                result.over_head_costs,
                result.department_sales,
                result.total_profit
            ])
        });

        console.log(table(data));
        //connection.end();
        listMenu();
    });

}

function createNewDept() {
    inquirer
    .prompt([
        {
            name: "department_name",
            type: "input",
            message: "Enter the department name: ",
        }, {
            name: "over_head_costs",
            type: "input",
            message: "Enter the over head costs in dollars and cents: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                // To Do: should check whether ID entered is valid
                return false;
            }
        }
    ])
    .then(function(answer) {
        //console.log(answer);
        var query = "INSERT INTO department SET ?";
        connection.query(
            query,
            {
                department_name: answer.department_name,
                over_head_costs: answer.over_head_costs,
            },
            function(err, res) {
                if (err) throw err;

                console.log(`New department has been added`);
                //connection.end();
                listMenu();
            });

    });
}
