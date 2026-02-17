<script setup>
import { BCard, BCardBody } from 'bootstrap-vue-next'
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    type: "line",
    name: "This week",
    data: [1200, 1900, 3000, 2800, 3500, 4100, 4500],
  },
  {
    type: "area",
    name: "Last week",
    data: [1500, 1700, 2600, 2900, 3100, 3800, 4000],
  },
]

const chartOptions = {
  chart: {
    fontFamily: '"Rubik", serif',
    toolbar: { show: false },
  },
  colors: ["rgba(var(--primary),1)", "rgba(var(--danger),1)"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
  fill: {
    type: ["solid", "gradient"],
    colors: ["#e14e5a"],
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 0.8,
      opacityTo: 0.6,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    labels: {
      style: {
        colors: "rgba(var(--dark),.8)",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "rgba(var(--dark),.8)",
        fontSize: "14px",
      },
    },
  },
  grid: {
    borderColor: "rgba(var(--secondary),.4)",
    padding: {
      top: -20,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function(value) {
        return "$" + value
      },
    },
    x: {
      show: false,
    },
    style: {
      fontSize: "16px",
      fontFamily: '"Rubik", serif',
    },
  },
}
</script>


<template>
  <b-card no-body class="equal-card">
    <b-card-body class="pb-0">
      <div class="mb-2">
        <h4 class="text-primary">
          98.65% <span class="f-s-14 text-dark">Total sale</span>
        </h4>
      </div>
      <div id="revenueChart"></div>
      <VueApexCharts
          :options="chartOptions"
          :series="series"
          type="line"
          height="230"
      />
    </b-card-body>
  </b-card>
</template>

