/////////////////////////////////////////////////////////////////
//////// bppsuite fonctions secondaires... paramètres... ////////
/////////////////////////////////////////////////////////////////

//si le choix de l'utilisateur ne trigger pas d'options supplémentaire, cette fonction est utile pour reset le contenu d'une colonne/case
function empty(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = ''
}

// récup une div
function clone(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    return column.cloneNode(true).innerHTML
}

//voir ducumentation Lexicon(words=(list of words)) dans la rubrique alphabet
function word_selected(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Letter</label>
      ${select(`${element_id}_letter`,
        "",
        "",
        {'DNA':{'description':'DNA'},
            'RNA':{'description':'RNA'},
            'Protein':{'description':'Protein'}},
        'DNA',
        false)}
      <input type="number" name="${element_id}_lenght" class="form-control" placeholder="lenght">
    </div> 
    `
}

function codon_selected(element_id, col_id){
    const element = document.getElementById(element_id)
    var column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Letter</label>
      ${select(`${element_id}_letter`, "", "",
        {'DNA':{'description':'DNA'},
            'RNA':{'description':'RNA'}},
        'DNA', false)}
    </div> 
    `
    column = element.querySelectorAll('.col')[col_id-1]
    column.innerHTML = `
    <label for="formFile" class="form-label">Genetic code</label>
    <div class="input-group mb-3">
      ${select(`${element_id}_genetic_code`,
            "",
                "",
                {'Standart':{'description':'Standart'},
                    'VertebrateMitochondrial':{'description':'Vertebrate mitochondrial'},
                    'MoldMitochondrial':{'description':'Mold mitochondrial'},
                    'InvertebrateMitochondrial':{'description':'Invertebrate mitochondrial'},
                    'YeastMitochondrial':{'description':'Yeast mitochondrial'},
                    'CiliateNuclear':{'description':'Ciliate nuclear'},
                    'EchinodermMitochondrial':{'description':'Echinoderm mitochondrial'},
                    'AscidianMitochondrial':{'description':'Ascidian mitochondrial'}}, 
                'Standart',
                false)}
      
    </div>
    `
}

function fasta_format(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
    ${binarySwitch(`${element_id}_fasta_extended`,"extended", "false","true")}
    ${binarySwitch(`${element_id}_fasta_strictnames`,"strictNames", "false","true")}
    `
}

function phylip_format(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Order</label>
      ${select(`${element_id}_order`, "", "",
        {'interleaved':{'description':'Interleaved'},
            'sequential':{'description':'Sequential'}},
        'interleaved', false)}
    </div> 
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Type</label>
      ${select(`${element_id}_type`, "", "",
        {'classic':{'description':'Classic'},
            'extended':{'description':'Extended'}},
        'classic', false)}
    </div>
    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Split</label>
      ${select(`${element_id}_split`, "", "",
        {'spaces':{'description':'Spaces'},
            'tab':{'description':'Tab'}},
        'spaces', false)}
    </div>  
    `
}

function mase_format(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     <div class="mb-3">
      <label for="${element_id}_site_selection" class="form-label">Optional site name</label>
      <input type="text" class="form-control" name="${element_id}_site_selection">
    </div>
    `
}

function clustal_format(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     <div class="mb-3">
      <label for="${element_id}_extra_spaces" class="form-label">Extraspaces if needed</label>
      <input type="number" class="form-control" name="${element_id}_extra_spaces">
    </div>
    `
}

function max_gap_and_unresolved_allowed(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
    <label for="max_gap_allowed${element_id}" class="form-label">Max gap allowed</label>
    <div class="input-group">
      <span class="input-group-text">Int or %</span>
      <input type="text" name="max_gap_allowed${element_id}" class="form-control" placeholder="number or % of sequence">
    </div>
    <label for="max_gap_allowed${element_id}" class="form-label">Max unresolved allowed</label>
    <div class="input-group">
      <span class="input-group-text">Int or %</span>
      <input type="text" name="max_gap_allowed${element_id}" class="form-control" placeholder="number or % of sequence">
    </div>
    `
}

function initfreqsValues(element_id, col_id) {
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     <div class="mb-3">
      <label for="${element_id}valuesList" class="form-label">List of frequencies</label>
      <input type="text" class="form-control" name="${element_id}valuesList" placeholder="list of real ]0,1[">
    </div>
    `
}


/////////////////////////////
/////// frequencies set /////
/////////////////////////////

// frequencies initialization

function initObserved(element_id, col_id){
    const element = document.getElementById(element_id)
    column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        ${info("pseudo count")}
        ${visibleInput("int", element_id+"obsPseudoCount", "int")}
        <br>
    `
    loadElements(element_id, col_id+1,'data',false)
}

function initValues(element_id, col_id){
    const element = document.getElementById(element_id)
    column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        ${info("input vector")}
        ${visibleInput("int", element_id+"values", "list")}
    `
    empty(element_id, col_id+1)
}

function initBalanced(element_id, col_id){
    const element = document.getElementById(element_id)
    empty(element_id, col_id)
    empty(element_id, col_id+1)
}

