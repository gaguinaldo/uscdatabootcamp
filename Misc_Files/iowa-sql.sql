/*
GRANT AGUINALDO
*/

-- Which products come in packs larger than 12?
SELECT item_description
FROM products
WHERE pack > 12;

--Which products have a case price of less than $70?
SELECT item_description
FROM products
WHERE case_cost < 70

--Which products come in packs larger than 12 AND have a case_cost of less than $70?
SELECT *
FROM products
WHERE case_cost < 70 AND pack > 12;

/* Which types of products have a proof of 85 or more? */
SELECT *
FROM products
WHERE CAST(proof AS INT) >= 85;

/* How many unique products have less than 12 in a pack? */
SELECT DISTINCT item_description, pack
FROM products
WHERE pack < 12;

/* What is the total of number of bottles sold and the total cost of sales in our dataset? */
SELECT SUM(bottle_qty), SUM(total)
FROM sales;

/* How many stores are active (use store_status)? How many are inactive? */
SELECT COUNT(store)
FROM stores
WHERE store_status = 'A'

SELECT COUNT(store)
FROM stores
WHERE store_status = 'I'
/* 548 total stores are inactive*/

/* What is the sum of case_cost, shelf_price, and bottle_price per item_description for all scotch whiskies? For scotch whiskies and Canadian whiskies? */
SELECT SUM(CAST(bottle_price AS decimal)) as sum_bottle, SUM(shelf_price) as sum_shelf, SUM(case_cost) as sum_case, category_name, item_description
FROM products
WHERE category_name LIKE '%SCOTCH%' 
GROUP BY category_name, item_description
ORDER BY item_description

SELECT SUM(CAST(bottle_price AS decimal)) as sum_bottle, SUM(shelf_price) as sum_shelf, SUM(case_cost) as sum_case, category_name, item_description
FROM products
WHERE category_name LIKE '%SCOTCH%' OR category_name LIKE '%CANA%'
GROUP BY category_name, item_description
ORDER BY item_description

/* What is the average bottle price per vendor of Canadian whiskies? */
SELECT category_name, AVG(CAST(bottle_price AS decimal)) as ave_bottle_price, vendor_name
FROM products
WHERE category_name LIKE '%CANA%'
GROUP BY category_name, vendor_name
ORDER BY ave_bottle_price ASC
