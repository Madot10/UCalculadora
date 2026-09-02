/**
 * @file educacion-mencion-ciencias-sociales.js
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
var educacionmencioncienciassocialesnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Geografía: Teoría y Método", UC: 5, Tax: "TA‐3" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Introduccción al Estudio de la Historia", UC: 5, Tax: "TA‐2" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistemas de Información Geográfica", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Geografía Física", UC: 6, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia Antigua I", UC: 5, Tax: "TA‐2" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Teoría y Método de la Historia", UC: 3, Tax: "TA‐9" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Geografía Humana", UC: 6, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Historia Antigua II", UC: 3, Tax: "TA‐2" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Geografía Regional I", UC: 5, Tax: "TA‐3" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Historia Medieval", UC: 5, Tax: "TA‐2" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geografía Regional II", UC: 5, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geografía de Venezuela I", UC: 6, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Principios de Teoría Económica", UC: 3, Tax: "TA‐5" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Antropologia y civilizaciones prehispánicas", UC: 5, Tax: "TA‐2" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Geografía de Venezuela II", UC: 6, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia Moderna", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia de Venezuela I", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia de América I", UC: 3, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Historia de la Historiografía", UC: 3, Tax: "TA‐2" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Didáctica de la Especialidad: Geografía", UC: 6, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia Contemporánea I", UC: 5, Tax: "TA‐2" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia de Venezuela II", UC: 5, Tax: "TA‐2" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia de América II", UC: 5, Tax: "TA‐2" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Didáctica de la Especialidad: Historia", UC: 6, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Práctica Profesional en Geografía", UC: 6, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Historia Contemporánea II", UC: 5, Tax: "TA‐2" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Historia de Venezuela III", UC: 5, Tax: "TA‐2" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Práctica Profesional en Historia", UC: 6, Tax: "TA‐7" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Geopolitica: Venezuela en el escenario internacional", UC: 4, Tax: "TA‐2" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Filosofía de la Historia", UC: 3, Tax: "TA‐2" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario de Geografía", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario de Historia", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Historia Contemporánea de América Latina", UC: 3, Tax: "TA‐2" },
];
