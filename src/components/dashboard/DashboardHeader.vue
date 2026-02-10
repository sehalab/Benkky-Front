<template>
  <header class="adminuiux-header">
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <!-- Sidebar Toggle -->
        <button class="btn btn-link btn-square sidebar-toggler" type="button" @click="$emit('toggle-sidebar')">
          <i class="sidebar-svg" data-feather="menu"></i>
        </button>

        <!-- Logo -->
        <router-link class="navbar-brand" to="/dashboard">
          <img data-bs-img="light" src="/assets/img/logo-light.svg" alt="Logo Light">
          <img data-bs-img="dark" src="/assets/img/logo.svg" alt="Logo Dark">
          <div>
            <span class="h4">eComm<span class="fw-bold">UI</span><span>UX</span></span>
            <p class="company-tagline">Admin HTML template</p>
          </div>
        </router-link>

        <!-- Right Icons -->
        <div class="ms-auto">
          <!-- Search -->
          <button class="btn btn-link btn-square btn-icon btn-link-header" type="button" data-bs-toggle="modal" data-bs-target="#searchmodalfull">
            <i data-feather="search"></i>
          </button>

          <!-- Dark Mode -->
          <button class="btn btn-link btn-square btnsunmoon btn-link-header" @click="$emit('toggle-dark-mode')">
            <i class="sun mx-auto" data-feather="sun"></i>
            <i class="moon mx-auto" data-feather="moon"></i>
          </button>

          <!-- Applications Dropdown -->
          <ApplicationsDropdown />

          <!-- Language Dropdown -->
          <LanguageDropdown />

          <!-- Notifications -->
          <button class="btn btn-link btn-square btn-icon btn-link-header position-relative" data-bs-toggle="offcanvas" data-bs-target="#view-notification">
            <i data-feather="bell"></i>
            <span class="position-absolute top-0 end-0 badge rounded-pill bg-danger p-1">
              <small>9+</small>
            </span>
          </button>

          <!-- Profile Dropdown -->
          <ProfileDropdown :user="user" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import ApplicationsDropdown from './dropdowns/ApplicationsDropdown.vue'
import LanguageDropdown from './dropdowns/LanguageDropdown.vue'
import ProfileDropdown from './dropdowns/ProfileDropdown.vue'

export default {
  name: 'DashboardHeader',
  components: {
    ApplicationsDropdown,
    LanguageDropdown,
    ProfileDropdown
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // Initialiser Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace()
    }
  }
}
</script>
