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
function viewProducts() {
    var query = "SELECT * FROM product ";
    queryProducts(query);
}

/*
    If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
*/
function viewLowInventory() {
    // Why duplicate code when you don't have to?
    queryProducts("SELECT * FROM product WHERE stock_quantity < 5");
}


/*
If a manager selects Add to Inventory, your app should display a prompt that
will let the manager "add more" of any item currently in the store.
*/
function addInventory() {
    var query = "SELECT * FROM product ";
    var addingInventory = true;
    // Set the second param to true to trigger list that can be selected
    queryProducts(query, addingInventory);
}

/*
    Helper function for both checking inventory and displaying items to add more units to.
    Second arg determins it's just to display the info to console *OR*
    turn it into a seletible menu item.
*/
function queryProducts(query, isListSelectable) {
    var listInventory = [];

    connection.query(query, function(err, res) {
        if (err) throw err;

        //console.log("Here are items for sale");
        //console.log("======================================================");
        res.forEach( function(result) {
            //console.log(`ID: ${result.item_id} || NAME: ${result.product_name} || PRICE: ${result.price} || QUANTITY: ${result.stock_quantity}`);
            listInventory.push({
                item_id: result.item_id,
                product_name: result.product_name,
                price: result.price,
                stock_quantity: result.stock_quantity
            });
        });

        if (isListSelectable) {
            addProductDetail(listInventory);
        } else {
            printProducts(listInventory);
        }
    });
}

function printProducts(list) {
    console.log("Here are items for sale");
    console.log("======================================================");
    list.forEach( function(product) {
        console.log(`ID: ${product.item_id} || NAME: ${product.product_name} || PRICE: ${product.price} || QUANTITY: ${product.stock_quantity}`);
    });

    listMenu();
    //connection.end();
}

/*
    Handles logic to replenish existing sale items in stock
*/

function addProductDetail(list) {
    var choices = [];

    list.forEach( function (product) {
        choices.push({
            name: `ID: ${product.item_id} || NAME: ${product.product_name} || PRICE: ${product.price} || QUANTITY: ${product.stock_quantity}`,
            value: product.item_id
        })
    });

    inquirer
    .prompt([
        {
            name: "item_id",
            type: "list",
            message: "Select the product you like to add more: ",
            choices: choices
        }, {
            name: "quantity",
            type: "input",
            message: "Enter how many units you want to add: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {
        /*
        HOW to do update and select within a query at the same time.
        https://stackoverflow.com/questions/25266878/update-row-with-select-on-same-table?rq=1
        */
        var query = "UPDATE product JOIN " +
                    "   (SELECT item_id, stock_quantity FROM product p WHERE ?) " +
                    "   current_product " +
                    "ON product.item_id = current_product.item_id "  +
                    `SET product.stock_quantity = current_product.stock_quantity + ${answer.quantity} ` +
                    "WHERE ?"
                    ;
        connection.query(query,
                        [{ item_id: answer.item_id }, { 'product.item_id': answer.item_id }],
                        function(err, res) {
                            if (err) throw err;
                            console.log(`Inventory has been added to Item # ${answer.item_id}`);
                        });
        console.log(`Added ${answer.quantity} more item(s) for Item ID ${answer.item_id}`);
        listMenu();
        //connection.end();
    });


}


/*
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
*/
function addNewProduct() {
    inquirer
    .prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter ID for the product you like to create: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                // To Do: should check whether ID entered is valid
                return false;
            }
        }, {
            name: "product_name",
            type: "input",
            message: "Enter the product name: ",
        }, {
            name: "department_name",
            type: "input",
            message: "Enter the department name: ",
        }, {
            name: "price",
            type: "input",
            message: "Enter the unit price in dollars and cents: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                // To Do: should check whether ID entered is valid
                return false;
            }
        }, {
            name: "stock_quantity",
            type: "input",
            message: "Enter the number of units: ",
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
        var query = "INSERT INTO product SET ?";
        connection.query(
            query,
            {
                item_id: answer.item_id,
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            },
            function(err, res) {
                if (err) throw err;

                console.log(`New product has been added for item_id: ${answer.item_id}`);
                listMenu();
                //connection.end();
            });
    });
}
