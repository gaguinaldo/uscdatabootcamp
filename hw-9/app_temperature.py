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

    temp_query = session.query(Hawaii.tobs).filter(Hawaii.date_format >= (dt.date.today() - dt.timedelta(days=365))).all()

    flat_temp = list(np.ravel(temp_query))

    return jsonify(flat_temp)

    #   Produces an error that reads 'TypeError: Object of type 'int64' is not JSON serializable'
    #   https://github.com/grantaguinaldo/uscdatabootcamp/blob/master/Misc_Files/app_temp_error_2.pdf


if __name__ == "__main__":
    app.run(debug=True)
