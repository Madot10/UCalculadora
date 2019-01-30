
/* SISTEMA DE COOPERACION */
function selectCobertura(tipo){
    //ocultamos opciones de coop y mostramos rango
    document.getElementById('btnCoop').style.display = "none";

    document.getElementById('tipoAyuda').innerHTML = tipo.toUpperCase();
    document.getElementById('btnRgo').style.display = "block";
    
}
/* END SISTEMA DE COOPERACION */