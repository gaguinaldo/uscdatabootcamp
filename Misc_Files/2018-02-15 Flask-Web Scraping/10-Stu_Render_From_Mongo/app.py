from flask import Flask, render_template
import pymongo

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.hurricane

#Drop database if it exists.
client.drop_database('hurricane')

#Create new database.
db = client.hurricane

collection = db.hurricane

post =     [{'name': 'Harvey',
            'cat': 'Category 4'},

            {'name': 'Irma',
            'cat': 'Category 5'}]

db.collection.insert_many(post)
    # @TODO: create a list of dictionaries to insert into the db

@app.route('/')
def index():
    # @TODO: write a statement that finds all the items in the db and sets it to a variable
    # CODE GOES HERE
    hurricaneData = list(db.collection.find())
    print(hurricaneData)

    # @TODO: render an index.html template and pass it the data you retrieved from the database
    return render_template('index.html', hurricane=hurricaneData)

if __name__ == "__main__":
    app.run(debug=True)
