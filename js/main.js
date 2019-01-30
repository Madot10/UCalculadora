/* SISTEMA GENERAL */
let valorUC;
let ucbase = 0;
let uctotal = 0;

let sede;
let carrera;
let materias;
let coop;
let cober;

let limitProp = 27;
let limitBeca = 30;
let limitFab = 30;

//FUNCIONES
//Retorna jsonData de carrera
function GetJsonDataMaterias(tx){
    tx = tx.replace(/\s/g,'');
    tx = tx.replace(/\n/g,'');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
   return tx = window[tx];
}

//Arregla uc cambiado en el archivo debido al V y SP
function FixUC(taxNum, ucnum){
    //console.log(taxNum);
    
    if(taxNum){
        if( taxNum.includes("(V)") || taxNum.includes("(SP)")){
            //si es una modalida sp y v 
            //descontamos el 0.72
            let k = Number(ucnum) * 0.72;
            //console.log("K2 " + k);
            return Math.round(k);
        }else{
            //console.log(ucnum);
            return Math.round(Number(ucnum));
        }

    }
    return 0;
}

function UCrecargo(uc, tax){

    if( tax.includes("(V)") || tax.includes("(SP)")){
        //ya DB incluye recargo pro virtual 
        //+40%
        return uc;

    }else{
        let taxN = tax.replace( /^\D+/g, '');

        switch(taxN){
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            //sin recargo
                //console.log("sin recargo");
                return uc;
            break;
    
            case "7":
            case "8":
            case "9":
            //+ 30%
                //console.log("+ 30%");
                return uc * 1.3;
    
            break;
            
            default:
                console.log("error UC RECARGO");
                //alert('ERROR INESPERADO: #01');
            break;
        }
    }
    
}

/* END SISTEMA GENERAL */

/* SISTEMA DE MATERIAS */
function toggleList(elem){
    elem.classList.toggle("active");
        var content = elem.nextElementSibling;

        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
}

function actualizarTotalUC(){
    document.getElementById('totalUC').innerHTML = `${ucbase} UC`;
}

function materiaSelect(elem){
    //Verificamos si es true o false
    let id = elem.getAttribute("id");
    if(elem.checked){
        //activado
        addMateriaList(id);
    }else{
        //desactivado >> eliminar
        deleteMateriaList(id);
    }
}

function addMateriaList(id){
    let data = materias[id];

    let main = document.getElementsByClassName("materias")[0];

    let divC = document.createElement("div");
    divC.classList.add("container", id);
    divC.setAttribute("onclick", `deleteMateriaList(${id})`)

    divC.innerHTML = `<table><tr><td class="nMat"> <span style="color: red;">X</span> ${data.Asignatura}</td><td> ${FixUC(data.Tax, data.UC)} UC</td></tr><tr><td>${data.Semestre}</td><td> ${data.Tax}</td></tr></table>`;

    main.appendChild(divC);

    ucbase += FixUC(data.Tax, data.UC);
    uctotal += UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}

function deleteMateriaList(id){
    let elem = document.getElementsByClassName(id)[0];
    elem.parentNode.removeChild(elem);

    let data = materias[id];
    ucbase -= FixUC(data.Tax, data.UC);
    uctotal -= UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}
/*
window.onload = function() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
        console.log("run");
      coll[i].addEventListener("click", 
      function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
}*/

/* END SISTEMA DE MATERIAS */

/* SISTEMA DE COOPERACION */
function selectCobertura(tipo){
    //ocultamos opciones de coop y mostramos rango
    document.getElementById('btnCoop').style.display = "none";

    document.getElementById('tipoAyuda').innerHTML = tipo.toUpperCase();
    document.getElementById('btnRgo').style.display = "block";
    
}
/* END SISTEMA DE COOPERACION */