/////////////////////////////
//////// processes //////////
/////////////////////////////

function homogeneous(element_id, col_id, classlist){
    const element = document.getElementById(element_id)
    const columns = element.querySelectorAll('.col')
    const modeln = document.getElementsByClassName("modeln")

    // destroy nonHomogeneous rows
    document.querySelectorAll(".modelnrow").forEach(row => {row.remove()});

    // load elements to link
    loadElements(element_id, col_id, classlist)

    // empty cols to clean. can potentially destroy memory, it should be a better way to do it
    for (const column of Array.prototype.slice.call(columns).slice(col_id+1, columns.length)){
        column.innerHTML = ""
    }
    // clear eventual nonhomogeneous input
    element.querySelector(`input[name='${element_id}nonHomogeneousModels']`).setAttribute('value',"")
}

function onePerBranch(element_id, col_id, classlist){
    const element = document.getElementById(element_id)
    const columns = element.querySelectorAll('.col')
    const modeln = document.getElementsByClassName("modeln")

    // destroy nonHomogeneous rows
    document.querySelectorAll(".modelnrow").forEach(row => {row.remove()});

    // load elements to link
    loadElements(element_id, col_id, classlist)

    // empty cols to clean.
    for (const column of Array.prototype.slice.call(columns).slice(col_id+1, columns.length)){
        column.innerHTML = ""
    }
    // clear eventual nonhomogeneous input
    element.querySelector(`input[name='${element_id}nonHomogeneousModels']`).setAttribute('value',"")

    //remaining cols contain models and node selectors...

    /*
    columns[3].innerHTML = `
        <a class="utilitiesButtons" onclick="addModelParameter('${element_id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg> <p>add shared model parameter</p>
        </a>
    `
    */
    columns[3].innerHTML = `
        <div class="input-group">
          <input type="text" name="${element_id}sharedparams" class="form-control" placeholder="list of model.param">
        </div>
    `
}

/* search for parameters in linked model
function addModelParameter(element_id){
    var model = document.getElementsByName(element_id+"model")[0].value
    model = document.getElementById(model)
    const modelName = model.querySelector(".titleElement").value
    const params = model.querySelectorAll(".param")
    let select = `<select name="${name}" class="form-select" aria-label="Default select example">`
    for(const param of params){
        select+=`<option name=""></option>`
    }
} */

//col_id should always be a nonpair int, unless you want it to be ugly

function nonHomogeneous(element_id, col_id, classlist){
    const element = document.getElementById(element_id)
    const columns = element.querySelectorAll('.col')

    loadElements(element_id, col_id, classlist)

    //col 2 sould be an entire row where we put our graph visualization... ( a column alone in its own row is itself a row )

    //remaining cols contain models and node selectors...
    columns[3].innerHTML = `
        <a class="utilitiesButtons" onclick="addModelAndNodeSelector('${element_id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg> <p>new linked model</p>
        </a>
    `

    // graph vizu

    const tree = document.getElementsByName(element_id+"tree")[0] // ON LOAD (init)
    const tree_id = tree.value
    const linked = element.getElementsByClassName("linkedContent")[0]
    displayNewickTree(element_id, 2, false)
    const linkedTree = document.getElementById("tree"+tree_id)
    const source = linkedTree.getElementsByTagName("textarea")[0].value
    const destination = element.getElementsByTagName("textarea")[0]
    destination.value = source

    linked.addEventListener('change', ()=>{ // ON SELECT CHANGE
        const tree = document.getElementsByName(element_id+"tree")[0] // ON LOAD (init)
        const tree_id = tree.value
        displayNewickTree(element_id, 2, false)
        const linkedTree = document.getElementById("tree"+tree_id)
        const source = linkedTree.getElementsByTagName("textarea")[0].value
        const destination = element.getElementsByTagName("textarea")[0]
        destination.value = source

    })
    const reloadButton = element.getElementsByClassName("reloadButton")[0] // ON RELOAD SELECT CLICK
    reloadButton.addEventListener('click', () => {
        const tree = document.getElementsByName(element_id+"tree")[0] // ON LOAD (init)
        const tree_id = tree.value
        displayNewickTree(element_id, 2, false)
        const linkedTree = document.getElementById("tree"+tree_id)
        const source = linkedTree.getElementsByTagName("textarea")[0].value
        const destination = element.getElementsByTagName("textarea")[0]
        destination.value = source
    })

}

