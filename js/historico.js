let responsiveOptions = [
    [
        "screen and (max-width: 640px)",
        {
            showPoint: false,
            offset: 30,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return value / 1000000 + "MM";
                },
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                    let arrLabel = value.split("-");
                    return arrLabel[1];
                },
            },
        },
    ],
    [
        "screen and (max-width: 340px)",
        {
            showPoint: false,
            offset: 15,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return value / 1000000 + "MM";
                },
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                    /*let arrLabel = value.split("-");
                    return arrLabel[1];*/
                    return value[0].toUpperCase();
                },
            },
        },
    ],
];

new Chartist.Line(
    ".ct-chart",
    {
        labels: [
            "sep-18",
            "oct-18",
            "nov-18",
            "dic-18",
            "ene-19",
            "feb-19",
            "mar-19",
            "abr-19",
            "may-19",
            "jun-19",
            "jul-19",
            "ago-19",
            "sep-19",
            "oct-19",
            "nov-19",
            "dic-19",
            "ene-20",
            "feb-20",
            "mar-20",
            "abr-20",
            "may-20",
            "jun-20",
            "jul-20",
            "ago-20",
        ],
        series: [
            [
                100,
                169,
                253.5,
                1790,
                4027,
                12082,
                50000,
                150000,
                150000,
                200000,
                262500,
                393750,
                483840,
                619267,
                619267,
                619267,
                792723,
                1600000,
                2000000,
                2000000,
                2600000,
                3510000,
                4738500,
                6400000,
                9600000,
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                400000,
                400000,
                520000,
                702000,
                947700,
                1280000,
                1920000,
            ],
        ],
    },
    {
        chartPadding: {
            right: 20,
        },
        axisY: {
            offset: 50,
            labelInterpolationFnc: function (value) {
                return value / 1000 + "mil";
            },
        },
    },
    responsiveOptions
);
