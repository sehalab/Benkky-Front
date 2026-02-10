<template>
  <aside class="adminuiux-sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="adminuiux-sidebar-inner">
      <!-- Main Menu -->
      <div class="px-3 not-iconic mt-3">
        <h6 class="fw-medium small text-uppercase opacity-50">Main</h6>
      </div>

      <ul class="nav flex-column menu-active-line mt-3">
        <!-- Dashboard -->
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active" exact>
            <i class="menu-icon bi bi-columns-gap"></i>
            <span class="menu-name">Dashboard</span>
          </router-link>
        </li>

        <!-- Orders Dropdown -->
        <li class="nav-item dropdown">
          <a href="javascript:void(0)" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i class="menu-icon bi bi-bag-check"></i>
            <span class="menu-name">Orders</span>
          </a>
          <div class="dropdown-menu">
            <router-link to="/orders" class="nav-link">
              <i class="menu-icon bi bi-luggage"></i>
              <span class="menu-name">All Orders</span>
            </router-link>
            <router-link to="/order-details" class="nav-link">
              <i class="menu-icon bi bi-basket"></i>
              <span class="menu-name">Order Details</span>
            </router-link>
            <router-link to="/completed-orders" class="nav-link">
              <i class="menu-icon bi bi-cart-check"></i>
              <span class="menu-name">Completed Orders</span>
            </router-link>
          </div>
        </li>

        <!-- Customers -->
        <li class="nav-item">
          <router-link to="/customers" class="nav-link">
            <i class="menu-icon bi bi-people"></i>
            <span class="menu-name">Customers</span>
          </router-link>
        </li>

        <!-- Products -->
        <li class="nav-item">
          <router-link to="/products" class="nav-link">
            <i class="menu-icon bi bi-boxes"></i>
            <span class="menu-name">Products</span>
          </router-link>
        </li>

        <!-- Finance Dropdown -->
        <li class="nav-item dropdown">
          <a href="javascript:void(0)" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i class="menu-icon bi bi-cash-stack"></i>
            <span class="menu-name">Finance</span>
          </a>
          <div class="dropdown-menu">
            <router-link to="/finance/billing" class="nav-link">
              <i class="menu-icon bi bi-receipt-cutoff"></i>
              <span class="menu-name">Billing</span>
            </router-link>
            <router-link to="/finance/invoices" class="nav-link">
              <i class="menu-icon bi bi-receipt"></i>
              <span class="menu-name">Invoices</span>
            </router-link>
            <router-link to="/finance/discounts" class="nav-link">
              <i class="menu-icon bi bi-tags"></i>
              <span class="menu-name">Discount</span>
            </router-link>
          </div>
        </li>

        <!-- Integration -->
        <li class="nav-item">
          <router-link to="/integration" class="nav-link">
            <i class="menu-icon bi bi-gear-wide-connected"></i>
            <span class="menu-name">Integrations</span>
          </router-link>
        </li>

        <!-- Settings -->
        <li class="nav-item">
          <router-link to="/settings" class="nav-link">
            <i class="menu-icon" data-feather="settings"></i>
            <span class="menu-name">Settings</span>
          </router-link>
        </li>
      </ul>

      <!-- Other Menu -->
      <div class="px-3 not-iconic mt-4">
        <h6 class="fw-medium small text-uppercase opacity-50">Other</h6>
      </div>

      <ul class="nav flex-column menu-active-line mt-3">
        <li class="nav-item">
          <router-link to="/pages" class="nav-link">
            <i class="menu-icon bi bi-layers"></i>
            <span class="menu-name">Pages</span>
            <span class="badge text-bg-primary mx-2">45+</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/personalization" class="nav-link">
            <i class="menu-icon bi bi-palette h4"></i>
            <span class="menu-name">Personalize <small class="fs-14 bi bi-heart-fill text-danger"></small></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/components" class="nav-link">
            <i class="menu-icon bi bi-cpu"></i>
            <span class="menu-name">Components</span>
          </router-link>
        </li>
      </ul>

      <!-- Sidebar Footer -->
      <div class="mt-auto"></div>
      <div class="px-3 not-iconic">
        <!-- Subscription Card -->
        <div class="card adminuiux-card bg-theme-l-gradient mb-3">
          <div class="card-body">
            <div class="row gx-3 mb-2">
              <div class="col">
                <p class="mb-0"><i class="bi bi-basket me-1"></i> Free Plan</p>
              </div>
              <div class="col-auto">
                <p class="small opacity-75">4 days left</p>
              </div>
            </div>
            <div class="progress height-dynamic bg-white-opacity mb-2">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style="width: 45%"></div>
            </div>
            <router-link to="/subscription/upgrade" class="btn btn-sm btn-accent">Upgrade <i class="bi bi-arrow-right"></i></router-link>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card adminuiux-card shadow-sm border-0">
          <div class="card-body p-2">
            <div class="row gx-2">
              <div class="col-12 d-flex justify-content-between">
                <router-link to="/product/add" class="btn btn-square btn-link">
                  <span class="position-relative">
                    <i data-feather="package"></i>
                    <span class="position-absolute top-0 start-100 translate-middle p-1 bg-warning rounded-circle"></span>
                  </span>
                </router-link>
                <router-link to="/calendar" class="btn btn-square btn-link">
                  <span class="position-relative">
                    <i data-feather="calendar"></i>
                    <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
                  </span>
                </router-link>
                <router-link to="/inbox" class="btn btn-square btn-link">
                  <i data-feather="inbox"></i>
                </router-link>
                <router-link to="/help-center" class="btn btn-square btn-link">
                  <i data-feather="help-circle"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.adminuiux-sidebar {
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 70px !important;
}

.sidebar-collapsed .menu-name,
.sidebar-collapsed .badge,
.sidebar-collapsed .company-tagline,
.sidebar-collapsed .text-uppercase {
  display: none !important;
}

.sidebar-collapsed .adminuiux-sidebar-inner {
  padding: 10px 5px;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 10px 5px !important;
}
</style>
