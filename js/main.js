/**
 * @file main.js
 * @description Módulo principal y núcleo lógico de UCalculadora.
 * Contiene la configuración global parametrizable (APP_CONFIG), el estado general de la calculadora,
 * y las funciones centrales que orquestan el cálculo de las Unidades de Crédito (UC). 
 * También se encarga de la generación dinámica de las tablas de pago (tanto regulares como minors),
 * el cálculo de tarifas, variaciones según periodos, y la inyección de los resultados en el DOM.
 */


/**
 * Esta seccion concentra valores que cambian por politica academica, sede, taxonomia, integraciones y elementos DOM.
 * Para mantenimiento, modificar primero estos parametros antes de tocar formulas dentro de funciones.
 */
const APP_CONFIG = {
	/**
	 * Valores base del sistema
	 * Define estados iniciales y modos de operacion usados por la calculadora.
	 */
	VALOR_INICIAL_MONTO: 0,
	MODO_UC: "UC",
	MODO_FAB: "FAB",

	/**
	 * Limites de cooperacion economica
	 * Controlan cuantas UC entran dentro de la cobertura antes de cobrar excedentes completos.
	 */
	LIMITE_PROPORCIONAL_UC: 27,
	LIMITE_BECA_UC: 30,
	LIMITE_FAB_UC: 30,

	/**
	 * Descuentos por carrera y sede
	 * Estos factores reducen el valor real de la UC antes de calcular el monto final.
	 * Se documenta explícitamente cómo se obtienen los valores numéricos:
	 * - DESCUENTO_EDUCACION_LETRAS: 0.70 (Descuento del 30%, calculado como 1 - 0.30 = 0.70).
	 * - DESCUENTO_FILOSOFIA: 0.40 (Descuento del 60%, calculado como 1 - 0.60 = 0.40).
	 * - DESCUENTO_SEDE_GUAYANA: 0.95 (Descuento del 5%, calculado como 1 - 0.05 = 0.95).
	 * - DESCUENTO_SEDE_TEQUES: 0.80 (Descuento del 20%, calculado como 1 - 0.20 = 0.80).
	 * Fórmula matemática: vrealUC = valorUC * DESCUENTO
	 */
	DESCUENTO_EDUCACION_LETRAS: 0.7,
	DESCUENTO_FILOSOFIA: 0.4,
	DESCUENTO_SEDE_GUAYANA: 0.95,
	DESCUENTO_SEDE_TEQUES: 0.8,

	/**
	 * Descuentos por modalidad de pago (Financiamiento)
	 * Reducen el costo de las UC cobradas dependiendo si el pago es al contado o fraccionado.
	 * Se documenta explícitamente cómo se obtienen los valores numéricos:
	 * - DESCUENTO_MODALIDAD_TOTAL: 0.96 (Esto representa un descuento del 4%, calculado como 1 - 0.04 = 0.96. Al multiplicar, reduce el total a pagar al 96%).
	 * - DESCUENTO_MODALIDAD_PARCIAL: 0.96 (Esto representa un descuento del 4%, calculado como 1 - 0.04 = 0.96).
	 * - DESCUENTO_MODALIDAD_MENSUAL: 1.0 (No hay descuento, multiplicador neutro).
	 * Fórmula matemática: total = UC * valorBCV * DESCUENTO
	 */
	DESCUENTO_MODALIDAD_TOTAL: 0.96,
	DESCUENTO_MODALIDAD_PARCIAL: 0.96,
	DESCUENTO_MODALIDAD_MENSUAL: 1.0,

	/**
	 * Valores de taxonomias y modalidad
	 * FACTOR_UC_MODALIDAD_VIRTUAL ajusta UC academicas en materias virtuales o semipresenciales.
	 * RECARGO_TAXONOMIA_MEDIA aplica a taxonomias 7 y 8 para aumentar UC equivalentes cobradas.
	 * RECARGO_TAXONOMIA_ALTA aplica a taxonomia 9 para aumentar UC equivalentes cobradas.
	 */
	FACTOR_UC_MODALIDAD_VIRTUAL: 0.72,
	RECARGO_TAXONOMIA_MEDIA: 1.1,
	RECARGO_TAXONOMIA_ALTA: 1.15,

	/**
	 * Integraciones externas
	 */
	URL_BCV: "https://madot10.github.io/bot-dolar-bcv/uctoday.json",

	/**
	 * Identificadores DOM
	 * Mantener sincronizados con index.html porque las funciones escriben directamente sobre estos nodos.
	 */
	ID_PAGOS: "pagos",
	ID_PAGO_MINOR: "pagoMinor",
	ID_ALERTA: "alertmsg"
};

/**
 * Estas variables se comparten entre main.js, modals.js, fab.js, data.js y plantillas HTML heredadas.
 * No renombrarlas sin actualizar llamadas onclick y referencias desde plantillas evaluadas.
 */

/** Valores monetarios y UC acumuladas durante el calculo activo. */
let valorUC = APP_CONFIG.VALOR_INICIAL_MONTO;
let vrealUC = valorUC;
let valorBCV = APP_CONFIG.VALOR_INICIAL_MONTO;
let visualUC = APP_CONFIG.VALOR_INICIAL_MONTO;
let ucbase = APP_CONFIG.VALOR_INICIAL_MONTO;
let ucbaseMinor = APP_CONFIG.VALOR_INICIAL_MONTO;
let uctotal = APP_CONFIG.VALOR_INICIAL_MONTO;
let uctotalMinor = APP_CONFIG.VALOR_INICIAL_MONTO;
let ucpagar = APP_CONFIG.VALOR_INICIAL_MONTO;
let totalbs = APP_CONFIG.VALOR_INICIAL_MONTO;
let totalbsMinor = APP_CONFIG.VALOR_INICIAL_MONTO;
let ucrec = APP_CONFIG.VALOR_INICIAL_MONTO;

/** Selecciones hechas por el usuario desde los modales de la pantalla principal. */
let sede;
let carrera;
let materias;
let coop;
let cober;

/** Limites editables que se reinician al cambiar entre modo UC y modo FAB. */
let limitProp = APP_CONFIG.LIMITE_PROPORCIONAL_UC;
let limitBeca = APP_CONFIG.LIMITE_BECA_UC;
let limitFab = APP_CONFIG.LIMITE_FAB_UC;

/** Fecha y periodo usados para elegir valor UC y plantilla de pagos. */
let hoy = new Date();
let mode = APP_CONFIG.MODO_UC;
let diaAct = hoy.getDate();
let mesAct = hoy.getMonth() + 1;
let perBtnActivo = "";
let perActivo = 0;
let templateSelect = "";
let templateSelectMinor = "";

/** Textos informativos reutilizados por modales de ayuda de la interfaz. */
let infoTXT = `Materias Semi-Presenciales como electivas pueden variar su modalidad (TAXONOMIA) <br> Las materias de Comprensión de Contenidos en Inglés y Producción de Contenidos en Inglés aunque no aparezca el cambio en la malla curricular, el cambio de taxonomía de T6 a TA8 afecta a todos los alumnos <br> <a href="https://www.ucab.edu.ve/informacion-institucional/secretaria/servicios/plan-de-estudios/"> <br> Más información de pensums </a>`;


/**
 * Reinicia el estado global de la calculadora y prepara la vista según el modo solicitado (Cálculo UC o Apadrinamiento FAB).
 * Restablece las variables matemáticas y limpia la memoria de selecciones del usuario (sede, carrera, etc) para un nuevo cálculo en blanco.
 * 
 * @param {string} md - Modo de operación objetivo (ej. 'UC' para matrícula regular, 'FAB' para donaciones).
 * @returns {void} Modifica variables globales e invoca limpiezas de tablas en el DOM.
 */
