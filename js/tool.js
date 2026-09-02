/**
 * @file tool.js
 * @description Módulo de la calculadora auxiliar.
 * Provee la interfaz y lógica para una calculadora básica interactiva en pantalla.
 * Permite realizar operaciones matemáticas rápidas y calcular proyecciones manuales multiplicadas por el token "UC".
 */

/** Valor UC visible usado por la calculadora auxiliar. */
let UC;

/**
 * Añade un carácter a la secuencia matemática temporal en la calculadora auxiliar.
 * 
 * @param {string|number} simb - Carácter ingresado desde el teclado en pantalla (número, operador matemático o la constante "UC").
 * @returns {void} Actualiza el visor de la calculadora en el DOM.
 */
function add(simb) {
    // Limpia el visor si muestra '0' para prevenir ceros a la izquierda.
    if (document.getElementsByClassName("cal")[0].textContent == '0')
        clean(false);

    document.getElementsByClassName("cal")[0].innerHTML += simb;
}

/**
 * Elimina el último carácter o token ingresado en el visor de la calculadora auxiliar.
 * 
 * @returns {void} Modifica el visor de la calculadora en el DOM.
 */
function clean() {
    let str = document.getElementsByClassName("cal")[0].textContent;
    let nstr;

    // Elimina el token "UC" completo si el último carácter es 'C' para evitar errores de sintaxis.
    if (str[str.length - 1] == 'C') {
        nstr = str.substring(0, str.length - 1);
        nstr = nstr.substring(0, nstr.length - 1);
    } else {
        nstr = str.substring(0, str.length - 1);
    }

    // Restaura el estado neutral '0' si la pantalla queda vacía tras el borrado.
    if (!(str == 0) && nstr == '') {
        nstr = '0';
    }

    document.getElementsByClassName("cal")[0].textContent = nstr;
}

/**
 * Limpia por completo la expresión matemática temporal y su resultado calculado.
 * 
 * @returns {void} Restablece los visores en el DOM.
 */
function cleanAll() {
    document.getElementsByClassName("cal")[0].innerHTML = '0';
    document.getElementById('result').innerHTML = '0';
}

/**
 * Acondiciona la cadena matemática ingresada para ser evaluada nativamente.
 * Convierte expresiones abreviadas (ej. "5UC") en multiplicaciones explícitas ("5*UC").
 * 
 * @param {string} allOpe - Expresión matemática introducida por el usuario (ej. "2+4UC").
 * @returns {string} Expresión matemática con los operadores de multiplicación inyectados.
 */
function preformatUC(allOpe) {
    let start = 0;
    let i = allOpe.indexOf("UC");

    while (i != -1) {
        i = allOpe.indexOf("UC", start);
        if (i === -1) break;

        // Inyecta multiplicación si el carácter a la izquierda de "UC" es un número.
        let der = allOpe.substring(i - 1, i);
        if (der.match(/([0-9])/g)) {
            allOpe = allOpe.substring(0, i) + "*" + allOpe.substring(i, allOpe.length);
        }
        
        // Inyecta multiplicación si el carácter a la derecha de "UC" es un número.
        let izq = allOpe.substring(i + 2, i + 3);
        if (izq.match(/([0-9])/g)) {
            allOpe = allOpe.substring(0, i + 2) + "*" + allOpe.substring(i + 2, allOpe.length + 1);
        }
        
        start = i + 2;
    }
    
    return allOpe;
}

/**
 * Ejecuta el cálculo final de la expresión ingresada en la calculadora auxiliar.
 * 
 * @returns {void} Imprime el resultado en el panel de resultados del DOM.
 */
function calcular() {
    // Formatea la expresión actual inyectando asteriscos de ser necesario.
    let operations = preformatUC(document.getElementsByClassName("cal")[0].textContent);
    
    // Evalúa matemáticamente la expresión y refleja el resultado numérico formateado.
    document.getElementById('result').innerHTML = formatNumber.new(eval(operations));
}
