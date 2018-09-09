# import necessary libraries
from flask import Flask, render_template

# @TODO: Initialize your Flask app here
# CODE GOES HERE

# @TODO:  Create a route and view function that takes in a list of strings and renders index.html template
# CODE GOES HERE

app = Flask(__name__)

name = ['Lora Chang', 'Grant Aguinaldo']

@app.route('/')
def index():
    return render_template('index.html', list = name)

if __name__ == "__main__":
    app.run(debug=True)
