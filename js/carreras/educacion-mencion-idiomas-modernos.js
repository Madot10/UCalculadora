/**
 * @file educacion-mencion-idiomas-modernos.js
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

//20.. - Actual
var educacionmencionidiomasmodernosnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "TA‐1 (SP)" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Cultura y Sociedad Venezolana ", UC: 3, Tax: "TA‐1 (SP)" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lingüística I ", UC: 5, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Morfosintaxis I", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II ", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐6" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación ", UC: 4, Tax: "TA‐1 (SP)" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Lingüística II", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Inglés I ", UC: 5, Tax: "TA‐1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I ", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Contenidos en Inglés", UC: 5, Tax: "TA‐6" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje ", UC: 4, Tax: "TA‐3 (SP)" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de medios digitales ", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Redacción y Estilo", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Inglés II", UC: 5, Tax: "TA‐1 (SP)" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Fonética y Fonología del Español", UC: 3, Tax: "TA‐3 (SP)" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Metodología de la Enseñanza de los Idiomas I ", UC: 5, Tax: "TA‐4" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II ", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales ", UC: 3, Tax: "TA‐9 (SP)" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Prácticas Profesionales: Didáctica de los Idiomas I", UC: 4, Tax: "TA‐7" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fonética y Fonología del Inglés I ", UC: 3, Tax: "TA‐3 (SP)" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Inglés III ", UC: 5, Tax: "TA‐1 (SP)" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Introducción a los Estudios Literarios en Inglés (Virtual)", UC: 3, Tax: "TA‐1 (V)" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Cultura y Civilización Inglesa (Virtual)", UC: 3, Tax: "TA‐1 (V)" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Metodología de la Enseñanza de los Idiomas II", UC: 5, Tax: "TA‐4" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "TA‐9 (V)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes (Virtual)", UC: 5, Tax: "TA‐9 (V)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Prácticas Profesionales: Didáctica de los Idiomas II ", UC: 4, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Inglés IV ", UC: 5, Tax: "TA‐1 (SP)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Documentación y Terminología del Inglés (Virtual)", UC: 3, Tax: "TA‐1 (V)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Literatura de la Lengua Inglesa I  (Virtual)", UC: 3, Tax: "TA‐1 (V)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Fonética y Fonología del Inglés II", UC: 5, Tax: "TA‐3 (SP)" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Francés I", UC: 5, Tax: "TA‐1 (SP)" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento (Virtual)", UC: 5, Tax: "TA‐3 (V)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "TA‐1 (SP)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Traducción I (Virtual)", UC: 5, Tax: "TA‐4 (V)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Literatura de la Lengua Inglesa II  (Virtual)", UC: 3, Tax: "TA‐1 (V)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Francés II ", UC: 5, Tax: "TA‐1 (SP)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Lectura y Redacción en Francés", UC: 5, Tax: "TA‐3 (SP)" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Tópico Especial ", UC: 5, Tax: "TA-2" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación Educativa I ", UC: 5, Tax: "TA-9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento ", UC: 3, Tax: "TA-1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento (Virtual) ", UC: 3, Tax: "TA-1 (V)" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA-1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Traducción II ", UC: 5, Tax: "TA-4 (V)" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Francés III ", UC: 5, Tax: "TA-1 (SP)" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Literatura Francesa (Virtual)", UC: 3, Tax: "TA-1 (V)" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Cultura y Civilización Francesa (Virtual)", UC: 3, Tax: "TA-1 (V)" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética (Virtual)", UC: 3, Tax: "TA-1 (V)" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación Educativa II", UC: 5, Tax: "TA-9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas ", UC: 3, Tax: "TA-1 (SP)" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Traducción e Interpretación  (Virtual)", UC: 5, Tax: "TA-4 (V)" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Francés IV ", UC: 5, Tax: "TA-1 (SP)" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Fonética y Fonología del Francés", UC: 5, Tax: "TA-3 (SP)" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Tópico Especial ", UC: 3, Tax: "TA-2" },
];
