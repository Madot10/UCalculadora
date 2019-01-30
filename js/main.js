/* SISTEMA GENERAL */
let valorUC;
let sede;
let carrera;

//FUNCIONES
//Retorna jsonData de carrera
function GetJsonDataMaterias(tx){
    tx = tx.replace(/\s/g,'');
    tx = tx.replace(/\n/g,'');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
   return tx = window[tx];
}

/* END SISTEMA GENERAL */

/* SISTEMA DE COOPERACION */
function selectCobertura(tipo){
    //ocultamos opciones de coop y mostramos rango
    document.getElementById('btnCoop').style.display = "none";

    document.getElementById('tipoAyuda').innerHTML = tipo.toUpperCase();
    document.getElementById('btnRgo').style.display = "block";
    
}
/* END SISTEMA DE COOPERACION */