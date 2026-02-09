import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locales/index.js' // IMPORTANT: avec .js explicite

// Importer les CSS depuis src/assets
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/flatpickr.min.css'
import '@/assets/css/slick.css'
import '@/assets/css/slick-theme.css'
import '@/assets/css/style.css'
import '@/assets/css/style-dark.css'

// Créer et configurer l'app Vue
const app = createApp(App)
const pinia = createPinia()

// Utiliser les plugins
app.use(pinia)
app.use(router)
app.use(i18n)

// Monter l'application
app.mount('#app')

// Optionnel : Définir la langue sur l'élément HTML
document.documentElement.lang = i18n.global.locale
