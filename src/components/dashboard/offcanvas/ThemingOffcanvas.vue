<template>
  <div class="offcanvas offcanvas-end shadow border-0 maxwidth-300" tabindex="-1"
       id="theming" data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="theminglabel">

    <div class="offcanvas-header border-bottom">
      <div>
        <h5 class="offcanvas-title" id="theminglabel">Personalize</h5>
        <p class="text-secondary small">Make it more like your own</p>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body">
      <!-- Colors Section -->
      <h6 class="offcanvas-title">Colors</h6>
      <p class="text-secondary small mb-4">Change colors of templates</p>
      <div class="row gx-3 mb-3 theme-select">
        <div class="col-auto" v-for="color in colors" :key="color.name">
          <div class="select-box text-center mb-2"
               :data-title="color.dataTitle"
               @click="selectTheme(color.name)">
            <span class="avatar avatar-40 rounded-circle mb-2" :class="color.class">
              <i v-if="color.icon" :class="color.icon"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Backgrounds Section -->
      <h6 class="offcanvas-title">Backgrounds</h6>
      <p class="text-secondary small mb-4">Change color for background</p>
      <div class="row gx-3 mb-3 theme-background">
        <div class="col-auto" v-for="bg in backgrounds" :key="bg.name">
          <div class="gradient-box text-center mb-2"
               :data-title="bg.dataTitle"
               @click="selectBackground(bg.name)">
            <span class="avatar avatar-40 rounded-circle mb-2" :class="bg.class">
              <i v-if="bg.icon" :class="bg.icon"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar Layout Section -->
      <h6 class="offcanvas-title">Sidebar Layout</h6>
      <p class="text-secondary small mb-4">Change sidebar layout style</p>
      <div class="row gx-3 mb-3 sidebar-layout">
        <div class="col-auto" v-for="layout in sidebarLayouts" :key="layout.name">
          <div class="select-box text-center mb-2"
               :data-title="layout.dataTitle"
               :data-bs-toggle="layout.tooltip ? 'tooltip' : null"
               :title="layout.tooltip"
               @click="selectSidebarLayout(layout.name)">
            <span class="avatar avatar-40 rounded-circle mb-2 bg-default">
              <i :class="layout.icon"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- More Options -->
      <div class="text-center mb-3">
        <router-link to="/personalization" class="btn btn-sm btn-outline-theme">
          More options <i class="bi bi-arrow-right-short"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemingOffcanvas',
  data() {
    return {
      colors: [
        { name: 'default', class: 'bg-default', icon: 'bi bi-arrow-clockwise', dataTitle: '' },
        { name: 'blue', class: 'bg-blue', dataTitle: 'theme-blue' },
        { name: 'indigo', class: 'bg-indigo', dataTitle: 'theme-indigo' },
        { name: 'purple', class: 'bg-purple', dataTitle: 'theme-purple' },
        { name: 'pink', class: 'bg-pink', dataTitle: 'theme-pink' },
        { name: 'red', class: 'bg-red', dataTitle: 'theme-red' },
        { name: 'orange', class: 'bg-orange', dataTitle: 'theme-orange' },
        { name: 'yellow', class: 'bg-yellow', dataTitle: 'theme-yellow' },
        { name: 'green', class: 'bg-green', dataTitle: 'theme-green' },
        { name: 'teal', class: 'bg-teal', dataTitle: 'theme-teal' },
        { name: 'pista', class: 'bg-pista', dataTitle: 'theme-pista' },
        { name: 'cyan', class: 'bg-cyan', dataTitle: 'theme-cyan' },
        { name: 'grey', class: 'bg-grey', dataTitle: 'theme-grey' },
        { name: 'brown', class: 'bg-brown', dataTitle: 'theme-brown' },
        { name: 'chocolate', class: 'bg-chocolate', dataTitle: 'theme-chocolate' },
        { name: 'black', class: 'bg-dark', dataTitle: 'theme-black' }
      ],
      backgrounds: [
        { name: 'default', class: 'bg-default', icon: 'bi bi-arrow-clockwise', dataTitle: 'bg-default' },
        { name: 'white', class: 'bg-white', dataTitle: 'bg-white' },
        { name: 'r-gradient', class: 'bg-r-gradient', dataTitle: 'bg-r-gradient' },
        { name: 'gradient-1', class: 'bg-gradient-1', dataTitle: 'bg-gradient-1' },
        { name: 'gradient-2', class: 'bg-gradient-2', dataTitle: 'bg-gradient-2' },
        { name: 'gradient-3', class: 'bg-gradient-3', dataTitle: 'bg-gradient-3' },
        { name: 'gradient-4', class: 'bg-gradient-4', dataTitle: 'bg-gradient-4' },
        { name: 'gradient-5', class: 'bg-gradient-5', dataTitle: 'bg-gradient-5' },
        { name: 'gradient-6', class: 'bg-gradient-6', dataTitle: 'bg-gradient-6' },
        { name: 'gradient-7', class: 'bg-gradient-7', dataTitle: 'bg-gradient-7' },
        { name: 'gradient-8', class: 'bg-gradient-8', dataTitle: 'bg-gradient-8' },
        { name: 'gradient-9', class: 'bg-gradient-9', dataTitle: 'bg-gradient-9' },
        { name: 'gradient-10', class: 'bg-gradient-10', dataTitle: 'bg-gradient-10' }
      ],
      sidebarLayouts: [
        { name: 'standard', icon: 'bi bi-arrow-clockwise h4', dataTitle: 'adminuiux-sidebar-standard', tooltip: 'None' },
        { name: 'iconic', icon: 'bi bi-bezier h4', dataTitle: 'adminuiux-sidebar-iconic', tooltip: 'Iconic' },
        { name: 'boxed', icon: 'bi bi-box h5', dataTitle: 'adminuiux-sidebar-boxed', tooltip: 'Boxed' },
        { name: 'iconic-boxed', icon: 'bi bi-bounding-box h5', dataTitle: 'adminuiux-sidebar-boxed adminuiux-sidebar-iconic', tooltip: 'Iconic+Boxed' }
      ]
    }
  },
  methods: {
    selectTheme(theme) {
      document.body.setAttribute('data-theme', `theme-${theme}`)
      this.$emit('theme-changed', theme)
    },
    selectBackground(bg) {
      document.body.classList.remove('bg-default', 'bg-white', 'bg-r-gradient',
        'bg-gradient-1', 'bg-gradient-2', 'bg-gradient-3', 'bg-gradient-4',
        'bg-gradient-5', 'bg-gradient-6', 'bg-gradient-7', 'bg-gradient-8',
        'bg-gradient-9', 'bg-gradient-10')
      document.body.classList.add(`bg-${bg}`)
      this.$emit('background-changed', bg)
    },
    selectSidebarLayout(layout) {
      document.body.setAttribute('data-sidebarlayout', `adminuiux-sidebar-${layout}`)
      this.$emit('sidebar-layout-changed', layout)
    }
  },
  mounted() {
    // Initialiser les tooltips
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
  }
}
</script>
