from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
# from wtforms.validators import DataRequired


class RegisterForm(FlaskForm):
    street = StringField('Расположение')
    fill = StringField('Наполненность')
    days = StringField('Дней в работе')
    submit = SubmitField('Добавить')

