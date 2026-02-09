// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locales/index.js'

// Importer les CSS - vérifiez que les chemins sont corrects
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/flatpickr.min.css'
import '@/assets/css/slick.css'
import '@/assets/css/slick-theme.css'
import '@/assets/css/style.css'
import '@/assets/css/style-dark.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

// Optionnel : Définir la langue sur l'élément HTML
document.documentElement.lang = i18n.global.locale
