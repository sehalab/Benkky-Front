// Helper functions
export const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
};

export const getLocalStorageItem = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};

// Bar Border Radius Data
export const barBorderRadiusData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.2),
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
            data: [-65, 59, -20, 81, 56, -55, 40],
        },
        {
            label: "Dataset #2",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#FF4E5A"), 0.2),
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#FF4E5A"), 0.2),
            borderRadius: 50,
            borderSkipped: false,
            data: [65, 59, -20, 81, -56, 55, -40],
        },
    ],
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
};

// Doughnut Data
export const DoughnutData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.5),
                "rgba(10, 185, 100,0.5)",
                "rgba(225,10,90,0.5)",
            ],
            data: [-20, -54, 20, 0, 56, 55, -40],
        },
    ],
};

// Line Chart Data
export const LineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.2),
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            data: [-20, 54, -20, -5, 56, -55, 40],
        },
        {
            label: "Dataset #2",
            backgroundColor: "rgba(225, 78, 90,0.2)",
            borderColor: "rgba(225, 78, 90,1)",
            data: [90, 59, -10, 81, -56, 10, -40],
        },
    ],
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
};

// Multi Series Pie Data
export const MultiSeriesPie = {
    labels: [
        "Overall Yay",
        "Overall Nay",
        "Group A Yay",
        "Group A Nay",
        "Group B Yay",
        "Group B Nay",
        "Group C Yay",
        "Group C Nay",
    ],
    datasets: [
        {
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.1),
                hexToRGB(getLocalStorageItem("color-primary", "#0F626A")),
            ],
            data: [21, 79],
        },
        {
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-secondary", "#626262"), 0.1),
                hexToRGB(getLocalStorageItem("color-secondary", "#626262")),
            ],
            data: [33, 67],
        },
        {
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-success", "#0AB964"), 0.5),
                hexToRGB(getLocalStorageItem("color-success", "#0AB964"), 1),
            ],
            data: [20, 80],
        },
        {
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-danger", "#E14E5A"), 0.5),
                hexToRGB(getLocalStorageItem("color-danger", "#E14E5A"), 1),
            ],
            data: [10, 90],
        },
    ],
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    },
};

// Pie Data
export const PieData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-dark", "#28232D"), 0.5),
                "rgba(225,78,90,0.5)",
                "rgba(65, 150, 250,0.5)",
            ],
            data: [-20, -54, 20, 0, 56, 55, -40],
        },
    ],
};

// Polar Area Data
export const PolarAreaData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: [
                hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.5),
                "rgba(249,193,35,0.5)",
                "rgba(65, 150, 250,0.5)",
            ],
            data: [-10, -54, 40, 20, 56, 55, -40],
        },
    ],
};

// Progressive Line Data
const progressiveData = [];
const progressiveData2 = [];
let prev = 100;
let prev2 = 80;

for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    progressiveData.push({ x: i, y: prev });
    prev2 += 5 - Math.random() * 10;
    progressiveData2.push({ x: i, y: prev2 });
}

const totalDuration = 10000;
const delayBetweenPoints = totalDuration / progressiveData.length;

export const ProgressiveLineData = {
    datasets: [
        {
            borderColor: "rgba(225, 78, 90 ,1)",
            borderWidth: 1,
            radius: 0,
            data: progressiveData,
        },
        {
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            borderWidth: 1,
            radius: 0,
            data: progressiveData2,
        },
    ],
};

export const ProgressiveLineOptions = {
    animation: {
        easing: "linear",
        duration: delayBetweenPoints,
    },
    interaction: {
        intersect: false,
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            type: "linear",
        },
    },
};

// Radar Skip Points Data
export const RadarSkipPoints = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: "rgba(225, 78, 90,0.2)",
            borderColor: "rgba(225,78,90,1)",
            data: [-20, 25, -20, -5, 35, -10, 20],
        },
        {
            label: "Dataset #2",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.2),
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            data: [-20, -23, 20, 0, 8, 25, -20],
        },
    ],
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

// Stepped Line Charts Data
export const SteppedLineCharts = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: "rgba(225, 78, 90,0.2)",
            borderColor: "rgba(225, 78, 90,1)",
            fill: false,
            stepped: true,
            data: [-20, 54, -20, -5, 56, -55, 40],
        },
    ],
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
};

// Vertical Bar Chart Data
export const verticalBarChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Dataset #1",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.5),
            borderColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 1),
            data: [-65, 59, -20, 81, 56, -55, 40],
        },
        {
            label: "Dataset #2",
            backgroundColor: hexToRGB(getLocalStorageItem("color-primary", "#0F626A"), 0.5),
            borderColor: "rgba(299, 94, 64,1)",
            data: [65, 59, -20, 81, -56, 55, -40],
        },
    ],
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    },
};