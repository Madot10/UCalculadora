/* COMPORTAMIENTO MODALS */
let isOpen = 0;

function closeModal(){
    isOpen = 0;
    for (const modal of document.getElementsByClassName("modal")) {
        modal.style.display = "none";
    }
}

function openModal(nameModal){
    isOpen = 1;

    switch (nameModal) {
        case 'coopModal':
            resetCoopModal();
            break;

        case 'carModal':
           /* if(!sede){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA SEDE!");
            }*/
            break;

        case 'matModal':
           /* if(!carrera){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA CARRERA!");
            }*/
            break;

        default:
            break;
    }

    if(isOpen){
        //abrir
        document.getElementById(nameModal).style.display = "block";
    }else{
        document.getElementById(nameModal).style.display = "none";
    }
}

window.onclick = function(event) {
   // alert("run");
    if (isOpen && event.target.className == 'modal') {
        //Si hay algun modal abierto >> cerrar
        closeModal();
    }
  }



/* SEDE MODAL */
function sedeSelect(cod){
    sede = cod;
    let span = document.getElementById('sName');
    let parentElem = span.parentElement;

    switch (cod) {
        case "mtb":
            span.innerHTML = "MONTALBÁN";
            break;

        case "g":
            span.innerHTML = "GUAYANA";
            break;

        case "tq":
            span.innerHTML = "LOS TEQUES";
            break;   

        default:
            break;
    }

    //Ocultamos flecha
    parentElem.children[2].style.display = 'none';

    closeModal();
}
/* END SEDE MODAL */

/* CARRERA MODAL */
function carreraSelect(elem){
    //limpiamos texto
    let content = elem.textContent.replace(/\n/g,'');
    content = elem.textContent.replace(/[.]/g,'');
    content = content.trim();
    content = content.toUpperCase();

    let span = document.getElementById("sCarrera");
    let parentElem = span.parentElement;

    //guardamos
    carrera = content.replace(/\s/g,'').toLowerCase();

    //Ocultamos flecha
    parentElem.children[2].style.display = 'none';

    materias = GetJsonDataMaterias(carrera);
    console.log(carrera, materias);

    //mostramos nombre de carrera en boton exterior
    span.innerHTML = content;

    //limpiamos tabla de materias 
    document.getElementsByClassName('materias')[0].innerHTML = '';
    ucbase = 0;
    uctotal = 0;
    actualizarTotalUC();

    genMateriaList();
    closeModal();
}
/* END CARRERA MODAL */

/* MATERIA MODAL */
function toggleActiveChbox(elem){
    let parentElem = elem.parentElement;
    parentElem.classList.toggle("actChbox");
    materiaSelect(elem);
}

function desCheckMatList(id){
    let elem = document.getElementById(id);
    
    if(elem.checked){
        elem.checked = false;
    }

    toggleActiveChbox(elem);

        
}

function genMateriaList(){
    let main = document.getElementById("matList");
    main.innerHTML = '';
    let divBtn;
    let divCont;

    let semI = null;
    let semAct = null;
    console.log("run out");
    //Reccorremos cada materia
    for (let i = 0; i < materias.length; i++) {
        console.log("run");
        semI = materias[i].Semestre;

        //Nuevo semestre >> nueva seccion
        if(semI != semAct){ 
            semAct = semI;
            if(divBtn && divCont){
                main.appendChild(divBtn);
                main.appendChild(divCont);
            }
            //Creamos
            divBtn = document.createElement("div");
            divCont = document.createElement("div");

            //Formato
            divBtn.innerHTML = `<div class="collapsible" onclick="toggleList(this)"> ${semAct}</div>`;
            divCont.innerHTML = `<div class="content"></div>`;

            divBtn = divBtn.firstElementChild;
            divCont = divCont.firstElementChild;
        }

        //Creamos materia
        let div = document.createElement('div');
            let inp = document.createElement('input');
            inp.setAttribute("id", i);
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("class", "chbox");
            inp.setAttribute("oninput", "toggleActiveChbox(this)");

        div.appendChild(inp);

            let lb = document.createElement("label");
            lb.setAttribute("for", i);
            lb.setAttribute("class", "materia");
            lb.innerText = materias[i].Asignatura;
        
        div.appendChild(lb);

        divCont.appendChild(div);

    }
    main.appendChild(divBtn);
    main.appendChild(divCont);
}


/* END MATERIA MODAL */


/* COOP MODAL */
function changeCoop(event){
    document.getElementById('scobertura').innerHTML = event.value + '%';
}

function resetCoopModal(){
    document.getElementById('btnCoop').style.display = "block";
    document.getElementById('btnRgo').style.display = "none";
}

function selectCobertura(tipo){
    //ocultamos opciones de coop y mostramos rango
    document.getElementById('btnCoop').style.display = "none";
    coop = tipo;

    document.getElementById('tipoAyuda').innerHTML = tipo.toUpperCase();
    document.getElementById('btnRgo').style.display = "block";
    
}

function coopSelect(tipo, cob){
    if(cob == -1){
        cober = document.getElementById('coopRange').value;
    }else{
        coop = tipo;
        cober = cob;
    }
    document.getElementById('sCoop').innerHTML = `${coop.toUpperCase()} ${cober}%`;
    closeModal();
}
/* END COOP MODAL */