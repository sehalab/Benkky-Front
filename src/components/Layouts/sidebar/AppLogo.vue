<script setup>
import { ref, defineProps, defineEmits } from "vue";
import {BDropdown, BDropdownItem, BDropdownDivider, BImg} from "bootstrap-vue-next";
import {
  PhCaretRight,
  PhCaretLeft,
  PhGear,
  PhUserCircle,
  PhMagnifyingGlass,
  PhUserPlus,
  PhSignOut
} from "@phosphor-icons/vue";

defineProps({
  sidebarOpen: Boolean,
  isMediumScreen: Boolean
});

const emit = defineEmits(["toggle-sidebar"]);

const dropdownOpen = ref(false);
const setDropdownOpen = (isOpen) => {
  dropdownOpen.value = isOpen;
};

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>

<template>
  <div class="app-logo">
    <!-- Logo -->
    <router-link class="logo d-inline-block" to="/">
      <b-img alt="Logo" src="/images/logo/1.png"/>
    </router-link>

    <span
        class="bg-light-primary toggle-semi-nav d-flex-center cursor-pointer"
        @click="toggleSidebar"
    >
      <PhCaretRight v-if="!sidebarOpen" size="16"/>
      <PhCaretLeft v-else size="16"/>
    </span>

    <div class="d-flex align-items-center nav-profile p-3">
      <span class="h-45 w-45 d-flex-center b-r-10 position-relative bg-danger m-auto">
        <img alt="avatar" class="img-fluid b-r-10" src="/images/avatar/woman.jpg"/>
        <span
            class="position-absolute top-0 end-0 p-1 bg-success border border-light rounded-circle"
        />
      </span>

      <div class="flex-grow-1 ps-2">
        <h6 class="text-primary mb-0">Ninfa Monaldo</h6>
        <p class="text-muted f-s-12 mb-0">Web Developer</p>
      </div>

      <!-- Profile Dropdown -->
      <b-dropdown
          :model-value="dropdownOpen"
          @update:model-value="setDropdownOpen"
          variant="white"
          toggle-class="p-0"
          menu-class="dropdown-menu"
          class="profile-menu-dropdown dropdown-icon-none"
          no-caret
      >
        <template #button-content>
          <PhGear size="20"/>
        </template>

        <b-dropdown-item as="router-link" to="/apps/profile-page/profile" target="_blank">
          <PhUserCircle size="20" class="me-1"/>
          Profile Details
        </b-dropdown-item>

        <b-dropdown-item as="router-link" to="/apps/profile-page/setting" target="_blank">
          <PhGear size="20" class="me-1"/>
          Settings
        </b-dropdown-item>

        <b-dropdown-item as="div">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <RouterLink class="f-w-500" to="#">
                <PhMagnifyingGlass size="20" class="me-1"/>
                Incognito
              </RouterLink>
            </div>
            <div class="flex-shrink-0">
              <div class="form-check form-switch">
                <input
                    class="form-check-input form-check-primary"
                    id="incognitoSwitch"
                    type="checkbox"
                />
              </div>
            </div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item
            as="router-link"
            to="/auth-pages/sign-up"
            target="_blank"
            class="mb-0 text-secondary f-w-500"
        >
          <PhUserPlus size="20" class="me-1"/>
          Add account
        </b-dropdown-item>

        <b-dropdown-divider class="app-divider-v dotted py-1"/>

        <b-dropdown-item
            as="router-link"
            to="/auth-pages/sign-in"
            target="_blank"
            class="mb-0 text-danger"
        >
          <PhSignOut size="20" class="me-1"/>
          Log Out
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>