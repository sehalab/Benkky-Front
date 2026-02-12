<template>
  <div class="row align-items-center mb-xl-3">
    <!-- User Photo -->
    <div class="col-auto mb-3 mb-lg-4">
      <figure class="avatar avatar-80 rounded coverimg align-middle">
        <img :src="user.avatar" :alt="user.name">
      </figure>
    </div>

    <!-- Welcome Message -->
    <div class="col mb-3 mb-lg-4">
      <h3 class="text-theme-1 fw-normal mb-0">Welcome,</h3>
      <h1 class="fw-bold text-theme-accent-1 mb-0">{{ user.name }}</h1>
    </div>

    <!-- Stats -->
    <div class="col-auto mb-3 mb-lg-4">
      <div class="row gx-3 align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-80">
            <div id="circleprogressblue1" class="lh-14"></div>
          </div>
        </div>
        <div class="col">
          <p class="text-secondary small mb-0">Orders</p>
          <h4 class="mb-0">{{ stats.orders }}</h4>
          <span class="badge badge-sm badge-light text-bg-success">
            <i class="bi bi-caret-up-fill"></i> 8.01%
          </span>
        </div>
      </div>
    </div>

    <div class="col-auto mb-3 mb-lg-4">
      <div class="row gx-3 align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-80">
            <div id="circleprogressgreen1" class="lh-14"></div>
          </div>
        </div>
        <div class="col">
          <p class="text-secondary small mb-0">Return</p>
          <h4 class="mb-0">{{ stats.returns }}</h4>
          <span class="badge badge-sm badge-light text-bg-danger">
            <i class="bi bi-caret-up-fill"></i> 1.50%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeSection',
  props: {
    user: {
      type: Object,
      required: true
    },
    stats: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // Initialiser les circle progress
    this.initCircleProgress()
  },
  methods: {
    initCircleProgress() {
      // Simuler l'initialisation des cercles de progression
      // Tu peux intégrer une librairie comme ProgressBar.js ici
      setTimeout(() => {
        if (typeof CircleProgress !== 'undefined') {
          new CircleProgress('#circleprogressblue1', {
            value: 75,
            max: 100,
            textFormat: 'percent'
          })

          new CircleProgress('#circleprogressgreen1', {
            value: 25,
            max: 100,
            textFormat: 'percent'
          })
        }
      }, 100)
    }
  }
}
</script>
