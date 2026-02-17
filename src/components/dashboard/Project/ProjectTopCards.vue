<script setup>
import { BCard, BCardBody, BBadge, BCol } from 'bootstrap-vue-next'
import VueApexCharts from 'vue3-apexcharts'

import {
  taskOverviewCards,
  taskOverviewOptions
} from '@/data/dashboard/project/TopCardsData.js'

import ProjectMeetingCard from "@/components/Widget/ProjectMeetingCard.vue"
import ProjectDetailsCard from "@/components/Widget/ProjectDetailsCard.vue"
</script>

<template>
  <b-col md="7" xxl="5">
    <b-card
        v-for="card in taskOverviewCards"
        :key="card.id"
        :class="`overview-details-box b-s-3-${card.borderColor}`"
        no-body
    >
      <b-card-body>
        <div class="row">
          <b-col cols="6">
            <div class="d-flex gap-3 align-items-center">
              <span
                  :class="`bg-${card.bgColor} h-60 w-60 d-flex-center flex-column rounded-3`"
              >
                <span class="f-w-500">{{ card.day }}</span>
                <span>{{ card.date }}</span>
              </span>

              <div>
                <p class="text-dark f-w-600 txt-ellipsis-1">
                  Task Overview
                </p>
                <div class="chart-card-box d-flex align-items-center">
                  <vue-apex-charts
                      :options="taskOverviewOptions(card.bgColor)"
                      :series="taskOverviewOptions(card.bgColor).series"
                      type="line"
                      height="40"
                      width="100"
                  />
                  <b-badge :bg="card.badgeColor" class="b-r-50">
                    {{ card.badgeValue }}
                  </b-badge>
                </div>
              </div>
            </div>
          </b-col>

          <b-col cols="6" class="mt-3 mt-sm-0">
            <div class="d-flex align-items-center gap-1">
              <div class="flex-grow-1">
                <p class="text-dark f-w-500 txt-ellipsis-1">
                  Provided Time
                </p>
                <h6 :class="`mb-0 text-${card.textColor}`">
                  {{ card.providedTime }}
                </h6>
              </div>
              <div class="flex-grow-1">
                <p class="text-dark f-w-500 txt-ellipsis-1">
                  Working Time
                </p>
                <h6 :class="`mb-0 text-${card.textColor}`">
                  {{ card.workingTime }}
                </h6>
              </div>
            </div>
          </b-col>
        </div>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col md="5" xxl="3">
    <ProjectMeetingCard />
  </b-col>

  <b-col md="7" lg="4">
    <ProjectDetailsCard/>
  </b-col>
</template>
