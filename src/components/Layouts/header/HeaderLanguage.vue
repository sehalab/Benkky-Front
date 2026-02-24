<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const dropdownOpen = ref(false);
const isLightMode = ref(false);

// Récupération de la locale i18n
const { locale } = useI18n();

// Mapping des langues supportées
const languages = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'fr', name: 'Français', flag: 'fr' }
];

// Initialisation de la langue au chargement du composant
const initializeLanguage = () => {
  // Vérifier d'abord dans localStorage
  const savedLang = localStorage.getItem('user-language');

  // Vérifier si la langue sauvegardée est supportée
  if (savedLang && languages.some(l => l.code === savedLang)) {
    locale.value = savedLang;
  } else {
    // Optionnel: Détecter la langue du navigateur
    const browserLang = navigator.language.split('-')[0];
    if (languages.some(l => l.code === browserLang)) {
      locale.value = browserLang;
      localStorage.setItem('user-language', browserLang);
    } else {
      // Par défaut: français
      locale.value = 'fr';
      localStorage.setItem('user-language', 'fr');
    }
  }

  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = locale.value;
};

// Détection du mode light/dark
const detectLightMode = () => {
  // Vérifier si le body a une classe light-mode
  isLightMode.value = document.body.classList.contains('light-mode') ||
                      document.body.classList.contains('light') ||
                      document.documentElement.classList.contains('light-mode') ||
                      document.documentElement.classList.contains('light');

  // Vérifier aussi via prefers-color-scheme
  if (!isLightMode.value) {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    isLightMode.value = prefersLight;
  }
};

// Langue sélectionnée calculée à partir de i18n
const selectedLang = computed({
  get() {
    return languages.find(l => l.code === locale.value) || languages[0];
  },
  set(lang) {
    // Mettre à jour la locale i18n
    locale.value = lang.code;

    // Sauvegarder dans localStorage
    localStorage.setItem('user-language', lang.code);

    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = lang.code;

    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: lang.code } }));
  }
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectLanguage = (lang) => {
  selectedLang.value = lang;
  dropdownOpen.value = false;
};

// Fermer le dropdown si on clique ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('#lang_selector')) {
    dropdownOpen.value = false;
  }
};

// Observer les changements de thème
const observeThemeChanges = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        detectLightMode();
      }
    });
  });

  observer.observe(document.body, { attributes: true });
  observer.observe(document.documentElement, { attributes: true });

  return observer;
};

// Écouter les changements de préférence de couleur système
const listenToColorSchemeChange = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const handler = (e) => {
    isLightMode.value = e.matches;
  };

  mediaQuery.addEventListener('change', handler);
  return { mediaQuery, handler };
};

onMounted(() => {
  initializeLanguage();
  detectLightMode();

  const themeObserver = observeThemeChanges();
  const { mediaQuery, handler } = listenToColorSchemeChange();

  window.addEventListener('click', handleClickOutside);

  // Nettoyage
  onUnmounted(() => {
    themeObserver.disconnect();
    mediaQuery.removeEventListener('change', handler);
    window.removeEventListener('click', handleClickOutside);
  });
});
</script>

<template>
  <li id="lang_selector" class="language-selector-item">
    <i class="fa-solid fa-globe" :class="{ 'text-dark': isLightMode }"></i>
    <div class="language-switcher-hover" @click="toggleDropdown">
      <span class="current-language" :class="{ 'text-dark': isLightMode, 'text-light': !isLightMode }">
        <span class="flag">{{ selectedLang.code === 'fr' ? '🇫🇷' : '🇺🇸' }}</span>
        {{ selectedLang.name }}
      </span>
      <i class="fa-solid fa-chevron-down ms-1" :class="{ 'text-dark': isLightMode, 'text-light': !isLightMode }"></i>

      <!-- Menu déroulant -->
      <div class="language-dropdown-menu" :class="{ 'show': dropdownOpen }">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="selectLanguage(lang)"
          class="language-option"
          :class="{ 'active': lang.code === selectedLang.code }"
        >
          <span class="flag">{{ lang.code === 'fr' ? '🇫🇷' : '🇺🇸' }}</span>
          {{ lang.name }}
          <i v-if="lang.code === selectedLang.code" class="fa-solid fa-check ms-2"></i>
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
#lang_selector {
  position: relative;
  overflow: visible !important;
  list-style: none;
}

