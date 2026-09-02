/**
 * @file ingenieria-civil.js
 * @description Define la estructura académica y la malla curricular de la carrera. 
 * Contiene un arreglo de objetos donde cada elemento representa una asignatura específica, 
 * detallando el semestre en el que se imparte, el nombre de la asignatura, las Unidades de Crédito (UC) 
 * correspondientes y la taxonomía asociada. Es utilizado por el motor principal para generar 
 * dinámicamente la lista de materias disponibles al momento de la selección en la interfaz.
 */


/**
 * Arreglo de objetos con el pensum de la carrera. 
 * Para actualizar o realizar mantenimiento:
 * 1. Mantener comentado el año o versión del pensum sobre la variable (ej. //202525 - Actual). Si no se conoce la fecha, colocar los primeros dígitos (ej. //202. - 202.).
 * 2. Al actualizar, si no existe una variable llamada 'viejopensum' se debe crear siguiendo el flujo establecido. La variable del pensum viejo debe tomar los datos del pensum nuevo anterior, y la variable del pensum nuevo toma los datos del pensum recién aprobado.
 * 3. Asegurar que las propiedades 'Semestre', 'Asignatura', 'UC' y 'Tax' mantengan la nomenclatura exacta.
 * 4. Verificar que el identificador de la variable coincida exactamente con el valor esperado por la lógica de selección en la interfaz.
 * 
 * @type {Array<{Semestre: string, Asignatura: string, UC: number, Tax: string}>}
 */
//20.. - 2026
var ingcivilviejopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Representación Gráfica", UC: 3, Tax: "TA-9" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Algebra y Trigonometría", UC: 5, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Cálculo Diferencial", UC: 6, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Física General", UC: 6, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica", UC: 4, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA-6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA-1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Dibujo Asistido por Computadora", UC: 2, Tax: "TA-9" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Geometría Descriptiva I", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo Integral", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Mecánica Racional", UC: 6, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Electricidad y Magnetismo", UC: 6, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Fundamentos de Programación", UC: 3, Tax: "TA-9" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA-1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Topografía", UC: 4, Tax: "TA-9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Geometría Descriptiva II", UC: 5, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Algebra Lineal", UC: 6, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Mecánica de Sólidos I", UC: 5, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Instalaciones Eléctricas", UC: 2, Tax: "TA-8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA-1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA-1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Gerencia e Ingeniería Civil", UC: 4, Tax: "TA-8" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geología", UC: 5, Tax: "TA-9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fotogrametría y Sistema de Información Geográfica", UC: 2, Tax: "TA-9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ecuaciones Diferenciales Ordinarias", UC: 4, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Mecánica de Sólidos II", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Probabilidad y Estadística", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Química", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gestión de Proyectos en Ingeniería Civil", UC: 5, Tax: "TA-8" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mecánica de Suelos I", UC: 4, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Métodos Numéricos", UC: 2, Tax: "TA-9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Materiales de Construcción", UC: 4, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Laboratorio de Tecnología de los Materiales", UC: 2, Tax: "TA-9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Estructuras I", UC: 5, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Ingeniería Civil y Ambiente", UC: 4, Tax: "TA-2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mecánica de los Fluidos I", UC: 5, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Vías de Comunicación", UC: 5, Tax: "TA-9" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Mecánica de Suelos II", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Laboratorio de Mecánica de Suelos", UC: 2, Tax: "TA-9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Concreto Reforzado I", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Estructuras II", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Plantas Potabilizadores de Aguas", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Mecánica de los Fluidos II", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Hidrología Aplicada", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Proyectos Viales", UC: 4, Tax: "TA-9" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Pavimentos", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ética Profesional", UC: 3, Tax: "TA-2" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Proyecto de Estructura de Acero", UC: 6, Tax: "TA-9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Concreto Reforzado II", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Plantas de Tratamiento de Aguas Residuales Urbanas", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Laboratorio de Hidráulica", UC: 3, Tax: "TA-9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ingeniería Hidráulica I", UC: 6, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Seminario de Trabajo de Grado", UC: 2, Tax: "TA-9" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ingeniería de Fundaciones", UC: 4, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Proyecto de Estructuras de Concreto", UC: 5, Tax: "TA-9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Laboratorios de Aguas", UC: 3, Tax: "TA-9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Infraestructuras Hidráulicas en Urbanismo", UC: 4, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Instalaciones Sanitarias para Edificaciones", UC: 4, Tax: "TA-9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ingeniería Hidráulica II", UC: 6, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva o Pasantías", UC: 4, Tax: "TA-8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Trabajo de Grado", UC: 19, Tax: "TA-4" },
];

