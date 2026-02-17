<script setup>
import { ref, reactive } from 'vue'
import {
  BCard,
  BCardBody,
  BBadge,
  BTable,
  BFormCheckbox,
  BTabs,
  BTab,
  BCol,
  BRow
} from 'bootstrap-vue-next'
import { IconChevronRight } from '@tabler/icons-vue'
import {
  PhArrowUpRight,
  PhChartLineUp,
  PhCalendarCheck,
  PhChatCircleText
} from '@phosphor-icons/vue'
import {
  candidatesData,
  clientsData,
  projectNotificationsData
} from '@/data/dashboard/project/OtherCardsData.js'


const candidates = reactive([...candidatesData])
const clients = clientsData
const notifications = projectNotificationsData
const activeTab = ref(0)

const tableFields = [
  { key: 'candidate', label: 'Candidate' },
  { key: 'points', label: 'Points' },
  { key: 'actions', label: 'Actions' }
]

const handleCandidateToggle = (id) => {
  const candidate = candidates.find((c) => c.id === id)
  if (candidate) candidate.checked = !candidate.checked
}
</script>

<template>
  <b-col lg="4" xxl="2" class="order-1-lg">
    <b-row>
      <b-col sm="6" lg="12">
        <b-card class="project-profit-card" no-body>
          <b-card-body>
            <div class="profit-arrow">
              <span class="bg-white text-primary h-45 w-45 d-flex-center">
                <PhArrowUpRight :size="18" weight="bold" />
              </span>
            </div>
            <span class="bg-primary h-45 w-45 d-flex-center b-r-50">
              <PhChartLineUp :size="24" weight="bold" />
            </span>
            <div class="mt-3">
              <h4 class="text-dark">22.2K+</h4>
              <p class="f-w-500 mb-0 txt-ellipsis-1">Total profit Progress</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Active Projects Card -->
      <b-col sm="6" lg="12">
        <b-card class="bg-primary profit-card-2" no-body>
          <b-card-body>
            <PhCalendarCheck class="icon-bg" weight="duotone" />
            <span class="bg-white h-50 w-50 d-flex-center b-r-50">
              <PhCalendarCheck class="text-primary" :size="24" weight="duotone" />
            </span>
            <div class="mt-3">
              <h4 class="text-white">15+</h4>
              <p class="f-w-500 mb-0 txt-ellipsis-1">Active Projects</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-col>

  <b-col md="7" lg="4">
    <div class="header-box">
      <h5>Online Candidates</h5>
    </div>

    <b-card no-body>
      <b-card-body class="px-2 pt-2 pb-1 equal-card">
        <div class="table-responsive app-scroll">
          <b-table
              :items="candidates"
              :fields="tableFields"
              class="table-bottom-border align-middle mb-0"
              thead-class="d-none"
          >
            <template #cell(candidate)="data">
              <div class="d-flex align-items-center">
                <div :class="`h-40 w-40 d-flex-center b-r-12 overflow-hidden ${data.item.bgColor}`">
                  <img :src="data.item.avatar" alt="candidate" class="img-fluid" />
                </div>
                <div class="flex-grow-1 ps-2">
                  <div class="fw-medium txt-ellipsis-1">{{ data.item.name }}</div>
                  <div class="text-muted f-s-12 txt-ellipsis-1">{{ data.item.role }}</div>
                </div>
              </div>
            </template>

            <template #cell(points)="data">
              <b-badge variant="" class="f-s-12 f-w-700 bg-light-primary">
                {{ data.item.points }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-form-checkbox
                  switch
                  :id="`tableCheck-${data.item.id}`"
                  class="form-check-primary"
                  :checked="data.item.checked"
                  @change="() => handleCandidateToggle(data.item.id)"
              >
                <span class="f-w-500">
                  {{ data.item.checked ? 'Remove' : 'Add' }}
                </span>
              </b-form-checkbox>
            </template>
          </b-table>

          <div class="pb-0 text-nowrap ps-3 pt-2">Add New Candidates</div>
        </div>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col sm="6" lg="4" xxl="3">
    <div class="header-box d-flex justify-content-between align-items-center">
      <h5>Client List</h5>
    </div>
    <b-card no-body>
      <b-card-body>
        <b-tabs v-model="activeTab" class="app-tabs-primary border-0 flex-nowrap overflow-auto">
          <b-tab title="Client" />
          <b-tab title="Active" />
          <b-tab title="Deactivate" />
        </b-tabs>

        <ul class="box-list client-list">
          <li
              v-for="client in clients"
              :key="client.id"
              class="d-flex align-items-center justify-content-between"
          >
            <div
                :class="`h-45 w-45 d-flex-center b-r-12 overflow-hidden ${client.bgColor} flex-shrink-0`"
            >
              <img :src="client.avatar" alt="client" class="img-fluid" />
            </div>
            <div class="ms-2 flex-grow-1">
              <p class="mb-0 f-w-500 f-s-16 txt-ellipsis-1">{{ client.name }}</p>
              <p class="mb-0 f-s-12 txt-ellipsis-1">{{ client.points }}</p>
            </div>
            <span class="h-30 w-30 d-flex-center b-r-50">
              <IconChevronRight class="text-primary" :size="20" />
            </span>
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col sm="6" lg="4" xxl="3">
    <ul class="box-list">
      <li class="d-flex justify-content-between align-items-center mt-3">
        <h5 class="mb-0 txt-ellipsis-1 flex-grow-1">Notifications</h5>
        <b-badge bg="primary">3 New</b-badge>
      </li>
      <li
          v-for="notification in notifications"
          :key="notification.id"
          class="d-flex align-items-center justify-content-between"
      >
        <div
            :class="`h-40 w-40 d-flex-center b-r-12 overflow-hidden ${notification.bgColor} text-white flex-shrink-0`"
        >
          <template v-if="notification.isInitials">
            {{ notification.avatar }}
          </template>
          <img v-else :src="notification.avatar" alt="notification" class="img-fluid" />
        </div>
        <div class="ms-2 flex-grow-1">
          <p class="mb-0 f-w-500 f-s-18 txt-ellipsis-1">{{ notification.title }}</p>
          <p class="mb-0 f-s-12 txt-ellipsis-1">{{ notification.time }}</p>
        </div>
        <router-link
            to="/apps/chat"
            target="_blank"
            class="text-light-success h-45 w-45 d-flex-center b-r-50"
        >
          <PhChatCircleText :size="20" />
        </router-link>
      </li>
    </ul>
  </b-col>
</template>


