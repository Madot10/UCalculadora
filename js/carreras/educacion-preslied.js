/**
 * @file educacion-preslied.js
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
var educacionpresliednuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad Liderazgo y Compromiso", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General y Desarrollo Humano (*)", UC: 5, Tax: "(SP) TA‐2" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Práctica Profesional I", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "(SP) TA‐1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 5, Tax: "(SP) TA‐2" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Práctica Profesional II: Ambientes no Convencionales", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Didáctica Especial I", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Investigación Educativa I", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Didáctica Especial II", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Asesoramiento", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Investigación Educativa II", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ética", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales", UC: 3, Tax: "(SP) TA‐1" },
];