function addModelAndNodeSelector(element_id){
    const element = document.getElementById(element_id)
    const modeln = document.querySelectorAll(".modelnrow")
    var max_n = 0
    var n = 1

    // si le n max de modeln est de 8, le modele suivant ajouté sera forcement 9 (devrais t-on changer cela?, bpp
    modeln.forEach(model => {
        n = parseInt(model.getAttribute('n')) // pour chaque n
        if(n > max_n){
            max_n = n
        }
    })

    //// add a model selector (and nodes) and options buttons

    // options buttons:

    element.querySelector('.viewbox').querySelector('.viewboxButtonBox').innerHTML = `
        <div class="viewboxButtonBox">
            <div class="row">
                <div class="col viewboxButton selectChilds" style="color: white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-diagram-3-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
                    </svg>
                </div>
                <div class="col viewboxButton selectNode">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-node-plus-fill" viewBox="0 0 16 16">
                      <path d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 1 0z"/>
                    </svg>
                </div>
                <div class="col viewboxButton lockButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                </div>
                <div class="col viewboxButton clearButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                      <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                    </svg>
                </div>
                <div class="col viewboxButton completeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-braces-asterisk" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C2.25 2 1.49 2.759 1.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6ZM14.886 7.9v.164c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456v-1.3c-1.114 0-1.49-.362-1.49-1.456V4.352C14.51 2.759 13.75 2 12.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6ZM7.5 11.5V9.207l-1.621 1.621-.707-.707L6.792 8.5H4.5v-1h2.293L5.172 5.879l.707-.707L7.5 6.792V4.5h1v2.293l1.621-1.621.707.707L9.208 7.5H11.5v1H9.207l1.621 1.621-.707.707L8.5 9.208V11.5h-1Z"/>
                    </svg>
                </div>
            </div>
        </div>
    `


    buttons = element.querySelectorAll(".viewboxButton")
    lockButton = element.querySelector(".lockButton")
    clearButton = element.querySelector(".clearButton")
    selectChilds = element.querySelector(".selectChilds")
    selectNode = element.querySelector(".selectNode")
    completeButton = element.querySelector(".completeButton")
    selectChilds.style.backgroundColor = "grey"

    //event on 4 first buttons from left
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(button.style.backgroundColor === "grey" || button.style.border === "4px solid dodgerblue"){
                if(button.getAttribute("class").includes("select")){
                    selectChilds.style.backgroundColor = "grey"
                    selectChilds.querySelector('svg').style.color = "white"
                    selectNode.style.backgroundColor = "grey"
                    selectNode.querySelector('svg').style.color = "white"
                    button.style.backgroundColor = "lightgrey"
                    button.querySelector('svg').style.color = "black"
                }else{
                    button.style.backgroundColor = "lightgrey"
                    button.querySelector('svg').style.color = "black"
                }
            }else{
                if(button.getAttribute("class").includes("select")){
                    selectChilds.style.backgroundColor = "lightgrey"
                    selectChilds.querySelector('svg').style.color = "black"
                    selectNode.style.backgroundColor = "lightgrey"
                    selectNode.querySelector('svg').style.color = "black"
                    button.style.backgroundColor = "grey"
                    button.querySelector('svg').style.color = "white"
                }else{
                    button.style.backgroundColor = "grey"
                    button.querySelector('svg').style.color = "white"
                }
            }
        })
    })

    // differents functions to color our nodes

    function processChilds(node, color, lock=false){
        // init
        if(color==="black"){strokewidth = 1}else{strokewidth = 4} // test if we should clean or colorize nodes
        var total_child = 1 // it is considered as a child of a ghost ancestor to initialize the process
        var nodes2process = [node] // that node is the first node to color
        // reset previous choice for this input (should not be triggered when LOCK button is disabled)
        if(lock===false){
            const toReset = element.querySelector(".viewbox").querySelectorAll(`path[class="colorizable"][style*="stroke: ${color}"]`)
            toReset.forEach(node =>{
                node.style.stroke="black"
                node.style.strokeWidth=1})
        }
        // continue init..
         const root_id = parseInt(node.getAttribute('node_id')) // id of the node we just clicked
         const root_bpp_id = parseInt(node.nextSibling.textContent) // bpp id to display later
         var min_bpp_id = root_bpp_id // so the first minimal id to check
         const root = element.querySelector(".viewbox").querySelector(`path[class="colorizable"][node_id='${root_id}']`) // give the color to our node
         root.style.opacity = 0.9
         root.style.strokeWidth = strokewidth
         root.style.stroke = color

        // color all childs of the clicked node
         while (total_child !== 0){ // while there are still childs to process
             newNodes2process = []
             nodes2process.forEach(node2process =>{ // for every childs we just found
                 var childs = element.querySelector(".viewbox").querySelectorAll(`path[class="colorizable"][anc_id='${node2process.getAttribute('node_id')}']`) // find there childs
                 childs.forEach(child =>{ // for every childs of every childs we just found
                     child.style.stroke = color
                     child.style.opacity = 0.9
                     child.style.strokeWidth = strokewidth
                     const child_bpp_id = parseInt(child.nextSibling.nextSibling.textContent) // update the bpp id
                     if (child_bpp_id < min_bpp_id) {// find the min node id to give it to the input later
                        min_bpp_id = child_bpp_id
                     }
                     newNodes2process.push(child) // save childs we just colored to find there childs the next loop
                 })
             })
             nodes2process = newNodes2process // so update childs to process (erase already treated nodes)
             total_child = nodes2process.length // Is there still future childs to process?
         }
         // update input content
         if (root_bpp_id !== min_bpp_id){
             input.setAttribute("value", `${min_bpp_id}:${root_bpp_id}`)
         }else{
             input.setAttribute("value", root_bpp_id)
         }
     } // loop an perform actions over all childs of a node

    function processNode(node, color, lock=false){
        // init
        if(color==="black"){strokewidth = 1}else{strokewidth = 4} // test if we should clean or colorize nodes
        var total_child = 1 // it is considered as a child of a ghost ancestor to initialize the process
        var nodes2process = [node] // that node is the first node to color
        // reset previous choice for this input (should not be triggered when LOCK button is disabled)
        if(lock===false){
            const toReset = element.querySelector(".viewbox").querySelectorAll(`path[class="colorizable"][style*="stroke: ${color}"]`)
            toReset.forEach(node =>{
                node.style.stroke="black"
                node.style.strokeWidth=1})
        }
        // continue init..
         const root_id = parseInt(node.getAttribute('node_id')) // id of the node we just clicked
         const root_bpp_id = parseInt(node.nextSibling.textContent) // bpp id to display later
         const root = element.querySelector(".viewbox").querySelector(`path[class="colorizable"][node_id='${root_id}']`) // give the color to our node
         root.style.opacity = 0.9
         root.style.strokeWidth = strokewidth
         root.style.stroke = color

        // update input content
        input.setAttribute("value", root_bpp_id)

    } // perform actions on a unique node

    function updateInputs(){
            // but now, we need to adapt all the inputs to this previous choice.
            inputs = element.querySelectorAll(".modelnode")
            inputs.forEach(input => { //for each input
                input.setAttribute("value", "") //erase outdated input content
                color = "rgba" + input.style.border.split("rgba")[1]
                // for each nodes colorized by this input
                bppids = [] // this is a list on every bpp ids of these nodes
                element.querySelectorAll(`path[class="colorizable"][style*="stroke: ${color}"]`).forEach(node => {
                    bppid = node.nextSibling.nextSibling.textContent //get bpp_id of node
                    bppids.push(parseInt(bppid)) // update list
                })
                // now we regroup consecutives integers by intervals
                bppids = bppids.reduce((r, n) => { //rearrange list to form proto-intervals (a list of lists)
                  const lastSubArray = r[r.length - 1];
                  if(!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
                    r.push([]);
                  }
                  r[r.length - 1].push(n);
                  return r;
                }, []);
                i = 0
                bppids.forEach(interval => { // create interval (bppmin : bppmax) or keep lone integer
                    i++
                    if(interval.length > 1){
                        interval = [Math.min.apply(Math, interval), Math.max.apply(Math, interval)]
                        if(i === bppids.length){
                            value = `${interval[0]}:${interval[1]}`
                        }else{
                            value = `${interval[0]}:${interval[1]},`
                    }
                    }else{
                        if(i === bppids.length){
                            value = `${interval[0]}`
                        }else{
                            value = `${interval[0]},`
                    }
                    }
                    // now update the input content
                    input.setAttribute("value", input.getAttribute("value") + value)

                })

            })
        } // update inputs values

    // model selector:

    element.querySelectorAll(".card-body")[0].lastElementChild.insertAdjacentHTML("afterend",`
        <div class="row modelnrow ${element_id}model${max_n+1}row" n="${max_n+1}" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                  <a onclick="
                        removeModelandNodeSelector('${element_id}','.${element_id}model${max_n+1}row')
                  "><span class="input-group-text" style="background-color: #ffd8d6; cursor: pointer;">&#10005;</span></a>
                  
                  <a onclick="
                        loadElement('model', '${element_id+"model"+(max_n+1)}', false) 
                  "><span class="input-group-text" style="cursor: pointer;">&#8634;</span></a>
                  
                  <span class="input-group-text">model</span>
                  ${loadElement('model', element_id+"model"+(max_n+1))}
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                  <span class="input-group-text">nodes</span>
                  <input type="text" name="${element_id}model${max_n+1}nodes" class="form-control modelnode" for="${element_id}model${max_n+1}" placeholder="1:4,6:9,...">
                </div>
            </div>
        </div>
    `)

    let color

    // events to select all childs (or not) of click node on graph when click on node input on form (read it again slowly...)

    var input = document.querySelector(`.modelnode[name=${element_id}model${max_n+1}nodes]`)

    // continue init..

    cloned = input.cloneNode(true) // reset previous events
    input.parentNode.replaceChild(cloned, input)
    input = cloned
    // add click event
    input.addEventListener('click', function (){
        // POV : we just clicked on an input linked to a model :)
        // give input selected attribute and give input model color
        color = document.getElementById("model"+document.getElementsByName(element_id+"model"+(max_n+1))[0].value).querySelector(".card-header").style.backgroundColor.replace("0.2","0.9")
        input.style.border="solid 3px "+color
        input.setAttribute("selected",true)
        // set nodes mouseover event with adapted color on fat invisible lines
        var nodes = element.querySelector(".viewbox").querySelectorAll(".overable")
        nodes = Array.prototype.slice.call(nodes) // we dont want the root
        nodes.pop()
        nodes.forEach(node =>{
            // reset previous events
            var cloned = node.cloneNode(true)
            node.parentNode.replaceChild(cloned, node)
            node = cloned
            // add new events
            node.style.stroke = color
            node.addEventListener('mouseover', () => {
                node.style.opacity = 0.9
                node.style.strokeWidth = 4
                node.style.cursor = "pointer"
            })
            node.addEventListener('mouseout', () => {
                node.style.opacity = 0
                node.style.strokeWidth = 10
                node.style.cursor = "pointer"
            })

            // when node is clicked, colorize all childs but ONLY thin bars (not fat invisible bars)
            // also, write the corresponding pattern in the input

            node.addEventListener('click',  () => {

                // clean or colorize node(s)
                if(clearButton.style.backgroundColor === "grey"){
                    color = "black"
                }else{
                    color = document.getElementById("model"+document.getElementsByName(element_id+"model"+(max_n+1))[0].value).querySelector(".card-header").style.backgroundColor.replace("0.2","0.9")
                }

                // action on node or on all childs, with lock or unlock
                if(selectChilds.style.backgroundColor === "grey"){
                    if(lockButton.style.backgroundColor === "grey"){
                        processChilds(node, color, true) // color all childs of node
                    }else{
                        processChilds(node, color) // color all childs of node
                    }
                }else{
                    if(lockButton.style.backgroundColor === "grey"){
                        processNode(node, color, true) // color all childs of node
                    }else{
                        processNode(node, color) // color all childs of node
                }
                }
                updateInputs() // now update all inputs
            })
        })
        //event for complete button (far right)
        cloned = completeButton.cloneNode(true)
        completeButton.parentNode.replaceChild(cloned, completeButton)
        completeButton = cloned
        completeButton.addEventListener('click', ()=>{
            async function reload(){
                completeButton.style.backgroundColor = "grey"
                completeButton.querySelector('svg').style.color = "white"
                //colorize remaining nodes (those who dont have a model yet)
                const remainingNodes = element.querySelector(".viewbox").querySelectorAll(`path[class="colorizable"][style*="black"]:not([node_id="undefined"])`)
                remainingNodes.forEach(node =>{
                    processNode(node,color,true)
                    console.log(color)
                })
                updateInputs()
                await sleep(400)
                completeButton.style.backgroundColor = "lightgrey"
                completeButton.querySelector('svg').style.color = "black"
            } setTimeout(reload, 1)
        })
    })

    //modify bpp synthax by adding the model and node_ids

    nonHomogeneousInput = document.getElementsByName(element_id+"nonHomogeneousModels")[0]
    var synthax = nonHomogeneousInput.getAttribute("value")
    if(synthax===""){ // if its the first model, no comma at start.
        nonHomogeneousInput.setAttribute("value", synthax+`model${max_n+1}={${element_id+"model"+(max_n+1)}}, model${max_n+1}.nodes_id=({${element_id}model${max_n+1}nodes})`)
    }else{ // else, start by a comma
        nonHomogeneousInput.setAttribute("value", synthax+`,model${max_n+1}={${element_id+"model"+(max_n+1)}}, model${max_n+1}.nodes_id=({${element_id}model${max_n+1}nodes})`)
    }

}

