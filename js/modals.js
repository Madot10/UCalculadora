/**
 * @file modals.js
 * @description Módulo controlador de las ventanas modales (modals) e interacciones de usuario en UCalculadora.
 * Gestiona la apertura, cierre y validación de las dependencias lógicas previas (ej. seleccionar sede antes de carrera).
 * Contiene la lógica para la selección visual de la sede, carrera, materias regulares y minors (generación de listas y checkboxes),
 * así como la actualización de los porcentajes y coberturas del sistema de cooperación económica.
 */
/** Parametros de mantenimiento y estado global de este modulo propio de UCalculadora. */
/* COMPORTAMIENTO MODALS */
/** Indica si existe un modal abierto para permitir cierre por clic externo. */
let isOpen = 0;


/**
 * Oculta forzosamente todas las ventanas modales activas en la interfaz.
 * Se usa como mecanismo de seguridad visual para limpiar la pantalla y restablecer el flujo del usuario al cambiar de vistas o cancelar acciones.
 * 
 * @returns {void} Altera la propiedad display de la clase 'modal' a 'none' y reinicia la bandera de estado global 'isOpen'.
 */
function closeModal() {
	isOpen = 0;
	for (const modal of document.getElementsByClassName("modal")) {
		modal.style.display = "none";
	}
}

//Abre modal en ucal

/**
 * Controla la apertura de las ventanas modales de la calculadora, validando restricciones de negocio previas.
 * Evita, por ejemplo, que el usuario intente elegir una carrera si aún no ha definido la sede de estudios.
 * 
 * @param {string} nameModal - ID del elemento HTML correspondiente al modal que se intenta abrir (ej. 'carModal', 'matModal').
 * @returns {void} Interrumpe la apertura con un 'alert' si faltan datos base, o en su defecto, muestra el modal y marca 'isOpen'.
 */
function openModal(nameModal) {
	isOpen = 1;

	switch (nameModal) {
		case "coopModal":
			resetCoopModal();
			break;

		case "carModal":
			if (!sede) {
				isOpen = 0;
				alert("¡DEBE SELECCIONAR UNA SEDE!");
			}
			break;

		case "matModal":
			if (!carrera) {
				isOpen = 0;
				alert("¡DEBE SELECCIONAR UNA CARRERA!");
			}
			break;

		default:
			break;
	}

	if (isOpen) {
		//abrir
		document.getElementById(nameModal).style.display = "block";
	} else {
		document.getElementById(nameModal).style.display = "none";
	}
}


/**
 * Escucha eventos de clic en toda la ventana para detectar si el usuario hace clic fuera del recuadro del modal activo.
 * Brinda una experiencia de usuario natural permitiendo cerrar modales al presionar en el fondo semitransparente.
 * 
 * @param {MouseEvent} event - Evento nativo del navegador que contiene el elemento (target) que recibió el clic.
 * @returns {void} Si el objetivo es el fondo ('modal') y está abierto, invoca closeModal().
 */
window.onclick = function (event) {
	// alert("run");
	if (isOpen && event.target.className == "modal") {
		//Si hay algun modal abierto >> cerrar
		closeModal();
	}
};


/**
 * Inyecta y despliega un mensaje de error o alerta en la cabecera principal de la calculadora.
 * Es la vía oficial para comunicar fallos críticos temporales (como indisponibilidad de la API BCV) al usuario.
 * 
 * @param {string} msg - Texto HTML o plano con la notificación a mostrar.
 * @returns {void} Muestra el bloque 'alertmsg' y reemplaza su contenido.
 */
function msgAlert(msg) {
	document.getElementById("alertmsg").innerHTML = msg;
	document.getElementById("alertmsg").style.display = "block";
}


/**
 * Compone la etiqueta visual que informa al usuario la tasa de conversión actual de la Unidad de Crédito.
 * Utilizado para acompañar los montos en bolívares mostrando la equivalencia base.
 * 
 * @param {string} fuc - Cadena de fecha para la cual se consultará el valor vigente de la UC.
 * @returns {string} Texto formateado con el prefijo 'UC a' y el monto monetario correspondiente en USD.
 */
