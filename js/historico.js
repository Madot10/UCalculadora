let responsiveOptions = [
    /*  [
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
                    return arrLabel[1];
                    return value[0].toUpperCase();
                },
            },
        },
    ],*/
];

new Chartist.Line(
    ".ct-chart",
    {
        labels: [
            "mar-20",
            "abr-20",
            "may-20",
            "jun-20",
            "jul-20",
            "ago-20",
            "sep-20",
            "oct-20",
            "nov-20",
            "dic-20",
            "ene-21",
            "feb-21",
            "mar-21",
            "abr-21",
            "jun-21",
        ],
        series: [
            /*  [
                //UC SEMESTRAl
                2000000,
                2000000,
                2600000,
                3510000,
                4738500,
                6400000,
                9600000,
                11520000,
                15552000,
                22550000,
                44200000,
                59670000,
            ],
            [
                //UC MENSUAL
                400000,
                400000,
                520000,
                702000,
                947700,
                1280000,
                1920000,
                2304000,
                3110400,
                4510000,
                8840000,
                11934000,
            ],*/
            [5.47, 5.47, 7.11, 9.59, 4.65, 6.29, 7.41, 6.38, 8.62, 12.5, 8.15, 11, 12, 10, 10],
        ],
    },
    {
        chartPadding: {
            right: 10,
        },
        /*axisY: {
            offset: 50,
            labelInterpolationFnc: function (value) {
                return value / 1000 + "mil";
            },
        },*/
    },
    responsiveOptions
);
