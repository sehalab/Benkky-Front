<template>
    <div class="page-wrapper">
        <!-- Preloader -->
        <Preloader v-if="!hidePreloader" />

        <!-- Main Header -->
        <Header v-if="!hideHeader" />

        <!-- Contenu principal -->
        <main :class="{ 'auth-layout': hideHeader || hideFooter }">
            <slot />
        </main>

        <!-- Footer -->
        <Footer v-if="!hideFooter" />

        <!-- Language Switcher (optionnel, peut être dans le Header) -->
        <LanguageSwitcher v-if="showLanguageSwitcher && !hideHeader" />
    </div>
</template>

<script setup lang="ts">
import Preloader from '@/components/Preloader.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const props = defineProps({
    // Option pour cacher le header (utile pour les pages d'authentification)
    hideHeader: {
        type: Boolean,
        default: false
    },
    // Option pour cacher le footer
    hideFooter: {
        type: Boolean,
        default: false
    },
    // Option pour cacher le preloader
    hidePreloader: {
        type: Boolean,
        default: false
    },
    // Option pour afficher le sélecteur de langue
    showLanguageSwitcher: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Pour les pages d'authentification qui n'ont pas de header/footer */
.auth-layout {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0;
}

/* S'assurer que le main prend toute la hauteur disponible */
main {
    flex: 1;
}
</style>
