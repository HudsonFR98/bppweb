## Installation

Exec the following script in your directory with the command below.
It will compile Bppsuite programs and libs and install the webapp

```bash
sudo sh install.sh 
```
Make sure bppsuite in installed by executing the following command:

```bash
bppml
```

#### Use slurm

* The webapp uses slurm to shedule bpp jobs. To use a local slurm configuration, follow this tutorial : 
https://blog.llandsmeer.com/tech/2020/03/02/slurm-single-instance.html
* To use a dedicated slurm cluster you will have to change line 75, 101 and 133 of this file: bppweb/website/jobs.py

Make sure you dont get and error when running the following command:

```bash
srun bppml
```

## Add bpp objects to the webapp

### Exemple : add a model

In this exemple, we are adding the HKY85 nucleotide model, which belongs to the "model" class and the "Nucleotide models" category

We begin by pasting this javascript function in this file : bppweb/website/static/scripts/elements.js

````javascript
function HKY85(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n

    const content = ``
    const logo = ``
    
    spawn_element(name, classname, content, logo, n, closed)
    mixedModelSwitch(element_id+"mixedmodel", "Mixed model", element_id, 0)
    moveElements() // rendre déplaçable
}
````
* const classname is set to "model" because we're adding a model
* const n and const element_id dont need to be edited
* calling spawn_element and moveElements function is a mandatory final step. Respect the order of the call also.
* Between spawn_element and moveElements, you can call any function if you want to. Here, we call mixedModelSwitch because we want this model to be a mixedModel if asked.

now we need to complete 2 const : content & logo.

#### Fill content const with HTML

###### Main input of our object
* arg1 (str) : id of the object
* arg2 (str) : mix "name" attributes of all parameters and bpp grammar of the object
````html
${hiddenInput(`model${n}`,`model${n}=HKY85(initFreqs={${element_id}initfreqs}, theta={${element_id}theta}, theta1={${element_id}theta1}, theta2={${element_id}theta2}, kappa={${element_id}kappa}, data={${element_id}data})`)}
````

###### Parameters, organized in rows and columns. 

You can call other js functions: 

* Differents form elements like input, select, binary switch (from form.js). They often take args like the id of our object, name of or parameter (id of owner object + some text) or placeholder text...
* Link another object(s) to our object with loadElements()

Here the content of column with id _**1**_ is changing depending of the value of the _initfreq_ select

There is 2 lines, each with 2 columns.

````html
    <div class="row" style="padding-top: 10px">
        <div class="col col-lg-5">
            ${select(`${element_id}initfreqs`,
                    element_id,
                        'Equilibrium frequency',
                        {[`observed`]:{'description':'observed','onclick': {"function":"loadElements","n_col":1,"classlist":"'data'"}},
                         [`value({${element_id}valuesList})`]:{'description':'custom','onclick': {"function":"initfreqsValues","n_col":1}}},
                    'initFreqs=observed'
                )}
        </div>
        <div class="col">
            ${loadElements(element_id,1, 'data', true)}
        </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                <div class="input-group">
                  ${tag('kappa')}
                  ${visibleInput('int',`${element_id}kappa`,'> 0')}
                </div>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                <div class="input-group">
                    ${tag('theta')}
                    ${visibleInput('float',`${element_id}theta`,']0,1[')}
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
````

#### Fill logo const with HTML

The icon of the object. Here we use an svg from bootstrap 5
`````html
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
</svg>
`````

#### Revealing the new object in the app

We add the following json block in element.json

````json
"HKY85": {
    "name": "HKY85",
    "function": "HKY85",
    "docuSpanId": "model-nucleotide-HKY85"
  }
````

Let's made it appear in bppML interface for exemple, by modifying bppml.py code

````python
usage={
    "Nucleotide models": [el['HKY85']]
}
````

## Automatic data cleaning

Edit line 29 in _\_init__.py