function genMsgUc(fuc) {
	//let html = `<i class="fas fa-question-circle" onclick="alert('dfd')"></i>`;
	//return `UC a ${formatNumber.new(getUCfecha(fuc), "Bs.S ")}`;
	return `UC a ${formatNumber.new(getUCfecha(fuc), "USD ")}`;
	//return html;
}


/**
 * Despliega un modal informativo genérico cuyo contenido es proveído dinámicamente.
 * Usado por los botones de ayuda ('?') para explicar los planes de pago, meses, cuotas iniciales y descuentos vigentes.
 * 
 * @param {string} msg - Código HTML con el texto explicativo de políticas y condiciones administrativas.
 * @returns {void} Escribe el HTML en el contenedor 'info' y fuerza su renderizado en pantalla.
 */
function modalInfoOpen(msg) {
	document.getElementById("info").innerHTML = "";
	document.getElementById("info").insertAdjacentHTML("afterbegin", msg);
	document.getElementById("infoModal").style.display = "block";
}

/* SEDE MODAL */

/**
 * Ejecuta el evento de negocio al seleccionar la sede académica.
 * Ciertas sedes como Guayana ('g') y Los Teques ('tq') manejan porcentajes de descuento globales que alteran radicalmente la estimación final.
 * 
 * @param {string} cod - Código identificador de la sede (ej. 'mtb', 'g', 'tq').
 * @returns {void} Guarda la sede en estado global, cierra el modal y limpia la tabla de pagos para forzar un recálculo seguro.
 */
function sedeSelect(cod) {
	sede = cod;
	let span = document.getElementById("sName");
	let parentElem = span.parentElement;
	let name;

	switch (cod) {
		case "mtb":
			span.innerHTML = "MONTALBÁN";
			name = "MONTALBÁN";
			break;

		case "g":
			span.innerHTML = "GUAYANA";
			name = "GUAYANA";
			break;

		case "tq":
			span.innerHTML = "LOS TEQUES";
			name = "LOS TEQUES";
			break;

		default:
			break;
	}

	//Ocultamos flecha
	parentElem.children[2].style.display = "none";

	gtag("event", "SedeSelect", {
		event_category: "UCinteraccion",
		event_label: name,
	});

	cleanTabla();
	closeModal();
}
/* END SEDE MODAL */

/* CARRERA MODAL */

/**
 * Finaliza la selección de una carrera académica y prepara el entorno para que el usuario elija sus materias.
 * Diferencia entre flujos regulares y flujos de Minors, obteniendo del diccionario maestro ('data.js') la malla curricular específica.
 * 
 * @param {HTMLButtonElement} elem - El botón del modal que contiene el nombre exacto de la carrera.
 * @param {boolean} isMinor - Bandera que diferencia si se está seleccionando una carrera regular o un programa Minor (solo aplica para pagos totales).
 * @returns {void} Limpia sumadores de UC, genera dinámicamente la lista de checkboxes de materias y cierra el modal activo.
 */
function carreraSelect(elem, isMinor = false) {
	//limpiamos texto
	let content = elem.textContent.replace(/\n/g, "");
	content = content.replace(/[.]/g, "");
	content = content.trim();
	content = content.toUpperCase();

	let span;
	let parentElem;

	if (mode == "UC") {
		span = document.getElementById("sCarrera");
		parentElem = span.parentElement;
	} else {
		document.getElementById("sSem").innerHTML = "SEMESTRE <i class='fas fa-angle-right'></i>";
		span = document.getElementById("sCarreraFab");
		parentElem = span.parentElement;
	}

	//guardamos
	if (isMinor) {
		carrera = "Minor";
	} else {
		carrera = elem.value;
	}
	//console.log(carrera);

	//Ocultamos flecha
	parentElem.children[2].style.display = "none";

	if (isMinor) {
		materias = minors;
	} else {
		materias = GetJsonDataMaterias(carrera);
	}

	//console.log(carrera, materias);

	//console.warn(carrera);

	//mostramos nombre de carrera en boton exterior
	span.innerHTML = content;

	//limpiamos tabla de materias
	document.getElementsByClassName("materias")[0].innerHTML = "";
	ucbase = 0;
	ucbaseMinor = 0;
	uctotal = 0;
	uctotalMinor = 0;
	limpiarTotalUC();

	if (mode == "UC") {
		gtag("event", "CarreraSelect", {
			event_category: "UCinteraccion",
			event_label: carrera,
		});
	} else {
		gtag("event", "CarreraSelectFAB", {
			event_category: "FABinteraccion",
			event_label: carrera,
		});
	}

	genMateriaList();
	cleanTabla();
	closeModal();
}
/* END CARRERA MODAL */

