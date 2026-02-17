<script setup>
import { BCard, BCardBody } from 'bootstrap-vue-next'

defineProps({
  isWidgetPage: {
    type: Boolean,
    default: false
  }
})
</script>


<template>
  <b-card class="service-trial-card" no-body>
    <b-card-body>
      <h5
          :class="`text-white f-w-600 txt-ellipsis-1 ${isWidgetPage ? 'mt-3' : ''}`"
      >
        AI Commerce
      </h5>
      <p class="text-white mt-2 txt-ellipsis-2">
        Smarter Shopping, Faster Growth
      </p>
      <div :class="`service-img-box ${isWidgetPage ? 'mt-4' : ''}`"></div>
      <div class="mt-4">
        <router-link
            to="/apps/chat"
            target="_blank"
            class="btn btn-primary btn-sm w-100 text-nowrap"
        >
          Start Free Trial
        </router-link>
      </div>
    </b-card-body>
  </b-card>
</template>

