from .db_session import SqlAlchemyBase
import sqlalchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin


class Measure(SqlAlchemyBase,UserMixin, SerializerMixin):
    __tablename__ = 'cans'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    value = sqlalchemy.Column(sqlalchemy.Integer, nullable=True)


class Can(SqlAlchemyBase, UserMixin, SerializerMixin):
    __tablename__ = 'info'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    lon = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    lat = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    zone = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    wifiName = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    wifiPassword = sqlalchemy.Column(sqlalchemy.String, nullable=True)