function initVar(md) {
	LoadUC();

	vrealUC = valorUC;
	visualUC = 0;
	ucbase = 0;
	uctotal = 0;
	ucpagar = 0;
	totalbs = 0;
	ucrec = 0;

	sede = "";
	carrera = "";
	materias = "";
	coop = "";
	cober = "";

	limitProp = APP_CONFIG.LIMITE_PROPORCIONAL_UC;
	limitBeca = APP_CONFIG.LIMITE_BECA_UC;
	limitFab = APP_CONFIG.LIMITE_FAB_UC;

	cleanTabla();
	cleanTableMat();
	actualizarTotalUC();

	if (md == "FAB") {
		// Código desactivado por directiva
		mode = APP_CONFIG.MODO_FAB;

		//sede
		//sedeSelect('mtb');
		totalizarDonacion();
		document.getElementById("mesActual").innerHTML = `${loadMes()} <br> UC: ${formatNumber.new(getUCfecha(getFistDayThisMonth()), "USD ", true)}`;
		//coop
		//coop = 'fab';
		//cober = 10; //min
		
		console.log("inicializando FAB");
	} else {
		mode = APP_CONFIG.MODO_UC;
		// Restaura el texto de sede a su estado original
		let span = document.getElementById("sName");
		let parentElem = span.parentElement;
		span.innerHTML = "SEDE";
		parentElem.children[2].style.display = "block";
		
		console.log("inicializando UC");
	}
}


/**
 * Punto de entrada principal al cargar la página en el navegador.
 * Inicializa el sistema calculando el periodo vigente, consultando la tasa BCV del día y renderizando el banner inicial.
 * 
 * @returns {void} No retorna valor explícito, configura los estados iniciales, oculta el cargador y muestra el menú principal.
 */
window.onload = () => {
	// Carga la Unidad de Crédito (UC) visual
	InicializarPeriodoSys();
	LoadUC();

	//console.warn("bannerUC");
	let bannerUC = getUCfecha(new Date().setDate(hoy.getDate() + 15));
	document.getElementById("ucvalue").innerHTML = `${formatNumber.new(bannerUC)} USD`;
	UC = visualUC;

	GetValorBCV();

	if (window.location.hostname == "127.0.0.1") setGa(false);

	initAccordion();

	// Oculta el indicador de carga de la interfaz
	document.getElementsByClassName("loader")[0].style.display = "none";
	// Muestra el menú principal y el pie de página
	document.getElementById("menu").style.display = "block";
	document.getElementsByTagName("footer")[0].style.display = "block";

	//iniciarlizarAcordionesPagos();
};

/* INICIALIZADOR DE ACORDION TABLE */

/**
 * Inicializa la funcionalidad interactiva de los menús colapsables (acordeones) incrustados dentro de las tablas de desglose de pagos.
 * Permite al estudiante desglosar sus mensualidades sin recargar la vista general.
 * 
 * @returns {void} Inyecta listeners de tipo 'click' a los elementos HTML de clase 'box-btn'.
 */
function iniciarlizarAcordionesPagos() {
	const acc = document.getElementsByClassName("box-btn");

	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			panel.classList.toggle("active");
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
}

/* Gestión de periodos */

/**
 * Inicializa la lógica de selección de periodos académicos (semestre regular, verano, etc), filtrando opciones.
 * Revisa el catálogo oficial (ucByPeriodo) y habilita en pantalla únicamente los periodos para los cuales hay tarifas declaradas.
 * 
 * @param {number} perioObligatorio - Si es distinto de cero, fuerza a la UI a iniciar en un periodo específico ignorando la estacionalidad actual.
 * @returns {void} Modifica los botones de la clase 'per', asignándoles eventos de cambio de periodo ('changePeriodo').
 */
function InicializarPeriodoSys(perioObligatorio = 0) {
	if (perioObligatorio == 0) {
		//if (
		//	(mesAct > 2 && mesAct < 8) /* (mesAct > 2 && mesAct < 8)  */ ||
		//	(mesAct == 2 && diaAct >= 12) /* Mes febrero */ ||
		//	(mesAct == 7 && diaAct <= 28) /* Mes Agosto (mesAct == 8 && diaAct <= 28)*/
		//) {
		//PERIODO 1
		//console.warn("PERIODO 1");
		perActivo = 1;
		//} else {
		//PERIODO 2
		//	console.warn("PERIODO 2");
		//	perActivo = 2;
		//}
	} else {
		//Establecer periodo obligatorio
		//console.warn(`PERIODO OBG ${perioObligatorio}`);
		perActivo = perioObligatorio;
	}

	//let botones = document.getElementById(`per${perActivo}`).children;
	let botones = document.getElementById(`per`).children;
	//console.log("botones", botones);
	let lastI = 0;
	let some_active = false;

	for (i = 0; i < botones.length; i++) {
		//let idBTN = `p${perActivo}b${i + 1}`;
		let idBTN = `p0b${i + 1}`;

		let codeGen = getPeriodoCode(i);
		let periodoName = getPeriodoName(i);

		//console.log(idBTN, codeGen, periodoName);
		//console.warn("codeGen", codeGen);

		// Comprueba la existencia del código en la configuración para validar la UC anunciada
		if (ucByPeriodo[periodoName]) {
			some_active = true;

			//console.warn("i", i, periodoName, ucByPeriodo[periodoName]);
			perioact = codeGen; //getActualPeriodo();
			//console.warn("getActualPeriodo perioact", perioact);
			templateSelect = botones[i].dataset.table;
			templateSelectMinor = botones[i].dataset.minor;
			lastI = i;
			//console.warn("LastI", lastI);
			botones[i].disabled = false;
			botones[i].addEventListener("click", () => changePeriodo(idBTN, codeGen));
		}
	}

	if (!some_active) {
		//console.warn("ACTIVANDO MODO ALTERNATIVO");
		//InicializarPeriodoSys(-1 * perActivo + 3);
	} else {
		//console.warn("Else some_active");
		botones[lastI].classList.add("active");
		perBtnActivo = botones[lastI].id;
	}
}


/**
 * Muestra el contenedor visual que permite al estudiante alternar entre periodos históricos o futuros.
 * 
 * @returns {void} Cambia el atributo display del contenedor 'per' a 'block'.
 */
function showPeriodo() {
	/*if (perActivo == 1) {
		//PERIODO 1
		document.getElementById("per1").style.display = "block";
	} else {
		//PERIODO 2
		document.getElementById("per2").style.display = "block";
	}*/
	document.getElementById("per").style.display = "block";
}


/**
 * Ejecuta la transición de negocio cuando el usuario cambia el periodo académico evaluado (ej. pasa de Semestre a Verano).
 * Refresca la tarifa UC para hacer match con el nuevo periodo e invoca el recálculo total de la matrícula para mantener la tabla viva.
 * 
 * @param {string} idElem - ID interno del botón presionado en la UI, usado para manejo de clases activas.
 * @param {number} newPeriodo - Código representativo del periodo seleccionado.
 * @returns {void} Actualiza banderas globales, cambia el template heredado y dispara 'calcularMatricula()'.
 */
function changePeriodo(idElem, newPeriodo) {
	console.info("#Periodo cambiado: ", newPeriodo);
	
	// Activa visualmente el botón seleccionado en la interfaz
	if (perBtnActivo != "") document.getElementById(perBtnActivo).classList.remove("active");
	perBtnActivo = idElem;
	document.getElementById(idElem).classList.add("active");

	// Actualiza la variable de periodo actual
	perioact = newPeriodo;
	templateSelect = document.getElementById(idElem).dataset.table;
	templateSelectMinor = document.getElementById(idElem).dataset.minor;

	LoadUC();
	calcularMatricula();
}


/**
 * Calcula algorítmicamente qué tipo de periodo académico rige hoy basándose en el calendario general de la universidad.
 * 
 * @returns {number} Retorna 2 si el mes actual se considera semestre regular, o 1 si se trata de temporada de verano.
 */
