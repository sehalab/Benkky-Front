import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()
  const currentLocale = ref(locale.value)

  // Synchroniser avec localStorage
  if (localStorage.getItem('user-language')) {
    currentLocale.value = localStorage.getItem('user-language')
    locale.value = currentLocale.value
  }

  function setLocale(lang) {
    currentLocale.value = lang
    locale.value = lang
    localStorage.setItem('user-language', lang)
    document.documentElement.lang = lang
  }

  // Écouter les changements de locale
  watch(locale, (newLocale) => {
    currentLocale.value = newLocale
  })

  return {
    currentLocale,
    setLocale
  }
})
