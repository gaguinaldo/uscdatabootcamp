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


@app.route("/api/v1.0/<start>")
@app.route("/api/v1.0/<start>/<end>")
def min_max_temperature(start, end='2017-08-23'):

    def get_temp_date(start_date, end_date):
        temp_query = session.query(Hawaii.tobs).filter(Hawaii.date_format >= start_date, Hawaii.date_format <= end_date).all()

        min_temp = np.min(temp_query)
        avg_temp = np.average(temp_query)
        max_temp = np.max(temp_query)

        return min_temp, max_temp, avg_temp

    min_temp, max_temp, avg_temp = get_temp_date(start, end)

    temp_dict = {"minimum_temperature": min_temp.astype(float), "average_temperature": avg_temp.astype(float), "maximum_temperature": max_temp.astype(float)}
    return jsonify(temp_dict)


if __name__ == "__main__":
    app.run(debug=True)
