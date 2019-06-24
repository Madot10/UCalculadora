let sem;
let recargo = 0;
let outCober = 0;


function totalizarDonacion(){
    //Cobertura
    let cober = document.getElementById("coopRangeFab").value;
    let cobertura = cober/100;

    //Cantidad de estudiantes
    let cantEst = document.getElementById('cantAlum').value;

    
    document.getElementById('montoT').innerHTML = formatNumber.new( ((5 * cantEst * getUCfecha( getFistDayThisMonth()) * cobertura)) , 'Bs.S ', true);
}

function getFistDayThisMonth(){
    let day = new Date();
    let fbase = `${day.getMonth() + 1}/1/${day.getFullYear()}`;

    return fbase;
}

function loadMes(){
    let m = new Date().getMonth() + 1;
    switch (m) {
        case 1:
            return "Enero";

        case 2:
            return "Febrero";

        case 3:
            return "Marzo";

        case 4:
            return "Abril";

        case 5:
            return "Mayo";

        case 6:
            return "Junio";

        case 7:
            return "Julio";

        case 8:
            return "Agosto";

        case 9:
            return "Septiembre";
    
        case 10: 
            return "Octubre";
        
        case 11:
            return "Noviembre";
        
        case 12:
            return "Diciembre";

        default:
            break;
    }
}

function initAccordion(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
    });
    }
}

function openCarrera(){
    document.getElementById('carModal').style.display = "block";
}

function openSem(){
    if(carrera != ''){
        document.getElementById('matModal').style.display = "block";
    }else{
        alert("¡Debe seleccionar una carrera!");
    }
    
}

function updateTextPorcentaje(elem){
    document.getElementById("spcoop").innerHTML = elem.value + "%";
    //hideDonacion();
    totalizarDonacion();
}

let indiceFinal = 0;

function addAllMaterias(){
    let found = false;
    for (let i = 0; i < materias.length; i++) {
            if(materias[i].Semestre == sem){
                //Es de semestre buscado
                indiceFinal = i;
                addMateriaList(i);
                found = true;
            }else if(found){
                //break al pasar todos los debidos
                break;
            }
    }
}

function delAllMaterias(){
    let i = indiceFinal;
    let matElem = document.getElementsByClassName(i);
    while(matElem.length > 0){
        deleteMateriaList(i);
        i--;
        matElem  = document.getElementsByClassName(i);
    }
}

function loadMontosAcordion(recar, ocober){
    //Cantidad de estudiantes
    let cantEst = document.getElementById('cantAlum').value;

    recargo = recar * cantEst * 0.5;
    outCober = ocober * cantEst* 0.5;
    
    let spRecargo = document.getElementById("spRecarg");
        spRecargo.innerHTML = formatNumber.new(recar * vrealUC * cantEst * 0.5, 'Bs.S ', true);
    let spDerIns = document.getElementById("spDI");
        spDerIns.innerHTML = formatNumber.new(periodo[perioact].di * vrealUC * cantEst, 'Bs.S ', true);
    let spOutCober = document.getElementById("spOut");
        spOutCober.innerHTML =  formatNumber.new(vrealUC * ocober * cantEst * 0.5, 'Bs.S ', true);
}

function hideDonacion(){
    document.getElementsByClassName("totalizacion")[0].style.display = 'none';
}
/*
function generarDonacionCal(){
    if(!sem){
        alert("¡Debe seleccionar un semestre!");
    }else{
        //Capturamos cobertura del range
        cober = document.getElementById("coopRangeFab").value;

        totalizacion();

        //Cantidad de estudiantes
        let cantEst = document.getElementById('cantAlum').value;

        //document.getElementById('montoT').innerHTML = formatNumber.new(totalbs * cantEst * 0.5, 'Bs.S ', true);
        totalizarDonacion();
        document.getElementsByClassName("totalizacion")[0].style.display = 'block';
    }
}*/

/*
function totalizarDonacion(){
    //Cantidad de estudiantes
    let cantEst = document.getElementById('cantAlum').value;
    let adicional = 0;

    if(document.getElementById("includeDI").checked){
        //Si incluir
        adicional += periodo[perioact].di * cantEst;
    }

    if(document.getElementById("includeOut").checked){
        //Si incluir
        adicional += outCober;
    }else if(document.getElementById("includeRecargo").checked){
        //Si incluir
        adicional += recargo;
    }

    //console.log(adicional, adicional * vrealUC);
    document.getElementById('montoT').innerHTML = formatNumber.new( ((totalbs * 0.5 * cantEst) + (adicional * vrealUC)) , 'Bs.S ', true);
}*/