let sem;
let recargo = 0;
let outCober = 0;

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

    console.log("Re y fuera LOAD: ",recargo , outCober);
    
    let spRecargo = document.getElementById("spRecarg");
        spRecargo.innerHTML = formatNumber.new(recar * vrealUC * cantEst * 0.5, 'Bs.S ', true);
    let spDerIns = document.getElementById("spDI");
        spDerIns.innerHTML = formatNumber.new(periodo[perioact].di * vrealUC * cantEst, 'Bs.S ', true);
    let spOutCober = document.getElementById("spOut");
        spOutCober.innerHTML =  formatNumber.new(vrealUC * ocober * cantEst * 0.5, 'Bs.S ', true);
}

function generarDonacionCal(){
    //Capturamos cobertura del range
    cober = document.getElementById("coopRangeFab").value;

    totalizacion();

    //Cantidad de estudiantes
    let cantEst = document.getElementById('cantAlum').value;

    //document.getElementById('montoT').innerHTML = formatNumber.new(totalbs * cantEst * 0.5, 'Bs.S ', true);
    totalizarDonacion();
    document.getElementsByClassName("totalizacion")[0].style.display = 'block';
}

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

    console.log(adicional, adicional * vrealUC);
    document.getElementById('montoT').innerHTML = formatNumber.new( ((totalbs * 0.5) + (adicional * vrealUC)) , 'Bs.S ', true);
}