function getActualPeriodo() {
	let f = new Date(hoy);
	let month = f.getMonth() + 1;

	if (monthMapping[month] != null) {
		// Semestre regular
		return 2;
	} else {
		// Verano
		return 1;
	}
}


/**
 * Traduce el índice visual del botón del periodo a su código de base de datos interno.
 * 
 * @param {number} Nbtn - Índice secuencial del botón de periodo (0 para verano, >0 para semestres).
 * @returns {number} 1 si representa verano o 2 si representa semestre regular.
 */
function getPeriodoCode(Nbtn) {
	if (Nbtn == 0) {
		// Verano
		return 1;
	} else {
		// Semestre regular
		return 2;
	}
}


/**
 * Mapea el índice del botón al identificador semántico del periodo utilizado para extraer tarifas del diccionario 'ucByPeriodo'.
 * 
 * @param {number} Nbtn - Índice posicional del botón seleccionado.
 * @returns {string} Cadena 'verano' o 'semestre' utilizada como llave en diccionarios externos.
 */
function getPeriodoName(Nbtn) {
	if (Nbtn == 0) {
		// Verano
		return "verano";
	} else {
		// Semestre regular
		return "semestre";
	}
}


/**
 * Generador condicional de códigos históricos (legacy) de periodos académicos según el mes actual y desplazamientos anuales.
 * Creado originalmente para navegar lógicamente entre semestres pasados en versiones antiguas del frontend.
 * 
 * @param {number} Nper - Periodo primario evaluado (1 o 2).
 * @param {number} Nbtn - Posición relativa en la botonera de navegación.
 * @returns {string} Código alfanumérico sintetizado para búsquedas históricas (ej. '226' para semestre 2 del año 2026).
 */
function genPeriodoCode(Nper, Nbtn) {
	if (Nper == 1) {
		// PERIODO 1
		// Verano del periodo 1
		if (Nbtn % 3 == 0) {
			return `${Nbtn / 3 + 1}${hoy.getFullYear() % 100}`;
		} else {
			// Semestre regular del periodo 1
			return `${hoy.getFullYear()}${hoy.getFullYear() % 100}${Nbtn}`;
		}
	} else {
		// Condición de enero para el cambio de año en periodo 2
		let Kyear = 0;
		if (hoy.getMonth() < 2) {
			Kyear = -1;
		}

		// Verano del periodo 2
		if (Nbtn % 3 == 0) {
			if (Nbtn == 0) {
				// Retorna el año anterior
				return `2${(hoy.getFullYear() + Kyear) % 100}`;
			} else {
				// Retorna el año siguiente
				return `1${(hoy.getFullYear() + (1 + Kyear)) % 100}`;
			}
		} else {
			// Semestre regular del periodo 2
			return `${hoy.getFullYear() + Kyear}${((hoy.getFullYear() + Kyear) % 100) + 1}${Nbtn}`;
		}
	}
}
/* Navegación */

/**
 * Coordinador central de la navegación tipo SPA (Single Page Application).
 * Oculta y revela las secciones principales (Menú, Calculadora, FAB, Histórico) y emite los reportes de telemetría hacia Google Analytics.
 * 
 * @param {string} name - Nombre interno de la vista solicitada (ej. 'ucalculadora', 'fab', 'historico').
 * @returns {void} Altera los estilos de visualización de los contenedores maestros, cambia el 'title' y envía métricas de uso.
 */
function OpenDiv(name) {
	let elems_menu = document.getElementsByClassName("emenu");
	// Oculta todas las vistas antes de mostrar la solicitada
	for (let elem of elems_menu) {
		elem.style.display = "none";
	}

	switch (name) {
		case "menu":
			document.getElementById("menu").style.display = "block";
			document.title = "UCalculadora";
			OnClickGa("backMenu", "Menu");
			break;

		case "ucalculadora":
			document.getElementsByTagName("header")[0].style.display = "block";
			document.getElementsByClassName("ucalculadora")[0].style.display = "block";
			document.title = "UCalculadora - Matrícula";
			initVar("UC");
			OnClickGa("openUC", "Menu");
			break;

		case "historico":
			OnClickGa("openHistorico", "Menu");
			document.title = "UCalculadora - Histórico";
			document.getElementsByTagName("header")[0].style.display = "block";
			document.getElementsByClassName("historico")[0].style.display = "block";
			document.getElementsByClassName("ct-chart")[0].__chartist__.update();
			break;

		case "tool":
			OnClickGa("openTool", "Menu");
			document.getElementsByTagName("header")[0].style.display = "block";
			document.getElementsByClassName("tool")[0].style.display = "block";
			break;

		case "fab":
			OnClickGa("openFab", "Menu");
			document.title = "UCalculadora - FAB";
			initVar("FAB");
			document.getElementsByTagName("header")[0].style.display = "block";
			document.getElementsByClassName("fab")[0].style.display = "block";
			break;

		case "contribuciones":
			OnClickGa("openContribuciones", "Menu");
			document.title = "UCalculadora - Open Source";

			document.getElementsByTagName("header")[0].style.display = "block";
			document.getElementsByClassName("contribuciones")[0].style.display = "block";
			break;
	}
}

/* Utilidades generales */

//Google analytics togle

/**
 * Activa o bloquea temporalmente el envío de telemetría a Google Analytics (útil durante el testing local).
 * 
 * @param {boolean} value - Si es true, Google Analytics registrará eventos; false bloquea envíos con 'ga-disable'.
 * @returns {void} Configura directamente variables inyectadas de gtag y emite consola de depuración local.
 */
function setGa(value) {
	let a = "Set: " + value;
	gtag("event", "ToggleGA", {
		event_category: "DevInteraccion",
		event_label: a,
	});

	window["ga-disable-UA-33542195-1"] = !value;
	console.log("Establecido ga-disable como: ", value);
}


/**
 * Envía trazas y eventos genéricos de negocio a Google Analytics (GA4/UA).
 * Se emplea para estudiar qué carreras se buscan más, qué funciones se abren y si el usuario prefiere sedes foráneas.
 * 
 * @param {string} act - Acción de negocio (ej. 'CarreraSelect', 'MenuOpen').
 * @param {string} typeInter - Tipo de interacción usada como prefijo para categoría ('UC', 'FAB', etc).
 * @param {string} lb - Etiqueta descriptiva (label) opcional (ej. Nombre específico de carrera).
 * @returns {void} Llama al objeto global gtag push de Google.
 */
function OnClickGa(act, typeInter, lb) {
	// Registra el evento con etiqueta si se proporciona
	if (lb) {
		//console.log('enter');
		gtag("event", act, {
			event_category: typeInter + "Interaccion",
			event_label: lb,
		});
	} else {
		//console.log('not enter');
		gtag("event", act, {
			event_category: typeInter + "Interaccion",
		});
	}
}


/**
 * Vacía los contenedores de las tablas de pago regulares y de Minor, removiendo también cualquier mensaje de error.
 * Obligatorio llamar a esta función cuando se detecta un cambio en las variables principales para forzar una re-evaluación total.
 * 
 * @returns {void} Sobreescribe el contenido HTML de los contenedores de pago con un string vacío.
 */
function cleanTabla() {
	document.getElementById(APP_CONFIG.ID_PAGOS).innerHTML = "";
	document.getElementById(APP_CONFIG.ID_PAGO_MINOR).innerHTML = "";
	document.getElementById(APP_CONFIG.ID_ALERTA).style.display = "none";
}


/**
 * Función validadora y disparadora de cálculos central.
 * Comprueba que el usuario haya establecido las tres variables de negocio más importantes (Sede, Carrera y Tipo de Ayuda Económica) antes de proceder con rutinas matemáticas pesadas.
 * 
 * @returns {void} Si todo es válido arranca 'totalizacion()'; si faltan datos emite un 'alert' nativo para bloquear el flujo.
 */
