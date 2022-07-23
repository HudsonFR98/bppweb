/////////////////////////////////
//////// Initialisation ////////
/////////////////////////////////

const main_container = document.getElementById('folder1')
const waiting_room = document.getElementById('waitingRoom')
const documentation = document.getElementById('rightcolumn')

// déplacer nos éléments dans différents conteneurs (utile si jamais on implémente des sous-formulaires
// ou des genres de dossiers
const containers = document.querySelectorAll('.container')
containers.forEach(container => {
    container.addEventListener('dragover',event => {
        event.preventDefault() // enlève le logo interdiction
        const afterElement = getDragAfterElement(container, event.clientY) // retourne l'élément survolé par l'élément d'interêt
        const draggable = document.querySelector('.dragging')
        if (afterElement === null) { // si on ne survole rien du tout (en bas de la liste)
            container.appendChild(draggable) // ajouter en fin de liste
        } else { // mais si on est au dessus d'un élément donné
            container.insertBefore(draggable, afterElement) // insérer juste avant (au dessus) de cet élément
        }
    })
})

function moveElements(){
    const draggables = document.querySelectorAll('.draggable')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart',() => {
            draggable.classList.add('dragging') // quand on drag un draggable, il s'assombri
        })
        draggable.addEventListener('dragend',() => {
            draggable.classList.remove('dragging') // quand on lache un draggable, il redevient normal
        })
    })
}

// modifier la place d'un éléments parmis les autres éléments
// retourne l'élément survolé par l'élément d'interêt
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')] //récupérer tous les éléments sauf celui qu'on drag dans un array.
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) { // si notre element d'interet se situe SOUS un élément
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}

// lorsque qu'un élément du formulaire est survolé, sa documentation doit apparaitre à droite

const elements = document.querySelectorAll('.element')
elements.forEach(element => {
    element.addEventListener('mouseover', () => {
        const doc_func = element.getAttribute('value')
        eval(doc_func)
    })
})

// concerne la page job : losqu'un fichier output ou input est survolé il est proposé de le télécharger ou de le visu

const jobfileboxes = document.querySelectorAll('.jobfilebox')
jobfileboxes.forEach(jobfilebox => {
    jobfilebox.addEventListener('mouseover', () => {
        jobfilebox.querySelector('.jobfile').style.display = "none"
        jobfilebox.querySelector('.getfile').style.display = "block"
    })
    jobfilebox.addEventListener('mouseout', () => {
        jobfile = jobfilebox.querySelector('.jobfile')
        jobfilebox.querySelector('.jobfile').style.display = "block"
        jobfilebox.querySelector('.getfile').style.display = "none"
    })
})

// donne un id spécial à un élément d'une classe donnée

function giveId(classname){
    const elements = document.querySelectorAll("."+classname)
    var max_n = 0
    var n = 0
    elements.forEach(element => {
		n = parseInt(element.getAttribute("id").replace(/\D/g,''))
        if(n > max_n){
            max_n = n
        }
    })
	max_n++
	return max_n
}

// Générateur de la boite (ou 'élément', 'objet')
// name: to display on top right of the box
// classname: type of object/element/box (model, process... etc)
// content : what's inside the box
// logo : to display on top right of the box
// n : give a unique identity (classname + n) to that box/element/object
// closed : is the content of box visible?

function spawn_element(name, classname, content, logo, n, closed=true){
    // supprimer le texte d'introduction s'il existe encore
    try {
     document.querySelector('.helpText').remove()
    } catch (error){}

	// colorier la boite selon les conditions suivantes:
	function getRandomInt(max) {return Math.floor(Math.random() * max);}
	let color
	switch (classname){
		case "model":
			color = `${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)}`
			break
		default:
			color = ""
	}

    // construction de la boite de l'élément et injection du contenu
    waiting_room.innerHTML += `
    <div class="draggable ${classname} card text-dark bg-light mb-3" id="${classname}${n}" draggable="true">
        <div class="card-header" style="background-color: ${'rgba('+color+',0.2)'}">
        <div class="logoElement">
        ${logo}
        </div>
        <p class="titleElement">${name}</p>
        <i class="elementId">${classname}${n}</i>
        <div class="closeElement" onclick="document.getElementById('${classname}${n}').remove()">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
            </svg>
        </div>
        <div class="collapseElement">
            <div onclick="collapse('${classname}${n}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
            </svg>
            </div>
        </div>
        </div>
        <div class="card-body" style="background-color: ${'rgba('+color+',0.05)'}">
            ${content}
        </div>
    </div>
    `
    var source = document.getElementById(`${classname}${n}`);
    document.getElementById("folder1").appendChild(source)
	if (closed===true){
		collapse(`${classname}${n}`, false)
	}
}

// reduire taille d'un élément pour alléger la page
function collapse(element_id, plus= false){
    if (plus === false) {
        document.getElementById(element_id).querySelector('.card-body').style.display = 'none'
        document.getElementById(element_id).querySelector('.collapseElement').innerHTML = `
        <div onclick="collapse('${element_id}','true')">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
            </svg>
        </div>
        `
        document.getElementById(element_id).querySelector('.collapseElement').style.color = '#60CA65'
    } else {
        document.getElementById(element_id).querySelector('.card-body').style.display = 'block'
        document.getElementById(element_id).querySelector('.collapseElement').innerHTML = `
        <div onclick="collapse('${element_id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
            </svg>
        </div>
        `
        document.getElementById(element_id).querySelector('.collapseElement').style.color = '#BABABA'
    }
}