/* MATERIA MODAL */

/**
 * Función puente para la interacción del usuario al marcar una materia desde la lista gráfica generada (checkbox).
 * Alterna la clase CSS de activación visual y deriva el control lógico real a 'materiaSelect()'.
 * 
 * @param {HTMLInputElement} elem - Elemento checkbox interactuado en la lista de materias.
 * @param {boolean} isMinor - Contexto que indica si el checkbox corresponde a la sección general o a la subsección de Minor.
 * @returns {void} Modifica las clases del contenedor padre para feedback visual y delega el recálculo aritmético.
 */
function toggleActiveChbox(elem, isMinor = false) {
	let parentElem = elem.parentElement;
	parentElem.classList.toggle("actChbox");
	materiaSelect(elem, isMinor);
}


/**
 * Responde al evento de descarte visual cuando un usuario elimina una materia directamente desde el resumen del "carrito" de selección.
 * Forza que el checkbox original de la lista de materias se desmarque para mantener la sincronización entre vistas.
 * 
 * @param {string|number} id - Índice interno en el arreglo global de 'materias' que identifica la materia a eliminar.
 * @param {boolean} isMinor - Contexto que indica si la eliminación impacta a los totales regulares o de Minor.
 * @returns {void} Modifica el estado del checkbox a 'false' e invoca 'toggleActiveChbox' para recalcular el costo.
 */
function desCheckMatList(id, isMinor = false) {
	let elem = document.getElementById(id);

	if (elem.checked) {
		elem.checked = false;
	}

	toggleActiveChbox(elem, isMinor);
}


/**
 * Renderiza la interfaz iterativa de la malla curricular (la lista colapsable por semestres).
 * Inyecta cajas de verificación (checkbox) por cada asignatura del diccionario, segmentadas para diferenciar el peso financiero (Regular vs Minor).
 * 
 * @param {boolean} isMinor - Si es verdadero, evita la pre-concatenación del catálogo general con el de Minors, asumiendo un flujo puro.
 * @returns {void} Manipula intensamente el DOM creando agrupadores colapsables, labels y eventos de selección masiva/individual.
 */
function genMateriaList(isMinor = false) {
	let main = document.getElementById("matList");
	main.innerHTML = "";
	let divBtn;
	let divCont;

	let semI = null;
	let semAct = null;
	// Para propósitos de mantenimiento: Log original de ruptura del ciclo
	// console.log("run out");
	//Insertamos minors
	if (!isMinor) {
		materias = materias.concat(minors);
	}

	let isMinorSEM = -1;
	//Reccorremos cada materia
	for (let i = 0; i < materias.length; i++) {
		//console.log("run");
		semI = materias[i].Semestre;

		//Nuevo semestre >> nueva seccion
		if (semI != semAct) {
			isMinorSEM = semI.indexOf("(MINOR)");

			semAct = semI;
			if (divBtn && divCont) {
				main.appendChild(divBtn);
				main.appendChild(divCont);
			}
			//Creamos
			divBtn = document.createElement("div");
			divCont = document.createElement("div");

			//Formato
			divBtn.innerHTML = `<div class="collapsible" onclick="toggleList(this)"> ${semAct}</div>`;
			divCont.innerHTML = `<div class="content"></div>`;

			divBtn = divBtn.firstElementChild;
			divCont = divCont.firstElementChild;
		}

		//if(mode == "UC"){
		//Creamos materia
		let div = document.createElement("div");
		div.setAttribute("class", "divMat");

		let inp = document.createElement("input");
		inp.setAttribute("id", i);
		inp.setAttribute("type", "checkbox");
		inp.setAttribute("class", "chbox");
		//oninput segun normal o minor
		if (isMinorSEM > -1) {
			//MINORS
			//console.log("Es minor ", semI);
			inp.setAttribute("onclick", "toggleActiveChbox(this, true)");
		} else {
			//NO MINORS
			inp.setAttribute("onclick", "toggleActiveChbox(this)");
		}

		div.appendChild(inp);

		let lb = document.createElement("label");
		lb.setAttribute("for", i);
		lb.setAttribute("class", "materia");
		lb.innerText = materias[i].Asignatura;

		div.appendChild(lb);

		divCont.appendChild(div);
		//}
	}
	main.appendChild(divBtn);
	main.appendChild(divCont);
}