function calcularMatricula() {
	if (sede && carrera && coop) {
		document.getElementById(APP_CONFIG.ID_ALERTA).style.display = "none";
		totalizacion();
		showPeriodo();
	} else {
		alert("Debes seleccionar una sede, carrera y ayuda economica!");
	}
}

/**
 * Utilidad de formato numerico para mostrar montos con separadores venezolanos.
 * separador controla miles y sepDecimal controla decimales.
 */
let formatNumber = {
	/** Separador de miles mostrado en montos finales. */
	separador: ".",
	/** Separador decimal mostrado en montos finales. */
	sepDecimal: ",",
	/**
	 * Aplica separadores al numero recibido usando el simbolo configurado temporalmente.
	 * @param {number|string} num Numero que se desea formatear para la interfaz.
	 * @returns {string} Numero formateado con simbolo y separadores.
	 */
	formatear: function (num) {
		num += "";
		var splitStr = num.split(".");
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : "";
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, "$1" + this.separador + "$2");
		}
		return this.simbol + splitLeft + splitRight;
	},
	/**
	 * Configura simbolo y precision antes de formatear el monto visible.
	 * @param {number|string} num Numero base a mostrar.
	 * @param {string} simbol Prefijo monetario como USD o Bs.
	 * @param {boolean} IsProc Indica si debe forzar dos decimales antes de formatear.
	 * @returns {string} Monto listo para inyectar en pantalla.
	 */
	new: function (num, simbol, IsProc) {
		this.simbol = simbol || "";
		if (IsProc) {
			//console.log("Num entrante",num);
			return this.formatear(parseFloat(num).toFixed(2));
		}
		return this.formatear(num);
	},
};


/**
 * Extrae la tarifa base estipulada para la UC desde el diccionario de periodos académicos, ajustándola en tiempo real al escenario actual.
 * 
 * @returns {number} Retorna el monto base monetizado (en divisas) y paralelamente lo actualiza en la variable global 'visualUC' y 'valorUC'.
 */
function LoadUC() {
	uc = getUCfecha(hoy, perioact);
	valorUC = uc;
	// Recorre la lista de variación si se encuentra definida
	/*
		if(dataux.variacion){
			let timecmp;
			for (let i = 0; i < dataux.variacion.length; i++) {
				timecmp = new Date(dataux.variacion[i][0]);
					if(today.getTime() > timecmp.getTime()){
						//Hoy es mayor que una fecha de variacion
						//aplicar sobre base
						uc = uc * (1+(dataux.variacion[i][1]/100));
					}else{
						//si variacion es mayor
						//aun no ha llegado esa fecha
						break;
					}
			}
	}*/

	//console.log(uc);
	visualUC = uc;
	return uc;
}

/**
 * Se conecta con la API externa del bot BCV para consultar asincrónicamente el valor oficial del dólar de hoy.
 * 
 * @returns {void} Al resolverse la promesa de 'fetch', actualiza silenciosamente la variable global 'valorBCV' que usarán las tablas finales de bolívares.
 */
function GetValorBCV() {
	fetch(APP_CONFIG.URL_BCV)
		.then((response) => {
			return response.json();
		})
		.then((datos) => {
			//console.log("BCV: ", datos);
			valorBCV = datos.valor;
		});
}

/**
 * Transforma un texto genérico de carrera ingresado por UI (con espacios, mayúsculas, etc.) en un objeto de datos JSON oficial de malla curricular.
 * Busca la equivalencia en el objeto global de variables cargadas en memoria.
 * 
 * @param {string} tx - String representativo del nombre de la carrera según el botón del menú.
 * @returns {Array} Retorna el objeto/array curricular que contiene las materias y UC oficiales definidas.
 */
function GetJsonDataMaterias(tx) {
	tx = tx.replace(/\s/g, "");
	tx = tx.replace(/\n/g, "");
	tx = tx.toLowerCase();

	console.log("GetJsonDataMaterias", tx);

	return (tx = window[tx]);
}

/**
 * Ajusta la cantidad de UC académicas que un estudiante "paga" cuando la modalidad no es tradicional.
 * En clases Virtuales (V) o Semi-Presenciales (SP), aplica el factor reductor (ej. 0.72) definido en las reglas académicas del rectorado.
 * 
 * @param {string} taxNum - Código en crudo de la taxonomía (ej. 'T4(SP)').
 * @param {number|string} ucnum - UC base oficial de la materia.
 * @returns {number} UC definitivas equivalentes (a ser pagadas) ya ponderadas por el factor de presencialidad, redondeado al entero.
 */
function FixUC(taxNum, ucnum) {
	//console.log(taxNum);

	if (taxNum) {
		if (taxNum.includes("(V)") || taxNum.includes("(SP)")) {
			// Aplica descuento a materias de modalidad Semipresencial y Virtual
			let k = Number(ucnum) * APP_CONFIG.FACTOR_UC_MODALIDAD_VIRTUAL;
			//console.log("K2 " + k);
			return Math.round(k);
		} else {
			//console.log(ucnum);
			return Math.round(Number(ucnum));
		}
	}
	return 0;
}


/**
 * Implementa el cálculo de recargos del negocio basados en Taxonomía y Equivalencias Técnicas (UCE).
 * Materias puramente virtuales descuentan costos, pero las de taxonomía experimental alta (7,8,9) elevan el cobro multiplicando por factores de infraestructura.
 * 
 * @param {number} uc - UC académicas formales (créditos regulares).
 * @param {string} tax - Categoría o Taxonomía literal de la materia (del 1 al 9).
 * @param {number|undefined} uce - UC Equivalente explícita (si la hay), que sobre-escribe el valor 'uc' académico al momento del cobro.
 * @returns {number} El monto equivalente en Unidades de Crédito cobrables tras aplicar factores técnicos y recargos.
 */
function UCrecargo(uc, tax, uce) {
	// taxN conserva solo el numero de taxonomia para decidir si la materia tiene recargo.
	let taxN = tax.replace(/^\D+/g, "");
	let xuc = 0;

	if (uce) {
		// UCE permite que una materia cobre UC equivalentes distintas a sus UC academicas.
		xuc = uce;
	} else {
		//console.log("no definido");
		xuc = uc;
	}
	if (tax.includes("(V)") || tax.includes("(SP)")) {
		// Las modalidades virtuales y semipresenciales ya llegan ajustadas desde la base de datos
		return xuc * 1.0;
	} else {
		switch (taxN) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
				// Sin recargo
				return xuc;
				break;

			case "7":
			case "8":
				// Aplica recargo de taxonomía media
				return xuc * APP_CONFIG.RECARGO_TAXONOMIA_MEDIA;
				break;

			case "9":
				// Aplica recargo de taxonomía alta
				return xuc * APP_CONFIG.RECARGO_TAXONOMIA_ALTA;
				break;

			default:
				console.error("error UC RECARGO");
				//alert('ERROR INESPERADO: #01');
				return 0;
				break;
		}
	}
}


/**
 * Motor financiero central: Consolida las UC base calculadas y procesa jerárquicamente todos los descuentos de negocio vigentes.
 * El proceso sigue este orden matemático y lógico:
 * 1. Inicializa el valor real de la UC (vrealUC) con la tarifa del día.
 * 2. Multiplica vrealUC por el factor correspondiente si la carrera tiene un beneficio (ej. Educación = vrealUC * 0.70).
 * 3. Multiplica vrealUC por el factor de sede si aplica (ej. Guayana = vrealUC * 0.95).
 * 4. Separa las UC base académicas de los excedentes por recargos de Taxonomía.
 * 5. Aplica la cobertura de becas o cooperación (ej. Proporcional al 30%) asegurando que el estudiante solo pague el 70% restante de las UC cubiertas por el límite. Todo excedente o recargo se cobra al 100%.
 * 
 * @returns {void} Muta masivamente el estado de finanzas globales ('vrealUC', 'ucfuera', 'ucpagar', 'totalbs') e invoca a generarPagos().
 */
