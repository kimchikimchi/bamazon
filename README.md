# bamazon
Node.js CLI simulating online retail inventory and ordering

## Overview
This is a command line Node.js program with MySQL backend to store tables.

### Prerequisites
- MySQL running locally
- DB schemas are created and populated by running \*.sql
- Run 'npm install' to install required npm packages

### Instructions
node ./bamazonCustomer.js
- Order a merchandize

node ./bamazonManager.js
- View list of products for sale.
- View list of products for sale less than 5 in units
- Add more units to the existing list of products for sale
- Add new product for sales

node./bamazonSupervisor.js
- View sales by departments
- Add a new departments
