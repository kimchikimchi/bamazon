/*
-- Query: SELECT * FROM bamazon.product
-- Date: 2018-09-23 15:49
*/
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (1,'Avatar','Movies',1.77,49);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (2,'Tent','Outdoors',2.95,55);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (3,'Lotion','Beauty',5.09,4);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (4,'Stuffed Bear','Kids',8.15,19);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (5,'Smoked Oysters','Grocery',2.98,65);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (6,'1984','Books',3.50,69);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (7,'Multi Vitamins','Health',5.59,14);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (8,'Jet Engine','Industrial',2.38,80);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (9,'Michael Jackson','Music',2.90,22);
INSERT INTO `product` (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`) VALUES (10,'MacBook Air','Computers',3.21,60);


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
