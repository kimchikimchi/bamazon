/*
Then create a Node application called bamazonCustomer.js.
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
    getInventory();
});

//connection.end();
/*
Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

	item_id INTEGER NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id)
*/

function getInventory() {
    var query = "SELECT * FROM product";
    var listInventory = [];

    connection.query(query, function(err, res) {
        if (err) throw err;
        res.forEach( function(result) {
            //console.log(`ID: ${result.item_id} || NAME: ${result.product_name} || PRICE: ${result.price}`);
            listInventory.push({
                name: `ID: ${result.item_id} || NAME: ${result.product_name} || PRICE: ${result.price}`,
                value: result.item_id
            })
        });

        promptBuy(listInventory);
    });
}

/*
The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
*/

function promptBuy(list) {
    console.log(list);

    inquirer
        .prompt([
            {
                name: "item_id",
                type: "list",
                message: "Select the product you like to purchase: ",
                choices: list,
            },
            {
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
        .then(function(answer) {
            checkInventory(answer);
        });
}

/*
Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

When a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

*/

function checkInventory(product) {
    // console.log(product);
    var query = "SELECT * FROM product WHERE ?";
    connection.query(query, { item_id: product.item_id }, function(err, res) {
        // console.log(res);
        // Check whether we have anough in stock
        if (product.quantity > res[0].stock_quantity) {
            console.log(`Sorry.  We only have ${res[0].stock_quantity} in stock for ${res[0].product_name}`);

            connection.end();
        } else {
            console.log("Processing your order");
            product.newStockQuantity = res[0].stock_quantity - product.quantity;
            product.orderCost = res[0].price * product.quantity;
            product.product_sales += product.orderCost;
            processOrder(product);
        }
    });
}

function processOrder(product) {
    var query = "UPDATE product SET ? WHERE ?";
    connection.query(query,
                    [{
                        stock_quantity: product.newStockQuantity,
                        product_sales: product.product_sales,
                    },
                    {
                         item_id: product.item_id
                    }],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows);
                        console.log(`Order Processed: Your total cost is \$${product.orderCost}`);

                        connection.end();
                    });
}
