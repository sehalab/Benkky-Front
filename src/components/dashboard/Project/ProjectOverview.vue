<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import {  BCol, BCard, BCardBody, BButton } from 'bootstrap-vue-next'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import YearlyEarningCard from '@/components/Widget/YearlyEarningCard.vue'
import ProfitOverviewCard from '@/components/Widget/ProfitOverviewCard.vue'

const updates = [
  {
    img: '/images/dashboard/ecommerce-dashboard/01.png',
    text: 'Improve workflow efficiency\n' +
        'with expert tips & tools!'
  },
  {
    img: '/images/dashboard/ecommerce-dashboard/01.png',
    text: 'Track your budget, earnings,\n' +
        'and expenses in real time.'
  },
  {
    img: '/images/dashboard/ecommerce-dashboard/01.png',
    text: 'Boost productivity with smart\n' +
        'project strategies! 🚀'
  }
]

const meetings = ref([
  { id: 1, name: 'Mark Moen', description: 'Website Redesign Briefing', checked: false },
  { id: 2, name: 'Johan Moen', description: 'CRM Integration Planning', checked: false },
  { id: 3, name: 'Carlos Ramirez', description: 'Brand Audit Presentation', checked: false },
  { id: 4, name: 'Stellar Finances', description: 'Performance Review', checked: false }
])

const activeTab = ref('meetings')
const modules = [Autoplay, Pagination]
</script>

<template>
    <b-col sm="6" md="5" lg="4" xxl="3">
      <YearlyEarningCard :chart-height="180" />
    </b-col>

    <b-col sm="6" lg="4" xxl="3">
      <b-card class="updated-card equal-card text-center" no-body>
        <b-card-body>
          <Swiper
              :modules="modules"
              :pagination="{ clickable: true }"
              :autoplay="{ delay: 4000, disableOnInteraction: false }"
              :loop="true"
              class="updates-box-slider app-arrow"
          >
            <SwiperSlide v-for="(item, index) in updates" :key="index">
              <div class="bg-light-primary b-r-12">
                <img
                    :src="item.img"
                    alt="update"
                    class="img-fluid d-block m-auto"
                />
              </div>
              <div class="mt-3">
                <p class="f-s-18 f-w-500 txt-ellipsis-2">
                  {{ item.text }}
                </p>
                <b-button variant="primary" class="my-2">
                  Start Now
                </b-button>
              </div>
            </SwiperSlide>
          </Swiper>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col sm="6" lg="4" xxl="3">
      <b-card class="equal-card" no-body>
        <b-card-body>
          <ul class="nav nav-tabs tab-primary bg-primary p-1 rounded updates-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                  type="button"
                  class="nav-link"
                  :class="{ active: activeTab === 'meetings' }"
                  @click="activeTab = 'meetings'"
              >
                Meetings
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                  type="button"
                  class="nav-link"
                  :class="{ active: activeTab === 'notes' }"
                  @click="activeTab = 'notes'"
              >
                Notes
              </button>
            </li>
          </ul>

          <div class="tab-content update-tab-content">
            <div
                class="tab-pane fade"
                :class="{ 'show active': activeTab === 'meetings' }"
                role="tabpanel"
            >
              <ul class="form-selectgroup app-scroll">
                <li
                    v-for="meeting in meetings"
                    :key="meeting.id"
                    class="select-item"
                >
                  <input
                      type="checkbox"
                      class="form-check-input task-check w-25 h-25"
                      :id="`inlineCheckbox${meeting.id}`"
                      v-model="meeting.checked"
                  />
                  <label class="form-check-label" :for="`inlineCheckbox${meeting.id}`">
                    <span class="d-flex align-items-center">
                      <span class="ms-3">
                        <span
                            class="fs-6 client-name txt-ellipsis-1"
                            :class="{ 'completed-task': meeting.checked }"
                        >
                          {{ meeting.name }}
                        </span>
                        <span class="d-block text-secondary">{{ meeting.description }}</span>
                      </span>
                    </span>
                  </label>
                </li>
              </ul>
              <b-button variant="primary" class="w-100">Show More</b-button>
            </div>

            <!-- Notes Tab -->
            <div
                class="tab-pane fade"
                :class="{ 'show active': activeTab === 'notes' }"
                role="tabpanel"
            >
              <div class="w-100 h-250 text-center no-data mt-5">
                <img src="/images/dashboard/project/no-data.png" class="img-fluid" alt="no-data" />
                <h6 class="f-w-500 text-primary mt-4">No Data Found</h6>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col sm="6" md="5" lg="4" xxl="3">
      <ProfitOverviewCard />
    </b-col>

</template>
