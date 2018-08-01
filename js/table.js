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
    ],
    '2':[
        3,
        ['Pago único verano'],
        ['Total (Julio-Agosto) ', '(100%) eval("formatNumber.new(sum, GetUnitMoney())")']
    ],
    '3':[
        3,
        ['Derecho de inscripción (75% ~ Pago Sept)', '<span class="greenM">Est. regular: </span><br> eval("formatNumber.new((1.25 * ValueUC), GetUnitMoney())")', '<span class="greenM">Est. nuevo:</span> <br> eval("formatNumber.new((2.75 * ValueUC), GetUnitMoney())")'],
        ['Modalidad pago de contado (Sep-Nov): <br> (50% del total)'],
        [2,['Total <br> (Período Sep-Nov) <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">50% del total de UC inscriptas. El otro 50% será a nueva UC en diciembre (VER EN CRONOGRAMA)</span></div>',
            '(50%) eval("formatNumber.new((sum * 0.5), GetUnitMoney(), true)") + 75% Der. Insc.'],
        ['<span class="greenM">Total regular:</span> <br> eval("formatNumber.new(((1.25 * ValueUC) + (sum * 0.5)), GetUnitMoney(), true)")',
            '<span class="greenM">Total nuevo:</span> <br> eval("formatNumber.new(Math.round((2.75 * ValueUC) + (sum * 0.5)), GetUnitMoney(), true)")']],
        ['Modalidad pago financiado (Sep-Nov): <br> (50% del total)'],
        [2,['Septiembre (25%)','(25%) eval("formatNumber.new((sum * 0.25), GetUnitMoney(), true)") + 75% Der. Insc.'],['<span class="greenM">Total regular:</span> <br> eval("formatNumber.new(((1.25 * ValueUC) + (sum * 0.25)), GetUnitMoney(), true)")', '<span class="greenM">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * ValueUC) + (sum * 0.25)), GetUnitMoney(), true)")']],
        [3,['Octubre (12,5%) <div class="tooltip"><i class="fa fa-question-circle"></i> <span class="tooltiptext">Valor de UC varía según las fechas, de acuerdo a lo establecido por el Vice-Rectorado Académico (VER EN CRONOGRAMA)</span> </div>', 
            '<span class="greenM"> 29SEP - 5OCT: </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(13000000) * 0.125), GetUnitMoney(), true)")'],
        ['<span class="greenM">O</span>'],
        ['<span class="greenM"> 6OCT - 10OCT: </span> <br> eval("formatNumber.new((GetMontoTarifa(16900000) * 0.125), GetUnitMoney(), true)")']],
        ['Noviembre (12,5%)','<span class="greenM">Hasta el 10NOV:  </span> <br> eval("formatNumber.new((GetMontoTarifa(16900000) * 0.125), GetUnitMoney(), true)")']
        ]
};