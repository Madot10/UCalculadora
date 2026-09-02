/**
 * @file fab.js
 * @description Módulo dedicado al flujo del "Fondo de Apoyo Beca" (FAB).
 * Administra el cálculo estimado de las donaciones estudiantiles en función de la cantidad de alumnos y la cobertura seleccionada.
 * Incluye lógica de selección masiva de materias para el sistema FAB, acordeones interactivos y actualizaciones visuales de los montos
 * adicionales que apoyan el fondo de becas de la universidad.
 */


/**
 * Define el estado global y los parámetros de mantenimiento del módulo FAB.
 * Centraliza las variables mutables utilizadas durante el flujo de cálculo.
 */
let FAB_STATE = {
    /** Almacena el semestre seleccionado en el flujo FAB. Modificar únicamente desde los controles de selección. */
    sem: null,
    /** Contiene el monto adicional por recargos de taxonomía usado en donaciones FAB. */
    recargo: 0,
    /** Representa el monto fuera de cobertura calculado para FAB. */
    outCober: 0
};

/**
 * Calcula el monto estimado total en divisas de la donación para el Fondo de Apoyo Beca (FAB).
 * Toma la cantidad de estudiantes a apadrinar, la cobertura deseada (%) y el valor de la UC proyectado a inicios del mes actual.
 * 
 * @returns {void} Inyecta directamente el monto monetario total, formateado como USD, en el DOM (elemento 'montoT').
 */
function totalizarDonacion() {
    //Cobertura
    let cober = document.getElementById("coopRangeFab").value;
    let cobertura = cober / 100;

    //Cantidad de estudiantes
    let cantEst = document.getElementById("cantAlum").value;

    // Calculo base del FAB: 5 meses de duracion promedio de un semestre por la cantidad de estudiantes y la cobertura deseada.
    document.getElementById("montoT").innerHTML = formatNumber.new(
        5 * cantEst * getUCfecha(getFistDayThisMonth()) * cobertura,
        "USD ",
        true
    );
}


/**
 * Genera la fecha correspondiente al primer día del mes en curso.
 * Se emplea para forzar la consulta de la tarifa UC a un valor estándar del mes, evitando fluctuaciones diarias o quincenales en la estimación FAB.
 * 
 * @returns {string} Cadena de texto con la fecha formateada en formato MM/DD/YYYY (ej. '9/1/2026').
 */
function getFistDayThisMonth() {
    let day = new Date();
    let fbase = `${day.getMonth() + 1}/1/${day.getFullYear()}`;

    return fbase;
}


/**
 * Traduce el número del mes actual generado por el sistema al nombre del mes en español.
 * Usado visualmente en el panel FAB para indicar a qué mes corresponde la cotización actual.
 * 
 * @returns {string} Nombre capitalizado del mes en curso (ej. 'Enero', 'Febrero').
 */
function loadMes() {
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


/**
 * Inicializa los controladores de eventos (click) para los elementos UI de tipo 'acordeón' en el panel FAB.
 * Permite al usuario desplegar u ocultar detalles de montos adicionales (recargos por taxonomía, fuera de cobertura, etc).
 * 
 * @returns {void} Aplica los event listeners a los nodos HTML de clase 'accordion'. No retorna valores.
 */
function initAccordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
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
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}


/**
 * Abre la ventana modal de selección de carrera, adaptada al flujo de selección masiva del sistema FAB.
 * Permite a los donantes elegir una carrera base para listar posteriormente las materias del semestre.
 * 
 * @returns {void} Cambia el atributo display del modal 'carModal' a 'block'.
 */
function openCarrera() {
    document.getElementById("carModal").style.display = "block";
}


/**
 * Abre la ventana modal de selección de semestre para el flujo FAB, validando que primero se haya elegido una carrera.
 * 
 * @returns {void} Muestra el modal de materias ('matModal') o arroja una alerta (alert) bloqueante si no hay carrera en memoria.
 */
function openSem() {
    if (carrera != "") {
        document.getElementById("matModal").style.display = "block";
    } else {
        alert("¡Debe seleccionar una carrera!");
    }
}


/**
 * Actualiza visualmente el porcentaje de cobertura seleccionado y recalcula inmediatamente el estimado total FAB.
 * 
 * @param {HTMLInputElement} elem - El elemento del DOM tipo input range (slider) modificado por el usuario.
 * @returns {void} Modifica el label del porcentaje y dispara la rutina totalizarDonacion().
 */
function updateTextPorcentaje(elem) {
    document.getElementById("spcoop").innerHTML = elem.value + "%";
    //hideDonacion();
    totalizarDonacion();
}

/** Indice de la ultima materia seleccionada en el ciclo FAB, usado para eliminacion en bloque. */
let indiceFinal = 0;


/**
 * Selecciona masivamente todas las materias pertenecientes al semestre elegido por el usuario (modo FAB).
 * Simplifica el proceso para que el donante no tenga que clickear materia por materia al apadrinar un semestre completo.
 * 
 * @returns {void} Recorre el arreglo global 'materias', simulando la selección de las coincidentes y guardando el 'indiceFinal'.
 */
