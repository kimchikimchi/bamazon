/*
Create a new Node application called bamazonManager.js.
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
    List a set of menu options:
        View Products for Sale
        View Low Inventory
        Add to Inventory
        Add New Product
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
                    name: 'View Products for Sale',
                    value: 'viewProducts'
                }, {
                    name: 'View Low Inventory',
                    value: 'viewLowInventory'
                }, {
                    name: 'Add to Inventory',
                    value: 'addInventory'
                }, {
                    name: 'Add New Product',
                    value: 'addNewProduct'
                }
            ]
        }
        ])
        .then(function(answer) {
            //console.log(answer);
            switch (answer.action) {
                case 'viewProducts':
                    viewProducts();
                    break;
                case 'viewLowInventory':
                    viewLowInventory();
                    break;
                case 'addInventory':
                    addInventory();
                    break;
                case 'addNewProduct':
                    addNewProduct();
                    break;
                default:
            }

        });
}

/*
    If a manager selects View Products for Sale, the app should list every
     available item: the item IDs, names, prices, and quantities.
*/
function viewProducts(qualifier) {
    var query = "SELECT * FROM product " + qualifier;
    //console.log(query);
    connection.query(query, function(err, res) {
        if (err) throw err;

        res.forEach( function(result) {
            console.log(`ID: ${result.item_id} || NAME: ${result.product_name} || PRICE: ${result.price} || QUANTITY: ${result.stock_quantity}`);
        });
    });
}

/*
    If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
*/
function viewLowInventory() {
    // Why duplicate code when you don't have to?
    viewProducts("WHERE stock_quantity < 5")
}

/*
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
*/
function addInventory() {
    inquirer
    .prompt([
        {

        }, {
            name: "quantity",
            type: "input",
            message: "Enter how many units you want to buy: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ])
    .then(function() {


    });
}


/*
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
*/
function addNewProduct() {
    inquirer
    .prompt([
        {

        }, {
            name: "quantity",
            type: "input",
            message: "Enter how many units you want to buy: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ])
    .then(function() {


    });
}
