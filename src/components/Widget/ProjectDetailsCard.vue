<script setup>
import {
  BCard,
  BCardBody,
  BForm,
  BFormSelect,
  BButton
} from 'bootstrap-vue-next'
import {projectTasksLeft, projectTasksRight} from "@/data/dashboard/project/TopCardsData.js";

defineProps({
  isWidgetPage: {
    type: Boolean,
    default: false
  }
})


</script>


<template>
  <b-card
      class="equal-card"
      :class="` project-data-container ${isWidgetPage ? 'widget-card' : ''}`"
      no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Project</h6>
        <b-form class="app-form flex-shrink-0">
          <b-form-select class="custom-form-select">
            <option>Filter</option>
            <option value="1">Fashion</option>
            <option value="2">Books</option>
            <option value="3">Sports</option>
            <option value="4">Fitness</option>
          </b-form-select>
        </b-form>
      </div>

      <div :class="`row mt-4 project-row`">
        <div class="col-sm-4">
          <b-card class="project-status-card mb-0 text-center bg-primary text-white shadow rounded p-3" no-body>
            <div class="bg-white status-icon rounded-circle d-flex-center w-45 h-45">
              <i class="ph ph-clock text-primary f-s-20"></i>
            </div>
            <p class="mb-0 text-white text-truncate">Running</p>
          </b-card>
        </div>

        <div class="col-sm-4">
          <b-card class="project-status-card mb-0 text-center bg-success text-white shadow rounded p-3" no-body>
            <div class="bg-white status-icon rounded-circle d-flex-center w-45 h-45">
              <i class="ph ph-check-circle text-success f-s-20"></i>
            </div>
            <p class="mb-0 text-white text-truncate">Completed</p>
          </b-card>
        </div>

        <div class="col-sm-4">
          <b-card class="project-status-card mb-0 text-center bg-danger text-white shadow rounded p-3" no-body>
            <div class="bg-white status-icon rounded-circle d-flex-center w-45 h-45">
              <i class="ph ph-arrow-clockwise text-danger f-s-20"></i>
            </div>
            <p class="mb-0 text-white text-truncate">Pending</p>
          </b-card>
        </div>
      </div>

      <div :class="`row ${isWidgetPage ? 'mt-3' : 'mt-4'}`">
        <div class="col-sm-6">
          <ul class="list-unstyled">
            <li
                v-for="task in projectTasksLeft"
                :key="task.id"
                :class="`d-flex align-items-center justify-content-between ${
                task.id === 1 ? 'mt-0' : 'mt-3'
              }`"
            >
              <div
                  :class="`bg-${task.iconBg} d-flex-center p-1 w-30 h-30 b-r-8 flex-shrink-0`"
              >
                <img alt="avatar" class="img-fluid" :src="task.icon" />
              </div>
              <div class="ms-2 flex-grow-1">
                <p class="text-dark-800 mb-0 f-w-500 f-s-15 txt-ellipsis-1">
                  {{ task.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-sm-6">
          <ul class="list-unstyled">
            <li
                v-for="task in projectTasksRight"
                :key="task.id"
                :class="`d-flex align-items-center justify-content-between ${
                task.id === 4 ? 'mt-0' : 'mt-3'
              }`"
            >
              <div
                  :class="`bg-${task.iconBg} d-flex-center p-1 w-30 h-30 b-r-8 flex-shrink-0`"
              >
                <img alt="avatar" class="img-fluid" :src="task.icon" />
              </div>
              <div class="ms-2 flex-grow-1">
                <p class="text-dark-800 mb-0 f-w-500 f-s-15 txt-ellipsis-1">
                  {{ task.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="isWidgetPage" class="mt-3">
        <b-button variant="primary" class="w-100 btn-sm">
          View all
        </b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

