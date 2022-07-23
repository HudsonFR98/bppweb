//////////////////////////////////////////////////
//////// fonctions briques de formulaires ////////
//////////////////////////////////////////////////


//name: nom basique du select (obligatoire mais peut être nimportequoi)
//classname: type d'élément accompagné d'un id (ex: alphabet1) (requis pour les attribut 'exec' si des option du select appelent des fonctions)
//label: titre du select
//dict des options
// defaultKey : option par défaut (correspond à la syntaxe de l'une des options)
// asFunc : contient des éléments qui peuvent appeler des fonctions

function select(name, elementid, label, dict, defaultkey, hasFunc=true){
    var options = ''

    if (hasFunc === true){
        for (const[key, value] of Object.entries(dict)){
            if (key===defaultkey){
                options += `<option selected value="${key}" exec="${value['onclick']['function']}('${elementid}',${value['onclick']['n_col']},${value['onclick']['classlist']})">${value['description']}</option>`

            }else{
                options += `<option value="${key}" exec="${value['onclick']['function']}('${elementid}',${value['onclick']['n_col']},${value['onclick']['classlist']})">${value['description']}</option>`
            }
        }
        return `
        <label for="formFile" class="form-label">${label}</label>
        <select name="${name}" onchange="execOption('${elementid}', this.value)" class="form-select" aria-label="Default select example">
        ${options}
        </select>
        `
    }else{
        for (const[key, value] of Object.entries(dict)){
            if (key===defaultkey){
                options += `<option selected value="${key}">${value['description']}</option>`

            }else{
                options += `<option value="${key}">${value['description']}</option>`
            }
        }
        return `
        <label for="formFile" class="form-label">${label}</label>
        <select name="${name}" class="form-select" aria-label="Default select example">
        ${options}
        </select>
        `
    }

}

//some option of a select get trigger other functions
function execOption(element_id, value){
    func = document.getElementById(element_id).querySelector(`option[value='${value}']`).getAttribute('exec')
    eval(func)
}

// zone obligatoire où l'on upload un fichier

function inputFile(classname, label, required=true){
    if (required===true){
        return `
        <div class="mb-3 position-relative has-validation">
                  <label for="formFile" class="form-label">${label}</label>
                  <input name="${classname}" class="form-control" type="file" id="${classname}" required>
        </div>
    `
    }else{
        return `
        <div class="mb-3 position-relative has-validation">
                  <label for="formFile" class="form-label">${label}</label>
                  <input name="${classname}" class="form-control" type="file" id="${classname}">
        </div>
    `
    }
}

// texte informatif basique

function info(text){
    return `<label class="form-label">${text}</label>`
}

// texte informatif attaché à une input

function tag(text, param=true){
    if (param){
        return `<span class="input-group-text param">${text}</span>`
    }else{
        return `<span class="input-group-text">${text}</span>`
    }
}

// input cachée (synthaxe pure) comprenant déjà une valeur
function hiddenInput(name, value){
    return `<input hidden name="${name}" type="text" value="${value}">`
}

// input attendant une valeur
function visibleInput(type, name, placeholder){
    switch (type){
        case "text":
            return `<input type="text" name="${name}" class="form-control" placeholder="${placeholder}">`
        case "int":
            return `<input type="number" name="${name}" class="form-control" placeholder="${placeholder}">`
        case "float":
            return `<input type="number" step="0.000001" name="${name}" class="form-control" placeholder="${placeholder}">`
        default:
            console.log("unknown input type")

    }
}

// zone de texte de longueur ajustable

function textArea(name, placeholder, rows){
    return `<pre><textarea name="${name}" class="form-control" rows="${rows}" placeholder="${placeholder}"></textarea></pre>`
}



// deux valeurs différentes selon si coché ou décoché

function binarySwitch(classname, label, off_value, on_value){
    return `
     <div class="form-check form-switch">
      <input name='${classname}' value='${on_value}' class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">${label}</label>
    </div>
    <div class="form-check form-switch" style="display: none">
      <input name='${classname}' value='${off_value}' class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
    </div>
    `
}

// trigger une autre fonction (dans param.js) qui transformera notre model en MixedModel(model)