function totalizacion() {
	vrealUC = valorUC;
	let cobertura = cober / 100;
	if (mode == APP_CONFIG.MODO_UC) {
		// En modo UC la cobertura representa descuento, por eso se paga el porcentaje restante.
		cobertura = 1 - cober / 100;
	}

	let ucfuera = 0;
	ucpagar = 0;

	// Aplica descuentos según la carrera
	if (carrera.includes("educacion") || carrera.includes("letras")) {
		// Aplica 30% de descuento
		vrealUC = valorUC * APP_CONFIG.DESCUENTO_EDUCACION_LETRAS;
	} else if (carrera.includes("filosofia")) {
		// Aplica 60% de descuento
		vrealUC = valorUC * APP_CONFIG.DESCUENTO_FILOSOFIA;
	}

	// Aplica descuentos por sede
	switch (sede) {
		case "g":
			//Guayana 5% descuento
			//document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
			vrealUC *= APP_CONFIG.DESCUENTO_SEDE_GUAYANA;

			break;
		case "tq":
			//Los teques 20% descuento
			//document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
			vrealUC *= APP_CONFIG.DESCUENTO_SEDE_TEQUES;

			break;
	}

	// Recargo por taxonomia equivale a la diferencia entre UC academicas y UC cobradas.
	let ucre = uctotal - ucbase;
	// Aplica descuentos por cooperación
	if (coop != "fab" && coop != "ninguna" && coop != "baup") {
		// Beca o proporcional
		let limit = limitBeca;
		if (coop != "beca") {
			limit = limitProp;
		}

		if (ucbase <= limit) {
			// Si las UC base no superan el limite, la ayuda cubre toda la base y solo quedan recargos fuera.
			ucfuera = ucre;
			ucpagar = ucbase * cobertura + ucre;
		} else if (ucbase > limit) {
			// Si supera el limite, el excedente se cobra completo y solo el limite recibe cobertura.
			ucfuera = ucbase - limit + ucre;
			ucpagar = ucbase - limit + ucre + limit * cobertura;
		}
	} else if (coop != "ninguna" && coop != "baup") {
		// Fondo de Apoyo Beca (FAB)
		if (ucbase <= limitFab) {
			// UC base menor o igual al límite FAB
			if (mode == APP_CONFIG.MODO_UC) {
				ucfuera = ucre;
				ucpagar = ucbase * cobertura + ucre;
			} else {
				ucfuera = ucre;
				ucrec = ucre; // Recargo por taxonomía
				ucpagar = ucbase * cobertura;
			}
		} else {
			// UC base por encima del límite FAB
			if (mode == APP_CONFIG.MODO_UC) {
				ucfuera = ucbase - limitFab + ucre;
				ucpagar = ucbase - limitFab + ucre + limitFab * cobertura;
			} else {
				ucfuera = ucbase - limitFab + ucre;
				ucrec = ucre;
				ucpagar = limitFab * cobertura; // Aplica cobertura solamente dentro del límite
			}
		}
	} else if (coop == "baup") {
		// Beca a Un Pana (BAUP)
		ucpagar = uctotal * cobertura;
	} else {
		// Ninguna cooperación
		ucpagar = uctotal;
	}

	if (ucfuera > 0) {
		msgAlert(
			`<b> ¡${Number(ucfuera).toFixed(
				2
			)} UC fuera de financiamiento! </b> <br> (Recargos por tax, modalidad o superar límite de cooperación) <br> (Incluido en el total)`
		);
	}

	totalbs = Number(ucpagar * vrealUC).toFixed(2);
	totalbsMinor = Number(uctotalMinor * vrealUC).toFixed(2);

	// Muestra log de depuración en entorno local
	if (window.location.hostname == "127.0.0.1") {
		console.warn("FINAL: ");
		console.log("Cobertura: ", cobertura);
		console.log("uctotal: ", uctotal);
		console.log("ucbase: ", ucbase);
		console.log("uctotal MINOR: ", uctotalMinor);
		console.log("ucbase MINOR: ", ucbaseMinor);
		console.log("Recargos: ", uctotal - ucbase);
		console.log("UC fuera cobertura: ", ucfuera);
		console.log("UC Recargo: ", ucrec);
		console.log("UCpagar: ", ucpagar);
		console.log("Valor real UC (BASE): ", vrealUC);
		console.log("Total totalbs ", totalbs);
		console.log("Total totalbs*3: ", totalbs * 3);
		console.log("Total totalbs*5: ", totalbs * 5);
		console.log("Total Minors bs*3: ", totalbsMinor * 3);
	}

	if (mode == APP_CONFIG.MODO_UC) {
		generarPagos();
	} else {
		loadMontosAcordion(ucrec, ucfuera);
	}
}


/**
 * Extrae o proyecta la tarifa de la UC vigente para una fecha exacta, tomando en cuenta las curvas de aumento de precios (variaciones).
 * Imprescindible para el cálculo de cuotas proyectadas en meses futuros de un semestre.
 * 
 * @param {string} fecha - Fecha formato MM/DD/YYYY de la cual se desea conocer el valor de la UC.
 * @param {number|null} force_periodo - (Opcional) Permite obligar la consulta sobre un periodo específico (1 para Verano, 2 para Semestre) ignorando la estacionalidad actual.
 * @returns {string} El valor equivalente en divisas, parseado y fijado a 2 decimales (como string).
 */
function getUCfecha(fecha, force_periodo = null) {
	let f = new Date(fecha);
	let month = f.getMonth() + 1;

	// Establece periodo auxiliar a verano si el mes actual es verano
	aux_periodo = force_periodo == null ? (monthMapping[month] == null ? 1 : 2) : force_periodo;
	let dataux = ucByPeriodo[aux_periodo == 1 ? "verano" : "semestre"];
	let uc = dataux?.base;

	if (aux_periodo != 1) {
		// Semestre regular
		let cuotaIndex = monthMapping[month];
		if (cuotaIndex == null) {
			uc = dataux?.base;
		} else {
			uc = dataux?.variacion[cuotaIndex - 1];
		}
	}

	/*if (dataux.variacion) {
		let timecmp;
		for (let i = 0; i < dataux.variacion.length; i++) {
			timecmp = new Date(dataux.variacion[i][0]);
			if (f.getTime() >= timecmp.getTime()) {
				//Hoy es mayor que una fecha de variacion
				//aplicar sobre base
				uc = uc * (1 + dataux.variacion[i][1] / 100);
			} else {
				//si variacion es mayor
				//aun no ha llegado esa fecha
				break;
			}
		}
	}*/
	if (carrera && carrera.includes("tsu")) {
		return "12.50";
	}
	console.warn("getUCfecha: ", uc);
	return Number(uc).toFixed(2);
}


/**
 * Resuelve la tarifa de UC que aplica explícitamente a un mes (ej. la cuota del mes 4 tiene el aumento del mes 4).
 * Funciona como atajo directo para plantillas modernas que se basan en el número de mes en lugar de fechas concretas.
 * 
 * @param {number} mes - Número representativo del mes en el semestre (ej. de 1 a 5).
 * @returns {string} La tarifa monetaria base (en USD) correspondiente al mes, ajustada a 2 decimales.
 */
function getUCMes(mes) {
	let month = mes;

	let dataux = ucByPeriodo[perioact == 1 ? "verano" : "semestre"];
	let uc = dataux.base;

	if (perioact != 1) {
		// Semestre regular
		uc = dataux.variacion[month - 1];
	}

	if (carrera && carrera.includes("tsu")) {
		return "12.50";
	}
	return Number(uc).toFixed(2);
}


/**
 * Computa el monto final absoluto (en divisas) de una cuota de pago anclada a una fecha específica, aplicando transversalmente los descuentos de sede y carrera aprobados.
 * 
 * @param {string} fecha - Fecha en la que vence/aplica el pago.
 * @returns {number} Monto final de la cuota con descuentos (listo para multiplicar por BCV o imprimir en USD).
 */
