// locales/index.js
import { createI18n } from 'vue-i18n'

// Import des fichiers JSON - assurez-vous que les chemins sont corrects
import en from './en.json'
import fr from './fr.json'

// Configuration i18n
const i18n = createI18n({
  legacy: false, // Utiliser Composition API (Vue 3)
  locale: localStorage.getItem('locale') || 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de repli
  messages: {
    en,
    fr,
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
    fr: {
      currency: {
        style: 'currency',
        currency: 'EUR',
      },
    },
  },
})

export default i18n
