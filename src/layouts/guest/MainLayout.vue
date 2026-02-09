<template>
  <div class="page-wrapper">
    <!-- Preloader - Notez le changement ici -->
    <Preloader v-if="!actualHidePreloader && shouldShowPreloader" />

    <!-- Main Header -->
    <Header v-if="!actualHideHeader" />

    <!-- Contenu principal -->
    <main :class="{ 'auth-layout': actualHideHeader || actualHideFooter }">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer v-if="!actualHideFooter" />

    <!-- Language Switcher -->
    <LanguageSwitcher v-if="actualShowLanguageSwitcher && !actualHideHeader" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Preloader from './Preloader.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const route = useRoute()

// Définir les props reçues du composant parent
const props = defineProps({
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  hidePreloader: {
    type: Boolean,
    default: false
  },
  showLanguageSwitcher: {
    type: Boolean,
    default: false
  }
})

// Récupérer les props de la route meta
const layoutProps = computed(() => {
  console.log('Route meta:', route.meta)
  console.log('Route path:', route.path)
  return route.meta.layoutProps || {}
})

// Fusionner les props du composant et de la route (priorité aux props directes)
const actualHideHeader = computed(() => {
  const fromProps = props.hideHeader
  const fromRoute = layoutProps.value.hideHeader
  console.log('Header - From props:', fromProps, 'From route:', fromRoute)
  return fromProps || fromRoute || false
})

const actualHideFooter = computed(() => {
  const fromProps = props.hideFooter
  const fromRoute = layoutProps.value.hideFooter
  console.log('Footer - From props:', fromProps, 'From route:', fromRoute)
  return fromProps || fromRoute || false
})

const actualHidePreloader = computed(() => {
  const fromProps = props.hidePreloader
  const fromRoute = layoutProps.value.hidePreloader
  console.log('Preloader - From props:', fromProps, 'From route:', fromRoute)
  return fromProps || fromRoute || false
})

const actualShowLanguageSwitcher = computed(() => {
  const fromProps = props.showLanguageSwitcher
  const fromRoute = layoutProps.value.showLanguageSwitcher
  console.log('LanguageSwitcher - From props:', fromProps, 'From route:', fromRoute)
  return fromProps || fromRoute || false
})

// Logique pour déterminer si le preloader doit être affiché
const shouldShowPreloader = computed(() => {
  // Logique de votre preloader ici
  // Par exemple: return !preloaderAlreadyShown && !isRefresh
  return true // À adapter
})
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.auth-layout {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
  background: linear-gradient(135deg, #063232 0%, #061419 50%, #063232 100%);
}

main {
  flex: 1;
}
</style>