function GetMontoTarifa(fecha) {
	let aux = ucpagar;

	//descuentos segun carrera
	if (carrera.includes("educacion") || carrera.includes("letras")) {
		aux *= APP_CONFIG.DESCUENTO_EDUCACION_LETRAS;
	} else if (carrera.includes("filosofia")) {
		aux *= APP_CONFIG.DESCUENTO_FILOSOFIA;
	}

	switch (sede) {
		case "g":
			//Guayana 5% descuento
			aux *= APP_CONFIG.DESCUENTO_SEDE_GUAYANA;
			break;
		case "tq":
			//Los teques 20% descuento
			aux *= APP_CONFIG.DESCUENTO_SEDE_TEQUES;
			break;
	}

	return getUCfecha(fecha) * aux;
}


/**
 * Computa el monto final absoluto (en divisas) de una cuota de pago anclada a un mes específico de un periodo,
 * descontando beneficios de sede o beneficios sociales (carrera). Es el núcleo del renderizado de las plantillas actuales.
 * 
 * @param {number} mes - Mes interno del periodo del cual se extrae la tarifa base.
 * @returns {number} Monto financiero deducido aplicable a dicho mes (en divisas).
 */
function GetMontoTarifaMes(mes) {
	let aux = ucpagar;

	//descuentos segun carrera
	if (carrera.includes("educacion") || carrera.includes("letras")) {
		aux *= APP_CONFIG.DESCUENTO_EDUCACION_LETRAS;
	} else if (carrera.includes("filosofia")) {
		aux *= APP_CONFIG.DESCUENTO_FILOSOFIA;
	}

	switch (sede) {
		case "g":
			//Guayana 5% descuento
			//document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
			aux *= APP_CONFIG.DESCUENTO_SEDE_GUAYANA;

			break;
		case "tq":
			//Los teques 20% descuento
			//document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
			aux *= APP_CONFIG.DESCUENTO_SEDE_TEQUES;

			break;
	}

	return getUCMes(mes) * aux;
}


/**
 * Ensambla una fecha de consulta válida determinando si el mes buscado recae en el año natural actual o en el siguiente/anterior.
 * Es vital para cálculos inter-anuales (ej. un semestre que inicia en Septiembre pero termina en Enero del año siguiente).
 * 
 * @param {number|string} dia - Día del corte.
 * @param {number|string} mes - Mes del corte.
 * @returns {string} Fecha cruda compatible con el objeto Date() de JS (MM/DD/YYYY).
 */
function getFechaAnoActual(dia, mes) {
	// Maneja el caso borde interanual de enero y febrero
	let Kyear = 0;
	if (hoy.getMonth() + 1 >= 2 && mes <= 2) {
		Kyear = 1;
	} else if (hoy.getMonth() + 1 < 2 && mes > 2) {
		Kyear = -1;
	}

	return `${mes}/${dia}/${hoy.getFullYear() + Kyear}`;
}

/* Gestión de materias */

/**
 * Controla el despliegue animado de las listas de materias clasificadas por semestre.
 * Si el usuario se encuentra en la herramienta FAB, la selección del encabezado no colapsa, sino que elige masivamente dicho semestre.
 * 
 * @param {HTMLElement} elem - El div contenedor (collapsible) clicado por el usuario.
 * @returns {void} Modifica las clases y los estilos 'display' del elemento contiguo.
 */
function toggleList(elem) {
	if (mode == APP_CONFIG.MODO_UC) {
		elem.classList.toggle("active");
		var content = elem.nextElementSibling;

		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	} else {
		// Actúa como seleccionador de semestre en el modo FAB
		FAB_STATE.sem = elem.innerHTML.trim();
		document.getElementById("sSem").innerHTML = FAB_STATE.sem;

		delAllMaterias();
		addAllMaterias();
		closeModal();
	}
}


/**
 * Dibuja en la interfaz gráfica la sumatoria total de Unidades de Crédito académicas seleccionadas hasta el momento (incluyendo regulares y minors).
 * 
 * @returns {void} Actualiza la etiqueta del contador superior 'totalUC'.
 */
function actualizarTotalUC() {
	document.getElementById("totalUC").innerHTML = `${baseVisual + ucbaseMinor} UC`;
}


/**
 * Reinicia a cero los acumuladores visuales de Unidades de Crédito (Regulares y Minors) y actualiza la pantalla.
 * 
 * @returns {void} Modifica los contadores globales e invoca 'actualizarTotalUC()'.
 */
function limpiarTotalUC() {
	baseVisual = 0;
	ucbaseMinor = 0;
	actualizarTotalUC();
}


/**
 * Punto de entrada lógico cuando se hace clic (check/uncheck) en una materia del catálogo.
 * Delega la acción concreta de añadir o restar al carrito de materias.
 * 
 * @param {HTMLInputElement} elem - Checkbox interactuado por el estudiante.
 * @param {boolean} isMinor - Indica si pertenece a la malla de Minors o a la carrera base.
 * @returns {void} Extrae el ID de la materia y decide llamar a 'addMateriaList' o 'deleteMateriaList'.
 */
function materiaSelect(elem, isMinor) {
	// Verifica el estado del checkbox
	let id = elem.getAttribute("id");
	if (elem.checked) {
		// Agrega la materia si está activada
		addMateriaList(id, isMinor);
	} else {
		// Elimina la materia si está desactivada
		deleteMateriaList(id, isMinor);
	}
}
/** Acumulador de UC visuales que no afecta el valor logico base. */
let baseVisual = 0;

/**
 * Inscribe una materia en el resumen o "carrito" visual y suma progresivamente su carga de Unidades de Crédito a los totales.
 * Realiza la distinción entre UC académicas (las que valen en pénsum) y las equivalentes (las que se pagan con recargo).
 * 
 * @param {string|number} id - Posición de la materia dentro de la colección cargada.
 * @param {boolean} isMinor - Diferenciador lógico para acumular en la bolsa de Minors separada.
 * @returns {void} Dibuja la fila visual HTML, registra el evento en Analytics y acumula las 'uctotal'.
 */
function addMateriaList(id, isMinor) {
	let data = materias[id];

	let main = document.getElementsByClassName("materias")[0];

	let divC = document.createElement("div");
	divC.classList.add("container", id);
	divC.setAttribute("onclick", `desCheckMatList(${id}, ${isMinor});`);

	divC.innerHTML = `<table><tr><td class="nMat"> <span style="color: red;">X</span> ${data.Asignatura}</td><td> ${data.UC != 0 ? data.UC : data.UCE
		} UC</td></tr><tr><td>${data.Semestre}</td><td> ${data.Tax}</td></tr></table>`;

	main.appendChild(divC);

	gtag("event", "MateriaSelect", {
		event_category: "UCinteraccion",
		event_label: isMinor ? "(MINOR) " + data.Asignatura : data.Asignatura,
	});

	//ucbase += FixUC(data.Tax, data.UC);
	if (isMinor) {
		ucbaseMinor += data.UC;
		uctotalMinor += UCrecargo(data.UC, data.Tax);
	} else {
		ucbase += data.UC;
		baseVisual += data.UC != 0 ? data.UC : data.UCE;
		uctotal += UCrecargo(data.UC, data.Tax, data.UCE);
	}

	actualizarTotalUC();
}


/**
 * Excluye una materia previamente agregada del carrito visual y descuenta exactamente las UC equivalentes que había aportado.
 * 
 * @param {string|number} id - Posición de la materia a desincorporar.
 * @param {boolean} isMinor - Contexto (Malla regular vs Malla Minor).
 * @returns {void} Localiza y destruye el elemento HTML en el DOM, reajusta las sumatorias financieras a la baja.
 */
