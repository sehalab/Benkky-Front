<template>
  <div class="sticky-header" :class="{ active: isSticky }">
    <div class="auto-container">
      <div class="inner-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <img src="/images/logo-light.png" alt="Logo">
          </router-link>
        </div>

        <!-- Right Col -->
        <div class="nav-outer">
          <!-- Main Menu -->
          <nav class="main-menu">
            <ul class="navigation clearfix">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About</router-link></li>
              <li><router-link to="/services">Services</router-link></li>
              <li><router-link to="/portfolio">Portfolio</router-link></li>
              <li><router-link to="/news">News</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </nav>

          <!-- Mobile Navigation Toggler -->
          <div class="mobile-nav-toggler text-white" @click="toggleMobileMenu">
            <span class="icon lnr-icon-bars"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSticky = ref(false);

const handleScroll = () => {
  isSticky.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleMobileMenu = () => {
  // Émettre un événement pour ouvrir le menu mobile
  window.dispatchEvent(new CustomEvent('toggle-mobile-menu'));
};
</script>
