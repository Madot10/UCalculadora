/**
 * @file educacion-mencion-ciencias-pedagogicas.js
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
var educacionmencioncienciaspedagogicaspensumnuevo = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sistema Educativo Venezolano", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Psicología General", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica", UC: 3, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Historia General de la Educación", UC: 6, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Sociología General", UC: 6, Tax: "TA‐1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comprensión de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Desarrollo Humano", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Sociología de la Educación", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Políticas Educativas en Venezuela", UC: 6, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Teorías de la Comunicación", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Economía y Educación", UC: 5, Tax: "TA‐2" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐4" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Producción de Textos en Inglés", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías y Modelos del Aprendizaje", UC: 4, Tax: "(SP) TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Manejo de Medios Digitales", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Metodología Didáctica", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Introducción a la Gestión Educativa", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Tecnología Educativa", UC: 5, Tax: "TA‐8" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Métodos de Investigación I", UC: 5, Tax: "TA‐8" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Producción de Medios Digitales", UC: 3, Tax: "(SP) TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Currículum", UC: 5, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Teoría del Cambio Social", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Métodos de Investigación II", UC: 5, Tax: "TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Introducción a la Filosofía", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Administración de Recursos Humanos en Educación", UC: 5, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Administración de Recursos Financieros en Educación", UC: 5, Tax: "TA‐4" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión de Entornos Virtuales (Virtual)", UC: 3, Tax: "(V) TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Planificación Educativa", UC: 5, Tax: "TA‐8" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Comportamiento Organizacional", UC: 6, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Formación Profesional I", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Evaluación de los Aprendizajes", UC: 5, Tax: "TA‐2" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Emprendimiento Social en Educación", UC: 5, Tax: "TA‐8" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Seminario", UC: 2, Tax: "TA‐9" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Asesoramiento", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Filosofía de la Educación", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Evaluación II", UC: 5, Tax: "TA‐2" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Formación Profesional II", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Prácticas Profesionales I", UC: 4, Tax: "TA‐7" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Pedagogía Comparada", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Seminario", UC: 2, Tax: "TA‐9" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Educación de Adultos", UC: 5, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Gerencia de las Organizaciones", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Educación y Productividad", UC: 3, Tax: "TA‐2" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Prácticas Profesionales II", UC: 4, Tax: "TA‐7" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Integración Socio‐Laboral de la Discapacidad", UC: 5, Tax: "TA‐8" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Tópico Especial", UC: 6, Tax: "TA‐2" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética", UC: 3, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gerencia de Proyectos Educativos", UC: 5, Tax: "(SP) TA‐1" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Prácticas Profesionales III", UC: 4, Tax: "TA‐7" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Tópico Especial", UC: 4, Tax: "TA‐2" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Tópico Especial", UC: 4, Tax: "TA‐2" },
];
