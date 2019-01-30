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
            if(!sede){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA SEDE!");
            }
            break;

        case 'matModal':
            if(!carrera){
                isOpen = 0;
                alert("¡DEBE SELECCIONAR UNA CARRERA!");
            }
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
    content = content.trim();
    content = content.toUpperCase();

    let span = document.getElementById("sCarrera");
    let parentElem = span.parentElement;

    //guardamos
    carrera = content.replace(/\s/g,'').toLowerCase();

    //Ocultamos flecha
    parentElem.children[2].style.display = 'none';

    //mostramos nombre de carrera en boton exterior
    span.innerHTML = content;

    closeModal();
}
/* END CARRERA MODAL */

/* MATERIA MODAL */

/* END MATERIA MODAL */


/* COOP MODAL */

function changeCoop(event){
    document.getElementById('scobertura').innerHTML = event.value + '%';
}

function resetCoopModal(){
    document.getElementById('btnCoop').style.display = "block";
    document.getElementById('btnRgo').style.display = "none";
}

/* END COOP MODAL */