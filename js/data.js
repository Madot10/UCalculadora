let perioact = 2019202;

//periodo guia
// 2018191 inicia en 2018 y termina en 2019 primera mitad
// 2018192
// 119 intensivo 1 en 2019
// 219
// 2019191 inicia en 2019 y termina en 2019
let periodo = {
    2018191:{
        'base': 230.0,
        'variacion':[
            ['9/29/18', 30],
            ['10/6/18', 30], /* Porcentaje de aumento */
            ['11/15/18', 50]     
        ]
    },
    2018192:{
        'base': 1790.0,
        'variacion':[
            ['12/8/18', 50],
            ['1/15/19', 50]
        ]
    },
    119:{
        'base': 12082.5
    },
    2019191:{
        'base': 50000,
        'variacion':[
            ['04/9/19', 100],
            ['04/12/19', 50],
            ['5/9/19', 75],
            ['5/15/19', 50]
        ]
    },
    2019192: {
        'base': 200000,
        'variacion':[
            ['6/12/19', 31.25]
        ]
    },
    219:{
        'base': 393750
    },
    2019201:{
        'base':483840,
        'variacion':[
            ['9/26/19', 27.99995866402116],
            ['1/7/20', 27.9999677062561]
        ]
    },
    2019202:{
        'base': 619315,
        'variacion':[
            ['1/7/20', 27.9999677062561]
        ]
    }
};

