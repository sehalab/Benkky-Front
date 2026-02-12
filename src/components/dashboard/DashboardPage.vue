<template>
  <!-- Utilise le layout AdminLayout de Benkky -->
  <div class="ecommerce-dashboard">
    <!-- Inclut le dashboard eCommerce complet -->
    <div class="dashboard-container">
      <!-- Header du dashboard eCommerce -->
      <DashboardHeader
        @toggle-sidebar="toggleSidebar"
        @toggle-dark-mode="toggleDarkMode"
        :user="user"
      />

      <!-- Main wrapper -->
      <div class="adminuiux-wrap">
        <!-- Sidebar eCommerce -->
        <DashboardSidebar
          :is-collapsed="isSidebarCollapsed"
          :current-route="$route.path"
        />

        <!-- Main content -->
        <main class="adminuiux-content" :class="{ 'has-sidebar': !isSidebarCollapsed }">
          <!-- Breadcrumb -->
          <div class="container mt-3">
            <div class="row gx-1 align-items-center">
              <div class="col col-sm mb-3 mb-md-0">
                <nav aria-label="breadcrumb" class="mb-1">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                      <router-link to="/ecommerce" class="text-decoration-none">
                        <i class="bi bi-house-door"></i> eCommerce
                      </router-link>
                    </li>
                    <li v-if="$route.meta.breadcrumb" class="breadcrumb-item active">
                      {{ $route.meta.breadcrumb }}
                    </li>
                  </ol>
                </nav>
                <h4>{{ pageTitle }}</h4>
              </div>
            </div>
          </div>

          <!-- Contenu dynamique -->
          <router-view v-if="$route.meta.hasNestedView"></router-view>

          <!-- Dashboard par défaut -->
          <template v-else>
            <div class="container mt-3 mt-lg-4 mt-xl-5" id="main-content">
              <WelcomeSection :user="user" :stats="welcomeStats" />
              <DashboardContent />
            </div>
          </template>
        </main>
      </div>

      <!-- Footer eCommerce -->
      <DashboardFooter />

      <!-- Modals et offcanvas eCommerce -->
      <SearchModal />
      <NotificationsOffcanvas />
      <ProductDetailsOffcanvas />
      <ThemingOffcanvas />
    </div>
  </div>
</template>

<script>
import DashboardHeader from './DashboardHeader.vue'
import DashboardSidebar from './DashboardSidebar.vue'
import DashboardFooter from './DashboardFooter.vue'
import WelcomeSection from './sections/WelcomeSection.vue'
import DashboardContent from './DashboardContent.vue'
import SearchModal from './modals/SearchModal.vue'
import NotificationsOffcanvas from './offcanvas/NotificationsOffcanvas.vue'
import ProductDetailsOffcanvas from './offcanvas/ProductDetailsOffcanvas.vue'
import ThemingOffcanvas from './offcanvas/ThemingOffcanvas.vue'

export default {
  name: 'ECommerceDashboard',
  components: {
    DashboardHeader,
    DashboardSidebar,
    DashboardFooter,
    WelcomeSection,
    DashboardContent,
    SearchModal,
    NotificationsOffcanvas,
    ProductDetailsOffcanvas,
    ThemingOffcanvas
  },
  data() {
    return {
      isSidebarCollapsed: false,
      isDarkMode: false,
      user: {
        name: 'Adminuiuxer',
        avatar: '/assets/img/modern-ai-image/user-1.jpg',
        role: 'Store Owner'
      },
      welcomeStats: {
        orders: 162,
        returns: 6
      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.meta?.title || 'Dashboard eCommerce'
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
    // Initialiser les icons
    if (typeof feather !== 'undefined') {
      feather.replace()
    }
  }
}
</script>

<style scoped>
.ecommerce-dashboard {
  min-height: 100vh;
  background-color: var(--adminuiux-bg-color, #f8f9fa);
}
</style>
