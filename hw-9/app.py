import datetime
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

connection_string = 'sqlite:///hawaii.sqlite'
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
Hawaii = Base.classes.hawaii_data
session = Session(engine)
app = Flask(__name__)


@app.route('/stations')
def stations():
    results = list(np.ravel(session.query(Hawaii.name).all()))
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
