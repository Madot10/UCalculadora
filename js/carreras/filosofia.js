/**
 * @file filosofia.js
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
var filosofianuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Historia de la Filosofía Antigua I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica I", UC: 3, Tax: "TA‐3" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Griego I", UC: 5, Tax: "TA‐5" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Antropología Filosófica I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Historia de la Cultura I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia de la Filosofía Antigua II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Lógica II", UC: 3, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Griego II", UC: 5, Tax: "TA‐5" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Antropología Filosófica II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia de la Cultura II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Seminario de Pensamiento Cristiano", UC: 3, Tax: "TA‐9" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Historia de la Filosofía Medieval I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Pensamiento Latinoamericano", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Lógica III", UC: 3, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teoría del Conocimiento I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Latín I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Historia de la Cultura III", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teoría de la Argumentación", UC: 3, Tax: "TA‐1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Historia de la Filosofía Medieval II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Metafísica I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Lógica IV", UC: 3, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Teoria del Conocimiento II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Latín II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Seminario de Pensamiento Venezolano", UC: 3, Tax: "TA‐9" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia de la Filosofía Moderna I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Metafísica II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Filosofía de la Ciencia I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Filosofía de la Religión", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Seminario de Filosofía Antigua", UC: 3, Tax: "TA‐9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Seminario de Filosofía de la Comunicación", UC: 3, Tax: "TA‐9" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia de la Filosofía Moderna II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía Moral I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Ciencia II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Historia", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario de Metafísica", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario de Antropología Filosófica", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario de Trabajo de Grado", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario de Filosofía Medieval", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Innovación y Emprendimiento ", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Historia de la Filosofía Contemporánea I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía Moral II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía Política I", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Filosofía del Lenguaje I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Estética I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Seminario de Temas de Filosofía de la Historia", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Seminario de Filosofía Moderna", UC: 3, Tax: "TA‐9" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Historia de la Filosofía Contemporánea II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Filosofía Política II", UC: 6, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Filosofía del Lenguaje II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Estética II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario de Filosofía Moral", UC: 3, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario de Filosofía Contemporánea", UC: 3, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario de Filosofía Política", UC: 3, Tax: "TA‐9" },

	{ Semestre: "ESPACIO CURRICULAR TG", Asignatura: "Trabajo de Grado", UC: 8, Tax: "TA ‐ 1" },
];
