<script setup>
import { BCard, BCardBody, BForm, BFormSelect } from 'bootstrap-vue-next'
import VueApexCharts from 'vue3-apexcharts'

defineProps({
  chartHeight: {
    type: Number,
    default: 180
  }
})

const series = [68, 58, 78, 88]

const chartOptions = {
  chart: {
    height: 200,
    type: 'donut'
  },
  plotOptions: {
    pie: {
      startAngle: 10,

      donut: {
        size: '80%',
        dataLabels: {
          enabled: false
        },
      }
    }
  },
  labels: ['18 - 24 years', '25 - 40 years', '40 - 55 years', '55+ years'],
  colors: ['rgba(var(--primary),1)', 'rgba(var(--primary),.8)', 'rgba(var(--primary),.6)', 'rgba(var(--primary),.4)'],
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  responsive: [{
    breakpoint: 1400,
    options: {
      chart: {
        height: 200
      },
    }
  },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 180
        },
      }
    }
  ]

}

import { IconCircle } from '@tabler/icons-vue';

const ageData = [
  { range: '19-20 years', color: 'text-primary', value: '68%' },
  { range: '20-21 years', color: 'text-primary-800', value: '58%' },
  { range: '21-22 years', color: 'text-primary-600', value: '78%' },
  { range: '22-23 years', color: 'text-primary-400', value: '88%' },
];
</script>




<template>
  <b-card no-body>
    <b-card-body>
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="mb-0 txt-ellipsis-1">Yearly Earning</h6>
        <b-form class="ms-2">
          <b-form-select
              aria-label="Default select example"
              class="custom-form-select"
          >
            <option value="0">Jan</option>
            <option value="1">Feb</option>
            <option value="2">Mar</option>
            <option value="3">...</option>
            <option value="4">Dec</option>
          </b-form-select>
        </b-form>
      </div>

      <VueApexCharts
          :options="chartOptions"
          :series="series"
          type="donut"
          :height="chartHeight"
      />

      <ul class="list-unstyled">
        <li
            v-for="(item, index) in ageData"
            :key="index"
            class="py-1 d-flex align-items-center justify-content-between"
        >
          <p class="mb-0 txt-ellipsis-1 d-flex align-items-center">
            <IconCircle :class="`${item.color} me-1`" size="10" />
            {{ item.range }}
          </p>
          <p class="text-secondary txt-ellipsis-1 mb-0 flex-grow-1 mx-2">
          </p>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </b-card-body>
  </b-card>
</template>

