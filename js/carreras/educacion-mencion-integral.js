/**
 * @file educacion-mencion-integral.js
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
var educacionmencionintegralnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Aritmética I", UC: 4, Tax: "TA‐3" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Fundamentos de la Cultura Venezolana", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "El Niño y la Actividad Lúdica", UC: 4, Tax: "TA‐8" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Aritmética II", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Práctica de Observación", UC: 4, Tax: "TA‐7" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Lengua Española", UC: 3, Tax: "TA‐3" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Práctica, Enseñanza y Pedagogía", UC: 6, Tax: "TA‐7" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Educación para la Salud", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Enseñanza de la Lectura y la Escritura I", UC: 5, Tax: "TA‐3" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ciencias Naturales I", UC: 4, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Enseñanza de la Lectura y la Escritura II", UC: 4, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Enseñanza de la Lengua I", UC: 3, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geometría", UC: 3, Tax: "TA‐8" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Práctica Unidades de clase", UC: 6, Tax: "TA‐7" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Pedagogia Social y Aprendizaje Servicio", UC: 3, Tax: "TA‐8" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Práctica Unidades Integradoras", UC: 6, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Ciencias Naturales II", UC: 4, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Enseñanza de la Lengua II", UC: 4, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Ciencias Sociales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Literatura Infantil y Juvenil", UC: 4, Tax: "TA‐8" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Práctica Proyecto de Aprendizaje", UC: 6, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Educación para la Ciudadania", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Geografìa de Venezuela I", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Prevención y Atención Temprana de la Discapacidad", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Historia Universal", UC: 5, Tax: "TA‐1" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación Educativa I.", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Historia de Venezuela I", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Geografìa de Venezuela II", UC: 4, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Educación Estética", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Estrategias para la Diversidad", UC: 5, Tax: "TA‐1" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación Educativa II", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Historia de Venezuela II", UC: 5, Tax: "TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Proyecto Emprendimiento Educativo", UC: 5, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Didactica de los Adultos Significativos", UC: 4, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
];
