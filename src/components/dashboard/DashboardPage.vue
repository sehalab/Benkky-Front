<template>
  <DashboardLayout>
    <!-- Breadcrumb -->
    <div class="container mt-3">
      <div class="row gx-1 align-items-center">
        <div class="col col-sm mb-3 mb-md-0">
          <nav aria-label="breadcrumb" class="mb-1">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item active bi" aria-current="page">
                <i class="bi bi-house-door"></i> Home
              </li>
            </ol>
          </nav>
          <h4>Dashboard</h4>
        </div>
        <div class="col-auto mb-3 mb-md-0">
          <div class="input-group width-250">
            <input type="text" class="form-control bg-none text-center" id="daterangepickerranges">
            <span class="input-group-text bg-none" id="calendarpickerrange">
              <i class="bi bi-calendar"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mt-3 mt-lg-4 mt-xl-5" id="main-content">
      <!-- Welcome Section -->
      <WelcomeSection :user="user" :stats="welcomeStats" />

      <!-- Summary Cards -->
      <div class="row gx-3 gx-lg-4">
        <!-- Summary and Queue Balance -->
        <div class="col-12 col-md-6 col-xl-4">
          <SummaryCard />
        </div>

        <!-- Sales and Revenue -->
        <div class="col-12 col-md-6 col-xl-8">
          <div class="row gx-3 gx-lg-4">
            <!-- Order Summary -->
            <div class="col-12 col-md-12 col-xl-6">
              <OrderSummaryCard />
            </div>

            <!-- Revenue Generated -->
            <div class="col-12 col-md-12 col-xl-6">
              <RevenueCard />
            </div>

            <!-- Session Metrics -->
            <SessionMetrics />
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <ProductsSection />

      <!-- Product Inventory -->
      <ProductInventory />
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from './DashboardLayout.vue'
import WelcomeSection from './sections/WelcomeSection.vue'
import SummaryCard from './cards/SummaryCard.vue'
import OrderSummaryCard from './cards/OrderSummaryCard.vue'
import RevenueCard from './cards/RevenueCard.vue'
import SessionMetrics from './sections/SessionMetrics.vue'
import ProductsSection from './sections/ProductsSection.vue'
import ProductInventory from './sections/ProductInventory.vue'

export default {
  name: 'DashboardPage',
  components: {
    DashboardLayout,
    WelcomeSection,
    SummaryCard,
    OrderSummaryCard,
    RevenueCard,
    SessionMetrics,
    ProductsSection,
    ProductInventory
  },
  data() {
    return {
      user: {
        name: 'Adminuiuxer',
        avatar: '/assets/img/modern-ai-image/user-1.jpg'
      },
      welcomeStats: {
        orders: 162,
        returns: 6
      }
    }
  },
  mounted() {
    // Initialiser les plugins nécessaires
    this.initPlugins()
  },
  methods: {
    initPlugins() {
      // Date range picker
      if (typeof jQuery !== 'undefined' && jQuery().daterangepicker) {
        $('#daterangepickerranges').daterangepicker({
          opens: 'left'
        }, function(start, end, label) {
          console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
        })
      }
    }
  }
}
</script>
