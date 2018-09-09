from sqlalchemy import create_engine
import pymysql
import pandas as pd
pymysql.install_as_MySQLdb()

'''
	Connection string is built as follows:

	dialect://username:password@fullendpoint/database_name

	dialect: 		The sql dialect that is being used.
	username:		The username to log into the database.
	password:  		The password used to log into the database.
	fullendpoint:	The address of the endpoint to the SQL database
	database_name:	The name of the database that you want to connect to at
					the end point.

					It's best to have the connection string stored in a variable and used as needed. 

	Documentation:	http://docs.sqlalchemy.org/en/latest/orm/tutorial.html
					https://www.youtube.com/watch?v=Tu4vRU4lt6k
'''

connection_string = 'mysql://root:grant@localhost/sakila'

engine = create_engine(connection_string)

query = ''' 
            SELECT * 
            FROM actor 
            LIMIT 10
        '''

data = engine.execute(query)

#Prints out the data in the query.
for record in data:
	print(record)

#Use the following to view the data in a Pandas dataframe.
conn = engine.connect()
data = pd.read_sql("SELECT * FROM film LIMIT 10;", conn)
data.head()

#----------------------------------------------------------

'''
	To connect and write to a SQL table, follow the instructions below

'''

from sqlalchemy import create_engine #Connect to database
from sqlalchemy.ext.declarative import declarative_base #Classes into Tables
from sqlalchemy import Column, Integer, String, Float #Declare column types
import pymysql
pymysql.install_as_MySQLdb()

Base = declarative_base() #Oject that uses the default for the declarative_base

class Dog(Base):								#Create table name and schema
    __tablename__ = 'Dog'
    id = Column(Integer, primary_key = True)	
    name = Column(String(255))
    color = Column(String(255))
    age = Column(Integer)  
    
class Cat(Base):
    __tablename__ = 'Cat'
    id = Column(Integer, primary_key = True)
    name = Column(String(255))
    color = Column(String(255))
    age = Column(Integer)  

dog = Dog(name = 'Fido', color = 'Brown', age = 4)	#Enter data into table.
cat = Cat(name = 'Grumpy', color = 'Gray', age = 7)

end_point = 'mysql://root:grant@localhost/pets' #Define endpoint

engine = create_engine(end_point)

conn = engine.connect()

Base.metadata.create_all(engine)

from sqlalchemy.orm import Session
session = Session(bind=engine)

session.add(dog)
session.add(cat)
session.commit()

dog_list = session.query(Dog)

for doggie in dog_list:
    print(doggie.name)