.language-switcher-hover {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  overflow: visible !important;
}

.language-switcher-hover:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Header principal (première ligne) - fond clair */
.header-top .language-switcher-hover:hover {
  background: rgba(0, 0, 0, 0.05);
}

.current-language {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Couleurs adaptatives */
.text-dark {
  color: #333333 !important;
}

.text-light {
  color: #ffffff !important;
}

.fa-globe,
.fa-chevron-down {
  transition: color 0.3s ease;
}

/* Icônes dans le header principal */
.header-top .fa-globe,
.header-top .fa-chevron-down {
  color: #333333;
}

/* Menu déroulant - toujours lisible */
.language-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 99999 !important;
  padding: 8px 0;
  margin-top: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  pointer-events: auto;
}

.language-dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  text-align: left;
  color: #333333 !important; /* Toujours sombre sur fond blanc */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.language-option:hover {
  background: #f5f5f5;
  color: #a87f1f !important;
}

.language-option.active {
  background: #f0f9ff;
  color: #007bff !important;
  font-weight: 600;
}

.language-option .flag {
  font-size: 18px;
  width: 24px;
  display: inline-block;
  text-align: center;
}

.language-option .fa-check {
  font-size: 12px;
  color: #007bff;
  margin-left: auto;
}

/* Pour le header fixe (fond sombre) */
.fixed-header .language-switcher-hover .current-language,
.fixed-header .language-switcher-hover .fa-chevron-down,
.fixed-header .fa-globe {
  color: #ffffff !important;
}

.fixed-header .language-switcher-hover:hover {
  background: rgba(255, 255, 255, 0.1);
}

.fixed-header .language-dropdown-menu {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

/* Pour le header principal avec fond clair */
.header-top .language-switcher-hover .current-language,
.header-top .language-switcher-hover .fa-chevron-down,
.header-top .fa-globe {
  color: #333333 !important;
}

/* Media query pour détection automatique */
@media (prefers-color-scheme: light) {
  .current-language:not(.fixed-header .current-language) {
    color: #333333;
  }

  .fa-chevron-down:not(.fixed-header .fa-chevron-down),
  .fa-globe:not(.fixed-header .fa-globe) {
    color: #333333;
  }
}

/* Styles spécifiques pour le mode light basé sur les classes */
:global(body.light-mode) #lang_selector .fa-globe,
:global(body.light-mode) #lang_selector .current-language,
:global(body.light-mode) #lang_selector .fa-chevron-down,
:global(body.light) #lang_selector .fa-globe,
:global(body.light) #lang_selector .current-language,
:global(body.light) #lang_selector .fa-chevron-down {
  color: #333333 !important;
}

:global(html.light-mode) #lang_selector .fa-globe,
:global(html.light-mode) #lang_selector .current-language,
:global(html.light-mode) #lang_selector .fa-chevron-down,
:global(html.light) #lang_selector .fa-globe,
:global(html.light) #lang_selector .current-language,
:global(html.light) #lang_selector .fa-chevron-down {
  color: #333333 !important;
}

/* S'assurer que les parents n'ont pas d'overflow caché */
.language-selector-item,
.info-list,
.top-left,
.auto-container {
  overflow: visible !important;
  position: relative;
  z-index: 99999;
}

/* Pour le menu mobile */
.mobile-language-selector .current-language,
.mobile-language-selector .fa-chevron-down,
.mobile-language-selector .fa-globe {
  color: #ffffff !important; /* Toujours blanc sur fond sombre du menu mobile */
}

/* Ajustements responsifs */
@media (max-width: 991px) {
  .language-switcher-hover {
    padding: 5px 8px;
  }

  .current-language {
    font-size: 13px;
  }

  .flag {
    font-size: 16px;
  }
}
</style>