function removeModelandNodeSelector(element_id, row_id){
    const element = document.getElementById(element_id)
    console.log(element_id)
    const input = document.querySelector(`input[name='${row_id.replace("row","nodes").replace(".","")}']`)
    color = "rgba" + input.style.border.split("rgba")[1]
    const toReset = element.querySelectorAll(`path[class="colorizable"][style*="stroke: ${color}"]`)
    toReset.forEach(node =>{
        node.style.stroke="black"
        node.style.strokeWidth=1})
    document.querySelectorAll(row_id).forEach(row => {row.remove()});

    // reset nodes of this color

}

// useful for mixture model, where we need to load the whole value of the elements (models) and not just the id
// that function is similar in some ways to addModelAndNodeSelector()
function addModelValue(element_id){
    const element = document.getElementById(element_id)
    const modeln = document.querySelectorAll(".modelnrow")
    var max_n = 0
    var n = 1

    modeln.forEach(model => {
        n = parseInt(model.getAttribute('n')) // pour chaque n
        if(n > max_n){
            max_n = n
        }
    })

    let content
    content=`
        <div class="row modelnrow ${element_id}model${max_n+1}row" n="${max_n+1}" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                  <a onclick="
                        removeModelValue('${element_id}','.${element_id}model${max_n+1}row')
                  "><span class="input-group-text" style="background-color: #ffd8d6; cursor: pointer;">&#10005;</span></a>
                  
                  <a onclick="
                        loadElementValue('model', '${element_id+"model"+(max_n+1)}', false) 
                  "><span class="input-group-text" style="cursor: pointer;">&#8634;</span></a>
                  
                  <span class="input-group-text">model</span>
                  ${loadElementValue('model', element_id+"model"+(max_n+1))}
                </div>
            </div>
    `
    //there is no relrate and relproba for the first model added
    if(max_n!==0){
        content += `
            <div class="col">
                <div class="input-group">
                  <span class="input-group-text">rel_rate</span>
                  <input type="number" step="0.0001" min="0" max="1" name="${element_id}relrate${max_n}" class="form-control modelnode" for="${element_id}model${max_n+1}" placeholder="]0>real>1[">
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                  <span class="input-group-text">rel_proba</span>
                  <input type="number" step="0.0001" min="0" max="1" name="${element_id}relproba${max_n}" class="form-control modelnode" for="${element_id}model${max_n+1}" placeholder="]0>real>1[">
                </div>
            </div>
        `
    }
    content += `</div>`

    element.querySelectorAll(".card-body")[0].lastElementChild.insertAdjacentHTML("afterend", content)
    regroupMixtureInputs(element_id)

}

