<template>
  <b-modal
      v-model="show"
      hide-footer
      hide-header
      hide-header-close
      no-close-on-backdrop
      centered
      body-class="p-0"
      content-class="welcome-card border-0"
      modal-class="welcome-modal-wrapper"
      v-if="shouldShowModal"
  >
    <div class="p-0 position-relative">
      <div>
        <img
            alt="bg"
            class="img-fluid w-100"
            src="/images/modals/welcome-bg.png"
        />
        <div>
          <img
              src="/images/modals/welcome-rocket.png"
              class="modal-rocket img-fluid"
              alt="rocket"
          />
        </div>
      </div>

      <div class="text-end position-absolute end-0 top-0 p-3">
        <IconX
            class="fs-5 text-dark fw-semibold"
            style="cursor: pointer"
            @click="handleClose"
        />
      </div>

      <div class="text-center position-relative welcome-card-content z-1 p-3">
        <h2 class="fw-semibold">Welcome! 👋</h2>
        <h6 class="fs-6 text-dark fw-medium mx-0 mx-sm-5">
          Start Multipurpose, clean modern responsive bootstrap 5 admin template
        </h6>

        <ul class="modal-features-list list-unstyled d-flex flex-wrap justify-content-center gap-2 mt-3">
          <li
              v-for="(item, idx) in featureList"
              :key="idx"
              class="btn btn-light-primary flex-fill"
          >
            {{ item }}
          </li>
        </ul>

        <div class="mt-3 mb-4">
          <b-button variant="primary" size="lg" @click="handleClose">
            Get Started <IconChevronsRight class="ms-1" />
          </b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { BModal, BButton } from 'bootstrap-vue-next'
import { IconX, IconChevronsRight } from '@tabler/icons-vue'

const route = useRoute()
const show = ref(true)

const featureList = [
  'Fully Responsive',
  'Built with bootstrap 5',
  'scss support',
  'Light & Dark Mode',
  'Enjoy Started!'
]

const shouldShowModal = computed(() => {
  return route.path === '/' || route.path === '/dashboard/ecommerce'
})

const handleClose = () => {
  show.value = false
}
</script>

<style>

.welcome-modal-wrapper{
  .modal-header{
    display: none;
  }
  .modal-footer{
    display: none!important;
  }
}
</style>