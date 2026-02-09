<template>
  <div class="language-switcher">
    <button
      v-for="locale in availableLocales"
      :key="locale"
      @click="switchLanguage(locale)"
      :class="{ 'active': currentLocale === locale }"
      class="language-btn"
    >
      {{ getLanguageFlag(locale) }} {{ getLanguageName(locale) }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);
const availableLocales = ['fr', 'en'];

const switchLanguage = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  document.documentElement.lang = newLocale;

  window.dispatchEvent(new CustomEvent('language-changed', { detail: newLocale }));
};

const getLanguageName = (locale) => {
  const names = {
    'en': 'English',
    'fr': 'Français'
  };
  return names[locale] || locale.toUpperCase();
};

const getLanguageFlag = (locale) => {
  const flags = {
    'en': '🇬🇧',
    'fr': '🇫🇷'
  };
  return flags[locale] || '🌐';
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 8px;
  align-items: center;
}

.language-btn {
  padding: 6px 12px;
  border: 1px solid #8cd116;
  background: rgba(112, 148, 92, 0);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.language-btn:hover {
  background: #036340;
  border-color: #164f8c;
}

.language-btn.active {
  background: #0c4c4e;
  color: rgb(255, 255, 255);
  border-color: #13a747;
}

.language-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}
</style>
