import time
from flask import Blueprint, render_template, jsonify ,request, redirect, url_for, session, current_app
from . import docu as docu
import sqlite3, os
import subprocess
import uuid
import json

bppml = Blueprint('bppml', __name__)

@bppml.route('/')
def builder():

    soft = "bppml"  # nom

    with open("website/elements.json", "r") as file: # load this IN RAM !!
        el = json.load(file)

        usage = {
            "Language": [el["Alphabet"]],
            "Input": [el['Input Alignement'],
                      el['Input tree'],
                      el['Input random tree'],
                      el['Bpp configuration file']],
            "Nucleotide models": [el['HKY85'],
                                  el['K80'],
                                  el['JC69'],
                                  el['T92']],
            "Other models":[el['Mixture model']],
            "Scenarios":[el['Scenario'],
                         el['Path']],
            "Root frequencies": [el['Fixed'],
                                 el['GC']],
            "Substitution rates": [el['Gamma distribution'],el['Constant rate'],],
            "Processes": [el['Site substitution'],
                          el['Sequence substitution']],
            "Phylo-likelihoods": [el['Single phylo']],
            "Optimization": [el['Numerical parameter']],
            "Output": [el['Output infos'],
                       el['Output tree'],
                       el['Output estimates'],
                       el['Optimization profiler'],
                       el['Optimization backup'],
                       el['Output bootstrap']]
        }

        # recettes d'elements
        default = [el["Alphabet"],el['Input Alignement'],el['Input tree'],el['HKY85'],el['Gamma distribution'],el['GC'],el['Single phylo'],el['Output infos'],el['Output tree'],el['Output estimates'],el['Optimization profiler'],el['Optimization backup']]


    return render_template("bppml.html", soft=soft, usage=usage, default=default, docu=docu)

