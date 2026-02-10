<template>
  <div class="dashboard-wrapper">
    <!-- Page Loader -->
    <PageLoader v-if="isLoading" />

    <!-- Header -->
    <DashboardHeader
      @toggle-sidebar="toggleSidebar"
      @toggle-dark-mode="toggleDarkMode"
      :user="user"
    />

    <!-- Main Wrapper -->
    <div class="adminuiux-wrap">
      <!-- Sidebar -->
      <DashboardSidebar :is-collapsed="isSidebarCollapsed" />

      <!-- Main Content -->
      <main class="adminuiux-content has-sidebar">
        <slot></slot>
      </main>
    </div>

    <!-- Search Modal -->
    <SearchModal />

    <!-- Notifications Offcanvas -->
    <NotificationsOffcanvas />

    <!-- Product Details Offcanvas -->
    <ProductDetailsOffcanvas />

    <!-- Theming Offcanvas -->
    <ThemingOffcanvas />

    <!-- Footer -->
    <DashboardFooter />

    <!-- Fixed Buttons -->
    <div class="position-fixed bottom-0 end-0 m-3 z-index-5" id="fixedbuttons">
      <button class="btn btn-square btn-theme shadow rounded-circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#theming" aria-controls="theming">
        <i class="bi bi-palette"></i>
      </button>
      <button class="btn btn-theme btn-square shadow mt-2 d-none rounded-circle" id="backtotop">
        <i class="bi bi-arrow-up"></i>
      </button>
    </div>
  </div>
</template>

<script>
import PageLoader from './PageLoader.vue'
import DashboardHeader from './DashboardHeader.vue'
import DashboardSidebar from './DashboardSidebar.vue'
import SearchModal from './modals/SearchModal.vue'
import NotificationsOffcanvas from './offcanvas/NotificationsOffcanvas.vue'
import ProductDetailsOffcanvas from './offcanvas/ProductDetailsOffcanvas.vue'
import ThemingOffcanvas from './offcanvas/ThemingOffcanvas.vue'
import DashboardFooter from './DashboardFooter.vue'

export default {
  name: 'DashboardLayout',
  components: {
    PageLoader,
    DashboardHeader,
    DashboardSidebar,
    SearchModal,
    NotificationsOffcanvas,
    ProductDetailsOffcanvas,
    ThemingOffcanvas,
    DashboardFooter
  },
  data() {
    return {
      isLoading: false,
      isSidebarCollapsed: false,
      isDarkMode: false,
      user: {
        name: 'Adminuiuxer',
        role: 'Store Owner',
        avatar: '/assets/img/modern-ai-image/user-1.jpg',
        balance: 1100.00
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark-mode', this.isDarkMode)
    }
  },
  mounted() {
    // Initialiser les tooltips Bootstrap
    this.initBootstrapComponents()
  },
  methods: {
    initBootstrapComponents() {
      if (typeof bootstrap !== 'undefined') {
        // Tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

        // Offcanvas
        const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
        offcanvasElementList.map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))
      }
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  position: relative;
}
</style>
