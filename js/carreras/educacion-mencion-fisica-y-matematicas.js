/**
 * @file educacion-mencion-fisica-y-matematicas.js
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
var educacionmencionfisicaymatematicasnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Geometría Plana y Trigonometría", UC: 5, Tax: "TA‐4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Introducción al Cálculo", UC: 5, Tax: "TA‐4" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cinemática", UC: 6, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Laboratorio de Cinemática", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo Diferencial", UC: 5, Tax: "TA‐4" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Cálculo Integral", UC: 5, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Dinámica", UC: 6, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Laboratorio de Dinámica", UC: 3, Tax: "TA‐9" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Calor y Fluidos", UC: 6, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Laboratorio de Calor y Fluidos", UC: 3, Tax: "TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Geometría Métrica en el Plano y en el Espacio", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Cálculo Varias Variables", UC: 5, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Álgebra Lineal", UC: 4, Tax: "TA‐4" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Práctica Profesional: Didáctica Matemática", UC: 6, Tax: "TA‐7" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Electricidad", UC: 6, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Laboratorio de Electricidad", UC: 3, Tax: "TA‐9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Ecuaciones Diferenciales", UC: 5, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Álgebra Abstracta", UC: 4, Tax: "TA‐3" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 7, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Practica Profesional: Didáctica Física", UC: 6, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Magnetismo", UC: 6, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Laboratorio de Magnetismo", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Variable Compleja", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario Enseñanza de la Geometría", UC: 4, Tax: "TA‐9" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Investigación Educativa I", UC: 5, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas de Ambientes No Convencionales", UC: 3, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Métodos Estadísticos", UC: 6, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ondas, Luz y Óptica", UC: 6, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Laboratorio de Ondas, Luz y Óptica", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Seminario Enseñanza de la Física", UC: 4, Tax: "TA‐9" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Investigación Educativa II", UC: 5, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Instituciones Educativas", UC: 4.2, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Física Moderna", UC: 6, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Laboratorio de Física Moderna", UC: 3, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 3, Tax: "TA‐9" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Historia de las Ciencias Físicas y Matemáticas", UC: 5, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario Enseñanza de la Estadística", UC: 4, Tax: "TA‐9" },
];
