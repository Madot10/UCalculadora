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
    document.getElementById(nameModal).style.display = "block";

    switch (nameModal) {
        case 'coopModal':
            resetCoopModal();
            break;
    
        default:
            break;
    }
}

window.onclick = function(event) {
    if (isOpen && event.target.className == 'modal') {
        //Si hay algun modal abierto >> cerrar
        closeModal();
    }
  }



/* COOP MODAL */

function changeCoop(event){
    document.getElementById('scobertura').innerHTML = event.value + '%';
}

function resetCoopModal(){
    document.getElementById('btnCoop').style.display = "block";
    document.getElementById('btnRgo').style.display = "none";
}

/* END COOP MODAL */