/**
 * Arreglo de objetos con el pensum de la carrera. 
 * Para actualizar o realizar mantenimiento:
 * 1. Mantener comentado el año o versión del pensum sobre la variable (ej. //202525 - Actual). Si no se conoce la fecha, colocar los primeros dígitos (ej. //202. - 202.).
 * 2. Al actualizar, si no existe una variable llamada 'viejopensum' se debe crear siguiendo el flujo establecido. La variable del pensum viejo debe tomar los datos del pensum nuevo anterior, y la variable del pensum nuevo toma los datos del pensum recién aprobado.
 * 3. Asegurar que las propiedades 'Semestre', 'Asignatura', 'UC' y 'Tax' mantengan la nomenclatura exacta.
 * 4. Verificar que el identificador de la variable coincida exactamente con el valor esperado por la lógica de selección en la interfaz.
 * 
 * @type {Array<{Semestre: string, Asignatura: string, UC: number, Tax: string}>}
 */

//2026 - Actual
var ingcivilnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Representación Gráfica", UC: 3, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Mecánica", UC: 6, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Cálculo Diferencial", UC: 6, Tax: "TA-4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA-1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA-1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA-6" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Dibujo Asistido por Computadora", UC: 2, Tax: "TA-9" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Geometría Descriptiva I", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Mecánica Racional", UC: 6, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo Integral", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Electricidad y Magnetismo", UC: 6, Tax: "TA-4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA-1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Fundamentos de Programación", UC: 3, Tax: "TA-9" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Geometría Descriptiva II", UC: 5, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Topografía", UC: 4, Tax: "TA-8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Mecánica de Sólidos I", UC: 5, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Algebra Lineal", UC: 5, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Ecuaciones Diferenciales Ordinarias", UC: 4, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Instalaciones Eléctricas", UC: 2, Tax: "TA-4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA-1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fotogrametría y Sistema de Información Geográfica", UC: 2, Tax: "TA-9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geología", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Mecánica de Sólidos II", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Métodos Numéricos", UC: 2, Tax: "TA-9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Probabilidad y Estadística", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Mecánica de los Fluidos I", UC: 5, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ingeniería Civil y Ambiente", UC: 3, Tax: "TA-4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Química", UC: 5, Tax: "TA-4" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Vías de Comunicación", UC: 5, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mecánica de Suelos I", UC: 4, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Materiales de Construcción", UC: 3, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Laboratorio de Tecnología de los Materiales", UC: 2, Tax: "TA-9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Estructuras I", UC: 5, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Hidrología Aplicada", UC: 4, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mecánica de los Fluidos II", UC: 5, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Plantas Potabilizadoras de Agua", UC: 4, Tax: "TA-4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gerencia e Ingeniería Civil", UC: 3, Tax: "TA-4" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Proyectos Viales", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Mecánica de Suelos II", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Laboratorio de Mecánica de Suelos", UC: 2, Tax: "TA-9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Concreto Reforzado I", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Estructuras II", UC: 5, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Instalaciones Sanitarias para Edificaciones", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Laboratorio de Hidráulica", UC: 3, Tax: "TA-9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Plantas de Tratamiento de Aguas Residuales Urbanas", UC: 4, Tax: "TA-4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gestión de Proyectos en Ingeniería Civil", UC: 4, Tax: "TA-4" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Pavimentos", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Concreto Reforzado II", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Proyecto de Estructuras de Acero", UC: 6, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Infraestructura Hidráulica en Urbanismos", UC: 4, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ingeniería Hidráulica I", UC: 6, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Laboratorio de Aguas", UC: 3, Tax: "TA-9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ética Profesional", UC: 3, Tax: "TA-4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Seminario de Trabajo de Grado", UC: 2, Tax: "TA-4" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ingeniería de Fundaciones", UC: 4, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Proyecto de Estructuras de Concreto", UC: 5, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ingeniería Hidráulica II", UC: 6, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva o Pasantía", UC: 3, Tax: "TA-4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Trabajo de Grado", UC: 10, Tax: "TA-4" },
];
