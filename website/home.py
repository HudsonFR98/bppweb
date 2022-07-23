from flask import Blueprint, render_template, request, redirect, url_for, session
import sqlite3

home = Blueprint('home', __name__)

@home.route('/')
def menu():
    return render_template("home.html")

"""
@home.route('/set/<value>')
def set_session(value):
    session['value'] = value
    return f'The value you set is : {value}'

@home.route('/get')
def get_session():
    return f'The value in the session is: { session.get("value") }'
"""
