////////////////////////////////////////////////
//////// bppsuite fonctions principales ////////
////////////////////////////////////////////////

function alphabet(name, closed=false){
    const classname = "alphabet"

    try {
        document.getElementById(`${classname}1`).remove() // il ne peut y avoir plus d'un élément de ce type
    } catch (error) {console.log(`override of ${classname}1`)}

    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        <div class="row" style="padding-top: 10px">
            <div class="col">
                ${select('alphabet1',
                    element_id,
                        'Select an alphabet',
                        {'alphabet=DNA':{'description':'DNA','onclick': {"function":"empty","n_col":2}},
                            'alphabet=RNA':{'description':'RNA','onclick': {"function":"empty","n_col":2}},
                            'alphabet=Protein':{'description':'Protein','onclick': {"function":"empty","n_col":2}},
                            'alphabet=Binary':{'description':'Binary','onclick': {"function":"empty","n_col":2}},
                            [`alphabet=Word(letter={${element_id}_letter},length={${element_id}_lenght})`]:{'description':'Word','onclick': {"function":"word_selected","n_col":2}},
                            [`alphabet=Codon(letter={${element_id}_letter},genetic_code={${element_id}_genetic_code})`]:{'description':'Codon','onclick': {"function":"codon_selected","n_col":2}}
                            },
                    'alphabet=DNA'
                )}
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-chat-right-quote-fill" viewBox="0 0 16 16">
          <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM7.194 4.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 0 1-.612.01.405.405 0 0 1-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 7.333 4 6.587 4 5.667 4 4.747 4.776 4 5.734 4c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 7.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 0 1-.613.01.405.405 0 0 1-.011-.59c.42-.416.672-.831.81-1.22z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed) // créer l'élément
    moveElements() // rendre déplaçable
}

