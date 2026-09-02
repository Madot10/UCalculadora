/**
 * @file administracion-de-empresas.js
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

//202515 – 202520
var administracióndeempresasviejopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Principios de Marketing", UC: 5, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Matemáticas I", UC: 8, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐5" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica", UC: 4, Tax: "TA‐5" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Contabilidad Financiera", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia Económica Empresarial", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comunicaciones Integradas de Marketing", UC: 4, Tax: "TA‐2" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Microeconomía I", UC: 7, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo", UC: 6, Tax: "TA‐6" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Estadística Aplicada", UC: 5, Tax: "TA‐5" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Análisis de Información Financiera", UC: 5, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Gerencia de Producto", UC: 4, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Macroeconomía I", UC: 7, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Matemáticas Aplicadas", UC: 5, Tax: "TA‐6" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Matemáticas Aplicadas (VIRTUAL)", UC: 5, Tax: "(V) TA‐6" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Investigación Aplicada", UC: 4, Tax: "TA‐6" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías Administrativas de la Organización", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ética Profesional", UC: 3, Tax: "TA‐2" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fundamentos y Sujetos del Derecho del Trabajo", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gerencia para el Sector Público", UC: 3, Tax: "TA‐2" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Trade Marketing", UC: 4, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Legislación Mercantil", UC: 3, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Matemáticas Financieras", UC: 4, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Modelos Organizacionales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gestión del Talento Humano", UC: 4, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Pasantía", UC: 0, UCE: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Responsabilidad Social Empresarial", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Derecho Individual del Trabajo", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gerencia de Costos", UC: 5, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Investigación de Mercados", UC: 5, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Diseño de Sistemas Productivos", UC: 5, Tax: "TA‐8" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mercados e Instituciones Financieras", UC: 4, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Inglés para los Negocios", UC: 3, Tax: "TA‐6" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Comportamiento Organizacional", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión Ambiental", UC: 3, Tax: "TA‐3" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Derecho Fiscal", UC: 3, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gestión de la Calidad", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Neuromarketing", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gestión de Logística", UC: 4, Tax: "TA‐8" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gerencia Financiera", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Informática Aplicada a los Negocios", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Equipos de Alto desempeño", UC: 3, Tax: "TA‐2" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Ética Financiera", UC: 3, Tax: "TA‐6" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Derecho Tributario: Parte Especial", UC: 4, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación Empresarial", UC: 3, Tax: "TA‐6" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Dirección Estratégica de Marketing", UC: 4, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Planificación Presupuestaria", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Finanzas Corporativas", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Gerencia de Proyectos", UC: 3, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Resolución Alternativa de Conflictos", UC: 3, Tax: "TA‐4" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Planificación Estratégica", UC: 4, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Planificación Estratégica", UC: 4, Tax: "(V) TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Emprendimiento", UC: 3, Tax: "(V) TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Control de Gestión", UC: 4, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Control de Gestión", UC: 4, Tax: "(V) TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Liderazgo Organizacional", UC: 3, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Cambios Organizacionales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "(VIRTUAL) Gestión de Cambios Organizacionales", UC: 3, Tax: "(V) TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Trading", UC: 4, Tax: "TA‐6" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Finanzas Internacionales ", UC: 4, Tax: "TA‐3" },
];


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

//202525 – Actual
var administraciondeempresasnuevopensum = [
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Principios de Marketing", UC: 5, Tax: "TA‐1" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Competencia Textual en Español", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Matemáticas I", UC: 5, Tax: "TA‐6" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐5" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Lógica", UC: 4, Tax: "TA‐4" },
	{ Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Microeconomía I", UC: 7, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Cálculo", UC: 6, Tax: "TA‐6" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia Económica Empresarial", UC: 3, Tax: "TA‐1" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Estadística Aplicada", UC: 5, Tax: "TA‐5" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Comunicaciones Integradas de Mercadeo", UC: 4, Tax: "TA‐2" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Contabilidad Financiera", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },

	{ Semestre: "TERCER SEMESTRE", Asignatura: "Macroeconomía I", UC: 7, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Gerencia de Producto", UC: 4, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Análisis de Información Financiera", UC: 5, Tax: "TA‐3" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Métodos Cuantitativos para los Negocios", UC: 5, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Investigación Aplicada", UC: 3, Tax: "TA‐6" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Fundamentos de Programación", UC: 3, Tax: "TA‐9" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Teorías Administrativas de la Organización", UC: 3, Tax: "TA‐1" },
	{ Semestre: "TERCER SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },

	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Legislación Mercantil", UC: 3, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Trade Marketing", UC: 4, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Matemáticas Financieras", UC: 4, Tax: "TA‐4" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Modelos Organizacionales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gerencia para el Sector Público", UC: 3, Tax: "TA‐2" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Gestión del Talento Humano", UC: 4, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fintech", UC: 4, Tax: "TA‐9" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Ética Profesional", UC: 3, Tax: "TA‐2" },
	{ Semestre: "CUARTO SEMESTRE", Asignatura: "Fundamentos y Sujetos del Derecho del Trabajo", UC: 3, Tax: "TA‐1" },

	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Métodos de Investigación de Mercados", UC: 5, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gerencia de Costos", UC: 7, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Mercados e Instituciones Financieras", UC: 4, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Procesos Productivos", UC: 5, Tax: "TA‐4" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Comportamiento Organizacional", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Análisis de Datos", UC: 4, Tax: "TA‐9" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Derecho Individual del Trabajo", UC: 3, Tax: "TA‐1" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Gestión Ambiental", UC: 3, Tax: "TA‐3" },
	{ Semestre: "QUINTO SEMESTRE", Asignatura: "Comportamiento Empresarial Responsable", UC: 3, Tax: "TA‐1" },

	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Derecho Tributario: Parte General", UC: 4, Tax: "TA‐1" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gestión Integral de la Calidad", UC: 4, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Gerencia Financiera", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Inteligencia de Negocios", UC: 3, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Neuromarketing", UC: 4, Tax: "TA‐9" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Equipos de Alto desempeño", UC: 3, Tax: "TA‐2" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Aplicaciones de la Inteligencia Artificial (IA)", UC: 4, Tax: "TA‐4" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Ética Financiera", UC: 3, Tax: "TA‐6" },
	{ Semestre: "SEXTO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐9" },

	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Tributos Nacionales y Municipales", UC: 4, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Planificación Presupuestaria", UC: 5, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Finanzas Corporativas", UC: 5, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Cadenas de Suministros Inteligentes", UC: 4, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Gerencia de Proyectos", UC: 3, Tax: "TA‐3" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Innovación Empresarial", UC: 3, Tax: "TA‐6" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Resolución Alternativas de Conflicto", UC: 3, Tax: "TA‐4" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Dirección Estratégica de Marketing", UC: 4, Tax: "TA‐1" },
	{ Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐9" },

	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Planificación Estratégica", UC: 4, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Emprendimiento", UC: 3, Tax: "TA‐8" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Finanzas Internacionales", UC: 4, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Control de Gestión", UC: 4, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Gestión de Cambios Organizacionales", UC: 3, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Liderazgo Organizacional", UC: 3, Tax: "TA‐3" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Trading", UC: 4, Tax: "TA‐6" },
	{ Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐9" },
];
