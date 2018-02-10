import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

#-----------------------------------------------------
# Reading in a SQL database
connection_string = 'sqlite:///hawaii.sqlite'
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Hawaii = Base.classes.hawaii_data
session = Session(engine)

#-----------------------------------------------------
# Print out first row in the database
first_row = session.query(Hawaii).first()
first_row.__dict__


#-----------------------------------------------------
# Using the inspector to further query the database.
# Changes the attrubutes for the database.
inspector = inspect(engine)
columns = inspector.get_columns('hawaii_data')
for each in columns:
    print(each['name'], each['type'])


#-----------------------------------------------------
# Query in ANSI sql and send data into a Pandas dataframe.
conn = engine.connect()

query = """
        select *
        from hawaii_data
        WHERE (date_format BETWEEN '2016-08-23 00:00:00.000000' AND '2017-08-23 00:00:00.000000')
        """

df_12 = pd.read_sql(query, conn)

df_12.head()
