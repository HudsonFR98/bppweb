/////////////////////////////////////////////////////////////////////
//////// fonctions pour la documentation (colonne de droite) ////////
/////////////////////////////////////////////////////////////////////


function load_docu(span_id){

    if(span_id !== "all"){
        doc = docu.split(`<span id="${span_id}"></span>`)[1].split('<span id=')[0]
    }else{
        doc = docu.split('<body lang="en">')[1].split('</body>')[0]
    }
    documentation.innerHTML = `

    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Bppsuite documentation
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body" style="height: 800px;overflow: auto">
            ${doc}
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Bio++ description
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body iframeBody">
            <div id="iframeContainer">
            <iframe scrolling="no" id="iframeDocumentation" src="https://pbil.univ-lyon1.fr/bpp-doc/bpp-phyl/html/classbpp_1_1${span_id.split('-').pop()}.html#details">
            </iframe>
            </div>
          </div>
        </div>
      </div>
    `
}

// PASTILLE ROUGE : penser à récuperer le lien directement, att de L.gueguen ai retouché la doc...