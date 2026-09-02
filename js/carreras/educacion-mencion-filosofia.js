/**
 * @file educacion-mencion-filosofia.js
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
var educacionmencionfilosofianuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Introducción Metodológica a la Filosofía I", UC: 3, Tax: "TA‐8" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Historia de la Filosofía Antigua I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica", UC: 3, Tax: "TA‐4" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Introducción Metodológica a la Filosofía II", UC: 3, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia de la Filosofía Antigua II", UC: 6, Tax: "TA‐1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de medios digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Antropología Filosófica I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Historia de la Filosofía Medieval I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teoría del Conocimiento I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Pensamiento Latinoamericano I", UC: 3, Tax: "TA‐1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Antropología Filosófica II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Historia de la Filosofía Medieval II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Teoría del Conocimiento II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Metafísica I", UC: 6, Tax: "TA‐1" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Practica Profesional I: Didáctica de la Filosofía", UC: 4, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Filosofía de la Ciencia I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Filosofía de la Religión", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia de la Filosofía Moderna I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Metafísica II", UC: 6, Tax: "TA‐1" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Practica profesional II: Didáctica de la Filosofía", UC: 4, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Ciencia II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía Moral I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia de la Filosofía Moderna II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación I: Proyecto", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Historia de la Filosofía Contemporánea I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía Moral II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía del Lenguaje I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía Política I", UC: 6, Tax: "TA‐1" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación Educativa II: Trabajo de Grado", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Historia de la Filosofía Contemporánea II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Filosofía del Lenguaje II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Filosofía Política II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Síntesis Filosófica", UC: 5, Tax: "TA‐9" },
];
