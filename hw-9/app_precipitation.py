import datetime as dt
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


@app.route('/api/v1.0/precipitation')
def precipitation():

    prcp_query = session.query(Hawaii.date_format, Hawaii.prcp).filter(Hawaii.date_format >= (dt.date.today() - dt.timedelta(days=365))).all()

    prcp_dict = {}

    for date, prcp in prcp_query:
        prcp_dict.update({str(date): prcp})

    return jsonify(prcp_dict)


if __name__ == "__main__":
    app.run(debug=True)
