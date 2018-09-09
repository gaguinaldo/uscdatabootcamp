/*********************************
GRANT AGUINALDO
SQL 
Iowa Liquor Sales Database
*********************************/

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

/* Which products have a case cost of more than $100? */
SELECT *
FROM products
WHERE case_cost > 100

/* Which tequilas have a case cost of more than $100? */
SELECT *
FROM products
WHERE category_name LIKE '%TEQUILA%' AND case_cost > 100

/*Which tequilas or scotch whiskies have a case cost of more than $100? */
SELECT *
FROM products
WHERE category_name LIKE '%TEQUILA%' OR category_name LIKE '%SCOTCH'

/* Which tequilas or scotch whiskies have a case cost between $100 and $120? */
SELECT *
FROM products
WHERE category_name LIKE '%TEQUILA%' OR category_name LIKE '%SCOTCH' AND (case_cost BETWEEN 100 AND 120)

/* Which whiskies of any kind cost more than $100? */
SELECT *
FROM products
WHERE category_name LIKE '%WHISK%' AND (case_cost > 100 OR shelf_price > 100 OR CAST(bottle_price AS DECIMAL) > 100)

/* Which whiskies of any kind cost between $100 and $150? */
SELECT DISTINCT item_description
FROM products
WHERE category_name LIKE '%WHISK%' AND (CAST(bottle_price AS DECIMAL) BETWEEN 100 AND 150)

/* Which products except tequilas cost between $100 and $120? */
SELECT DISTINCT item_description
FROM products
WHERE category_name NOT LIKE '%TEQUILA%' AND (CAST(bottle_price AS DECIMAL) BETWEEN 100 AND 120)

/* From the Iowa Liquor Database I only want information about vendor 305. Can you get me the bottle price and proof? Price should be less than 5 OR the proof is greater than 100, either is fine. */

/* Price less than 5 */
SELECT *
FROM products
where vendor = 305 AND (CAST(bottle_price AS DECIMAL) < 5)

/* Proof greater than 100 */
SELECT *
FROM products
where vendor = 305  AND (CAST(proof AS INT) > 100)

/* Find the item description with the highest and lowest total sales for each store.  */
SELECT SUM(total) AS total_sales, description, store
FROM sales
GROUP BY description, store
ORDER BY store

/* Calculate the markup percentage for each item*/
SELECT 
description, 
CAST(state_btl_cost AS DECIMAL), 
CAST(btl_price AS DECIMAL),
((CAST(btl_price AS DECIMAL) -  CAST(state_btl_cost AS DECIMAL)) / CAST(btl_price AS DECIMAL) ) * 100 as pct_markup
FROM sales
LIMIT 1000
