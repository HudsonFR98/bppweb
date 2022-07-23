from flask import Blueprint, render_template, jsonify ,request, redirect, url_for, session, current_app, send_from_directory
import sqlite3, os
import subprocess
from pathlib import Path
import uuid
import json


jobs = Blueprint('jobs', __name__)

@jobs.route('/submit/<soft>', methods=['POST'])
def submit(soft):

    session_id = request.cookies.get('session')  # qui est l'utilisateur?
    jobname = uuid.uuid1()  # name du job
    jobname = soft + "_" + jobname.hex

    outpath = os.path.join(current_app.config['UPLOAD_FOLDER'], session_id, jobname, 'outputs')
    inpath = os.path.join(current_app.config['UPLOAD_FOLDER'], session_id, jobname, 'inputs')  # chemin d'accès du configuration file bpp
    abspath = current_app.abspath

    data = jsonify(request.form).get_json()  # données du formulaire (sauf uploads)

    os.system(f"mkdir -p {current_app.config['UPLOAD_FOLDER']}/{session_id}/{jobname}/inputs")  # créer un dossier input resrvé à l'utilisateur dans le dossier users

    if request.files:  # données de type uploads
        try:
            for file in request.files:  # stocker les fichiers dans ce dossier
                file_obj = request.files[file]
                path = os.path.join(current_app.config['UPLOAD_FOLDER'], session_id, jobname, 'inputs', file_obj.filename)
                file_obj.save(path)
                data.update({file_obj.name: path})  # ajout du nom du chemin du fichier dans le formulaire
        except:
            pass

    os.system(f"mkdir -p {current_app.config['UPLOAD_FOLDER']}/{session_id}/{jobname}/outputs")  # créer un dossier output resrvé à l'utilisateur dans le dossier users


    # WELCOME TO HELL #

    with open(f"{inpath}/conf_file.bpp", "w") as bpp:  # créer le fichier bpp:
        for n in range(2):  # 2 tours de dictionnaires (car 2 niveaux max de paramètres à traiter)
            #print(f"\n\n\n///////////// TOUR {n} /////////////\n")
            #print(data)
            for name in data:  # pour les param...
                if "outpath" in name:  # est-ce un output path?
                    data.update({name: f"{abspath}/{outpath}/{data[name]}"})  # mettre à jour l'outpath
                param = data[name].split('{')  # prendre un param
                for i in range(len(param)):  # pour tous les sous param de ce param...
                    if "}" in param[i]:
                        sousparam = param[i].split("}")[0]  # ...prendre un sous param.
                        param[i] = param[i].split("}")
                        # print(f"pour {name} : {param}")
                        if sousparam not in data or data[sousparam] == "":  # si valeur nulle ou absente effacer le sousparam et corriger les effets collateraux de cette supression sur les param voisins
                            param[i][0] = ""
                        else:
                            param[i][0] = data[sousparam]  # replacer id par valeur appropriée
                        param[i] = ''.join(param[i])
                param = ''.join(param).replace("'", "")
                data.update({name: param})
        # print(f'\n{data}')
        for name in data:  # pour les param...
            if "=" in data[name].split("(")[0]:
                # clean empty (and not mandatory) linked parameters
                toRemove = ["data=,", "data=)", "model=,", "model=)", "root_freq=,", "root_freq=)", "rate=,", "rate=)", "tree=,", "tree=)"]
                param=data[name]
                for w in toRemove:
                    if w in param:
                        param = param.replace(w.replace(")",""),"")
                # write the bpp conf file
                bpp.write(param + '\n')

    # lancement du job

    job = subprocess.Popen(f'srun --job-name={jobname} -n1 {soft} param={abspath}/{inpath}/conf_file.bpp > {abspath}/{outpath}/out.log',stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

    #return jsonify(data)
    return redirect(url_for('jobs.joblist'))


@jobs.route('/')
def joblist():

    try:

        session_id = request.cookies.get('session')  # qui est l'utilisateur?
        jobspath = os.path.join(current_app.config['UPLOAD_FOLDER'], session_id)  # jobs

        #établir un dictionnaire de forme suivante :
        #{ job1 : {files : {inputs : [...], outputs : [...] }, state : [...] } }

        #récupérer les jobs (dans l'ordre de date de modification)

        jobs = {}
        for job in sorted(Path(jobspath).iterdir(), key=os.path.getmtime)[::-1]:
            if os.path.isdir(job):
                jobs.update({os.path.join(job).split('/')[-1]: {"files": {"inputs": [], "outputs": []}, "state":"finished"}})

        #checker la squeue

        squeue = subprocess.Popen(['squeue', '--format="%.18i %.9P %.50j %.8u %.8T %.10M %.9l %.6D %R"'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        for line in squeue.stdout:
            job = line.decode('utf-8').split()
            if job[3] in jobs: # ce job m'appartient ?
                if job[5] == "RUNNING": # si le job est en mode running
                    jobs[job[3]]["state"] = "running..."
                else: # si le job est en attente de ressources
                    jobs[job[3]]["state"] = "waiting for ressources..."

        #récupérer les inputs et outputs pour chaque job

        for job in jobs:
            for input in os.listdir(os.path.join(jobspath, job, 'inputs')):
                jobs[job]["files"]["inputs"].append(input)
            for output in os.listdir(os.path.join(jobspath, job, 'outputs')):
                jobs[job]["files"]["outputs"].append(output)
                if output == "out.log":
                    # le job bpp à t'il rencontré une erreur? (ya til un autre moyen de procéder sans io sur le disque?)
                    tail = subprocess.Popen(['tail', '-n 2', os.path.join(jobspath, job, 'outputs', output)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    if "done" not in tail.stdout.read().decode('utf-8') and jobs[job]["state"] == "finished":
                        jobs[job]["state"] = "error"

            #if "error.log" in jobs[job]["files"]["outputs"]: #si présence d'un error.log donner l'état "error"
            #    jobs[job]["state"] = "error"

        return render_template("jobs.html", jobs=jobs)

    except:
        return render_template("jobs.html", jobs=jobs)

@jobs.route('/kill/<name>')
def killjob(name):
    kill = subprocess.Popen(f'scancel --name={name}', stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    return redirect(url_for('jobs.joblist'))

@jobs.route('/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    abspath = current_app.abspath
    session_id = request.cookies.get('session')  # qui est l'utilisateur?
    uploads = os.path.join(abspath, current_app.config['UPLOAD_FOLDER'], session_id)
    print(uploads, filename)
    return send_from_directory(directory=uploads, path=filename)