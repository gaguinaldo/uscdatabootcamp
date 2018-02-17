# import necessary libraries
from flask import Flask, render_template

# @TODO: Initialize your Flask app here
# CODE GOES HERE

# @TODO:  Create a route and view function that takes in a dictionary and renders index.html template
# CODE GOES HERE

app = Flask(__name__)

@app.route('/')
def index():
    hurricane_dict = {'hurricane_1': 'Grant Aguinaldo',
                    'hurricane_2': 'Lora Chang'}
    return render_template('index.html', dict = hurricane_dict)


if __name__ == "__main__":
    app.run(debug=True)
