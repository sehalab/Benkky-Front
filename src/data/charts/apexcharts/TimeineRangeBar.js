import { hexToRGB, getLocalStorageItem } from '@/_helper';

export const timelineChartData = {
    series: [
        {
            data: [
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-04").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-04").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-12").getTime(),
                    ],
                },
                {
                    x: "Deployment",
                    y: [
                        new Date("2019-03-12").getTime(),
                        new Date("2019-03-18").getTime(),
                    ],
                },
            ],
        },
    ],
    options: {
        chart: {
            fontFamily: 'Rubik, serif',
            height: 350,
            type: "rangeBar",
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                rotate: -30,
                rotateAlways: true,
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        colors: [hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1)],
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 280,
                    },
                },
            },
        ],
        grid: {
            show: true,
            borderColor: "rgba(var(--dark),.2)",
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            style: {
                fontSize: "16px",
            },
        },
    },
};

export const advanceTimelineChartData = {
    series: [
        {
            name: "Bob",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-05").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-07").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-03").getTime(),
                        new Date("2019-03-09").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-11").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-11").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-01").getTime(),
                        new Date("2019-03-03").getTime(),
                    ],
                },
            ],
        },
        {
            name: "Joe",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-05").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-06").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                    goals: [
                        {
                            name: "Break",
                            value: new Date("2019-03-10").getTime(),
                            strokeColor: "#CD2F2A",
                        },
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-03").getTime(),
                        new Date("2019-03-07").getTime(),
                    ],
                },
                {
                    x: "Deployment",
                    y: [
                        new Date("2019-03-20").getTime(),
                        new Date("2019-03-22").getTime(),
                    ],
                },
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-10").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
            ],
        },
        {
            name: "Dan",
            data: [
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-10").getTime(),
                        new Date("2019-03-17").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-09").getTime(),
                    ],
                    goals: [
                        {
                            name: "Break",
                            value: new Date("2019-03-07").getTime(),
                            strokeColor: "#CD2F2A",
                        },
                    ],
                },
            ],
        },
    ],
    options: {
        chart: {
            fontFamily: 'Rubik, serif',
            height: 450,
            type: "rangeBar",
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "80%",
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                rotate: -30,
                rotateAlways: true,
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        colors: [
            "#28232D",
            hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            "#0AB964"
        ],
        stroke: {
            width: 1,
        },
        fill: {
            type: "solid",
            opacity: 0.6,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
        },
        grid: {
            show: true,
            borderColor: "rgba(var(--dark),.2)",
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            style: {
                fontSize: "16px",
            },
        },
    },
};

export const advanceGroupedRowsChartData = {
    series: [
        {
            name: "George Washington",
            data: [
                {
                    x: "President",
                    y: [new Date(1789, 3, 30).getTime(), new Date(1797, 2, 4).getTime()],
                },
            ],
        },
        {
            name: "John Adams",
            data: [
                {
                    x: "President",
                    y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
                },
                {
                    x: "Vice President",
                    y: [new Date(1789, 3, 21).getTime(), new Date(1797, 2, 4).getTime()],
                },
            ],
        },
        {
            name: "Thomas Jefferson",
            data: [
                {
                    x: "President",
                    y: [new Date(1801, 2, 4).getTime(), new Date(1809, 2, 4).getTime()],
                },
                {
                    x: "Vice President",
                    y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
                },
                {
                    x: "Secretary of State",
                    y: [
                        new Date(1790, 2, 22).getTime(),
                        new Date(1793, 11, 31).getTime(),
                    ],
                },
            ],
        },
        {
            name: "Aaron Burr",
            data: [
                {
                    x: "Vice President",
                    y: [new Date(1801, 2, 4).getTime(), new Date(1805, 2, 4).getTime()],
                },
            ],
        },
        {
            name: "George Clinton",
            data: [
                {
                    x: "Vice President",
                    y: [new Date(1805, 2, 4).getTime(), new Date(1812, 3, 20).getTime()],
                },
            ],
        },
        {
            name: "John Jay",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1789, 8, 25).getTime(), new Date(1790, 2, 22).getTime()],
                },
            ],
        },
        {
            name: "Edmund Randolph",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1794, 0, 2).getTime(), new Date(1795, 7, 20).getTime()],
                },
            ],
        },
        {
            name: "Timothy Pickering",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1795, 7, 20).getTime(), new Date(1800, 4, 12).getTime()],
                },
            ],
        },
        {
            name: "Charles Lee",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1800, 4, 13).getTime(), new Date(1800, 5, 5).getTime()],
                },
            ],
        },
        {
            name: "John Marshall",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1800, 5, 13).getTime(), new Date(1801, 2, 4).getTime()],
                },
            ],
        },
        {
            name: "Levi Lincoln",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1801, 2, 5).getTime(), new Date(1801, 4, 1).getTime()],
                },
            ],
        },
        {
            name: "James Madison",
            data: [
                {
                    x: "Secretary of State",
                    y: [new Date(1801, 4, 2).getTime(), new Date(1809, 2, 3).getTime()],
                },
            ],
        },
    ],
    options: {
        chart: {
            fontFamily: 'Rubik, serif',
            height: 450,
            type: "rangeBar",
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "50%",
                rangeBarGroupRows: true,
            },
        },
        colors: [
            hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            "#0AB964",
            "#F9C123",
            "#E14E5A",
            "#282632",
            hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            "#626263",
            "#4196FA",
            "#F9C123",
            "#E14E5A",
        ],
        fill: {
            type: "solid",
        },
        xaxis: {
            type: "datetime",
            labels: {
                rotate: -30,
                rotateAlways: true,
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        legend: {
            position: "right",
        },
        grid: {
            show: true,
            borderColor: "rgba(var(--dark),.2)",
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            custom: function (opts) {
                const fromYear = new Date(opts.y1).getFullYear();
                const toYear = new Date(opts.y2).getFullYear();

                const w = opts.ctx.w;
                const label = w.globals.labels[opts.dataPointIndex];
                const seriesName = w.config.series[opts.seriesIndex].name || "";
                const color = w.globals.colors[opts.seriesIndex];

                return (
                    '<div class="apexcharts-tooltip-rangebar">' +
                    '<div><span class="series-name" style="color: ' +
                    color +
                    '">' +
                    seriesName +
                    "</span></div>" +
                    '<div><span class="category">' +
                    label +
                    '</span> <span class="value start-value">' +
                    fromYear +
                    '</span> <span class="separator">-</span> <span class="value end-value">' +
                    toYear +
                    "</span></div>" +
                    "</div>"
                );
            },
            x: {
                show: false,
            },
            style: {
                fontSize: "16px",
            },
        },
    },
};