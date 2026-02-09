<template>
    <div class="mobile-menu">
        <div class="menu-backdrop" @click="closeMenu"></div>
        <nav class="menu-box">
            <div class="upper-box">
                <div class="nav-logo">
                    <Link href="/">
                        <img src="/images/logo_benkky.png" alt="Logo">
                    </Link>
                </div>
                <div class="close-btn" @click="closeMenu">
                    <i class="icon fa fa-times"></i>
                </div>
            </div>

            <!-- Menu de navigation mobile -->
            <ul class="navigation clearfix d-block d-lg-none">
                <li v-for="item in mobileMenuItems" :key="item.id">
                    <Link :href="item.url" @click="closeMenu">{{ item.label }}</Link>
                </li>
            </ul>

            <!-- Contenu pour desktop -->
            <div class="content-box d-none d-lg-block">
                <h4 class="title">About Us</h4>
                <p class="text">Consultez is the go-to hub for early adopters and innovation enthusiasts, offering cutting technology widely.</p>
            </div>

            <!-- Contact Info -->
            <ul class="contact-list-one">
                <li>
                    <div class="contact-info-box">
                        <i class="icon lnr-icon-phone-handset"></i>
                        <span class="title">Call Now</span>
                        <a href="tel:+92880098670">+92 (8800) - 98670</a>
                    </div>
                </li>
                <li>
                    <div class="contact-info-box">
                        <span class="icon lnr-icon-envelope1"></span>
                        <span class="title">Send Email</span>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                </li>
                <li>
                    <div class="contact-info-box">
                        <span class="icon lnr-icon-clock"></span>
                        <span class="title">Working Hours</span>
                        Mon - Sat 8:00 - 6:30, Sunday - CLOSED
                    </div>
                </li>
            </ul>

            <!-- Social Links -->
            <ul class="social-links">
                <li><a href="#"><i class="fab fa-x-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i class="fab fa-pinterest"></i></a></li>
                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close']);

const mobileMenuItems = ref([
    { id: 1, label: 'Home', url: '/' },
    { id: 2, label: 'About', url: '/about' },
    { id: 3, label: 'Services', url: '/services' },
    { id: 4, label: 'Portfolio', url: '/portfolio' },
    { id: 5, label: 'News', url: '/news' },
    { id: 6, label: 'Contact', url: '/contact' }
]);

const closeMenu = () => {
    emit('close');
};
</script>