function deleteMateriaList(id, isMinor) {
	let elem = document.getElementsByClassName(id)[0];
	elem.parentNode.removeChild(elem);

	let data = materias[id];
	//ucbase -= FixUC(data.Tax, data.UC);
	if (isMinor) {
		ucbaseMinor -= data.UC;
		uctotalMinor -= UCrecargo(data.UC, data.Tax);
	} else {
		ucbase -= data.UC;
		baseVisual -= data.UC != 0 ? data.UC : data.UCE;
		uctotal -= UCrecargo(data.UC, data.Tax, data.UCE);
	}

	actualizarTotalUC();
}


/**
 * Destruye por completo el DOM de la lista de materias agregadas (el carrito).
 * Usado cuando el usuario cambia de sede o carrera y la proyección previa deja de ser válida.
 * 
 * @returns {void} Asigna un 'innerHTML' vacío al panel 'materias'.
 */
function cleanTableMat() {
	document.getElementsByClassName("materias")[0].innerHTML = "";
}
/* Generación de tablas */
//SYSTEM TABLE
/** Colores alternos usados para la generacion visual de las tablas de pagos. */
let ColorArray = ["#fed20180", "#34b2e466"];
/** Indicador de color alterno para el formato de celdas de las tablas de pagos. */
let ScolorUsed = false;


/**
 * Generador principal de plantillas de pago (Sistema Actual).
 * Inyecta una estructura estática HTML basada en clases CSS, calculando in situ (en el acto) el monto en dólares y bolívares de cada cuota.
 * El cálculo toma los subtotales globales y le agrega el factor de modalidad de pago (descuentos por financiamiento mensual, parcial o total) y el Derecho de Inscripción oficial.
 * 
 * @returns {void} Modifica directamente el div contenedor del DOM eliminando lo anterior y sobreescribiéndolo.
 */
