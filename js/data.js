let perioact = 0;

//periodo guia
// 2018191 inicia en 2018 y termina en 2019 primera mitad
// 2018192
// 119 intensivo 1 en 2019
// 219
// 2019191 inicia en 2019 y termina en 2019
let periodo = {
    2018191: {
        base: 130.0,
        variacion: [
            ["9/29/18", 30],
            ["10/6/18", 30] /* Porcentaje de aumento */,
            ["11/15/18", 50],
        ],
    },
    2018192: {
        base: 1790.0,
        variacion: [
            ["12/8/18", 50],
            ["1/15/19", 50],
        ],
    },
    119: {
        base: 12082.5,
    },
    2019191: {
        base: 50000,
        variacion: [
            ["04/9/19", 100],
            ["04/12/19", 50],
            ["5/9/19", 75],
            ["5/15/19", 50],
        ],
    },
    2019192: {
        base: 200000,
        variacion: [["6/12/19", 31.25]],
    },
    219: {
        base: 393750,
    },
    2019201: {
        base: 483840,
        variacion: [
            ["9/26/19", 27.99995866402116],
            ["1/7/20", 27.9999677062561],
        ],
    },
    2019202: {
        base: 619315,
        variacion: [["1/7/20", 27.9999677062561]],
    },
    120: {
        base: 1600000,
    },
    2020201: {
        base: 400000,
        variacion: [
            ["05/9/2020", 30],
            ["05/29/2020", 35],
        ],
    },
    2020202: {
        base: 947700,
        variacion: [["08/11/2020", 35]],
    },
    220: {
        base: 1920000,
    },
    2020211: {
        base: 2304000,
        variacion: [
            ["10/17/2020", 35],
            ["11/09/2020", 44.9974279835391],
        ],
    },
    2020212: {
        base: 8840000,
        variacion: [["02/01/2021", 35]],
    },
    121: {
        base: 12,
    },
    2021211: {
        base: 10,
    },
};
/*
let tables = {
    2018191: [
        3,
        [
            "Derecho de inscripción <br> (75% ~ Pago Sept)",
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")',
        ],
        ["Modalidad pago de contado (Sep-Nov): <br> (50% del total)"],
        [
            "Total <br> (Período Sep-Nov)",
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado (Sep-Nov): <br> (50% del total)"],
        [
            "Septiembre <br> (25%)",
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
        ],
        [
            3,
            [
                "Octubre <br> (12,5%)",
                '<span class="ugreen"> 29SEP - 5OCT: </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`9/29/18`) * 0.125), `Bs.S `, true)")',
            ],
            ['<span class="ugreen">O</span>'],
            [
                '<span class="ugreen"> 6OCT - 10OCT:  </span> <br> eval("formatNumber.new((GetMontoTarifa(`10/06/2018`) * 0.125), `Bs.S `, true)")',
            ],
        ],
        [
            "Noviembre <br> (12,5%)",
            '<span class="ugreen">Hasta el 10NOV: </span> <br> eval("formatNumber.new((GetMontoTarifa(`11/10/2018`) * 0.125), `Bs.S `, true)")',
        ],
    ],
    2018192: [
        3,
        [
            "Derecho de inscripción <br> (25% ~ Pago Nov)",
            '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")',
        ],
        ["Modalidad pago de contado (Dic-Ene): <br> (50% restante)"],
        [
            "Total <br> (Período Dic-Ene)",
            '<span class="ugreen">Total: </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado (Dic-Ene):"],
        [
            "Noviembre / Diciembre (25%)",
            '<span class="ugreen">Total <br> (26NOV - 7DIC): </span> <br> eval("formatNumber.new((totalbs * 0.25) + (0.25 * valorUC), `Bs.S `,true)")',
        ],
        [
            "Enero (25%)",
            '<span class="ugreen"> 8DIC - 14ENE: </span> <br> eval("formatNumber.new((Number(GetMontoTarifa(`12/09/2018`)) * 0.25), `Bs.S `, true)")',
        ],
    ],
    119: [
        3,
        ["Pago único verano"],
        ["Total (Febrero-Marzo) ", '(100%) eval(" formatNumber.new(totalbs, `Bs.S `) ")'],
    ],
    2019191: [
        3,
        [
            'Derecho de inscripción <br> (75% ~ Pago Marzo) <i class="fas fa-question-circle" onclick="modalInfoOpen(`1.25 UC - Estudiantes regulares <br> 2.75 UC - Estudiantes nuevos`)"></i>',
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")',
        ],
        ["Modalidad pago de contado (Marzo-Mayo): <br> (50% del total)"],
        [
            "Total <br> (Período Marzo-Mayo)",
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado (Marzo-Mayo): <br> (50% del total)"],
        [
            "Marzo <br> (25%)",
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
        ],
        [
            'Abril <i class="fas fa-question-circle" onclick="modalInfoOpen(`1ero de abril ${genMsgUc(`4/1/19`)}. <br> A partir del 9 de abril ${genMsgUc(`4/9/19`)}`)"></i><br> (12,5%)',
            '<span class="ugreen">Desde 1 de Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/4/19`) * 0.125), `Bs.S `, true)")',
            '<span class="ugreen">Desde 9 de Abril</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`4/9/19`) * 0.125), `Bs.S `, true)")',
        ],
        [
            'Mayo <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`5/1/19`))"></i><br> (12,5%)',
            'eval("formatNumber.new((GetMontoTarifa(`5/1/19`) * 0.125), `Bs.S `, true)")',
        ],
    ],
    2019192: [
        3,
        [
            "Derecho de inscripción <br> (25% ~ Pago Junio)",
            '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")',
        ],
        ["Modalidad pago de contado (Jun-Jul): <br> (50% restante)"],
        [
            "Total <br> (Período Junio-Julio)",
            '<span class="ugreen">Total (+DI): </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado <br> (50% restante) "],
        [
            "Junio (25%)",
            '<span class="ugreen">Desde 27 de Mayo (+DI): </span> <br> eval("formatNumber.new((totalbs * 0.25) + (0.25 * valorUC), `Bs.S `,true)")',
            '<span class="ugreen">Desde 12 de Junio (+DI): <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(`7/1/19`))"></i> </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(`6/12/19`) * 0.25) + (0.25 * valorUC), `Bs.S `, true)")',
        ],
        [
            'Julio (25%) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,7)))"></i>',
            'eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(1,7))) * 0.25), `Bs.S `, true)")',
        ],
    ],
    219: [
        3,
        ["Pago único verano"],
        ["Total (Julio-Agosto) ", '(100%) eval(" formatNumber.new(totalbs, `Bs.S `) ")'],
    ],
    2019201: [
        3,
        [
            "Derecho de inscripción <br> (75% ~ Pago Sept)",
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((1.25 * valorUC), `Bs.S `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((2.75 * valorUC), `Bs.S `, true)")',
        ],
        ["Modalidad pago de contado (Sep-Nov): <br> (50% del total)"],
        [
            "Total <br> (Período Sep-Nov)",
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado (Sep-Nov): <br> (50% del total)"],
        [
            "Septiembre <br> (25%)",
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((1.25 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.75 * valorUC) + (totalbs * 0.25)), `Bs.S `, true)")',
        ],
        [
            "Octubre <br> (12,5%)",
            '<span class="ugreen">Desde el 1 Oct: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,10)))"></i> </span> <br> eval("formatNumber.new(Number(GetMontoTarifa(getFechaAnoActual(1,10)) * 0.125), `Bs.S `, true)")',
        ],
        [
            "Noviembre <br> (12,5%)",
            '<span class="ugreen">Desde el 1 Nov: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,11)))"></i></span> <br> eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(1,11)) * 0.125), `Bs.S `, true)")',
        ],
    ],
    2019202: [
        3,
        [
            "Derecho de inscripción <br> (25% ~ Pago Nov)",
            '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((0.25 * valorUC), `Bs.S `)")',
        ],
        ["Modalidad pago de contado (Dic-Ene): <br> (50% restante)"],
        [
            "Total <br> (Período Dic-Ene)",
            '<span class="ugreen">Total (+DI): </span> <br> eval("formatNumber.new(Math.round((0.25 * valorUC) + (totalbs * 0.5)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado <br> (50% restante) "],
        [
            "Diciembre (25%)",
            '<span class="ugreen">Total (+DI)*: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,11)))"></i> </span></span>  <br> eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(1,11)) * 0.25) + (0.25 * valorUC), `Bs.S `,true)")',
        ],
        [
            "Enero (25%)",
            '<span class="ugreen"> Desde 1 de Enero: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,1)))"></i> </span> <br> eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(1,1))) * 0.25), `Bs.S `, true)")',
            '<span class="ugreen"> Desde 7 de Enero: <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(7,1)))"></i> </span> <br> eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(7,1))) * 0.25), `Bs.S `, true)")',
        ],
    ],
    120: [
        3,
        ["Pago único verano"],
        ["Total (Febrero-Marzo) ", '(100%) eval(" formatNumber.new(totalbs, `Bs.S `) ")'],
    ],
};
*/

