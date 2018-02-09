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


@app.route('/api/v1.0/tobs')
def tobs():

    temp_query = session.query(Hawaii.date_format, Hawaii.tobs).filter(Hawaii.date_format >= '2016-08-23', Hawaii.date_format <= '2017-08-23').all()
    temp_df = pd.DataFrame(temp_query).rename(columns={'tobs': 'temperature_observations'})
    temp_df['temperature_observations'] = temp_df['temperature_observations'].astype(float)
    temp_df['date_format'] = temp_df['date_format'].astype(str)

    new_df = temp_df.set_index('date_format')

    temp_dic = new_df.to_dict()

    return jsonify(temp_dic)


if __name__ == "__main__":
    app.run(debug=True)