function generarPagos() {
	const divMain = document.getElementById(APP_CONFIG.ID_PAGOS);
	divMain.innerHTML = "";

	// Extrae la tasa BCV y construye la fila informativa superior.
	//Tasa BCV
	divMain.insertAdjacentHTML("beforeend", getBCVhtml());

	// La variable 'templateSelect' define la estructura a renderizar según el periodo:
	// El verano procesa un pago único directo, mientras que el semestre despliega opciones financiadas.
	//Segun periodo
	if (templateSelect == "ver") {
		//Verano
		//pago unico
		divMain.insertAdjacentHTML(
			"beforeend",
			`
        <div class="box-table">
            <h2 class="title-center">Pago único verano</h2>
            <div class="box-info">
                <div><span class="subtitle-table">Total (100%)</span></div>
                <div>
                    <span class="bs">${formatNumber.new(totalbs * 5 * valorBCV, `Bs `, true)}</span> <br />
             
                    <span class="usd">${formatNumber.new(totalbs * 5, `USD `)}</span>
                </div>
            </div>
        </div>    
        `
		);
	} else if (templateSelect == "sem") {
		//Semestre
		// El semestre requiere un cobro inicial desglosado. El Derecho de Inscripción (DI) es fijo y se procesa de forma independiente.
		// Se inyectan las plantillas informativas de DI y Confirmación de Inscripción (CI).
		//DI
		divMain.insertAdjacentHTML("beforeend", getDIhtml());
		divMain.insertAdjacentHTML("beforeend", getConfDIhtml());

		// Genera las tarjetas colapsables de pago.
		// Procesa los totales aplicando descuentos por modalidad (total, mensual o parcial) directamente sobre las cuotas estimadas.
		//PAGOS
		divMain.insertAdjacentHTML(
			"beforeend",
			`
        <!-- PAGO TOTAL
            <div class="box-btn">
                PAGO TOTAL  
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 5 meses por adelantado.<br>Recibe un 4% de descuento sobre las UC (No DI). <br>Exento del proceso de confirmación de inscripción. <br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">Estudiante regular (+DI+CI)</span></div>
                    <div>
                        <span class="bs">${formatNumber.new((DI_REGULAR * valorUC + totalbs * 5 * APP_CONFIG.DESCUENTO_MODALIDAD_TOTAL) * valorBCV, `Bs `, true)}</span> <br />
                  
                        <span class="usd">${formatNumber.new(DI_REGULAR * valorUC + totalbs * 5 * APP_CONFIG.DESCUENTO_MODALIDAD_TOTAL, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">Estudiante nuevo (+DI+CI)</span></div>
                    <div>
                        <span class="bs">${formatNumber.new((DI_NUEVO * valorUC + totalbs * 5 * APP_CONFIG.DESCUENTO_MODALIDAD_TOTAL) * valorBCV, `Bs `, true)}</span> <br />
                    
                        <span class="usd">${formatNumber.new(DI_NUEVO * valorUC + totalbs * 5 * APP_CONFIG.DESCUENTO_MODALIDAD_TOTAL, `USD `, true)}</span>
                    </div>
                </div>
            </div>-->


            <!-- PAGO MENSUAL (FINANCIADO)-->
            <div class="box-btn">
                PAGO MENSUAL
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago mensual. <br>Derecho de inscripción y confirmación deberá realizarse directamente a la UCAB.<br>*Comprobar monto con caja* <br><br> AHORA LOS PAGOS SON CON LA UCAB. <br> <b>NO</b> A LOS BANCOS')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">CUOTA INICIAL (+DI)</span></div>
                    <div class="indent-10">
                    <span class="subtitle-table">Estudiante regular (+DI)</span><br />
                    <span class="bs">${formatNumber.new((DI_REGULAR * valorUC + totalbs * 1) * valorBCV, `Bs `, true)}</span> <br />
                 
                    <span class="usd">${formatNumber.new(DI_REGULAR * valorUC + totalbs * 1, `USD `, true)}</span>
                </div>
                    <div class="indent-10">
                        <span class="subtitle-table">Estudiante nuevo (+DI)</span><br />
                        <span class="bs">${formatNumber.new((DI_NUEVO * valorUC + totalbs * 1) * valorBCV, `Bs `, true)}</span> <br />
                     
                        <span class="usd">${formatNumber.new(DI_NUEVO * valorUC + totalbs * 1, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">2DO MES</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(Number(GetMontoTarifaMes(2)), `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">3ER MES</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifaMes(3), `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">4TO MES (Sin CI)</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifaMes(4) * 1, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">5TO MES</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifaMes(5), `USD `, true)}</span>
                    </div>
                </div>
            </div>   
		
			<!-- PAGO PARCIAL-->
            <div class="box-btn">
                PAGO PARCIAL (MODALIDAD DESHABILITADA) 
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 3 meses por adelantado (1era cuota) y 2 meses posteriormente (2da cuota).<br>Recibe un 4% de descuento sobre las UC (No DI).<br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">1ERA CUOTA</span></div>
                    <div class="indent-10">
                        <span class="subtitle-table">Estudiante regular (+DI)</span><br />
                        <span class="bs">${formatNumber.new((DI_REGULAR * valorUC + totalbs * 3 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL) * valorBCV, `Bs `, true)}</span> <br />
                       
                        <span class="usd">${formatNumber.new(DI_REGULAR * valorUC + totalbs * 3 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL, `USD `, true)}</span>
                    </div>

                    <div class="indent-10">
                        <span class="subtitle-table">Estudiante nuevo (+DI)</span><br />
                        <span class="bs">${formatNumber.new((DI_NUEVO * valorUC + totalbs * 3 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL) * valorBCV, `Bs `, true)}</span> <br />
                      
                        <span class="usd">${formatNumber.new(DI_NUEVO * valorUC + totalbs * 3 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">2DA CUOTA (ESTIMACIÓN +CI)</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(
				2.5 * getUCMes(4) + Number(GetMontoTarifaMes(4)) * 2 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL,
				`USD `,
				true
			)}</span>
                    </div>
                </div>
            </div> 
        `
		);
	} else {
		//Segunda parte semestre
		//Confirmacion
		divMain.insertAdjacentHTML("beforeend", getConfDIhtml());

		//PAGOS
		divMain.insertAdjacentHTML(
			"beforeend",
			`
            
            <!-- PAGO MENSUAL (FINANCIADO)-->
            <div class="box-btn">
                PAGO MENSUAL
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago mensual. <br>Derecho de inscripción y confirmación deberá realizarse directamente a la UCAB.<br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">4TO MES (SIN CI)</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifa(getFechaAnoActual(1, 12)) * 1, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">4TO MES (+ CI)</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifa(getFechaAnoActual(1, 12)) * 1 + 2.5 * valorUC, `USD `, true)}</span>
                    </div>
                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">5TO MES</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(GetMontoTarifa(getFechaAnoActual(1, 12)), `USD `, true)}</span>
                    </div>
                </div>
            </div>   

			<!-- PAGO PARCIAL-->
            <div class="box-btn">
                PAGO PARCIAL (MODALIDAD DESHABILITADA)
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 3 meses por adelantado (1era cuota) y 2 meses posteriormente (2da cuota).<br>Recibe un 4% de descuento sobre las UC (No DI).<br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">2DA CUOTA (+ CI)</span></div>
                    <div class="indent-10">
                    <span class="bs">${formatNumber.new((2.5 * valorUC + totalbs * 2 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL) * valorBCV, `Bs `, true)}</span> <br />
                 
                        <span class="usd">${formatNumber.new(2.5 * valorUC + totalbs * 2 * APP_CONFIG.DESCUENTO_MODALIDAD_PARCIAL, `USD `, true)}</span>
                    </div>
                </div>
            </div>
        `
		);
	}

	// Renderiza tabla de minor si existen UC registradas
	if (uctotalMinor > 0) {
		divMain.insertAdjacentHTML("beforeend", `<h2>MINOR</h2>`);

		if (templateSelectMinor == "verMinor") {
			// Renderiza el pago único para el verano minor
			divMain.insertAdjacentHTML(
				"beforeend",
				`
            <div class="box-table">
                <h2 class="title-center">Pago único verano</h2>
                <div class="box-info">
                    <div><span class="subtitle-table">Total (100%)</span></div>
                    <div>
                        <span class="bs">${formatNumber.new(totalbsMinor * 5 * valorBCV, `Bs `, true)}</span> <br />
                      
                        <span class="usd">${formatNumber.new(totalbsMinor * 5, `USD `)}</span>
                    </div>
                </div>
            </div>    
            `
			);
		} else if (templateSelectMinor == "semMinor") {
			// Renderiza la tabla para semestre minor
			divMain.insertAdjacentHTML(
				"beforeend",
				`
            <!-- PAGO TOTAL-->
            <div class="box-btn">
                PAGO TOTAL
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 5 meses por adelantado.<br>Recibe un 6% de descuento sobre las UC (No DI). <br>MINORS SOLO SE PAGA DE CONTADO <br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">Sub-Total</span></div>
                    <div>
                        <span class="bs">${formatNumber.new(totalbsMinor * 5 * valorBCV, `Bs `, true)}</span> <br />
                    
                        <span class="usd">${formatNumber.new(totalbsMinor * 5, `USD `, true)}</span>
                    </div>
                </div>
            </div>


            <!-- PAGO PARCIAL-->
            <div class="box-btn">
                PAGO PARCIAL
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 3 meses por adelantado (1era cuota) y 2 meses posteriormente (2da cuota).<br>MINORS SOLO SE PAGA DE CONTADO <br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">
                <div class="box-info">
                    <div><span class="subtitle-table">1ERA CUOTA</span></div>
                    <div class="indent-10">
                        <span class="bs">${formatNumber.new(totalbsMinor * 3 * valorBCV, `Bs `, true)}</span> <br />
                 
                        <span class="usd">${formatNumber.new(totalbsMinor * 3, `USD `, true)}</span>
                    </div>

                </div>
                <div class="box-info">
                    <div><span class="subtitle-table">2DA CUOTA (ESTIMACIÓN)</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(totalbsMinor * 2, `USD `, true)}</span>
                    </div>
                </div>
            </div>
            `
			);
		} else {
			// Renderiza la segunda parte del semestre minor
			divMain.insertAdjacentHTML(
				"beforeend",
				`
            <!-- PAGO PARCIAL-->
            <div class="box-btn">
                PAGO PARCIAL
                <i
                    class="fas fa-question-circle"
                    onclick="modalInfoOpen('Modalidad de pago de 3 meses por adelantado (1era cuota) y 2 meses posteriormente (2da cuota).<br>MINORS SOLO SE PAGA DE CONTADO <br>*Comprobar monto con caja*')"
                ></i>
            </div>
            <div class="box-panel">

                <div class="box-info">
                    <div><span class="subtitle-table">2DA CUOTA</span></div>
                    <div class="indent-10">
                        <span class="usd">${formatNumber.new(totalbsMinor * 2, `USD `, true)}</span>
                    </div>
                </div>
            </div>
            `
			);
		}
	}
	iniciarlizarAcordionesPagos();
}


/**
 * Genera el componente visual (banner) que muestra la cotización oficial del dólar BCV empleada en la liquidación del día.
 * 
 * @returns {string} Código HTML (String literal) de la tarjeta con la tasa de cambio formateada.
 */
function getBCVhtml() {
	return `
    <!-- TASA -->
    <div class="box-table">
        <h2 class="title-center">TASA USD</h2>
        <p class="text-center">${formatNumber.new(valorBCV, `Bs. `, true)}</p>
       
    </div>
    `;
}


/**
 * Genera la tarjeta informativa de los costos extra-académicos correspondientes al Derecho de Inscripción (DI).
 * Imprime dos montos separados: Uno para estudiantes regulares y otro para estudiantes de nuevo ingreso, que difieren históricamente en aranceles.
 * 
 * @returns {string} Código HTML inyectable con los montos absolutos en Bs y USD formateados según la UC base.
 */
function getDIhtml() {
	return `
    <!-- DI -->
    <div class="box-table">
        <h2 class="title-center">Derecho inscripción (1era Parte)</h2>
        <div class="box-info">
            <div><span class="subtitle-table">Estudiante regular</span></div>
            <div>
                <span class="bs">${formatNumber.new(DI_REGULAR * valorUC * valorBCV, `Bs `, true)}</span> <br />
           
                <span class="usd">${formatNumber.new(DI_REGULAR * valorUC, `USD `, true)}</span>
            </div>
        </div>

        <div class="box-info">
            <div><span class="subtitle-table">Estudiante nuevo</span></div>
            <div>
                <span class="bs">${formatNumber.new(DI_NUEVO * valorUC * valorBCV, `Bs `, true)}</span> <br />
          
                <span class="usd">${formatNumber.new(DI_NUEVO * valorUC, `USD `, true)}</span>
            </div>
        </div>
    </div>    
    `;
}


/**
 * Genera la tarjeta visual correspondiente al segundo recargo semestral llamado 'Confirmación de Inscripción'.
 * Se calcula usando la UC inflada proyectada hacia el cuarto mes del semestre activo, por regla de negocio institucional.
 * 
 * @returns {string} Código HTML inyectable con el monto de confirmación estimado formateado.
 */
function getConfDIhtml() {
	return `
    <!-- DI -->
    <div class="box-table">
        <h2 class="title-center">Confirmación inscripción (2da Parte)</h2>
        <div class="box-info">
            <div><span class="subtitle-table">Estudiantes</span></div>
            <div>
                <span class="bs">${formatNumber.new(DI_CONFIRM * getUCMes(4) * valorBCV, `Bs `, true)}</span> <br />
            
                <span class="usd">${formatNumber.new(DI_CONFIRM * getUCMes(4), `USD `, true)}</span>
            </div>
        </div>
    </div>  
    `;
}