let templateTabla = {
    "1erMinor": [
        3,
        ["MINOR - Modalidad pago de contado <br> (1era Parte)"],
        ["SOLO SE PAGA MINORS DE CONTADO"],
        ["SubTotal <br> (Minor)", 'eval(" formatNumber.new((totalbsMinor * 3), `Bs.S `) ")'],
    ],
    "2doMinor": [
        3,
        ["MINOR - Modalidad pago de contado <br> (2da Parte)"],
        ["Total", 'eval(" formatNumber.new((totalbsMinor * 2), `Bs.S `) ")'],
    ],
    verMinor: [
        3,
        ["MINOR - Pago único"],
        ["Total <br> (100%)", 'eval(" formatNumber.new(totalbsMinor, `Bs.S `) ")'],
    ],
    "1erPar": [
        3,
        ["Tasa del BCV"],
        ["TASA <br> USD", 'eval("formatNumber.new(valorBCV, `Bs.S. `, true)")'],
        ["Derecho de inscripción"],
        [
            'Derecho de inscripción <i class="fas fa-question-circle" onclick="modalInfoOpen(`5 UC - Estudiantes regulares <br> 7.5 UC - Estudiantes nuevos`)"></i>',
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((5 * valorUC), `USD `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((7.5 * valorUC), `USD `, true)")',
        ],
        [
            "Derecho de inscripción <br> Bs.S.",
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new(((5 * valorUC) * valorBCV), `Bs.S `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new(((7.5 * valorUC) * valorBCV), `Bs.S `, true)")',
        ],
        ["Modalidad pago de TOTAL (5 meses) "],
        [
            'Total (+DI) <i class="fas fa-question-circle" onclick="modalInfoOpen(`Aplica un descuento del 7%`)"></i>',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((5 * valorUC) + (totalbs * 5 * 0.93)) , `USD `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((7.5 * valorUC) + (totalbs * 5 * 0.93)) , `USD `, true)")',
        ],
        [
            'Total regular (+DI) <i class="fas fa-question-circle" onclick="modalInfoOpen(`Valor en Bs.S al día de hoy`)"></i> <br/> Bs.S.',
            'eval("formatNumber.new((((5 * valorUC) + (totalbs * 5 * 0.93)) * valorBCV) , `Bs.S `, true)")',
        ],
        [
            'Total nuevo (+DI) <i class="fas fa-question-circle" onclick="modalInfoOpen(`Valor en Bs.S al día de hoy`)"></i> <br/> Bs.S.',
            'eval("formatNumber.new((((7.5 * valorUC) + (totalbs * 5 * 0.93)) * valorBCV) , `Bs.S `, true)")',
        ],
        ["Modalidad pago PARCIAL (Abr-Jun) "],
        [
            'Total (+DI) <i class="fas fa-question-circle" onclick="modalInfoOpen(`Aplica un descuento del 5%`)"></i> <br> (Período Abr-Jun*)',
            '<span class="ugreen">Total regular:</span> <br> eval("formatNumber.new(((5 * valorUC) + (totalbs * 3 * 0.95)) , `USD `, true)")',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((7.5 * valorUC) + (totalbs * 3 * 0.95)) , `USD `, true)")',
        ],
        [
            '<span class="ugreen"> Total regular(+DI)* <br> Bs.S. </span>',
            'eval("formatNumber.new((((5 * valorUC) + (totalbs * 3 * 0.95)) * valorBCV) , `Bs.S `, true)")',
        ],
        [
            '<span class="ugreen"> Total nuevo(+DI)*  <br> Bs.S.  </span>',
            'eval("formatNumber.new((((7.5 * valorUC) + (totalbs * 3 * 0.95)) * valorBCV) , `Bs.S `, true)")',
        ],
        [
            'Estimado 2da parte (+DI) <i class="fas fa-question-circle" onclick="modalInfoOpen(`Aplica un descuento del 5%`)"></i> <br> (Período Jul-Ago**)',
            '<span class="ugreen">Total nuevo:</span> <br> eval("formatNumber.new(((2.5 * valorUC) + (totalbs * 2 * 0.95)) , `USD `, true)")',
        ],
        ["Modalidad pago FINANCIADO (Abr-Jun) "],
        ["Abril <br> (1er Mes)", 'eval("formatNumber.new(((totalbs * 1)), `USD `, true)")'],
        [
            '<span class="ugreen">Total <br> Abril</span>',
            'eval("formatNumber.new((((totalbs * 1)) * valorBCV), `Bs.S `, true)")',
        ],
        [
            'Mayo <br> (2do Mes) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(11,5)))"></i>',
            '<span class="ugreen">Desde 2do Mes:</span> <br> eval("formatNumber.new(Number(GetMontoTarifa(getFechaAnoActual(11,5))), `USD `, true)")',
        ],
        [
            'Junio <br> (3er Mes) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,6)))"></i>',
            '<span class="ugreen">Desde 3er Mes:</span> <br>eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(1,6))), `USD `, true)")',
        ],
        [
            'Julio** <br> (4to Mes - 2da parte) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,7)))"></i>',
            'eval("formatNumber.new((2.5 * valorUC) + (GetMontoTarifa(getFechaAnoActual(1,7))*1), `USD `, true)")',
        ],
        [
            'Agosto** <br> (5to Mes - 2da parte) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,8)))"></i>',
            'eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(1,8))), `USD `, true)")',
        ],
    ],
    "2doPar": [
        3,
        ["*CRONOGRAMA MODIFICADO"],
        [
            "Derecho de inscripción <br> (25% ~ Pago Julio)",
            '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((2.5 * valorUC), `Bs.S `)")',
        ],
        ["Modalidad pago de contado (Jul-Ago): "],
        ["29 de junio hasta el 13 de julio"],
        [
            "Total <br> (Período Julio-Agosto)",
            '<span class="ugreen">Total (+DI): </span> <br> eval("formatNumber.new(Math.round((2.5 * valorUC) + (totalbs * 2)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado <br> (50% restante) "],
        [
            'Junio/Julio (4to Mes) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,6)))"></i>',
            '<span class="ugreen">Desde 29 de Junio (+DI): <br> </span> eval("formatNumber.new(Number(GetMontoTarifa(getFechaAnoActual(1,6)) * 1) + (2.5 * valorUC), `Bs.S `, true)")',
        ],
        [
            "Agosto (5to Mes)",
            '<span class="ugreen">Desde 1 de Agosto <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,8)))"></i>:</span> <br> eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(1,8))) *1), `Bs.S `, true)")',
            '<span class="ugreen">Desde 11 de Agosto <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(11,8)))"></i>:</span> <br> eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(11,8))) *1), `Bs.S `, true)")',
        ],
    ],
    ver: [
        3,
        ["Tasa del BCV"],
        ["TASA <br> USD", 'eval("formatNumber.new(valorBCV, `Bs.S. `, true)")'],
        ["Pago único verano"],
        ["*APLICA UC SEMESTRAL (UC mensual x5) <br/> 12,00 USD"],
        ["Total", '(100%) eval(" formatNumber.new(totalbs * 5, `USD `) ")'],
        ["Total <br> Bs.S", '(100%) eval(" formatNumber.new((totalbs * 5) * valorBCV, `Bs.S `) ")'],
    ],
    "1erImpar": [
        3,
        [
            "Derecho de inscripción <br> (Pago Sept/Oct)",
            '<span class="ugreen">Est. regular: </span><br> eval("formatNumber.new((5 * valorUC), `Bs.S `,true)")',
            '<span class="ugreen">Est. nuevo: </span> <br> eval("formatNumber.new((7.5 * valorUC), `Bs.S `, true)")',
        ],
        ["Modalidad pago de contado (Sep-Dic):"],
        [
            "Total <br> (Período Sep-Dic)",
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((5 * valorUC) + (totalbs * 3)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((7.5 * valorUC) + (totalbs * 3)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado (Sep-Dic):"],
        [
            "Septiembre / Octubre",
            '<span class="ugreen">Total regular (+DI):</span> <br> eval("formatNumber.new(((5 * valorUC) + (totalbs * 1)), `Bs.S `, true)")',
            '<span class="ugreen">Total nuevo (+DI):</span> <br> eval("formatNumber.new(((7.5 * valorUC) + (totalbs * 1)), `Bs.S `, true)")',
        ],
        [
            'Noviembre <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,11)))"></i>',
            '<span class="ugreen">Desde el 1 Nov: </span>  <br> eval("formatNumber.new(Number(GetMontoTarifa(getFechaAnoActual(1,11))), `Bs.S `, true)")',
        ],
        [
            'Diciembre <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(10,12)))"></i>',
            '<span class="ugreen">Desde el 1 Dic: </span> <br> eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(10,12))), `Bs.S `, true)")',
        ],
    ],
    "2doImpar": [
        3,
        [
            "Derecho de inscripción <br> (25% ~ Pago Ene)",
            '<span class="ugreen">Estudiantes:</span> <br> eval("formatNumber.new((2.5 * valorUC), `Bs.S `)")',
        ],
        ["Modalidad pago de contado (Ene-Feb): <br> (50% restante)"],
        [
            "Total <br> (Período Ene-Feb)",
            '<span class="ugreen">Total (+DI)*: </span> <br> eval("formatNumber.new(Math.round((2.5 * valorUC) + (totalbs * 2)), `Bs.S `, true)")',
        ],
        ["Modalidad pago financiado <br> (50% restante) "],
        [
            'Enero (25%) <i class="fas fa-question-circle" onclick="modalInfoOpen(genMsgUc(getFechaAnoActual(1,1)))"></i>',
            '<span class="ugreen">Total (+DI)*:  </span> <br> eval("formatNumber.new((GetMontoTarifa(getFechaAnoActual(1,1)) * 1) + (2.5 * valorUC), `Bs.S `,true)")',
        ],
        [
            'Febrero (25%) <i class="fas fa-question-circle" onclick="modalInfoOpen(`1er Feb ${genMsgUc(getFechaAnoActual(1,2))}`)"></i>',
            '<span class="ugreen"> Desde 1 de Febrero:  </span> <br> eval("formatNumber.new((Number(GetMontoTarifa(getFechaAnoActual(1,2))) * 1), `Bs.S `, true)")',
        ],
    ],
};
