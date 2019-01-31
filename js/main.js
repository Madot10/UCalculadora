/* SISTEMA GENERAL */
let valorUC = 12082.5;
let vrealUC = valorUC;
let ucbase = 0;
let uctotal = 0;
let ucpagar = 0;
let totalbs;

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

function totalizacion(){
    vrealUC = valorUC;
    let cobertura = 1 - (cober/100);
    let ucfuera = 0;

    //descuentos segun carrera
    if(carrera.includes("educacion") || carrera.includes("letras") || carrera.includes("filosofia") ){
        //Aplicamos 30% de descuento >> 
       vrealUC = valorUC * 0.7;
    }

    //descuento por sede
    switch(sede){
        case "g":
        case "tq":
            //Guayana  /Los teques 20% descuento
            //document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
            vrealUC *= 0.8;
        
        break;
    }

    //descuento por cooperacion
    if(coop != 'fab' && coop != 'ninguna'){
        //Beca o Prop
        let limit = limitBeca;
        if(coop != 'beca'){
            limit = limitProp;
        }

        //Recargo
        let ucre = uctotal - ucbase;

        if(ucbase <= limit){
            console.log("menor");
            //por debajo de coobertura
            //aplicamos %  a lo que queda
            ucfuera = ucre;
            ucpagar = (ucbase * cobertura) + ucre; 

        }else if(ucbase > limit){
            console.log("mayor");
            //por encima de cobertura
            ucfuera = (ucbase - limit) + ucre;
            ucpagar = (ucbase - limit) + ucre + (limit * cobertura);
        }

    }else if(coop != 'ninguna'){
        //FAB
        if(uctotal <= limitFab){
            console.log("menor fab");
            //Por debajo
            ucpagar = uctotal * cobertura;
        }else{
            console.log("mayor fab");
            //Por encima
            ucfuera = (uctotal - limitFab);
            ucpagar = (uctotal - limitFab) + (limitFab * cobertura);
        }
    }else{
        //ninguna cooperacion
        ucpagar = uctotal;
    }

    console.log("FINAL: ");
    console.log("Cobertura: ", cobertura);
    console.log("Recargos: ", uctotal - ucbase);
    console.log("UC fuera cobertura: ", ucfuera);
    console.log("UCpagar: ", ucpagar);
    console.log("Valor real UC: ", vrealUC);
    console.log("Total 1pago: ", Number(ucpagar*vrealUC).toFixed(2));
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
    divC.setAttribute("onclick", `desCheckMatList(${id});`)

    divC.innerHTML = `<table><tr><td class="nMat"> <span style="color: red;">X</span> ${data.Asignatura}</td><td> ${FixUC(data.Tax, data.UC)} UC</td></tr><tr><td>${data.Semestre}</td><td> ${data.Tax}</td></tr></table>`;

    main.appendChild(divC);

    ucbase += FixUC(data.Tax, data.UC);
    uctotal += UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}

function deleteMateriaList(id){
    let elem = document.getElementsByClassName(id)[0];
    elem.parentNode.removeChild(elem);

    //

    let data = materias[id];
    ucbase -= FixUC(data.Tax, data.UC);
    uctotal -= UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}

/* END SISTEMA DE MATERIAS */

/* SISTEMA DE COOPERACION */

/* END SISTEMA DE COOPERACION */