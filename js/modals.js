/* COMPORTAMIENTO MODALS */
let isOpen = 0;

function closeModal() {
	isOpen = 0;
	for (const modal of document.getElementsByClassName("modal")) {
		modal.style.display = "none";
	}
}

//Abre modal en ucal
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

window.onclick = function (event) {
	// alert("run");
	if (isOpen && event.target.className == "modal") {
		//Si hay algun modal abierto >> cerrar
		closeModal();
	}
};

function msgAlert(msg) {
	document.getElementById("alertmsg").innerHTML = msg;
	document.getElementById("alertmsg").style.display = "block";
}

function genMsgUc(fuc) {
	//let html = `<i class="fas fa-question-circle" onclick="alert('dfd')"></i>`;
	//return `UC a ${formatNumber.new(getUCfecha(fuc), "Bs.S ")}`;
	return `UC a ${formatNumber.new(getUCfecha(fuc), "USD ")}`;
	//return html;
}

function modalInfoOpen(msg) {
	document.getElementById("info").innerHTML = "";
	document.getElementById("info").insertAdjacentHTML("afterbegin", msg);
	document.getElementById("infoModal").style.display = "block";
}

/* SEDE MODAL */
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
function carreraSelect(elem, isMinor = false) {
	//limpiamos texto
	let content = elem.textContent.replace(/\n/g, "");
	content = content.replace(/[.]/g, "");
	content = content.replace(/[()]/g, "");
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
		carrera = content.replace(/\s/g, "").toLowerCase();
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
function toggleActiveChbox(elem, isMinor = false) {
	let parentElem = elem.parentElement;
	parentElem.classList.toggle("actChbox");
	materiaSelect(elem, isMinor);
}

function desCheckMatList(id, isMinor = false) {
	let elem = document.getElementById(id);

	if (elem.checked) {
		elem.checked = false;
	}

	toggleActiveChbox(elem, isMinor);
}

function genMateriaList(isMinor = false) {
	let main = document.getElementById("matList");
	main.innerHTML = "";
	let divBtn;
	let divCont;

	let semI = null;
	let semAct = null;
	//console.log("run out");
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
function changeCoop(event) {
	document.getElementById("scobertura").innerHTML = event.value + "%";
}

function resetCoopModal() {
	document.getElementById("btnCoop").style.display = "block";
	document.getElementById("btnRgo").style.display = "none";
}

function selectCobertura(tipo) {
	//ocultamos opciones de coop y mostramos rango
	document.getElementById("btnCoop").style.display = "none";
	coop = tipo;

	document.getElementById("tipoAyuda").innerHTML = tipo.toUpperCase();
	document.getElementById("btnRgo").style.display = "block";
}

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