function regroupMixtureInputs(element_id){
    const element = document.getElementById(element_id)
    // regroup inputs (3n-2) in 1 input (3 lists of lenght n)
    const modelList = element.querySelectorAll(`select[name*='${element_id}model']`)
    const relRateList = element.querySelectorAll(`input[name*='${element_id}relrate']:not([hidden=""])`)
    const relProbaList = element.querySelectorAll(`input[name*='${element_id}relproba']:not([hidden=""])`)
    console.log(modelList)

    input = element.querySelector(`input[name*='${element_id}modelList']`)
    count = 0
    input.value=""
    modelList.forEach(model => {
        count++
        input.setAttribute("value",input.value+=('model'+count+'='+model.value.split("model")[1].replace("}","")+','))
    });input.setAttribute("value",input.value.slice(0,-1))

    input = element.querySelector(`input[name*='${element_id}relrateList']`)
    count = 0
    input.value=""
    relRateList.forEach(relrate => {
        count++
        input.setAttribute("value",input.value+=('relrate'+count+'='+"{"+relrate.getAttribute("name")+'},'))
    });input.setAttribute("value",input.value.slice(0,-1))

    input = element.querySelector(`input[name*='${element_id}relprobaList']`)
    count = 0
    input.value=""
    relProbaList.forEach(relproba => {
        count++
        input.setAttribute("value",input.value+=('relproba'+count+'='+"{"+relproba.getAttribute("name")+'},'))
    });input.setAttribute("value",input.value.slice(0,-1))

}

