<script setup>
import { ref } from 'vue';
import {PhMagnifyingGlass} from "@phosphor-icons/vue";

const searchQuery = ref('');
const searchSettings = ref({
  safeSearch: true,
  searchSuggestions: false,
  customPreferences: false,
});

const recentSearches = ref([
  { title: 'user management', link: '/apps/api', icon: 'ph-gear', id: '#RA789' },
  { title: 'data visualization', link: '/other-pages/privacy-policy', icon: 'ph-projector-screen-chart', id: '#RY810' },
  { title: 'security protocols', link: '/other-pages/terms-condition', icon: 'ph-shield-check', id: '#ATR56' },
  { title: 'authentication methods', link: '/auth-pages/sign-in', icon: 'ph-app-window', id: '#YE615' },
  { title: 'Data Table', link: '/table/data-table', icon: 'ph-table', id: '#YE615' }
]);
</script>

<template>
  <router-link to="#" class="d-block head-icon" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
     aria-controls="offcanvasRight">
    <PhMagnifyingGlass size="24" />
  </router-link>

  <div class="offcanvas offcanvas-end header-searchbar-canvas" tabindex="-1" id="offcanvasRight"
       aria-labelledby="offcanvasRight">
    <div class="header-searchbar-header">
      <div class="d-flex justify-content-between mb-3">
        <form class="app-form app-icon-form w-100" action="#">
          <div class="position-relative">
            <input v-model="searchQuery" type="search" class="form-control search-filter" placeholder="Search..."
                   aria-label="Search">
            <i class="ti ti-search text-dark"></i>
          </div>
        </form>

        <div class="app-dropdown flex-shrink-0">
          <a class="h-35 w-35 d-flex-center b-r-15 overflow-hidden bg-light-secondary search-list-avtar ms-2"
             href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <i class="ph-duotone ph-gear f-s-20"></i>
          </a>

          <ul class="dropdown-menu mb-3">
            <li class="dropdown-item mt-2">
              <a href="#">
                <h6 class="mb-0">Search Settings</h6>
              </a>
            </li>
            <li class="dropdown-item d-flex align-items-center justify-content-between">
              <h6 class="mb-0 text-secondary f-s-14">Safe Search Filtering</h6>
              <div class="form-check form-switch">
                <input v-model="searchSettings.safeSearch" class="form-check-input form-check-primary" type="checkbox">
              </div>
            </li>
            <li class="dropdown-item d-flex align-items-center justify-content-between">
              <h6 class="mb-0 text-secondary f-s-14">Search Suggestions</h6>
              <div class="form-check form-switch">
                <input v-model="searchSettings.searchSuggestions" class="form-check-input form-check-primary" type="checkbox">
              </div>
            </li>
            <li class="dropdown-divider"></li>
            <li class="dropdown-item d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0 text-dark f-s-14">Custom Search Preferences</h6>
              <div class="form-check form-switch">
                <input v-model="searchSettings.customPreferences" class="form-check-input form-check-primary" type="checkbox">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p class="mb-0 text-secondary f-s-15 mt-2">Recently Searched Data:</p>
    </div>

    <div class="offcanvas-body app-scroll p-0">
      <ul class="search-list">
        <li v-for="search in recentSearches" :key="search.id" class="search-list-item">
          <div class="h-35 w-35 d-flex-center b-r-15 overflow-hidden bg-light-secondary search-list-avtar">
            <i :class="`ph-duotone ${search.icon} f-s-20`"></i>
          </div>
          <div class="search-list-content">
            <a :href="search.link" target="_blank">
              <h6 class="mb-0 text-dark">{{ search.title }}</h6>
            </a>
            <p class="f-s-13 mb-0 text-secondary">{{ search.id }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