let tables = {
    2018191: [
        3,
        ['Derecho de inscripción <br> (75% ~ Pago Sept)', '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")', '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")'],
        ['Modalidad pago de contado (Sep-Nov): <br> (50% del total)'],
        ['Total <br> (Período Sep-Nov)',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado (Sep-Nov): <br> (50% del total)'],
        ['Septiembre <br> (25%)',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")', 
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")'],
        [3,['Octubre <br> (12,5%)', 
            '<span class="ugreen"> 29SEP - 5OCT: </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`9/29/18`) * 0.125), `Bs.S `, true)")'],
        ['<span class="ugreen">O</span>'],
        ['<span class="ugreen"> 6OCT - 10OCT:  </span> <br> eval("formatNumber.new((GetMontoTarifa(`10/06/2018`) * 0.125), `Bs.S `, true)")']],
        ['Noviembre <br> (12,5%)','<span class="ugreen">Hasta el 10NOV: </span> <br> eval("formatNumber.new((GetMontoTarifa(`11/10/2018`) * 0.125), `Bs.S `, true)")']
    ],
    2018192: [
        3,
        ['Derecho de inscripción <br> (25% ~ Pago Nov)', '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")'],
        ['Modalidad pago de contado (Dic-Ene): <br> (50% restante)'],
        ['Total <br> (Período Dic-Ene)',
            '<span class="ugreen">Total: </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado (Dic-Ene):'],
        ['Noviembre / Diciembre (25%)', '<span class="ugreen">Total <br> (26NOV - 7DIC): </span> <br> eval("formatNumber.new((totalbs * 0.25) + (0.25 * valorUC), `Bs.S `,true)")'],
        ['Enero (25%)', 
            '<span class="ugreen"> 8DIC - 14ENE: </span> <br> eval("formatNumber.new((Number(GetMontoTarifa(`12/09/2018`)) * 0.25), `Bs.S `, true)")']
        
    ],
    119: [
        3,
        ['Pago único verano'],
        ['Total (Febrero-Marzo) ', '(100%) eval(" formatNumber.new(totalbs, `Bs.S `) ")']
    ],
    2019191:[
        3,
        ['Derecho de inscripción <br> (75% ~ Pago Marzo) <i class="fas fa-question-circle" onclick="modalInfoOpen(`1.25 UC - Estudiantes regulares <br> 2.75 UC - Estudiantes nuevos`)"></i>', 
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")', 
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")'],
        ['Modalidad pago de contado (Marzo-Mayo): <br> (50% del total)'],
        ['Total <br> (Período Marzo-Mayo)',
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado (Marzo-Mayo): <br> (50% del total)'],
        ['Marzo <br> (25%)',
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")', 
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")'],
        ['Abril <i class="fas fa-question-circle" onclick="modalInfoOpen(`1ero de abril ${genMsgUc(`4/1/19`)}. <br> A partir del 9 de abril ${genMsgUc(`4/9/19`)}`)"></i><br> (12,5%)', 
            '<span class="ugreen">Desde 1 de Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/4/19`) * 0.125), `Bs.S `, true)")',
            '<span class="ugreen">Desde 9 de Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/9/19`) * 0.125), `Bs.S `, true)")'],
        ['Mayo <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`5/1/19`))"></i><br> (12,5%)',
            'eval("formatNumber.new((GetMontoTarifa(`5/1/19`) * 0.125), `Bs.S `, true)")']
    
    ],
    2019192: [
        3,
        ['Derecho de inscripción <br> (25% ~ Pago Junio)', '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")'],
        ['Modalidad pago de contado (Jun-Jul): <br> (50% restante)'],
        ['Total <br> (Período Junio-Julio)',
            '<span class="ugreen">Total (+DI): </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado <br> (50% restante) '],
        ['Junio (25%)', '<span class="ugreen">Desde 27 de Mayo (+DI): </span> <br> eval("formatNumber.new((totalbs * 0.25) + (0.25 * valorUC), `Bs.S `,true)")',
        '<span class="ugreen">Desde 12 de Junio (+DI): <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`7/1/19`))"></i> </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`6/7/19`) * 0.25) + (0.25 * valorUC), `Bs.S `, true)")'],
        ['Julio (25%) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`7/1/19`))"></i>', 'eval("formatNumber.new((Number(GetMontoTarifa(`07/01/2019`)) * 0.25), `Bs.S `, true)")']
        
    ],
    219: [
        3,
        ['Pago único verano'],
        ['Total (Julio-Agosto) ', '(100%) eval(" formatNumber.new(totalbs, `Bs.S `) ")']
    ],
    2019201:[
        3,
        ['Derecho de inscripción <br> (75% ~ Pago Sept)', '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")', '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")'],
        ['Modalidad pago de contado (Sep-Nov): <br> (50% del total)'],
        ['Total <br> (Período Sep-Nov)',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado (Sep-Nov): <br> (50% del total)'],
        ['Septiembre <br> (25%)',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")', 
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")'],
        ['Octubre <br> (12,5%)', 
            '<span class="ugreen">Desde el 1 Oct*: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`10/1/19`))"></i> </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`10/1/19`) * 0.125), `Bs.S `, true)")'],
        ['Noviembre <br> (12,5%)',
            '<span class="ugreen">Desde el 1 Nov*: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`11/1/19`))"></i></span> <br> eval("formatNumber.new((GetMontoTarifa(`11/1/2019`) * 0.125), `Bs.S `, true)")']
    
    ],
    2019202: [
        3,
        ['*CRONOGRAMA DE FECHAS NO ANUNCIADO'],
        ['Derecho de inscripción <br> (25% ~ Pago Nov)', '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")'],
        ['Modalidad pago de contado (Dic-Ene): <br> (50% restante)'],
        ['Total <br> (Período Dic-Ene)',
            '<span class="ugreen">Total (+DI): </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")'],
        ['Modalidad pago financiado <br> (50% restante) '],
       ['Noviembre / Diciembre (25%)', '<span class="ugreen">Total (+DI)*: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`11/1/19`))"></i> </span></span>  <br> eval("formatNumber.new((GetMontoTarifa(`11/1/19`) * 0.25) + (0.25 * valorUC), `Bs.S `,true)")'],
        ['Enero (25%)', 
            '<span class="ugreen"> <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`1/7/20`))"></i> </span> eval("formatNumber.new((Number(GetMontoTarifa(`1/7/20`)) * 0.25), `Bs.S `, true)")']
    ],
}
