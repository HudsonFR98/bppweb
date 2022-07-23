from flask import Blueprint, render_template, jsonify ,request, redirect, url_for, session, current_app
import sqlite3, os
import subprocess
from pathlib import Path
import uuid
import json

visualizations = Blueprint('visualizations', __name__)

@visualizations.route('/basic_preview/<path:filename>', methods=['GET','POST'])
def basic_preview(filename):
    session_id = request.cookies.get('session')  # qui est l'utilisateur?
    jobspath = os.path.join(current_app.config['UPLOAD_FOLDER'], session_id)  # jobs
    filepath = os.path.join(jobspath, filename)
    with open(filepath, "r") as file:
        content = file.readlines()
        return render_template('outputs.html', content=content)