/**
 * @file educacion-mencion-biologia-y-quimica.js
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
var educacionmencionbiologiayquimicanuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Principios de Biología", UC: 4, Tax: "TA‐4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Química General I", UC: 6, Tax: "TA‐4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Introducción al Cálculo", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Química General II", UC: 6, Tax: "TA‐4" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo", UC: 5, Tax: "TA‐4" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Química General III", UC: 6, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Genética", UC: 5, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Física General", UC: 5, Tax: "TA‐4" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Biología Animal", UC: 7, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Anatomía y Fisiologia Humana", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Química Inorgánica", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Química Orgánica", UC: 5, Tax: "TA‐4" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Practica profesional: Didáctica de la Química", UC: 5, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Laboratorio de Química Orgánica", UC: 4, Tax: "TA‐9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Fisicoquímica", UC: 5, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Biologia Vegetal", UC: 6, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Fisiología animal", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Practica Profesional: Didáctica de la Biología", UC: 5, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Laboratorio de Fisicoquímica", UC: 4, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Bioquímica", UC: 6, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Fisiología Vegetal", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Topico especial", UC: 2, Tax: "TA‐4" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación I: Proyecto", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Tópico Especial", UC: 2, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Microbiología", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Genética Molecular", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Evolución", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Biología Celular", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación II: Trabajo de Grado", UC: 8, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ecología", UC: 5, Tax: "TA‐4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Inmunología", UC: 4, Tax: "TA‐4" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Química Analítica e Instrumental", UC: 4, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
];
