let sem;

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

function generarDonacionCal(){
    document.getElementById('montoT').innerHTML = formatNumber.new(totalbs, 'Bs.S', true);
    document.getElementsByClassName("totalizacion")[0].style.display = 'block';
}