function removeModelValue(element_id, row_id){
    const element = document.getElementById(element_id)
    document.querySelectorAll(row_id).forEach(row => {row.remove()});
    regroupMixtureInputs(element_id)

    // reset nodes of this color
}

///////////////////////////
///// path & scenarios ////
///////////////////////////

// useful for path, where we need to load a model and a submodel
function addModelAndSubmodel(element_id){
    const element = document.getElementById(element_id)
    const modeln = document.querySelectorAll(".modelnrow")
    var max_n = 0
    var n = 1

    modeln.forEach(model => {
        n = parseInt(model.getAttribute('n')) // pour chaque n
        if(n > max_n){
            max_n = n
        }
    })

    let content
    content=`
        <div class="row modelnrow ${element_id}model${max_n+1}row" n="${max_n+1}" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                  <a onclick="
                        removeModelandSubmodel('${element_id}','.${element_id}model${max_n+1}row')
                  "><span class="input-group-text" style="background-color: #ffd8d6; cursor: pointer;">&#10005;</span></a>
                  
                  <a onclick="
                        loadElementValue('model', '${element_id+"model"+(max_n+1)}', false) 
                  "><span class="input-group-text" style="cursor: pointer;">&#8634;</span></a>
                  
                  <span class="input-group-text">model</span>
                  ${loadElementValue('model', element_id+"model"+(max_n+1))}
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                  <span class="input-group-text">submodel</span>
                  <input onchange="regroupModelsAndSubmodels('${element_id}')" type="text" name="${element_id}submodel${max_n}" class="form-control modelnode" for="${element_id}model${max_n+1}" placeholder="list of int">
                </div>
            </div>
        </div>
    `

    element.querySelectorAll(".card-body")[0].lastElementChild.insertAdjacentHTML("afterend", content)
    regroupModelsAndSubmodels(element_id)

}

// build the "model & model & model" pattern specific to path
function regroupModelsAndSubmodels(element_id){
    const element = document.getElementById(element_id)
    const modelList = element.querySelectorAll(`select[name*='${element_id}model']`)
    const submodelList = element.querySelectorAll(`input[name*='${element_id}submodel']:not([hidden=""])`)

    count=0
    value=""
    modelList.forEach(model => {
        value += `${model.value.replace("{","").replace("}","")}[${submodelList[count].value}] & `
        count++
    })
    value = value.slice(0,-3) // remove last "&"
    element.querySelector(`input[name="${element_id}modelList"]`).setAttribute("value", value)
}

