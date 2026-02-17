<script setup>
import { BCard, BCardBody, BAlert, BProgress } from 'bootstrap-vue-next'
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: 'Website Blog',
    type: 'column',
    data: [20, 25, 30, 35, 40, 50, 60]
  },

  {
    name: 'Social Media',
    type: 'line',
    data: [25, 25, 50, 25, 40],
    color: 'green',
    stroke: {
      curve: 'smooth',
      width: 2
    },
  }

]

const chartOptions = {
  chart: {
    height: 180,
    type: 'line',
  },
  colors:['rgba(var(--white),1)','rgba(var(--white),1)'],
  stroke: {
    curve: 'smooth',
    width: [0, 2]
  },

  plotOptions: {
    bar: {
      columnWidth: '4px',
      distributed: true,
      // borderRadius: 8,
    }
  },
  yaxis: {
    show: false,
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  xaxis: {
    show: true,
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      show: true,
      style: {
        colors: '#fff', // Adjust color for visibility if needed
        fontSize: '12px'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  grid: {
    show: false,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },

  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false
  },
}
</script>

<template>
  <b-card class="bg-primary" no-body>
    <b-card-body>
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="text-white">Profit Overview</h5>
      </div>
      <div id="profitOverview"></div>
      <VueApexCharts
          :options="chartOptions"
          :series="series"
          type="line"
          height="180"
      />
    </b-card-body>
  </b-card>
  <b-alert variant="primary" dismissible class="project-alert mt-3" show>
    <div class="d-flex justify-content-between">
      <p class="mb-0 z-1 txt-ellipsis-2">
        🚀 Welcome! Keep track of your projects efficiently.
      </p>
    </div>
    <b-progress variant="primary" :value="100" class="progress-bar" />
  </b-alert>
</template>

