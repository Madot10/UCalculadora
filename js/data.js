let perioact = 2019191;

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
            ['04/4/19', 100],
            ['04/12/19', 50],
            ['5/1/19', 75],
            ['5/15/19', 50]
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
        ['Abril <i class="fas fa-question-circle" onclick="modalInfoOpen(`1ero de abril ${genMsgUc(`4/1/19`)}. <br> A partir del 4 de abril ${genMsgUc(`4/4/19`)}`)"></i><br> (12,5%)', 
            '<span class="ugreen">Desde 1ero Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/1/19`) * 0.125), `Bs.S `, true)")',
            '<span class="ugreen">Desde 4 de Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/4/19`) * 0.125), `Bs.S `, true)")'],
        ['Mayo <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`5/1/19`))"></i><br> (12,5%)',
            'eval("formatNumber.new((GetMontoTarifa(`5/1/19`) * 0.125), `Bs.S `, true)")']
    
    ]
}