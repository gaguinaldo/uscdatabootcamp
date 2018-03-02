from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, Query

engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite', convert_unicode=True, echo=False)
Base = declarative_base()
Base.metadata.reflect(engine)

# https://stackoverflow.com/questions/17652937/how-to-build-a-flask-application-around-an-already-existing-database


class Otu(Base):
    __table__ = Base.metadata.tables['otu']


class Samples(Base):
    __table__ = Base.metadata.tables['samples']


class SamplesMetadata(Base):
    __table__ = Base.metadata.tables['samples_metadata']


# bb_database = scoped_session(sessionmaker(bind=engine))
# for item in bb_database.query(Samples.BB_940):
#     print(item)
