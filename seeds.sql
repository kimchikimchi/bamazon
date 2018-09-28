/*
-- Query: SELECT * FROM bamazon.product
-- Date: 2018-09-23 15:49
*/
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (1,'Avatar','Movies',1.77, 49, 50);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (2,'Tent','Outdoors',2.95,55, 300);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (3,'Lotion','Beauty',5.09,4, 20);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (4,'Stuffed Bear','Kids',8.15,19,350);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (5,'Smoked Oysters','Grocery',2.98,65,500);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (6,'1984','Books',3.50,69,70);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (7,'Multi Vitamins','Health',5.59,14,200);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (8,'Jet Engine','Industrial',2.38,80, 2000);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (9,'Michael Jackson','Music',2.90,22, 503);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (10,'MacBook Air','Computers',3.21,60,5000);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`, `product_sales`) VALUES (11,'Time Magazine','Books',5.00,2,900);


INSERT INTO department (department_name, over_head_costs) VALUES ('Movies', 100);
INSERT INTO department (department_name, over_head_costs) VALUES ('Outdoors', 30);
INSERT INTO department (department_name, over_head_costs) VALUES ('Beauty', 150);
INSERT INTO department (department_name, over_head_costs) VALUES ('Kids', 50);
INSERT INTO department (department_name, over_head_costs) VALUES ('Grocery', 500);
INSERT INTO department (department_name, over_head_costs) VALUES ('Books', 100);
INSERT INTO department (department_name, over_head_costs) VALUES ('Health', 100);
INSERT INTO department (department_name, over_head_costs) VALUES ('Industrial', 500);
INSERT INTO department (department_name, over_head_costs) VALUES ('Music', 50);
INSERT INTO department (department_name, over_head_costs) VALUES ('Computers', 100);
