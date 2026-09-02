/**
 * @file economia.js
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
var economianuevopensum = [
    { Semestre: "PRIMER SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso I", UC: 3, Tax: "TA‐1" },
    { Semestre: "PRIMER SEMESTRE", Asignatura: "Historia de los Hechos Económicos y Sociales I", UC: 4, Tax: "TA‐5" },
    { Semestre: "PRIMER SEMESTRE", Asignatura: "Matemáticas I", UC: 8, Tax: "TA‐6" },
    { Semestre: "PRIMER SEMESTRE", Asignatura: "Microeconomía I", UC: 7, Tax: "TA‐1" },
    { Semestre: "PRIMER SEMESTRE", Asignatura: "Comprensión Lectora y Redacción", UC: 5, Tax: "TA‐6" },

    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Identidad, Liderazgo y Compromiso II", UC: 3, Tax: "TA‐1" },
    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Estadística I", UC: 5, Tax: "TA‐5" },
    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Historia de los Hechos Económicos y Sociales II", UC: 4, Tax: "TA‐5" },
    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Macroeconomía I", UC: 7, Tax: "TA‐1" },
    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Matemáticas II", UC: 9, Tax: "TA‐5" },
    { Semestre: "SEGUNDO SEMESTRE", Asignatura: "Argumentación y Debates", UC: 4, Tax: "TA‐8" },

    { Semestre: "TERCER SEMESTRE", Asignatura: "Estadística II", UC: 5, Tax: "TA‐5" },
    { Semestre: "TERCER SEMESTRE", Asignatura: "Matemáticas III", UC: 7, Tax: "TA‐5" },
    { Semestre: "TERCER SEMESTRE", Asignatura: "Microeconomía II", UC: 7, Tax: "TA‐1" },
    { Semestre: "TERCER SEMESTRE", Asignatura: "Contabilidad Financiera I", UC: 5, Tax: "TA‐3" },
    { Semestre: "TERCER SEMESTRE", Asignatura: "Macroeconomía II", UC: 6, Tax: "TA‐1" },

    { Semestre: "CUARTO SEMESTRE", Asignatura: "Estadística III", UC: 5, Tax: "TA‐5" },
    { Semestre: "CUARTO SEMESTRE", Asignatura: "Macroeconomía III", UC: 7, Tax: "TA‐1" },
    { Semestre: "CUARTO SEMESTRE", Asignatura: "Matemáticas IV", UC: 5, Tax: "TA‐5" },
    { Semestre: "CUARTO SEMESTRE", Asignatura: "Microeconomía III", UC: 6, Tax: "TA‐1" },
    { Semestre: "CUARTO SEMESTRE", Asignatura: "Ecología, Ambiente y Sustentabilidad", UC: 3, Tax: "TA‐1" },
    { Semestre: "CUARTO SEMESTRE", Asignatura: "Contabilidad Financiera II", UC: 5, Tax: "TA‐3" },

    { Semestre: "QUINTO SEMESTRE", Asignatura: "Moneda y Banca", UC: 5, Tax: "TA‐1" },
    { Semestre: "QUINTO SEMESTRE", Asignatura: "Matemáticas Financieras", UC: 4, Tax: "TA‐4" },
    { Semestre: "QUINTO SEMESTRE", Asignatura: "Econometría I", UC: 5, Tax: "TA‐3" },
    { Semestre: "QUINTO SEMESTRE", Asignatura: "Microeconomía IV", UC: 7, Tax: "TA‐1" },
    { Semestre: "QUINTO SEMESTRE", Asignatura: "Historia del Pensamiento Económico", UC: 5, Tax: "TA‐1" },
    { Semestre: "QUINTO SEMESTRE", Asignatura: "Macroeconomía IV", UC: 6, Tax: "TA‐1" },

    { Semestre: "SEXTO SEMESTRE", Asignatura: "Contabilidad Social", UC: 4, Tax: "TA‐9" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "(Virtual) Contabilidad Social", UC: 4, Tax: "(V) TA‐9" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "Economía Financiera I", UC: 4, Tax: "TA‐3" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "Innovación y Emprendimiento", UC: 3, Tax: "TA‐1" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "Teoría y Política del Comercio Internacional", UC: 5, Tax: "TA‐1" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "Econometría II", UC: 5, Tax: "TA‐3" },
    { Semestre: "SEXTO SEMESTRE", Asignatura: "Legislación Económica I", UC: 5, Tax: "TA‐1" },

    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Economía Financiera II", UC: 4, Tax: "TA‐3" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "(Virtual) Economía Financiera II", UC: 4, Tax: "(V) TA‐3" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Metodología de la Investigación", UC: 4, Tax: "TA‐4" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "(Virtual) Metodología de la Investigación", UC: 4, Tax: "(V) TA‐4" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Finanzas Internacionales", UC: 5, Tax: "TA‐1" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Pensamiento Económico Venezolano", UC: 5, Tax: "TA‐1" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
    { Semestre: "SÉPTIMO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },

    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Seminario Trabajo de Grado", UC: 4, Tax: "TA‐8" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Seminario Trabajo de Grado", UC: 4, Tax: "(V) TA‐8" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Desarrollo Económico", UC: 6, Tax: "TA‐1" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Ética y Economía", UC: 3, Tax: "TA‐1" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Ética y Economía", UC: 3, Tax: "(V) TA‐1" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Economía Política", UC: 5, Tax: "TA‐1" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "(Virtual) Electiva", UC: 4, Tax: "(V) TA‐8" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Electiva", UC: 4, Tax: "TA‐8" },
    { Semestre: "OCTAVO SEMESTRE", Asignatura: "Trabajo de Grado", UC: 5, Tax: "TA‐8" },
];
