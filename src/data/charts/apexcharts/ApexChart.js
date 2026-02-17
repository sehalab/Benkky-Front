// Time spent data for ApexCharts
export const timeSpentData = {
  series: [
    {
      name: "Spent Time",
      type: "column",
      data: [35, 45, 32, 40, 35, 38, 40],
    },
    {
      name: "Total Time",
      type: "line",
      data: [30, 25, 36, 30, 40, 35],
    },
  ],
  chart: {
    height: 280,
    type: "line",
    stacked: false,
  },
  annotations: {
    points: [
      {
        x: "S",
        y: 35,
        marker: {
          size: 5,
          strokeColor: "rgba(var(--warning),1)",
          strokeWidth: 4,
          cssClass: "marker-warning",
        },
      },
    ],
  },
  stroke: {
    width: [0, 2, 5],
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      columnWidth: "26",
    },
  },
  legend: {
    show: false,
  },
  colors: ["rgba(var(--warning),1)"],
  fill: {
    type: ["gradient", "solid"],
    opacity: [0.8, 0.1],
    gradient: {
      inverseColors: false,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.1,
      opacityTo: 0.1,
      colorStops: [
        {
          offset: 0,
          color: "rgba(var(--primary),.1)",
          opacity: 1,
        },
        {
          offset: 50,
          color: "rgba(var(--primary),.1)",
          opacity: 1,
        },
        {
          offset: 100,
          color: "rgba(var(--primary),.1)",
          opacity: 1,
        },
      ],
    },
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: "category",
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  tooltip: {
    x: {
      show: false,
    },
    style: {
      fontSize: "16px",
      fontFamily: '"Outfit", sans-serif',
    },
  },
  // responsive: [{
  //   breakpoint: 1440,
  //   options: {
  //     chart: {
  //       height: 200
  //     },
  //   }
  // }
};
