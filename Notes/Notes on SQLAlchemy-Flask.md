### General Notes on SQLAlchemy and Flask

In general, sqlalchemy, is a framework that is used to work with sql databases using python.  Using the framework, it is possible to read and write to a sql database from within the python code itself. 

Further, using sqlchemy, it is possible to query a database and send the data directly into a pandas dataframe for further analysis.  In addition, it is also possible to use sqlalchemy and the Flask web framework to develop APIs that can be used to provide data to other end users. 

Sqlalchemy is an ORM and more infomration about an ORM can be found [here](https://stackoverflow.com/questions/1279613/what-is-an-orm-and-where-can-i-learn-more-about-it).

***

Updated tables using sqlalchemy (	`session.query(`, `session.commit`)

Completed query using sqlalchemy orm (use of `.filter` and `.filter_by`)

Mapping a table via creating a class.

Mapping a table by reflection and `base_map`.

Query the SQL database using the insepctor in the ORM. `inspector.`.  A list of attrubutes can be used to further query the dateabase. 

SQLite is a serverless database that must be in the same folder as the python code.

Setting up the flask framework to create routes and API.  When creating an API using flask, the outout from the query must be a dictonary.  Use `jsonify` to send to the API. 

Working with date in sqlalchemy. 

***
