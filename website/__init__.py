import datetime
import os
import sqlite3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
import json
from flask_session import Session
from datetime import timedelta
import requests
from io import StringIO
from pathlib import Path

db = SQLAlchemy()
sess = Session()
DB_NAME = "db.sql"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'mysecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['UPLOAD_FOLDER'] = 'website/static/users'
    app.abspath = path.join(app.root_path.replace("/website",""))
    db.init_app(app)
    app.config['SESSION_SQLALCHEMY'] = db
    app.permanent_session_lifetime = timedelta(days=30) # user session will last 30 days, and expired user data will be obliterated...
    sess.init_app(app)

    # order your files with blueprint !  :)

    from .home import home
    from .bppML import bppml
    from .jobs import jobs
    from .visualizations import visualizations

    # register utilities...
    app.register_blueprint(home, url_prefix='/')
    app.register_blueprint(bppml, url_prefix='/bppml/')
    app.register_blueprint(jobs, url_prefix='/jobs/')
    app.register_blueprint(visualizations, url_prefix='/visualizations')

    # create db if it doesnt actually exist

    create_database(app)

    return app

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')

    # clean old files based on session lifetime

    # from users directory
    conn = sqlite3.connect(path.join(app.abspath,'website',DB_NAME))
    cur = conn.cursor()
    for row in cur.execute('SELECT session_id, expiry FROM sessions;'):
        expiry = row[1].split(" ")[0].split("-")
        if datetime.date(int(expiry[0]),int(expiry[1]),int(expiry[2])) < (datetime.date.today() - app.permanent_session_lifetime):
            os.system(f"rm -rf {path.join(app.abspath,'website','static','users',row[0].split(':')[1])}")
    # and from database
    cur.execute(f"DELETE FROM sessions WHERE expiry < '{datetime.date.today() - app.permanent_session_lifetime}'")
    conn.commit()
    conn.close()


# get full documentation on github
def update_documentation():
    url = "https://github.com/BioPP/bppsuite/releases/download/v3.0.0/bppsuite.html"
    r = requests.get(url, allow_redirects=True)
    file = StringIO()
    file.write(r.content.decode('utf-8'))
    file = file.getvalue()
    return file
docu = update_documentation()