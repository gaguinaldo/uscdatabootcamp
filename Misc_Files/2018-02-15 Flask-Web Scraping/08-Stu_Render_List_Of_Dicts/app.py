# import necessary libraries
from flask import Flask, render_template

# @TODO: Initialize your Flask app here
# CODE GOES HERE

# @TODO:  Create a route and view function that takes in a list of dictionaries and renders an index.html template
# CODE GOES HERE

app = Flask(__name__)

@app.route('/')
def index():

    hurricane_data = [

        {"name": 'Harvey',
        "cat": 'Category 4'},

        {"name": 'Irma',
        "cat": 'Category 5'}]

    return render_template('index.html', list_dict = hurricane_data)

if __name__ == "__main__":
    app.run(debug=True)
