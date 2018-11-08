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
        [2,['Total (junio-julio)', 
            '(40%) eval("formatNumber.new(Math.round(sum * 0.4), GetUnitMoney())") + 25% Der. Insc.'],
            ['Total: <br> eval("formatNumber.new(Math.round((0.25 * ValueUC) + (sum * 0.4)), GetUnitMoney())")']],
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
        ['Derecho de inscripción (75% ~ Pago Sept)', '<span class="greenM">Est. regular: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">1,25UC</span> </div> </span><br> eval("formatNumber.new((1.25 * ValueUC), GetUnitMoney(),true)")', '<span class="greenM">Est. nuevo: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">2,75UC</span> </div></span> <br> eval("formatNumber.new((2.75 * ValueUC), GetUnitMoney(), true)")'],
        ['Modalidad pago de contado (Sep-Nov): <br> (50% del total)'],
        [2,['Total <br> (Período Sep-Nov) <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">50% del total de UC inscritas. El otro 50% será a nueva UC en diciembre (VER EN CRONOGRAMA)</span></div>',
            '(50%) eval("formatNumber.new((sum * 0.5), GetUnitMoney(), true)") + 75% Der. Insc.'],
        ['<span class="greenM">Total regular:</span> <br> eval("formatNumber.new(((1.25 * ValueUC) + (sum * 0.5)), GetUnitMoney(), true)")',
            '<span class="greenM">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * ValueUC) + (sum * 0.5)), GetUnitMoney(), true)")']],
        ['Modalidad pago financiado (Sep-Nov): <br> (50% del total)'],
        [2,['Septiembre <br> (25%)','(25%) eval("formatNumber.new((sum * 0.25), GetUnitMoney(), true)") + 75% Der. Insc.'],['<span class="greenM">Total regular:</span> <br> eval("formatNumber.new(((1.25 * ValueUC) + (sum * 0.25)), GetUnitMoney(), true)")', '<span class="greenM">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * ValueUC) + (sum * 0.25)), GetUnitMoney(), true)")']],
        [3,['Octubre <br> (12,5%) <div class="tooltip"><i class="fa fa-question-circle"></i> <span class="tooltiptext">Valor de UC varía según las fechas, de acuerdo a lo establecido por el Vice-Rectorado Académico (VER EN CRONOGRAMA)</span> </div>', 
            '<span class="greenM"> 29SEP - 5OCT: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">UC a 299BsS Tarifa-1A (VER EN CRONOGRAMA)</span> </div></span> <br> eval("formatNumber.new(Number(GetMontoTarifa(ValueUC * 1.3) * 0.125), GetUnitMoney(), true)")'],
        ['<span class="greenM">O</span>'],
        ['<span class="greenM"> 6OCT - 10OCT: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">UC a 388,7BsS Tarifa-1B (VER EN CRONOGRAMA)</span> </div> </span> <br> eval("formatNumber.new((GetMontoTarifa(ValueUC * 1.3 * 1.3) * 0.125), GetUnitMoney(), true)")']],
        ['Noviembre <br> (12,5%)','<span class="greenM">Hasta el 10NOV: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">UC a 388,7BsS Tarifa-1B (VER EN CRONOGRAMA)</span> </div>  </span> <br> eval("formatNumber.new((GetMontoTarifa(ValueUC * 1.3 * 1.3) * 0.125), GetUnitMoney(), true)")']
    ],
    '4':[
        3,
        ['Derecho de inscripción (25% ~ Pago Nov)', '<span class="greenM">Estudiantes: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">0,25UC</span> </div> </span><br> eval("formatNumber.new((0.25 * ValueUC), GetUnitMoney())")'],
        ['Modalidad pago de contado (Dic-Ene): <br> (50% restante)'],
        [2,['Total <br> (Período Dic-Ene) <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">50% restantes del UC inscritas(VER EN CRONOGRAMA)</span></div>',
            '(50%) eval("formatNumber.new((sum * 0.5), GetUnitMoney(), true)") + 25% Der. Insc.'],
            ['<span class="greenM">Total: </span> <br> eval("formatNumber.new(Math.round((0.25 * ValueUC) + (sum * 0.5)), GetUnitMoney(), true)")']],
        ['Modalidad pago financiado (Dic-Ene):'],
        [2,['Noviembre / Diciembre (25%)', '(25%) eval("formatNumber.new((sum * 0.25), GetUnitMoney(),true)") + 25% Der. Insc.'],
            ['<span class="greenM">Total (26NOV - 7DIC): </span> <br> eval("formatNumber.new((sum * 0.25) + (0.25 * ValueUC), GetUnitMoney(),true)")']],
        ['Enero (25%) <div class="tooltip"><i class="fa fa-question-circle"></i> <span class="tooltiptext">Valor de UC varía según las fechas(VER EN CRONOGRAMA)</span> </div>', 
            '<span class="greenM"> 8DIC - 14ENE: <div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">UC a 2327BS Tarifa-2A (VER EN CRONOGRAMA)</span> </div></span> <br> eval("formatNumber.new((Number(GetMontoTarifa(ValueUC * 1.30)) * 0.25), GetUnitMoney(), true)")'],
        
    ]
};