function inputDataAlignement(name, closed=false){
    const classname = "data"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        ${hiddenInput(`init${element_id}`, `input.data${n}=alignment(file={file${element_id}},format={format${element_id}},sites_to_use={sites_to_use${element_id}},remove_stop_codons={remove_stop_codons${element_id}}, max_gap_allowed={max_gap_allowed${element_id}})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
                ${inputFile(`file${element_id}`,"The sequence file to use")}
            </div>
            <div class="col">
                ${select(`format${element_id}`,
                            element_id,
                        'File format',
                        {[`Fasta(extented={${element_id}_fasta_extended},strictNames={${element_id}_fasta_strictnames})`]:{'description':'Fasta','onclick': {"function":"fasta_format","n_col":3}},
                            [`Mase(siteSelection={${element_id}_site_selection})`]:{'description':'Mase','onclick': {"function":"mase_format","n_col":3}},
                            [`Phylip(order={${element_id}_order},type={${element_id}_type},split={${element_id}_split})`]:{'description':'Phylip','onclick': {"function":"phylip_format","n_col":3}},
                            [`Clustal(extraSpaces={${element_id}_extra_spaces)`]:{'description':'Clustal','onclick': {"function":"clustal_format","n_col":3}},
                            'Dcse()':{'description':'Dcse','onclick': {"function":"empty","n_col":3}},
                            'Nexus()':{'description':'Nexus','onclick': {"function":"empty","n_col":3}},
                            'Genbank()':{'description':'Genbank','onclick': {"function":"empty","n_col":3}}
                            },
                    `Fasta(extented={${element_id}},strictNames={${element_id}})`
                )}
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col">
                ${select(`sites_to_use${element_id}`,
                            element_id,
                        'Sites to use',
                        {'all':{'description':'all','onclick':{'function':'max_gap_and_unresolved_allowed',"n_col":4}},
                            'nogap':{'description':'nogap','onclick':{'function':'empty',"n_col":4}},
                            'complete':{'description':'complete','onclick':{'function':'empty',"n_col":4}}}, 
                    'all')}
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col">${binarySwitch(`remove_stop_codons${element_id}`,"Remove stop codons", "false","true")}</div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 12">
          <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    fasta_format(element_id,3) // executer la fonction de la valuer par defaut (pas obligatoire mais mieux)
    max_gap_and_unresolved_allowed(element_id,4)
    moveElements() // rendre déplaçable
}

function inputTreeUser(name, closed=false){
    const classname = "tree"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        ${hiddenInput(`init${element_id}`, `input.tree${n}=user(file={file${element_id}},format={format${element_id}})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
            ${inputFile(`file${element_id}`,"The phylogenetic tree file to use")}
            </div>
            <div class="col">
            ${select(`format${element_id}`, element_id,"File format",
                        {'Newick':{'description':'Newick','onclick':{'function':'displayNewickTree', 'n_col':2}},
                            'Nexus':{'description':'Nexus','onclick':{'function':'empty', 'n_col':2}},
                            'NHX':{'description':'NHX','onclick':{'function':'empty', 'n_col':2}}},
                    `Newick`
                )}
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col">
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-diagram-3-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
    displayNewickTree(element_id, 2)
}

function inputRandomTree(name, closed=false){
    const classname = "tree"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        ${hiddenInput(`init${element_id}`,`input.tree${n}=random(file={file${element_id}},format={format${element_id}}, data={data${element_id}})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
            ${inputFile(`file${element_id}`,"The phylogenetic tree file to use")}
            </div>
            <div class="col">
            ${select(`format${element_id}`,"","File format",
                        {'Newick':{'description':'Newick'},
                            'Nexus':{'description':'Nexus'},
                            'NHX':{'description':'NHX'}
                            },
                    `Newick`,false
                )}
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col">
              ${info('Data')}
              ${visibleInput(`int`,`data${element_id}`,``)}
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-diagram-3-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

///////////
// MODELS//
///////////


function HKY85(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        ${hiddenInput(`model${n}`,`model${n}=HKY85(initFreqs={${element_id}initfreqs}, theta={${element_id}theta}, theta1={${element_id}theta1}, theta2={${element_id}theta2}, kappa={${element_id}kappa}, data={${element_id}data})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                ${select(`${element_id}initfreqs`,
                        element_id,
                            'Equilibrium frequency',
                            {'observed':{'description':'observed','onclick': {"function":"loadElements","n_col":1,"classlist":"'data'"}},
                                [`value({${element_id}valuesList})`]:{'description':'custom','onclick': {"function":"initfreqsValues","n_col":1}}
                                },
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
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                <div class="input-group">
                    ${tag('theta1')}
                    ${visibleInput('float',`${element_id}theta1`,']0,1[')}
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                <div class="input-group">
                    ${tag('theta2')}
                    ${visibleInput('float',`${element_id}theta2`,']0,1[')}
                </div>
            </div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    mixedModelSwitch(element_id+"mixedmodel", "Mixed model", element_id, 0)
    moveElements() // rendre déplaçable
}

function T92(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        ${hiddenInput(`model${n}`,`model${n}=T92(initFreqs={${element_id}initfreqs}, theta={${element_id}theta}, kappa={${element_id}kappa}, data={${element_id}data})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                ${select(`${element_id}initfreqs`,
                        element_id,
                            'Equilibrium frequency',
                            {'observed':{'description':'observed','onclick': {"function":"loadElements","n_col":1,"classlist":"'data'"}},
                                [`value({${element_id}valuesList})`]:{'description':'custom','onclick': {"function":"initfreqsValues","n_col":1}}
                                },
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
                  ${visibleInput('float',`${element_id}kappa`,'> 0')}
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
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    mixedModelSwitch(element_id+"mixedmodel", "Mixed model", element_id, 0)
    moveElements() // rendre déplaçable
}

function K80(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`model${n}`,`model${n}=K80(kappa={${element_id}kappa}, data={${element_id}data})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5"></div>
            <div class="col">${loadElements(element_id,1, 'data', true)}</div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col col-lg-5">
                <div class="input-group">
                  ${tag('kappa')}
                  ${visibleInput('float',`${element_id}kappa`,'real > 0')}
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    mixedModelSwitch(element_id+"mixedmodel", "Mixed model", element_id, 0)
    moveElements() // rendre déplaçable
}

function JC69(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`model${n}`,`model${n}=JC69`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
                ${loadElements(element_id,0, 'data', true)}
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function modelMixture(name, closed=false){
    const classname = "model"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`model${n}`,`model${n}=Mixture(initFreqs={${element_id}initfreqs},{${element_id}modelList},{${element_id}relrateList},{${element_id}relprobaList})`)}
        ${hiddenInput(`${element_id}modelList`,"")}
        ${hiddenInput(`${element_id}relrateList`,"")}
        ${hiddenInput(`${element_id}relprobaList`,"")}
        <div class="row">
            <div class="col col-lg-5">
                    ${select(`${element_id}initfreqs`,
                            element_id,
                                'Equilibrium frequency',
                                {'observed':{'description':'observed','onclick': {"function":"loadElements","n_col":1,"classlist":"'data'"}},
                                    [`value({${element_id}valuesList})`]:{'description':'custom','onclick': {"function":"initfreqsValues","n_col":1}}
                                    },
                            'initFreqs=observed'
                        )}
                </div>
            <div class="col">
                ${loadElements(element_id,1, 'data', true)}
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <a class="utilitiesButtons" onclick="addModelValue('${element_id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg> <p>new linked model</p>
            </a>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
      <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

/////////////////////////
//////// scenarios //////
/////////////////////////

function scenario(name, closed=false){
    const classname = "scenario"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`scenario${n}`,`scenario${n}={${element_id}pathList}`)}
        ${hiddenInput(`${element_id}pathList`,"")}
        <div class="row" style="padding-top: 10px">
            <a class="utilitiesButtons" onclick="addPath('${element_id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg> <p>new linked path</p>
            </a>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-bezier2" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function path(name, closed=false){
    const classname = "path"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`path${n}`,`path${n}={${element_id}modelList}`)}
        ${hiddenInput(`${element_id}modelList`,"")}
        <div class="row" style="padding-top: 10px">
            <a class="utilitiesButtons" onclick="addModelAndSubmodel('${element_id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg><p>new linked model</p>
            </a>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-bezier2" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

/////////////////////////
////////// rate /////////
/////////////////////////

function gammaDistribution(name, closed=false){
    const classname = "rate"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`rate_distribution${n}`,`rate_distribution${n}=Gamma(n={${element_id}N},alpha={${element_id}Alpha})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                    ${tag('n')}
                    ${visibleInput('int',`${element_id}N`,'int>=2')}
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                    ${tag('alpha')}
                    ${visibleInput('int',`${element_id}Alpha`,'float>0')}
                </div>
            </div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
          <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function constantRate(name, closed=true){
    const classname = "rate"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`rate_distribution${n}`,`rate_distribution${n}=Constant`)}
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
          <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

//////////////////////////////////////////////
/////// frequencies set, distributions.. /////
//////////////////////////////////////////////

// can potentially write init=somthing in bpp file, but it doesnt seems to bother bpp

function fixedFreqSet(name, closed=false){
    const classname = "root_freq"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`root_freq${n}`,`root_freq${n}=Fixed({${element_id}init})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
                ${select(`${element_id}init`,
                            element_id,
                            'Set up the frequencies',
                        {[`init=balanced`]:{'description':'balanced', 'onclick':{'function':'initBalanced','n_col':1}},
                            [`init=observed, observedPseudoCount={${element_id}obsPseudoCount}`]:{'description':'observed', 'onclick':{'function':'initObserved','n_col':1}},
                            [`values={${element_id}values}`]:{'description':'values', 'onclick':{'function':'initValues','n_col':1}}
                        })}
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-asterisk" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function GCFreq(name, closed=false){
    const classname = "root_freq"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`root_freq${n}`,`root_freq${n}=GC({${element_id}init}, theta={${element_id}theta})`)}
        <div class="row" style="padding-top: 10px">
            <div class="col">
                <div class="input-group">
                    ${tag('theta')}
                    ${visibleInput('float',`${element_id}theta`,'real]0,1[')}
                </div>
            </div>
            <div class="col"></div>
        </div>
         <div class="row" style="padding-top: 10px">
            <div class="col">
                ${select(`${element_id}init`,
                            element_id,
                            'Set up the frequencies',
                        {[`init=balanced`]:{'description':'balanced', 'onclick':{'function':'initBalanced','n_col':3}},
                            [`init=observed, data={${element_id}data}, observedPseudoCount={${element_id}obsPseudoCount}`]:{'description':'observed', 'onclick':{'function':'initObserved','n_col':3}},
                            [`values={${element_id}values}`]:{'description':'values', 'onclick':{'function':'initValues','n_col':3}}
                        })}
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-asterisk" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

/////////////////////////
////////process//////////
/////////////////////////

function siteSubstitutionProcess(name, closed=false){
    const classname = "process"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`process${n}`,`process${n}={${element_id}process}`)}
        ${hiddenInput(`${element_id}nonHomogeneousModels`,"")}
            <div class="row" style="padding-top: 10px">
                <div class="col">
                    ${select(`${element_id}process`,
                            element_id,
                                'Choose a site substitution process',
                                {[`Homogeneous(tree={${element_id}tree}, model={${element_id}model}, rate={${element_id}rate}, root_freq={${element_id}root_freq})`]:{'description':'Homogeneous','onclick': {"function":"homogeneous","n_col":1,"classlist":"'tree,model,rate,root_freq'"}},
                                    [`OnePerBranch(tree={${element_id}tree}, model={${element_id}model}, rate={${element_id}rate,}, root_freq={${element_id}root_freq}, shared_parameters=({${element_id}sharedparams}))`]:{'description':'One per branch','onclick': {"function":"onePerBranch","n_col":1,"classlist":"'tree,model,rate,root_freq'"}},
                                    [`NonHomogeneous(tree={${element_id}tree},rate={${element_id}rate},{${element_id}nonHomogeneousModels}, root_freq={${element_id}root_freq})`]:{'description':'NonHomogeneous','onclick': {"function":"nonHomogeneous","n_col":1,"classlist":"'tree,rate,root_freq'"}}
                                    },
                            `Homogeneous(tree={${element_id}tree}, model={${element_id}model}, rate={${element_id}rate, root_freq={${element_id}root_freq})`
                        )}
                </div>
                <div class="col"></div>
            </div>
            <div class="row" style="padding-top: 10px">
                <div class="col"></div>
            </div>
            <div class="row" style="padding-top: 10px">
                <div class="col"></div>
            </div>
            <div class="row" style="padding-top: 10px">
                <div class="col"></div>
                <div class="col"></div>
            </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    loadElements(element_id, 1, 'tree,model,rate,root_freq') // fonction ratachée à la valeur par defaut (homogeneous)
    moveElements() // rendre déplaçable
}


////////////////////////
///////// phylo ////////
////////////////////////

function singlePhylo(name, closed=false){
    const classname = "phylo"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        ${hiddenInput(`phylo${n}`,`phylo${n}=Single(process={${element_id}process}, data={${element_id}data})`)}
            <div class="row" style="padding-top: 10px">
                <div class="col">
                    ${loadElements(element_id, 0, 'process,data', true)}
                </div>
                <div class="col"></div>
            </div>
            <div class="row" style="padding-top: 10px">
                <div class="col"></div>
                <div class="col"></div>
            </div>
    `
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
    </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

/////////////////////////
///// optimization //////
/////////////////////////

// cette func est un peu différente des autres car optimization peut prendre deux forme: optimization={} et optimization.qqchose={}
// on a donc plusieurs champs input et pas juste 1 seul.

function numParamEstimation(name, closed=false){
    const classname = "optimization"

    try {
        document.getElementById(`${classname}1`).remove() // il ne peut y avoir plus d'un élément de ce type
    } catch (error) {console.log(`override of ${classname}1`)}

    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                ${hiddenInput(`optimization`,`optimization={${element_id}method}`)}
                <div class="col">
                    ${select(`${element_id}method`, element_id, 'Choose an optimization method',
                            {[`FullD(derivatives={${element_id}fullDDerivative})`]:{'description':'Full derivatives','onclick': {"function":"fullDDerivative","n_col":1}},
                                [`D-Brent(derivatives={${element_id}DBDerivative}, nstep={${element_id}nstep})`]:{'description':'D-Brent derivatives','onclick': {"function":"DBDerivative","n_col":1}},
                                [`D-BFGS(derivatives={${element_id}DBDerivative}, nstep={${element_id}nstep})`]:{'description':'D-BFGS derivatives','onclick': {"function":"DBDerivative","n_col":1}}
                                }, '')}
                </div>
                <div class="col"></div>
            </div>
            <div class="row" style="padding-top: 10px">
                ${hiddenInput(`optimization_reparametrization`,`optimization.reparametrization={${element_id}reparametrization}`)}
                <div class="col">
                    ${binarySwitch(`${element_id}reparametrization`, 'Transform parameter to remove constraints', "no", "yes")}
                </div>
                ${hiddenInput(`optimization_final`,`optimization.final={${element_id}final}`)}
                <div class="col">${select(`${element_id}final`, element_id, 'Optional final optimization step',
                                    {'powell':{'description':'Powell'},
                                        'simplex':{'description':'Simplex'},
                                        'none':{'description':'None'}}, 'none', false
                                )}
                </div>
            </div>
            <div class="row" style="padding-top: 10px">
                <div class="col">
                    ${hiddenInput(`optimization_max_number_f_eval`,`optimization.max_number_f_eval={${element_id}max_number_f_eval}`)}
                    ${info("max number f eval")}
                    ${visibleInput('int',`${element_id}max_number_f_eval`,'int > 0')}
                    <br>
                    ${hiddenInput(`optimization_tolerance`,`optimization.tolerance={${element_id}tolerance}`)}
                    ${info("tolerance")}
                    ${visibleInput('float',`${element_id}tolerance`,'float > 0')}
                </div>
                <div class="col">
                    ${hiddenInput(`optimization_ignoreparams`,`optimization.ignore_parameters=({${element_id}ignoreparams})`)}
                    ${info("parameters to ignore")}
                    ${visibleInput('text',`${element_id}ignoreparams`,'list of model.param')}
                </div>
            </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hammer" viewBox="0 0 16 16">
        <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    fullDDerivative(element_id, 1)
    moveElements() // rendre déplaçable
}

/////////////////////////
////// bootstrap ////////
/////////////////////////

function bootstrapAnalysis(name, closed=false){
    const classname = "bootstrap"

    try {
        document.getElementById(`${classname}1`).remove() // il ne peut y avoir plus d'un élément de ce type
    } catch (error) {console.log(`override of ${classname}1`)}

    const n = giveId(classname)
    const element_id = classname+n
    const content = `
            <div class="row" style="padding-top: 10px">
                ${hiddenInput(`optimization_approximate`,`optimization.approximate={${element_id}approximate}`)}
                ${hiddenInput(`optimization_verbose`,`optimization.verbose={${element_id}verbose}`)}
                <div class="col">
                    ${binarySwitch(`${element_id}approximate`, 'keep approximate parameters value', "no", "yes")}
                    ${binarySwitch(`${element_id}verbose`, 'detailed output', "no", "yes")}
                </div>
                <div class="col">
                    ${hiddenInput(`optimization_max_number_f_eval`,`optimization.max_number_f_eval={${element_id}max_number_f_eval}`)}
                    ${info("number of replicate")}
                    ${visibleInput('int',`${element_id}max_number_f_eval`,'int > 0')}
                </div>
            </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hammer" viewBox="0 0 16 16">
        <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

/////////////////////////
//////// outputs ////////
/////////////////////////

function outputTree(name, closed=false){
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n

    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("Write the resulting tree")}
                    ${hiddenInput(`${element_id}`,`output.tree.file={outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}tree.dnd`)}
                    
                    ${select(`${element_id}format`,"","File format",
                        {'output.tree.format = Newick':{'description':'Newick'},
                            'output.tree.format = Nexus':{'description':'Nexus'},
                            'output.tree.format = NHX':{'description':'NHX'}
                            },
                    `Newick`,false
                    )}
                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function bppConfFile(name, closed=false){
    const classname = "bpp"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">${inputFile(`file${element_id}`,"The bpp file to use", false)}</div>
                <div class="col"></div>
        </div>
        <div class="row" style="padding-top: 10px">
            ${textArea(`${element_id}content`, "preview")}
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-file-text" viewBox="0 0 16 16">
          <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
        </svg>
    `

    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable

    //Lire et afficher contenu du fichier
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

function outputInfos(name, closed=false){
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("Alignment information log file (site specific rates, etc)")}
                    ${hiddenInput(`${element_id}`,`output.infos = {outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}infos.infos`)}

                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function outputEstimates(name, closed=false){
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("Write numerical parameter estimated values")}
                    ${hiddenInput(`${element_id}`,`output.estimates = {outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}estimates.params.txt`)}

                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function optimizationProfiler(name, closed=false) {
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("A file to dump optimization steps")}
                    ${hiddenInput(`${element_id}`,`optimization.profiler = {outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}optimization.profile`)}

                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function optimizationBackup(name, closed=false) {
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("Save param optimization in case of crash")}
                    ${hiddenInput(`${element_id}`,`optimization.backup.file = {outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}optimization_backup.bck`)}

                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
          <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

function outputBootstrap(name, closed=false) {
    const classname = "output"
    const n = giveId(classname)
    const element_id = classname+n
    const content = `
        <div class="row" style="padding-top: 10px">
                <div class="col">
                    
                    ${info("Write the resulting trees (multi-trees newick format)")}
                    ${hiddenInput(`${element_id}`,`bootstrap.output.file = {outpath${n}}`)}
                    ${hiddenInput(`outpath${n}`,`${element_id}ML_bstrees.dnd`)}

                </div>
                <div class="col"></div>
        </div>
    `
    const logo = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        </svg>
    `
    spawn_element(name, classname, content, logo, n, closed)
    moveElements() // rendre déplaçable
}

