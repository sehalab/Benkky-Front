<template>
    <div class="sticky-header" :class="{ active: isSticky }">
        <div class="auto-container">
            <div class="inner-container">
                <!-- Logo -->
                <div class="logo">
                    <Link href="/">
                        <img src="/images/logo-light.png" alt="Logo">
                    </Link>
                </div>

                <!-- Right Col -->
                <div class="nav-outer">
                    <!-- Main Menu -->
                    <nav class="main-menu">
                        <ul class="navigation clearfix">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/news">News</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
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
import { Link } from '@inertiajs/vue3';
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