function addAllMaterias() {
    let found = false;
    for (let i = 0; i < materias.length; i++) {
        if (materias[i].Semestre == FAB_STATE.sem) {
            // Coincide con el semestre buscado
            indiceFinal = i;
            addMateriaList(i);
            found = true;
        } else if (found) {
            // Finaliza el ciclo al salir del bloque de materias del semestre deseado (asume agrupacion secuencial)
            break;
        }
    }
}


/**
 * Revierte la selección masiva de materias en el ciclo FAB.
 * Elimina del carrito y del resumen visual todas las materias que habían sido pre-cargadas para un semestre.
 * 
 * @returns {void} Ejecuta eliminaciones iterativas en reversa desde el 'indiceFinal' hasta vaciar el bloque del semestre.
 */
function delAllMaterias() {
    let i = indiceFinal;
    let matElem = document.getElementsByClassName(i);
    while (matElem.length > 0) {
        deleteMateriaList(i);
        i--;
        matElem = document.getElementsByClassName(i);
    }
}


/**
 * Computa y actualiza los montos adicionales detallados dentro de los acordeones del FAB (Recargos y Fuera de Cobertura).
 * Factoriza la cantidad de estudiantes y aplica un peso parcial o la tasa vigente.
 * 
 * @param {number} recar - Total acumulado de recargos de taxonomía en UC de las materias seleccionadas.
 * @param {number} ocober - Total de UC que exceden el límite estipulado de cobertura de la beca.
 * @returns {void} Actualiza variables globales ('recargo', 'outCober') e inyecta los montos en bolívares en los paneles.
 */
function loadMontosAcordion(recar, ocober) {
    //Cantidad de estudiantes
    let cantEst = document.getElementById("cantAlum").value;

    // Se aplica el factor 0.5 asumiendo la distribucion o politica especifica del FAB sobre costos compartidos
    FAB_STATE.recargo = recar * cantEst * 0.5;
    FAB_STATE.outCober = ocober * cantEst * 0.5;

    let spRecargo = document.getElementById("spRecarg");
    spRecargo.innerHTML = formatNumber.new(recar * vrealUC * cantEst * 0.5, "Bs.S ", true);
    let spDerIns = document.getElementById("spDI");
    spDerIns.innerHTML = formatNumber.new(periodo[perioact].di * vrealUC * cantEst, "Bs.S ", true);
    let spOutCober = document.getElementById("spOut");
    spOutCober.innerHTML = formatNumber.new(vrealUC * ocober * cantEst * 0.5, "Bs.S ", true);
}


/**
 * Oculta completamente el panel visual que contiene el total a donar.
 * Utilizado para limpiar la interfaz antes de realizar cálculos nuevos o cuando las selecciones son inválidas.
 * 
 * @returns {void} Cambia el atributo display del bloque 'totalizacion' a 'none'.
 */
function hideDonacion() {
    document.getElementsByClassName("totalizacion")[0].style.display = "none";
}

// /**
//  * [INACTIVO] Genera el cálculo final de la donación FAB validando el semestre y calculando recargos extras.
//  * Se conserva como referencia técnica o posible integración futura de la modalidad detallada de donaciones.
//  *
//  * @returns {void} Ejecuta la lógica base de totalización y muestra el panel visual de resultados.
//  */
// function generarDonacionCal(){
//     if(!FAB_STATE.sem){
//         alert("¡Debe seleccionar un semestre!");
//     }else{
//         // Captura la cobertura desde el control deslizante
//         cober = document.getElementById("coopRangeFab").value;
//
//         totalizacion();
//
//         // Extrae la cantidad de estudiantes
//         let cantEst = document.getElementById('cantAlum').value;
//
//         // Inyecta el monto total en el DOM (codigo original conservado)
//         //document.getElementById('montoT').innerHTML = formatNumber.new(totalbs * cantEst * 0.5, 'Bs.S ', true);
//         totalizarDonacion();
//         document.getElementsByClassName("totalizacion")[0].style.display = 'block';
//     }
// }
//
// /**
//  * [INACTIVO] Calcula el monto total estimado de donación FAB, integrando selectivamente montos adicionales (Derecho de Inscripción, Fuera de Cobertura o Recargos).
//  *
//  * @returns {void} Inyecta el resultado final (sumatoria de base y adicionales ponderados) en el DOM.
//  */
// function totalizarDonacion(){
//     // Extrae la cantidad de estudiantes
//     let cantEst = document.getElementById('cantAlum').value;
//     let adicional = 0;
//
//     if(document.getElementById("includeDI").checked){
//         // Acumula el derecho de inscripcion
//         adicional += periodo[perioact].di * cantEst;
//     }
//
//     if(document.getElementById("includeOut").checked){
//         // Acumula montos fuera de cobertura
//         adicional += FAB_STATE.outCober;
//     }else if(document.getElementById("includeRecargo").checked){
//         // Acumula recargos por taxonomia
//         adicional += FAB_STATE.recargo;
//     }
//
//     // Inyecta el calculo definitivo en el DOM
//     //console.log(adicional, adicional * vrealUC);
//     document.getElementById('montoT').innerHTML = formatNumber.new( ((totalbs * 0.5 * cantEst) + (adicional * vrealUC)) , 'Bs.S ', true);
// }