function removeModelandSubmodel(element_id, row_id){
    const element = document.getElementById(element_id)
    document.querySelectorAll(row_id).forEach(row => {row.remove()});
    regroupModelsAndSubmodels(element_id)
}

// add path for scenarios

function addPath(element_id){
    const element = document.getElementById(element_id)
    const pathn = document.querySelectorAll(".pathnrow")
    var max_n = 0
    var n = 1

    pathn.forEach(path => {
        n = parseInt(path.getAttribute('n')) // pour chaque n
        if(n > max_n){
            max_n = n
        }
    })

    let content
    content=`
        <div class="row pathnrow ${element_id}path${max_n+1}row" n="${max_n+1}" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                  <a onclick="
                        removeModelandSubmodel('${element_id}','.${element_id}path${max_n+1}row')
                  "><span class="input-group-text" style="background-color: #ffd8d6; cursor: pointer;">&#10005;</span></a>
                  
                  <a onclick="
                        loadElement('path', '${element_id+"path"+(max_n+1)}', false) 
                  "><span class="input-group-text" style="cursor: pointer;">&#8634;</span></a>
                  
                  <span class="input-group-text">path</span>
                  ${loadElement('path', element_id+"path"+(max_n+1))}
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    `

    element.querySelectorAll(".card-body")[0].lastElementChild.insertAdjacentHTML("afterend", content)
    element.querySelector(`select[name*='${element_id+"path"+(max_n+1)}']`).setAttribute("onchange",`regroupPaths('${element_id}')`)
    regroupPaths(element_id)

}

function regroupPaths(element_id){
    const element = document.getElementById(element_id)
    const pathList = element.querySelectorAll(`select[name*='${element_id}path']`)

    count=0
    value=""
    pathList.forEach(path => {
        value += `path${path.value.replace("{","").replace("}","")} & `
        count++
    })
    value = value.slice(0,-3) // remove last "&"
    element.querySelector(`input[name="${element_id}pathList"]`).setAttribute("value", value)
}

///////////////////////////
// Discrete distributions//
///////////////////////////

// func paramValue est pas une loi, juste un valeur basique (eclatax)

function paramValue(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <input type="text" name="${select_id}value" class="form-control" placeholder="value">
    `
}


function gamma(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="2" name="${select_id}gammaN" class="form-control" placeholder="int ≥ 2" required>
          <span class="input-group-text">alpha</span>
          <input type="number" step="0.01" min="1" name="${select_id}gammaAlpha" class="form-control" placeholder="float > 0">
          <span class="input-group-text">beta</span>
          <input type="number" step="0.01" min="1" name="${select_id}gammaBeta" class="form-control" placeholder="float > 0">
        </div>
    `
}

function constant(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">value</span>
          <input type="number" step="0.01" name="${select_id}constantValue" class="form-control" placeholder="float">
    `
}

function beta(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="2" name="${select_id}betaN" class="form-control" placeholder="int ≥ 2">
          <span class="input-group-text">alpha</span>
          <input type="number" step="0.01" min="1" name="${select_id}betaAlpha" class="form-control" placeholder="float > 0">
          <span class="input-group-text">beta</span>
          <input type="number" step="0.01" min="1" name="${select_id}betaBeta" class="form-control" placeholder="float > 0">
        </div>
    `
}

function gaussian(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="1" name="${select_id}gaussianN" class="form-control" placeholder="int ≥ 1">
          <span class="input-group-text">mu</span>
          <input type="number" step="0.01" name="${select_id}gaussianMu" class="form-control" placeholder="float">
          <span class="input-group-text">sigma</span>
          <input type="number" step="0.01" min="0.01" name="${select_id}gaussianSigma" class="form-control" placeholder="float > 0">
        </div>
    `
}

function exponential(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="2" name="${select_id}exponentialN" class="form-control" placeholder="int ≥ 2">
          <span class="input-group-text">lambda</span>
          <input type="number" step="0.01" name="${select_id}exponentialLambda" class="form-control" placeholder="float > 0">
        </div>
    `
}

function simple(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">values</span>
          <input type="text" name="${select_id}simpleValues" class="form-control" placeholder="float list">
          <span class="input-group-text">probas</span>
          <input type="text" name="${select_id}simpleProbas" class="form-control" placeholder="float list">
        </div>
    `
}

function truncExponential(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="2" name="${select_id}truncExponentialN" class="form-control" placeholder="int ≥ 2">
          <span class="input-group-text">lambda</span>
          <input type="number" step="0.01" name="${select_id}truncExponentialLambda" class="form-control" placeholder="float > 0">
          <span class="input-group-text">tp</span>
          <input type="number" step="0.01" name="${select_id}truncExponentialTp" class="form-control" placeholder="float > 0">
        </div>
    `
}

