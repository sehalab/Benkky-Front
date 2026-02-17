import { generateData, hexToRGB, getLocalStorageItem } from '@/_helper';

export const simpleBubbleChartData = {
    series: [
        {
            name: "Bubble1",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble2",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble3",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble4",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
    ],
    options: {
        chart: {
            fontFamily: 'Rubik, serif',
            height: 350,
            type: "bubble",
            zoom: { enabled: false },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 0.8,
        },
        title: {
            text: "",
        },
        xaxis: {
            tickAmount: 12,
            type: "datetime",
            labels: {
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        colors: [
            hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            hexToRGB(getLocalStorageItem("color-secondary", "#817D8D"), 1),
            "#0AB964",
            "#4196FA",
        ],
        yaxis: {
            max: 70,
            labels: {
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "rgba(var(--dark),.2)",
            strokeDashArray: 2,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            x: { show: false },
            style: { fontSize: "16px" },
        },
    },
};

export const threeDBubbleChartData = {
    series: [
        {
            name: "3D Bubble 1",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "3D Bubble 2",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "3D Bubble 3",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "3D Bubble 4",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
    ],
    options: {
        chart: {
            fontFamily: 'Rubik, serif',
            height: 350,
            type: "bubble",
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        fill: {
            type: "gradient",
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.4,
                gradientToColors: undefined,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.8,
                stops: [0, 50, 100],
                colorStops: []
            }
        },
        title: { text: "" },
        xaxis: {
            tickAmount: 12,
            type: "datetime",
            labels: {
                rotate: 0,
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        colors: [
            hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            hexToRGB(getLocalStorageItem("color-secondary", "#817D8D"), 1),
            "#0AB964",
            "#4196FA",
        ],
        yaxis: {
            max: 70,
            labels: {
                style: {
                    colors: [],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
        },
        theme: {
            palette: "palette2",
        },
        grid: {
            show: true,
            borderColor: "rgba(var(--dark),.2)",
            strokeDashArray: 2,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            x: { show: false },
            style: { fontSize: "16px" },
        },
    },
};