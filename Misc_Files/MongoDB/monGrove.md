#Instructions:

Use Pymongo to create a `fruits_db` database, and a `fruits` collection.

Into that collection, insert two documents of fruit shipments received by your supermarket. They should contain the following information: vendor name, type of fruit, quantity received, and ripeness rating (1 for unripe, 2 for ripe, 3 for over-ripe).

Because not every supermarket employee is versed in using MongoDB, your task is to build an easy-to-use app that can be run from the console.

Build a Python script that asks the user for the above information, then inserts a document into a MongoDB database.

It would be good to Modify the app so that when the record is entered, the current date and time is automatically inserted into the document.

Hint:

Consult the documentation on the `datetime` library.
