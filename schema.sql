DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE product (
	item_id INTEGER NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) DEFAULT 0 NOT NULL,
    stock_quantity INTEGER(10) DEFAULT 0 NOT NULL,
	product_sales DECIMAL(20,2) DEFAULT 0 NULL,
    PRIMARY KEY(item_id)
);

CREATE TABLE department (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(20,2) DEFAULT 0 NULL,
    PRIMARY KEY(department_id)
);