function mixedModelSwitch(classname, label, element_id, col_id){

    const element = document.getElementById(element_id)
    const columns = element.querySelectorAll('.col')
    const lastcolumn = columns.length - 1
    const column = columns[col_id]
    let count_param
    let originalsynthax

    column.innerHTML += `
     <br>
     <div class="form-check form-switch">
      <input name='${classname}' class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">${label}</label>
    </div><br>
    `
    const check = document.getElementsByName(classname)[0]
    check.addEventListener('change', () => {
        if (check.checked){ // when checked
            const params = element.querySelectorAll(".param") // get all params (theta... kappa..)
            count_param = -params.length
            for (const param of params){
                count_param+=2
                param.insertAdjacentHTML('afterend',
                    `${select(`${element_id+param.textContent}`, element_id,
                            "",
                            {[`Gamma(n={${element_id+param.textContent}gammaN},alpha={${element_id+param.textContent}gammaAlpha},beta={${element_id+param.textContent}gammaBeta})`]:{'description':'Gamma','onclick': {"function":"gamma","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`Beta(n={${element_id+param.textContent}betaN},alpha={${element_id+param.textContent}betaAlpha},beta={${element_id+param.textContent}betaBeta})`]:{'description':'Beta','onclick': {"function":"beta","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`Gaussian(n={${element_id+param.textContent}gaussianN},mu={${element_id+param.textContent}gaussianMu},sigma={${element_id+param.textContent}gaussianSigma})`]:{'description':'Gaussian','onclick': {"function":"gaussian","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`Exponential(n={${element_id+param.textContent}exponentialN},lambda={${element_id+param.textContent}exponentialLambda})`]:{'description':'Exponential','onclick': {"function":"exponential","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`Simple(values={${element_id+param.textContent}simpleValues},probas={${element_id+param.textContent}simpleProbas})`]:{'description':'Simple','onclick': {"function":"simple","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`TruncExponential(n={${element_id+param.textContent}truncExponentialN},lambda={${element_id+param.textContent}truncExponentialLambda},tp={${element_id+param.textContent}truncExponentialTp})`]:{'description':'TruncExponential','onclick': {"function":"truncExponential","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`Uniform(n={${element_id+param.textContent}uniformN},begin={${element_id+param.textContent}uniformBegin},end={${element_id+param.textContent}uniformEnd})`]:{'description':'Uniform','onclick': {"function":"uniform","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}},
                                [`${element_id+param.textContent}`]:{'description':'Value','onclick': {"function":"paramValue","n_col":(lastcolumn-params.length)+count_param, "classlist": `'${element_id+param.textContent}'`}}
                                },
                        `${element_id+param.textContent}`
                    )}`)
                paramValue(element_id, (lastcolumn-params.length)+count_param, element_id+param.textContent) // exect gamma func 1 time to initialize every param in side column
                document.getElementsByName(element_id+param.textContent)[1].style.display = "none"
            }
            synthax = document.getElementsByName(element_id)[0]
            originalsynthax = synthax.getAttribute('value')
            synthax.setAttribute("value", element_id+' = MixedModel('+synthax.getAttribute('value').replace(element_id+"=", "")+")")
        }else{ // when uncheck
            const params = element.querySelectorAll(".param") // get all params (theta... kappa..)
            count_param = -params.length
            for (const param of params){
                count_param+=2
                document.getElementsByName(element_id+param.textContent)[0].remove()
                document.getElementsByName(element_id+param.textContent)[0].style.display = "block"
                empty(element_id,(lastcolumn-params.length)+count_param) // empty every param side column
            }
            synthax = document.getElementsByName(element_id)[0]
            synthax.setAttribute("value", originalsynthax)
        }
    })
}

// lorsqu'un paramètre fais appel par exemple à un certain nemuéro de modèle, rate, process etc... le but ici est de laisser choisir l'utilisateur
// on cherche parmis un groupe de classname, et on return un select relié à un name
// col id must take a value if doreturn = true !!

function loadElement(classname, name, doReturn=true){

    const elements = document.querySelectorAll('.'+classname)
    var content = ''

    if(elements.length===0){
        console.log(`no ${classname} found`)
        console.log(name.replace(classname,""))
        return `<span style="color: orange">not loaded</span>`
    }else{
        for (const element of elements){
            content += `<option value="${element.getAttribute('id').replace(/\D/g, "")}">${element.getAttribute('id')}</option>`
        }

        if(doReturn===true){
            return `
            <select name="${name}" class="form-select" aria-label="Default select example">
                ${content}
            </select>
        `
        }else{
            document.getElementsByClassName(name+"row")[0].getElementsByTagName("select")[0].innerHTML = content
        }
    }
}

// instead of linking the id, we take his value

function loadElementValue(classname, name, doReturn=true){

    const elements = document.querySelectorAll('.'+classname)

    if(elements.length===0){
        console.log("no rootfreq found")
        return `:<span style="color: red"> not found</span>`
    }else{
        var content = ''
        for (const element of elements){
            content += `<option value="{${element.getAttribute('id')}}">${element.getAttribute('id')}</option>`
        }

        if(doReturn===true){
            return `
            <select name="${name}" class="form-select" aria-label="Default select example">
                ${content}
            </select>
        `
        }else{
            document.getElementsByClassName(name+"row")[0].getElementsByTagName("select")[0].innerHTML = content
        }
    }
}