from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
import psycopg2

end_point = '[INSERT HEROKU CLI HERE]'
engine = create_engine(end_point)
Base.metadata.create_all(engine)
session = Session(bind=engine) 

class Garbage(Base):
    __tablename__ = 'garbage_collection'
    id = Column(Integer, primary_key=True)
    item = Column(String(255))
    weight = Column(Float)
    collector = Column(String(255))
    
garbage_one = Garbage(item="Sofa", weight=90.5, collector="Jacob")
session.add(garbage_one)
session.commit()

data = session.query(Garbage)

for each in data:
    print(each.item)