function uniform(element_id, col_id, select_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="1" name="${select_id}uniformN" class="form-control" placeholder="int ≥ 2">
          <span class="input-group-text">begin</span>
          <input type="number" step="0.01" name="${select_id}uniformBegin" class="form-control" placeholder="float > 0">
          <span class="input-group-text">end</span>
          <input type="number" step="0.01" name="${select_id}uniformEnd" class="form-control" placeholder="float > 0">
        </div>
    `
}


// specific gamma for rate_distribution (see doc..)
function rateGamma(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     <label class="form-label">parameters</label>
        <div class="input-group">
          <span class="input-group-text">n</span>
          <input type="number" min="2" name="${element_id}gammaN" class="form-control" placeholder="int ≥ 2">
          <span class="input-group-text">alpha</span>
          <input type="number" step="0.0001" min="0" name="${element_id}gammaAlpha" class="form-control" placeholder="float > 0">
        </div>
    `
}

//////////////////////////
// interconnect elements//
//////////////////////////

// ici on a besoin d'une classlist contenant tous les classname sur lequel effectuer une recherche (ex: chercher parmis tous les class:model, class:data...)

function loadElements(element_id, col_id, classlist, doReturn=false) {

    var content = `<div class="linkedContent">`
    for (const classname of classlist.split(',')) {
        content += `
        <label class="form-label">linked ${classname}</label>
         ${loadElement(classname, element_id + classname)}
         <br>
        `
    }
    content += `</div>`
    content+=`<div class="reloadButton" onclick="reloadElements('${element_id}', '${classlist.split(',')}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg>
                </div>
                <label class="form-label withReload"> reload select content</label>`

    if (doReturn === false) {
        const element = document.getElementById(element_id)
        const column = element.querySelectorAll('.col')[col_id]
        column.innerHTML = content
    } else {
        return content
    }
}

function reloadElements(element_id, classlist, doReturn=false){
    var content = ""
    for (const classname of classlist.split(',')) {
        content += `
        <label class="form-label">linked ${classname}</label>
         ${loadElement(classname, element_id + classname)}
         <br>
        `
    }
    if (doReturn === false) {
        const element = document.getElementById(element_id)
        element.getElementsByClassName("linkedContent")[0].innerHTML = content
    } else {
        return content.replace("undefined","") // bug workaround
    }

}

//////////////////
// optimization //
//////////////////


function fullDDerivative(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     ${select(`${element_id}fullDDerivative`, "", "precise method",
        {'Newton':{'description':'Newton'},
            'Gradient':{'description':'Gradient'}},
        'Newton', false)}
    `
}

function DBDerivative(element_id, col_id){
    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
     ${select(`${element_id}DBDerivative`, "", "precise method",
        {'Newton':{'description':'Newton'},
            'Gradient':{'description':'Gradient'}},
        'Newton', false)}
     <br>
    `
    column.innerHTML += `
    <label class="form-label">number of steps</label>
    <input type="number" step="1" min="1" name="${element_id}nstep" class="form-control" placeholder="int > 0">
    `
}

/////////////////////
//////graph vizu/////
/////////////////////


// afficher un espace de visualisation d'arbre newick
// option linked readfile est à passer en False lorsque l'élément ne requiert pas d'output (utile quand relié à une output prééxistante)

function displayNewickTree(element_id, col_id, readFile=true){

    const element = document.getElementById(element_id)
    const column = element.querySelectorAll('.col')[col_id]
    column.innerHTML = `
        <textarea class="form-control" id="textarea${element_id}" rows="5" cols="100" hidden></textarea>
        <br>
        <select class="graphTypeSelect" id="style${element_id}">
            <option value="cladogram">Cladogram</option>
            <option value="rectanglecladogram">Rectangular cladogram</option>
            <option value="phylogram">Phylogram</option>
            <!--<option value="circle">Circle tree</option>-->
            <!--<option value="circlephylogram">Circle phylogram</option>-->
        </select>
        <a class="utilitiesButtons" onclick="showtree('${element_id}')">Load tree visualization</a>
        </div>
        
        <p><span id="message${element_id}"></span></p>
        <div class="viewbox">
        <svg id="svg${element_id}" xmlns="http://www.w3.org/2000/svg" height="500" width="100%">
            <g id="viewport${element_id}"></g>
        </svg>
        <div class="viewboxButtonBox"></div>
        <p style="color: orange;position: relative;top: -485px;left: 20px;width:300px;background-color: white">(Make sure each node gets a model)</p>
        </div>
    `
    //Lire et afficher contenu du fichier

    if(readFile===true){
        document.getElementById(`file${element_id}`).addEventListener('change', function() {
            var fr=new FileReader();
            fr.onload=function(){
                const textarea = document.getElementById(element_id).getElementsByTagName('textarea')[0]
                textarea.style.height = "219px"
                textarea.value = fr.result

            }
            fr.readAsText(this.files[0]);
        })
    }

    document.querySelectorAll(".viewbox").forEach(box => {
        box.addEventListener('mouseover', function(){
            document.getElementById("folder1").style.overflow = "hidden"
            box.style.border = "2px solid dodgerblue"
        })
        box.addEventListener('mouseout', function(){
            document.getElementById("folder1").style.overflow = "auto"
            box.style.border = "1px solid rgb(228,228,228)"
        })
    })
}