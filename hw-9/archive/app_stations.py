from datetime import datetime, timedelta
import numpy as np
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

app = Flask(__name__)

connection_string = 'sqlite:///hawaii.sqlite'
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
Hawaii = Base.classes.hawaii_data
session = Session(engine)


@app.route('/api/v1.0/stations')
def stations():

    results = list(np.ravel(session.query(Hawaii.name).distinct().all()))

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
