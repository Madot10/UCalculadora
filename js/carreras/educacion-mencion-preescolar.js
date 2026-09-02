/**
 * @file educacion-mencion-preescolar.js
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
var educacionmencionpreescolarnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Modelos Educativos para la infancia", UC: 5, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Herramientas para la Educación Inicial", UC: 4, Tax: "TA‐4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Neurodidáctica en la Educación Inicial", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐6" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Expresión Artística", UC: 4, Tax: "TA‐4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Expresión Musical", UC: 4, Tax: "TA‐4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Práctica de Observación", UC: 4, Tax: "TA‐7" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Gestión de la Atención Prenatal", UC: 5, Tax: "TA‐7" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Implicaciones Educativas del Desarrollo Social y Emocional del Niño", UC: 4, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Salud y Nutrición desde la Concepción a la Niñez Temprana", UC: 3, Tax: "TA‐1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Desarrollo y Evaluación del Niño Maternal", UC: 4, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Didáctica de la Educación Maternal", UC: 4, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Literatura Infantil", UC: 4, Tax: "TA‐8" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Pedagogìa Social y Aprendizaje en Servicio", UC: 3, Tax: "TA‐8" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Práctica Etapa Maternal", UC: 6, Tax: "TA‐7" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Psicomotricidad en la Primera Infancia y la Niñez Temprana", UC: 4, Tax: "TA‐8" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Lectura y Escritura en Educaciòn Inicial", UC: 5, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Desarrollo y Evaluaciòn del Niño Preescolar", UC: 4, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Didàctica de la Educación Preescolar", UC: 4, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Práctica Etapa Preescolar", UC: 6, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "El Niño y la Matemática", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "El Niño y las Ciencias Sociales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Didáctica para Primer Grado", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Prevención y atención Integral Temprana de la Discapacidad", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Práctica de Primer Grado", UC: 6, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "El Niño y las Ciencias Naturales", UC: 3, Tax: "TA‐3" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación Educativa I.", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Educación en Valores para la Paz y la Convivivencia", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Estrategias para la Diversidad", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Marco Legal para la Educación Inicial", UC: 5, Tax: "TA‐1" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación Educativa II", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Didáctica de los Adultos Significativos", UC: 4, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Proyecto Emprendimiento Educativo", UC: 5, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
];
