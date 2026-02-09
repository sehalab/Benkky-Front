import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

// Configuration i18n
const i18n = createI18n({
  legacy: false, // Utiliser Composition API
  locale: localStorage.getItem('locale') || 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de repli
  messages: {
    en,
    fr
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    },
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    }
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    fr: {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    }
  }
});

// Helper pour changer la langue
export function setLocale(locale) {
  i18n.global.locale.value = locale;
  localStorage.setItem('locale', locale);
  document.documentElement.lang = locale;
}

// Helper pour utiliser i18n dans les templates
export function useI18n() {
  return i18n.global;
}

// Plugin pour utiliser $t globalement
export default {
  install(app) {
    app.use(i18n);

    // Ajouter des helpers globaux
    app.config.globalProperties.$setLocale = setLocale;
    app.config.globalProperties.$t = i18n.global.t;
    app.config.globalProperties.$locale = i18n.global.locale;
  }
};
