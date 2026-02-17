<script setup>
import { ref } from "vue";
import {
  BButton,
  BOffcanvas,
  BDropdown,
  BDropdownItem,
  BDropdownDivider
} from "bootstrap-vue-next";

import {
  PhShoppingBagOpen,
  PhEnvelope,
  PhChatCircleText,
  PhProjectorScreenChart,
  PhScroll,
  PhNotebook,
  PhCalendar,
  PhFolderOpen,
  PhGooglePhotosLogo,
  PhUsersThree,
  PhSelectionForeground,
  PhPlus,
  PhBoundingBox,
  PhSlidersHorizontal
} from "@phosphor-icons/vue";

const apps = [
  { name: "E-shop", href: "/apps/e-shop/product", icon: PhShoppingBagOpen, color: "text-light-primary" },
  { name: "Email", href: "/apps/email-page/email", icon: PhEnvelope, color: "text-light-danger" },
  { name: "Chat", href: "/apps/chat", icon: PhChatCircleText, color: "text-light-success" },
  { name: "Project", href: "apps/projects-page/projects", icon: PhProjectorScreenChart, color: "text-light-warning" },
  { name: "Invoice", href: "/apps/invoice", icon: PhScroll, color: "text-light-info" },
  { name: "Blog", href: "/apps/blog-page/blog", icon: PhNotebook, color: "text-light-dark" },
  { name: "Calendar", href: "/apps/calendar", icon: PhCalendar, color: "text-light-danger" },
  { name: "File Manager", href: "/apps/file-manager", icon: PhFolderOpen, color: "text-light-warning" },
  { name: "Gallery", href: "/apps/gallery", icon: PhGooglePhotosLogo, color: "text-light-primary" },
  { name: "Profile", href: "/apps/profile-page/profile", icon: PhUsersThree, color: "text-light-success" },
  { name: "Task Board", href: "/apps/kanban-board", icon: PhSelectionForeground, color: "text-light-secondary" }
];


const showOffcanvas = ref(false);
const notificationsEnabled = ref(false);
const showMoreSettings = ref(false);


const toggleOffcanvas = () => {
  showOffcanvas.value = !showOffcanvas.value;
};

const toggleMoreSettings = () => {
  showMoreSettings.value = !showMoreSettings.value;
};
</script>

<template>
  <div>
    <b-button variant="light-secondary" class="rounded-circle p-2" @click="toggleOffcanvas">
      <PhBoundingBox :size="22" />
    </b-button>

    <b-offcanvas
        v-model="showOffcanvas"
        placement="end"
        class="header-apps-canvas"
        body-class="app-scroll"
    >

      <template #header>
        <h5 class="offcanvas-title">Shortcut</h5>

        <b-dropdown variant="link" class="app-dropdown flex-shrink-0 text-secondary" no-caret>
          <template #button-content>
            <PhSlidersHorizontal :size="20" class="text-secondary"/>
          </template>

          <b-dropdown-item to="/apps/profile-page/setting" target="_blank">Privacy Settings</b-dropdown-item>
          <b-dropdown-item to="/apps/profile-page/setting" target="_blank">Account Settings</b-dropdown-item>
          <b-dropdown-item to="/apps/profile-page/setting" target="_blank">Accessibility</b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item @click="toggleMoreSettings" class="d-flex justify-content-between align-items-center">
            More Settings
            <span v-if="showMoreSettings">▲</span>
            <span v-else>▼</span>
          </b-dropdown-item>

          <div v-if="showMoreSettings" class="submenu p-2 border-top bg-light">
            <b-dropdown-item href="/apps/profile-page/setting" target="_blank">Backup and Restore</b-dropdown-item>
            <b-dropdown-item href="/apps/profile-page/setting" target="_blank">Data Usage</b-dropdown-item>
            <b-dropdown-item href="/apps/profile-page/setting" target="_blank">Theme</b-dropdown-item>
            <b-dropdown-item>
              <div class="d-flex align-items-center justify-content-between">
                <p class="mb-0">Notification</p>
                <input
                    class="form-check-input form-check-primary"
                    id="notificationSwitch"
                    type="checkbox"
                    v-model="notificationsEnabled"
                />
              </div>
            </b-dropdown-item>
          </div>
        </b-dropdown>
      </template>

      <div class="row row-cols-3 g-2">
        <div v-for="(app, index) in apps" :key="index" class="d-flex-center text-center">
          <a
              :class="app.color + ' w-100 rounded-3 py-3 px-2'"
              :href="app.href"
              target="_blank"
          >
            <span>
              <component :is="app.icon" size="30" weight="light" />
            </span>
            <p class="mb-0 f-w-500 text-dark">{{ app.name }}</p>
          </a>
        </div>

        <div class="d-flex-center text-center">
          <router-link
              class="d-flex-center text-light-secondary w-100 h-100 rounded-3 p-2 dashed-1-secondary"
              to="/apps/kanban-board"
              target="_blank"
          >
            <span><PhPlus size="30" weight="light" /></span>
          </router-link>
        </div>
      </div>
    </b-offcanvas>
  </div>
</template>
