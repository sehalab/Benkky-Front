<script setup>
import { ref } from 'vue';

const dropdownOpen = ref(false);
const selectedLang = ref({
  code: 'us',
  name: 'US',
  flag: 'flag-icon flag-icon-usa'
});

const languages = [
  { code: 'us', name: 'US', flag: 'flag-icon flag-icon-usa' },
  { code: 'fr', name: 'France', flag: 'flag-icon flag-icon-fra' },
  { code: 'gb', name: 'UK', flag: 'flag-icon flag-icon-gbr' },
  { code: 'it', name: 'Italy', flag: 'flag-icon flag-icon-ita' }
];

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectLanguage = (lang) => {
  selectedLang.value = lang;
  dropdownOpen.value = false;
};
</script>

<template>
  <div id="lang_selector 12" class="flex-shrink-0 dropdown">
    <a href="#" class="head-icon ps-0" @click.prevent="toggleDropdown">
      <div class="lang-flag" :class="`lang-${selectedLang.code}`">
        <span class="flag rounded-circle overflow-hidden">
          <flag :iso="selectedLang.code" class="flag-icon-squared b-r-15 f-s-28" />
        </span>
      </div>
    </a>
    <ul v-if="dropdownOpen" class="dropdown-menu language-dropdown header-card border-0 show">
      <li
          v-for="lang in languages"
          :key="lang.code"
          class="dropdown-item p-2"
          :class="{ selected: lang.code === selectedLang.code }"
          @click="selectLanguage(lang)"
      >
        <span class="d-flex align-items-center">
          <flag :iso="lang.code" class="flag-icon-squared b-r-10 f-s-20"/>
          <span class="ps-2">{{ lang.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