// simple sleep function to wait
function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

////////////////////////////////////
//////// TREE VIZUALIZATION ////////
////////////////////////////////////

// http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
if (!String.prototype.trim)
{
	String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}

function showtree(element_id)
{
    var t = new Tree();
    var element = document.getElementById("textarea"+element_id);
    var newick = element.value;
    newick = newick.trim(newick);
	t.Parse(newick);

	//console.log(t.nodes)

	document.getElementById(element_id).querySelector(".viewbox").style.display = "block"

	if (t.error !== 0)
	{
		document.getElementById('message'+element_id).innerHTML=`<p style="color: red">Error parsing tree</p>`;
	}
	else
	{
		document.getElementById('message'+element_id).innerHTML=`<p style="color: green">Parsed OK</p>`;

		t.ComputeWeights(t.root);

		var td = null;

		var selectmenu = document.getElementById('style'+element_id);
		var drawing_type = (selectmenu.options[selectmenu.selectedIndex].value);

		switch (drawing_type)
		{
			case 'rectanglecladogram':
				td = new RectangleTreeDrawer();
				break;

			case 'phylogram':
				if (t.has_edge_lengths)
				{
					td = new PhylogramTreeDrawer();
				}
				else
				{
					td = new RectangleTreeDrawer();
				}
				break;

			case 'circle':
				td = new CircleTreeDrawer();
				break;

			case 'circlephylogram':
				if (t.has_edge_lengths)
				{
					td = new CirclePhylogramDrawer();
				}
				else
				{
					td = new CircleTreeDrawer();
				}
				break;

			case 'cladogram':
			default:
				td = new TreeDrawer();
				break;
		}

		// clear existing diagram, if any
		var svg = document.getElementById('svg'+element_id);
		while (svg.hasChildNodes())
		{
			svg.removeChild(svg.lastChild);
		}


		var g = document.createElementNS('http://www.w3.org/2000/svg','g');
		g.setAttribute('id','viewport'+element_id);
		svg.appendChild(g);


		td.Init(t, {svg_id: 'viewport'+element_id, width:500, height:500, fontHeight:10, root_length:0.1} );

		td.CalcCoordinates();
		td.Draw();

		// font size
		var cssStyle = document.createElementNS('http://www.w3.org/2000/svg','style');
		cssStyle.setAttribute('type','text/css');

		var font_size = Math.floor(td.settings.height/t.num_leaves);
		font_size = Math.max(font_size, 1);

		var style=document.createTextNode("text{font-size:" + font_size + "px;}");
		cssStyle.appendChild(style);

		svg.appendChild(cssStyle);

		// label leaves...

		var n = new NodeIterator(t.root);
		var q = n.Begin();
		while (q != null)
		{
			if (q.IsLeaf())
			{
				switch (drawing_type)
				{
					case 'circle':
					case 'circlephylogram':
						var align = 'left';
						var angle = q.angle * 180.0/Math.PI;
						if ((q.angle > Math.PI/2.0) && (q.angle < 1.5 * Math.PI))
						{
							align = 'right';
							angle += 180.0;
						}
						drawRotatedText('viewport'+element_id, q.xy, q.label, angle, align)
						break;

					case 'cladogram':
					case 'rectanglecladogram':
					case 'phylogram':
					default:
						drawLeafText('viewport'+element_id, q.xy, q.label);
						break;
				}
			}
			q = n.Next();
		}


		// Scale to fit window
		var bbox = svg.getBBox();

		var scale = Math.min(td.settings.width/bbox.width, td.settings.height/bbox.height);


		// move drawing to centre of viewport
		var viewport = document.getElementById('viewport'+element_id);
		viewport.setAttribute('transform', 'scale(' + scale + ')');

		// centre
		bbox = svg.getBBox();
		if (bbox.x < 0)
		{
			viewport.setAttribute('transform', 'translate(' + -bbox.x + ' ' + -bbox.y + ')');
		}



		// pan
		$('svg').svgPan('viewport'+element_id);
	}


}

////////////////////////////////
///// save or upload form //////
////////////////////////////////


function saveForm(soft){
	saveButton = document.querySelector('.saveFormButton')
	saveButton.href = 'data:text/html;charset=UTF-8+' + encodeURI(document.querySelector('#mainform').innerHTML)
	saveButton.target = '_blank'
	saveButton.download = `${soft}_webform.html`
	saveButton.click()
}

function updateForm(){
	input = document.querySelector('#updateFormInput')
	input.onchange = e => {
		file = e.target.files[0];
		reader = new FileReader();
		reader.readAsText(file, 'UTF-8');
		reader.onload = readerEvent => {
			content = readerEvent.target.result;
			document.querySelector('#mainform').innerHTML = content
		}
	}
	input.click();
}

////////////////////////////////
//////////// jobs //////////////
////////////////////////////////

// a little spinner is rolling and then the job is killed...

function killjob(url, name){
	let miniLoading = document.createElement("div")
	miniLoading.innerHTML = `
		<div class="smallSpinner">
			<div class="spinner-border spinner-border-sm text-danger" role="status">
				  <span class="visually-hidden">Loading...</span>
			</div>
		</div>
	`
	document.getElementById(name).querySelector(".killJob").replaceWith(miniLoading)
	window.location.href = url

}