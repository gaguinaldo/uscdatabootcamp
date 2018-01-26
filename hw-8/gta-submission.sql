/* 1a. Display the first and last names of all actors from the table actor. */
SELECT first_name, last_name
FROM actor;

/* 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name. */
SELECT first_name, last_name, CONCAT(first_name , ' ' ,  last_name) as Actor_Name
FROM actor;

/*2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?*/
SELECT actor_id, first_name, last_name
FROM actor
WHERE first_name = 'JOE';

/* 2b. Find all actors whose last name contain the letters GEN: */
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name LIKE '%GEN%';

/*2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order: */
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name LIKE '%LI%'
ORDER BY last_name ASC;

/* 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China: */
SELECT country_id, country
FROM country
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

/* 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type. */
ALTER TABLE actor 
ADD middle VARCHAR(50);
DESCRIBE actor;

/* 3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs. */
ALTER TABLE actor
CHANGE middle blobs VARCHAR(50);
DESCRIBE actor;

/* 3c. Now delete the middle_name column.*/
ALTER TABLE actor
DROP blobs;
DESCRIBE actor;

/* 4a. List the last names of actors, as well as how many actors have that last name.*/
SELECT last_name, count(last_name) 
FROM actor
GROUP BY last_name;

/* 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors */
SELECT last_name, count(last_name) AS ct_last_name
FROM actor
GROUP BY last_name
HAVING ct_last_name > 2;

/* 4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record. */

/* 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO MUCHO GROUCHO, HOWEVER! (Hint: update the record using a unique identifier.) */

/* 5a. You cannot locate the schema of the address table. Which query would you use to re-create it? */

/* 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:*/ 

/* 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment. */

/* 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join. */

/* 6d. How many copies of the film Hunchback Impossible exist in the inventory system? */

/* 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:

    ![Total amount paid](Images/total_payment.png) */

/* 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of movies starting with the letters K and Q whose language is English. */

/* 7b. Use subqueries to display all actors who appear in the film Alone Trip.*/

/* 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information. */

/* 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films. */

/* 7e. Display the most frequently rented movies in descending order. */

/* 7f. Write a query to display how much business, in dollars, each store brought in. */

/* 7g. Write a query to display for each store its store ID, city, and country */

/* 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.) */

/* 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view. */

/* 8b. How would you display the view that you created in 8a? */

/* 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.*/
