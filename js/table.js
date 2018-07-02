//Object con modelos de tablas a usar\
//GUIA
// HTML HABILITADO
//No debe haber mas ) despues del eval
/*      4, //INDICA NUMERO DE COLUMNAS
        ['Tabla prueba 2'],
        //ROW[celda,celda]
        ['Total','BS: STO*0.50'],
        [2,['Total Periodo','60% + 75%'],['Dual', 'Duales']], // FILA MIXTA
        ['Fin tabla'] */

var tables = {
    '0':[
        3,
        ['Derecho de inscripción (75% ~ Pago marzo)', 'Est. regular: <br> eval("formatNumber.new(Math.round(1.25 * ValueUC), GetUnitMoney())")', 'Est. nuevo: <br> eval("formatNumber.new(Math.round(2.75 * ValueUC), GetUnitMoney())")'],
        ['Modalidad pago completo (marzo-mayo):'],
        [2,['Total (Período marzo-mayo)','(60%) eval("formatNumber.new(Math.round(sum * 0.6), GetUnitMoney())") + 75% Der. Insc.'],['Total regular: <br> eval("formatNumber.new(Math.round((1.25 * ValueUC) + (sum * 0.6)), GetUnitMoney())")','Total nuevo: <br> eval("formatNumber.new(Math.round((2.75 * ValueUC) + (sum * 0.6)), GetUnitMoney())")']],
        ['Modalidad pago financiado (marzo-mayo):'],
        [2,['Marzo','(30%) eval("formatNumber.new(Math.round(sum * 0.3), GetUnitMoney())") + 75% Der. Insc.'],['Total regular: <br> eval("formatNumber.new(Math.round((1.25 * ValueUC) + (sum * 0.3)), GetUnitMoney())")', 'Total nuevo: <br> eval("formatNumber.new(Math.round((2.75 * ValueUC) + (sum * 0.3)), GetUnitMoney())")']],
        ['Abril','(15%) eval("formatNumber.new(Math.round(sum * 0.15), GetUnitMoney())")'],
        ['Mayo','(15%) eval("formatNumber.new(Math.round(sum * 0.15), GetUnitMoney())")']
    ],
    '1':[
        3,
        ['Derecho de inscripción (25% ~ Pago mayo)', 'Estudiantes: <br> eval("formatNumber.new(Math.round(0.25 * ValueUC), GetUnitMoney())")'],
        ['Modalidad pago completo (Junio-Julio):'],
        [2,['Total (junio-julio)', '(40%) eval("formatNumber.new(Math.round(sum * 0.4), GetUnitMoney())") + 25% Der. Insc.'],['Total: <br> eval("formatNumber.new(Math.round((0.25 * ValueUC) + (sum * 0.4)), GetUnitMoney())")']],
        ['Modalidad pago financiado (junio-julio):'],
        ['Mayo','*Derecho de inscripción*'],
        ['Junio','(20%) eval("formatNumber.new(Math.round(sum * 0.20), GetUnitMoney())")'],
        ['Julio','(20%) eval("formatNumber.new(Math.round(sum * 0.20), GetUnitMoney())")']
    ]
};