/* END MATERIA MODAL */

/* COOP MODAL */

/**
 * Pre-visualiza el porcentaje elegido al deslizar la barra interactiva (slider) del apoyo económico antes de conformarlo.
 * 
 * @param {HTMLInputElement} event - Representa el control deslizante (input type range) de donde se extrae el valor numérico (10% a 100%).
 * @returns {void} Escribe el porcentaje crudo en la interfaz sin guardarlo en el estado de negocio aún.
 */
function changeCoop(event) {
	document.getElementById("scobertura").innerHTML = event.value + "%";
}


/**
 * Reconfigura el modal de cooperación, ocultando el selector de rango y volviendo a mostrar las botoneras de categorías (Beca, Fab, Proporcional).
 * 
 * @returns {void} Manipula la visibilidad de los controles internos de 'coopModal'.
 */
function resetCoopModal() {
	document.getElementById("btnCoop").style.display = "block";
	document.getElementById("btnRgo").style.display = "none";
}


/**
 * Gestiona la primera fase de elegir una ayuda financiera, guardando el tipo pero habilitando el ajuste fino (slider de porcentaje).
 * Prepara la memoria para la confirmación posterior del porcentaje exacto de cobertura.
 * 
 * @param {string} tipo - Nombre clave de la modalidad elegida (ej. 'beca', 'proporcional', 'fab').
 * @returns {void} Guarda el 'tipo' en memoria temporal, expone el control de rango ('btnRgo') y actualiza la cabecera visual.
 */
function selectCobertura(tipo) {
	//ocultamos opciones de coop y mostramos rango
	document.getElementById("btnCoop").style.display = "none";
	coop = tipo;

	document.getElementById("tipoAyuda").innerHTML = tipo.toUpperCase();
	document.getElementById("btnRgo").style.display = "block";
}


/**
 * Ratifica la información de cooperación económica, aplicando los límites lógicos correspondientes al tipo elegido e impactando el recálculo general.
 * Altera la capacidad máxima de UC que entrarán bajo el régimen de descuento/beca del alumno.
 * 
 * @param {string} tipo - Categoría formal de la beca, heredada del paso 'selectCobertura'.
 * @param {number} cob - Porcentaje numérico exacto. Si se recibe '-1', se fuerza la extracción desde el valor actual del slider interactivo.
 * @returns {void} Persiste las variables de negocio ('coop', 'cober'), limpia la tabla de pagos para provocar el recálculo y cierra el modal.
 */
function coopSelect(tipo, cob) {
	if (cob == -1) {
		cober = document.getElementById("coopRange").value;
	} else {
		coop = tipo;
		cober = cob;
	}
	document.getElementById("sCoop").innerHTML = `${coop.toUpperCase()} ${cober}%`;

	gtag("event", "CoopSelect", {
		event_category: "UCinteraccion",
		event_label: `Coop: ${coop}`,
		value: cober,
	});

	closeModal();
	cleanTabla();
}
/* END COOP MODAL */
