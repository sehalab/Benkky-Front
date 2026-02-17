<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Sidebar from "@/components/Layouts/sidebar/index.vue";
import HeaderMain from "@/components/Layouts/header/index.vue";
import FooterSection from "@/components/Layouts/footer/index.vue";
import Customizer from '@/components/Customizer/index.vue';
import WelcomeModal from "@/components/Layouts/WelcomeModal.vue";
import ScrollToTop from "@/components/Layouts/ScrollToTop.vue";

const sidebarOpen = ref(false);
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const toggleNav = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleToggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="app-wrapper">
    <Sidebar
        v-model:sidebarOpen="sidebarOpen"
        @toggle-sidebar="handleToggleSidebar"
    />

    <div class="app-content">
      <HeaderMain @toggle-nav="toggleNav" />

      <slot/>
      <FooterSection />
      <ScrollToTop />
      <Customizer />
      <WelcomeModal />
    </div>
  </div>
</template>