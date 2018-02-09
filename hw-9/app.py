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

    active_query = session.query(Hawaii.station, func.count(Hawaii.tobs)).group_by(Hawaii.station).order_by(Hawaii.tobs.desc()).all()

    df_dict = pd.DataFrame(active_query, columns={'station_name', 'count'}).set_index('station_name').to_dict()

    return jsonify(df_dict)


if __name__ == "__main__":
    app.run(debug=True)
