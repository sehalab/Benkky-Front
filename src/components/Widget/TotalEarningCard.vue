
<script setup>
import { BCard, BCardBody } from 'bootstrap-vue-next'
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: "sales",
    type: "bar",
    data: [44, 55, 41, 67, 22, 43, 53, 22, 12, 65],
  },
  {
    name: "order",
    type: "bar",
    data: [-13, -23, -20, -8, -13, -27, -24, -15, -17, -25],
  },
]

const chartOptions = {
  chart: {
    height: 242,
    type: "bar",
    stacked: true,
    fontFamily: '"Rubik", serif',
    offsetX: 0,
    offsetY: 0,
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["rgba(var(--primary), 0.8)", "rgba(var(--danger), 0.8)"],
  grid: {
    borderColor: "rgba(var(--dark),0.1)",
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
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20%",
      borderRadius: 2,
      dataLabels: {
        total: {
          enabled: false,
          style: {
            fontSize: "12px",
            fontWeight: 900,
          },
        },
      },
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    show: false,
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      show: false,
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    x: {
      show: false,
    },
    style: {
      fontSize: "16px",
    },
  },
}
</script>
<template>
  <b-card no-body>
    <b-card-body class="p-0">
      <div class="px-4 py-3">
        <h4 class="text-primary">$65,563.24</h4>
        <p class="mb-0 text-secondary">
          <span class="text-light-danger">38.3%-</span> Last week
        </p>
      </div>
      <div class="earning-chart">
        <VueApexCharts
            :options="chartOptions"
            :series="series"
            type="bar"
            height="242"
        />
      </div>
    </b-card-body>
  </b-card>
</template>

