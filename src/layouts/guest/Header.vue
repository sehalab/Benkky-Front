<template>
  <!-- Menu fixe qui apparaît au scroll -->
  <header class="fixed-header" :class="{ 'visible': isScrolled }">
    <div class="fixed-header-content">
      <!-- Logo -->
      <div class="fixed-logo">
        <router-link to="/">
          <img src="/images/logo_benkky.png" alt="Consultez" title="Consultez">
        </router-link>
      </div>

      <!-- Navigation fixe -->
      <nav class="fixed-navigation">
        <ul class="fixed-nav-list">
          <li><router-link to="/">{{ $t('navigation.home') }}</router-link></li>
          <li class="dropdown">
            <a href="#">Pages <i class="fa-solid fa-chevron-down"></i></a>
            <ul class="dropdown-menu">
              <li><router-link to="/about">{{ $t('navigation.about') }}</router-link></li>
              <li><router-link to="/faq">Faq</router-link></li>
              <li><router-link to="/team">Team</router-link></li>
            </ul>
          </li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/portfolio">Portfolio</router-link></li>
          <li><router-link to="/news-grid">News</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>

      <!-- Boutons d'action fixes -->
      <div class="fixed-actions">
        <div class="fixed-phone">
          <i class="fa-solid fa-phone"></i>
          <a href="tel:+243979515256">+243 979 515 256</a>
        </div>

        <!-- MODIFIÉ ICI : Condition pour l'état connecté/déconnecté -->
        <div v-if="isAuthenticated" class="user-profile-menu">
          <router-link class="fixed-btn-profile" to="/dashboard">
            <div class="user-avatar-small">
              <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.first_name" @error="handleAvatarError" />
              <i v-else class="fa-regular fa-user"></i>
            </div>
            <span class="user-name">
              {{ displayName }}
            </span>
            <i class="fa-solid fa-chevron-down dropdown-icon"></i>
          </router-link>

          <!-- Menu déroulant utilisateur -->
          <div class="user-dropdown-menu">
            <router-link to="/dashboard">
              <i class="fa-solid fa-gauge"></i>
              {{ $t('navigation.dashboard') }}
            </router-link>
            <router-link to="/profile">
              <i class="fa-regular fa-user"></i>
              {{ $t('navigation.profile') }}
            </router-link>
            <router-link to="/settings">
              <i class="fa-solid fa-gear"></i>
              {{ $t('navigation.settings') }}
            </router-link>
            <div class="dropdown-divider"></div>
            <button @click="logout" class="logout-btn">
              <i class="fa-solid fa-right-from-bracket"></i>
              {{ $t('navigation.logout') }}
            </button>
          </div>
        </div>

        <!-- Bouton d'inscription quand non connecté -->
        <router-link v-else class="fixed-btn-inscription" to="/auth/login">
          {{ $t('navigation.sign_in') }}
          | {{ $t('navigation.sign_up') }} <i class="fa-regular fa-angle-right"></i>
        </router-link>
      </div>
    </div>
  </header>

  <!-- Menu principal original -->
  <header class="main-header header-style-three">
    <!-- Header Top -->
    <div class="header-top">
      <div class="auto-container">
        <div class="top-left">
          <ul class="info-list">
            <li>
              <span class="fa-regular fa-clock"></span>
              {{ $t('navigation.open_hours') }}:
              <span>{{ $t('navigation.hours_range') }}</span>
            </li>
          </ul>
          <ul class="info-list">
            <!-- Sélecteur de langue MODIFIÉ : Menu déroulant au survol -->
            <li class="language-selector-item">
              <i class="fa-solid fa-globe"></i>
              <div class="language-switcher-hover">
                <span class="current-language">
                  {{ currentLanguageFlag }} {{ currentLanguageName }}
                </span>
                <i class="fa-solid fa-chevron-down ms-1"></i>

                <!-- Menu déroulant au survol - EN PREMIER PLAN -->
                <div class="language-dropdown-menu">
                  <button
                    @click="switchLanguage('fr')"
                    class="language-option"
                    :class="{ 'active': currentLocale === 'fr' }"
                  >
                    <span class="flag">🇫🇷</span> Français
                    <i v-if="currentLocale === 'fr'" class="fa-solid fa-check ms-2"></i>
                  </button>
                  <button
                    @click="switchLanguage('en')"
                    class="language-option"
                    :class="{ 'active': currentLocale === 'en' }"
                  >
                    <span class="flag">🇺🇸</span> English
                    <i v-if="currentLocale === 'en'" class="fa-solid fa-check ms-2"></i>
                  </button>
                </div>
              </div>
            </li>
            <li><i class="fa-solid fa-location-dot"></i>{{ $t('navigation.address') }}</li>
          </ul>
        </div>

        <div class="top-right">
          <ul class="top-social-icon">
            <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main box -->
    <div class="main-box">
      <div class="logo-box">
        <div class="logo">
          <router-link to="/">
            <img src="/images/logo_benkky.png" alt="Consultez" title="Consultez">
          </router-link>
        </div>
      </div>

      <!-- Nav Box -->
      <div class="nav-outer">
        <nav class="nav main-menu">
          <ul class="navigation">
            <li class="dropdown">
              <router-link to="/">{{ $t('navigation.home') }}</router-link>
            </li>

            <li class="dropdown">
              <a href="#">Pages</a>
              <ul>
                <li><router-link to="/about">{{ $t('navigation.about') }}</router-link></li>
                <li><router-link to="/faq">Faq</router-link></li>
                <li><router-link to="/pricing">Pricing</router-link></li>
                <li class="dropdown">
                  <a href="#">{{ $t('navigation.team') }}</a>
                  <ul>
                    <li><router-link to="/team">Team List</router-link></li>
                    <li><router-link to="/team-details">Team Details</router-link></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#">Shop</a>
                  <ul>
                    <li><router-link to="/shop">Products</router-link></li>
                    <li><router-link to="/shop-sidebar">Products with Sidebar</router-link></li>
                    <li><router-link to="/product-details">Product Details</router-link></li>
                    <li><router-link to="/cart">Cart</router-link></li>
                    <li><router-link to="/checkout">Checkout</router-link></li>
                  </ul>
                </li>
                <li><router-link to="/testimonials">Testimonials</router-link></li>
                <li><router-link to="/404">404</router-link></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#">Services</a>
              <ul>
                <li><router-link to="/services">Services</router-link></li>
                <li><router-link to="/service-details">Services Details</router-link></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#">Portfolio</a>
              <ul>
                <li><router-link to="/portfolio">Portfolio</router-link></li>
                <li><router-link to="/portfolio-details">Portfolio Details</router-link></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#">News</a>
              <ul>
                <li><router-link to="/news-grid">News Grid</router-link></li>
                <li><router-link to="/news-details">News Details</router-link></li>
              </ul>
            </li>

            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </div>

      <div class="outer-box">
        <div class="info-box">
          <div class="call-info">
            <i class="fa-solid fa-phone ring__animation"></i>
            <div>
              <h6 class="title">Phone:</h6>
              <a href="tel:00190000000">+243 979515256</a>
            </div>
          </div>

          <!-- MODIFIÉ ICI AUSSI pour le menu principal -->
          <div class="separator"></div>

          <div v-if="isAuthenticated" class="user-profile-main">
            <div class="user-profile-toggle">
              <div class="user-avatar-main">
                <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.first_name" @error="handleAvatarError" />
                <div v-else class="avatar-initial">
                  {{ getUserInitial }}
                </div>
              </div>
              <span class="user-greeting">
                {{ displayName }}
              </span>
              <i class="fa-solid fa-chevron-down"></i>
            </div>

            <div class="user-dropdown-main">
              <router-link to="/dashboard">
                <i class="fa-solid fa-gauge"></i>
                {{ $t('navigation.dashboard') }}
              </router-link>
              <router-link to="/wallet">
                <i class="fa-solid fa-wallet"></i>
                {{ $t('navigation.wallet') }}
              </router-link>
              <router-link to="/cards">
                <i class="fa-regular fa-credit-card"></i>
                {{ $t('navigation.cards') }}
              </router-link>
              <router-link to="/transactions">
                <i class="fa-solid fa-exchange-alt"></i>
                {{ $t('navigation.transactions') }}
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/profile">
                <i class="fa-regular fa-user"></i>
                {{ $t('navigation.profile') }}
              </router-link>
              <router-link to="/settings">
                <i class="fa-solid fa-gear"></i>
                {{ $t('navigation.settings') }}
              </router-link>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="logout-btn-main">
                <i class="fa-solid fa-right-from-bracket"></i>
                {{ $t('navigation.logout') }}
              </button>
            </div>
          </div>

          <!-- Bouton d'inscription quand non connecté -->
          <router-link v-else class="btn-inscription" to="/auth/login">
            {{ $t('navigation.sign_in') }}
            | {{ $t('navigation.sign_up') }} <i class="fa-regular fa-angle-right"></i>
          </router-link>
        </div>

        <div class="mobile-nav-toggler d-block d-lg-none text-white">
          <div class="custom-burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <MobileMenu />

    <!-- Header Search -->
    <HeaderSearch />

    <!-- Sticky Header -->
    <StickyHeader />
  </header>

  <!-- NOUVEAU : Menu Dropdown Mobile -->
  <div class="mobile-dropdown-menu" :class="{ 'open': isMobileMenuOpen, 'scrolled': isMobileScrolled }">
    <!-- Overlay pour fermer le menu -->
    <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>

    <!-- Contenu du menu mobile -->
    <div class="mobile-menu-content">
      <!-- Header du menu mobile AVEC FIXED -->
      <div class="mobile-menu-header fixed-mobile-header">
        <div class="mobile-logo">
          <router-link to="/" @click="closeMobileMenu">
            <img src="/images/logo_benkky.png" alt="Benkky" title="Benkky">
          </router-link>
        </div>
        <button class="mobile-menu-close" @click="closeMobileMenu">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>

      <!-- Contenu scrollable -->
      <div class="mobile-scrollable-content">
        <!-- Informations de contact mobile -->
        <div class="mobile-contact-info">
          <div class="mobile-info-item">
            <i class="fa-solid fa-clock"></i>
            <div>
              <strong>{{ $t('navigation.open_hours') }}</strong>
              <p>{{ $t('navigation.hours_range') }}</p>
            </div>
          </div>

          <div class="mobile-info-item">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>{{ $t('navigation.address') }}</strong>
              <p>684 West College St. Sun City, USA</p>
            </div>
          </div>

          <div class="mobile-info-item">
            <i class="fa-solid fa-phone"></i>
            <div>
              <strong>{{ $t('navigation.phone') }}</strong>
              <a href="tel:+243979515256">+243 979 515 256</a>
            </div>
          </div>
        </div>

        <!-- Navigation mobile -->
        <nav class="mobile-navigation">
          <ul class="mobile-nav-list">
            <li>
              <router-link to="/" @click="closeMobileMenu" class="mobile-nav-link">
                <i class="fa-solid fa-home"></i>
                {{ $t('navigation.home') }}
              </router-link>
            </li>

            <li class="mobile-dropdown">
              <div class="mobile-nav-link dropdown-toggle" @click="toggleMobileDropdown('pages')">
                <i class="fa-solid fa-file"></i>
                Pages
                <i class="fa-solid fa-chevron-down" :class="{ 'rotated': activeMobileDropdown === 'pages' }"></i>
              </div>
              <div class="mobile-dropdown-content" v-show="activeMobileDropdown === 'pages'">
                <router-link to="/about" @click="closeMobileMenu">{{ $t('navigation.about') }}</router-link>
                <router-link to="/faq" @click="closeMobileMenu">FAQ</router-link>
                <router-link to="/team" @click="closeMobileMenu">{{ $t('navigation.team') }}</router-link>
                <router-link to="/pricing" @click="closeMobileMenu">Pricing</router-link>
              </div>
            </li>

            <li class="mobile-dropdown">
              <div class="mobile-nav-link dropdown-toggle" @click="toggleMobileDropdown('services')">
                <i class="fa-solid fa-cogs"></i>
                Services
                <i class="fa-solid fa-chevron-down" :class="{ 'rotated': activeMobileDropdown === 'services' }"></i>
              </div>
              <div class="mobile-dropdown-content" v-show="activeMobileDropdown === 'services'">
                <router-link to="/services" @click="closeMobileMenu">Services</router-link>
                <router-link to="/service-details" @click="closeMobileMenu">Services Details</router-link>
              </div>
            </li>

            <li>
              <router-link to="/portfolio" @click="closeMobileMenu" class="mobile-nav-link">
                <i class="fa-solid fa-briefcase"></i>
                Portfolio
              </router-link>
            </li>

            <li>
              <router-link to="/news-grid" @click="closeMobileMenu" class="mobile-nav-link">
                <i class="fa-solid fa-newspaper"></i>
                News
              </router-link>
            </li>

            <li>
              <router-link to="/contact" @click="closeMobileMenu" class="mobile-nav-link">
                <i class="fa-solid fa-envelope"></i>
                {{ $t('navigation.contact') }}
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Section authentification mobile -->
        <div class="mobile-auth-section">
          <div v-if="isAuthenticated" class="mobile-user-profile">
            <div class="mobile-user-info">
              <div class="mobile-user-avatar">
                <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.first_name" @error="handleAvatarError" />
                <div v-else class="mobile-avatar-initial">
                  {{ getUserInitial }}
                </div>
              </div>
              <div class="mobile-user-details">
                <strong>{{ displayName }}</strong>
                <span>{{ user?.email }}</span>
              </div>
            </div>

            <div class="mobile-user-links">
              <router-link to="/dashboard" @click="closeMobileMenu" class="mobile-user-link">
                <i class="fa-solid fa-gauge"></i>
                {{ $t('navigation.dashboard') }}
              </router-link>
              <router-link to="/profile" @click="closeMobileMenu" class="mobile-user-link">
                <i class="fa-regular fa-user"></i>
                {{ $t('navigation.profile') }}
              </router-link>
              <router-link to="/settings" @click="closeMobileMenu" class="mobile-user-link">
                <i class="fa-solid fa-gear"></i>
                {{ $t('navigation.settings') }}
              </router-link>
              <button @click="logoutMobile" class="mobile-logout-btn">
                <i class="fa-solid fa-right-from-bracket"></i>
                {{ $t('navigation.logout') }}
              </button>
            </div>
          </div>

          <div v-else class="mobile-auth-buttons">
            <router-link to="/auth/login" @click="closeMobileMenu" class="mobile-login-btn">
              <i class="fa-regular fa-user"></i>
              {{ $t('navigation.sign_in') }}
            </router-link>
            <router-link to="/auth/register" @click="closeMobileMenu" class="mobile-register-btn">
              <i class="fa-solid fa-user-plus"></i>
              {{ $t('navigation.sign_up') }}
            </router-link>
          </div>
        </div>

        <!-- Réseaux sociaux mobile -->
        <div class="mobile-social-section">
          <h4>{{ $t('navigation.follow_us') }}</h4>
          <div class="mobile-social-icons">
            <a href="#" class="mobile-social-icon">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" class="mobile-social-icon">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" class="mobile-social-icon">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" class="mobile-social-icon">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Sélecteur de langue mobile -->
        <div class="mobile-language-selector">
          <div class="mobile-language-current" @click="toggleMobileDropdown('language')">
            <i class="fa-solid fa-globe"></i>
            <span>{{ currentLanguageName }}</span>
            <i class="fa-solid fa-chevron-down" :class="{ 'rotated': activeMobileDropdown === 'language' }"></i>
          </div>
          <div class="mobile-language-options" v-show="activeMobileDropdown === 'language'">
            <button
              @click="switchLanguage('fr')"
              class="mobile-language-option"
              :class="{ 'active': currentLocale === 'fr' }"
            >
              <span class="flag">🇫🇷</span> Français
              <i v-if="currentLocale === 'fr'" class="fa-solid fa-check ms-2"></i>
            </button>
            <button
              @click="switchLanguage('en')"
              class="mobile-language-option"
              :class="{ 'active': currentLocale === 'en' }"
            >
              <span class="flag">🇺🇸</span> English
              <i v-if="currentLocale === 'en'" class="fa-solid fa-check ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import MobileMenu from './MobileMenu.vue';
import HeaderSearch from './HeaderSearch.vue';
import StickyHeader from './StickyHeader.vue';

const currentDate = ref('');
const isScrolled = ref(false);
const isMobileScrolled = ref(false);
const avatarError = ref(false);
const isMobileMenuOpen = ref(false);
const activeMobileDropdown = ref(null);

// I18n
const { locale } = useI18n();

// Store d'authentification
const authStore = useAuthStore();

// Computed properties
const user = computed(() => authStore.getUser);
const isAuthenticated = computed(() => authStore.getIsAuthenticated);

// Langue actuelle
const currentLocale = computed(() => locale.value);

// Computed properties pour la langue
const currentLanguageFlag = computed(() => {
  switch (currentLocale.value) {
    case 'fr': return '🇫🇷';
    case 'en': return '🇺🇸';
    default: return '🌐';
  }
});

const currentLanguageName = computed(() => {
  switch (currentLocale.value) {
    case 'fr': return 'Français';
    case 'en': return 'English';
    default: return 'Language';
  }
});

// Nom à afficher
const displayName = computed(() => {
  if (!user.value) return '';

  if (user.value.first_name) {
    return user.value.first_name;
  }

  if (user.value.email) {
    return user.value.email.split('@')[0];
  }

  return $t('navigation.profile');
});

// Initiale pour l'avatar
const getUserInitial = computed(() => {
  if (!user.value) return 'U';

  const name = user.value.first_name || user.value.email || '';
  return name.charAt(0).toUpperCase();
});

// Gestion des erreurs d'avatar
const handleAvatarError = (event) => {
  avatarError.value = true;
  if (event.target) {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = 'avatar-initial';
      fallback.textContent = getUserInitial.value;
      parent.appendChild(fallback);
    }
  }
};

// Logout
const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Logout mobile
const logoutMobile = async () => {
  try {
    await authStore.logout();
    closeMobileMenu();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Changement de langue SANS rechargement
const switchLanguage = (lang) => {
  // Mettre à jour la locale i18n
  locale.value = lang;

  // Sauvegarder dans localStorage pour les prochaines visites
  localStorage.setItem('user-language', lang);

  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = lang;

  // Fermer le menu mobile si ouvert
  if (isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Gestion du scroll principal
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

// Gestion du scroll dans le menu mobile - NOUVEAU
const handleMobileScroll = (event) => {
  if (event.target.classList.contains('mobile-scrollable-content')) {
    isMobileScrolled.value = event.target.scrollTop > 20;
  }
};

// Gestion du menu mobile - MODIFIÉ
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isMobileScrolled.value = false; // Réinitialiser l'état de scroll mobile

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    // Attendre que le menu soit rendu pour ajouter l'écouteur
    setTimeout(() => {
      const scrollableContent = document.querySelector('.mobile-scrollable-content');
      if (scrollableContent) {
        scrollableContent.addEventListener('scroll', handleMobileScroll);
      }
    }, 100);
  } else {
    document.body.style.overflow = '';
    activeMobileDropdown.value = null;
    // Retirer l'écouteur de scroll mobile
    const scrollableContent = document.querySelector('.mobile-scrollable-content');
    if (scrollableContent) {
      scrollableContent.removeEventListener('scroll', handleMobileScroll);
    }
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  isMobileScrolled.value = false;
  document.body.style.overflow = '';
  activeMobileDropdown.value = null;

  // Retirer l'écouteur de scroll mobile
  const scrollableContent = document.querySelector('.mobile-scrollable-content');
  if (scrollableContent) {
    scrollableContent.removeEventListener('scroll', handleMobileScroll);
  }
};

const toggleMobileDropdown = (dropdown) => {
  if (activeMobileDropdown.value === dropdown) {
    activeMobileDropdown.value = null;
  } else {
    activeMobileDropdown.value = dropdown;
  }
};

onMounted(() => {
  // Date
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  currentDate.value = now.toLocaleDateString('en-US', options);

  // Scroll event principal
  window.addEventListener('scroll', handleScroll);

  // Initialiser l'auth si nécessaire
  if (isAuthenticated.value && !user.value) {
    authStore.fetchUser().catch(console.error);
  }

  // Restaurer la langue depuis localStorage
  const savedLang = localStorage.getItem('user-language');
  if (savedLang && ['fr', 'en'].includes(savedLang)) {
    locale.value = savedLang;
    document.documentElement.lang = savedLang;
  }

  // Ajouter le bouton mobile au toggler existant
  const mobileToggler = document.querySelector('.mobile-nav-toggler');
  if (mobileToggler) {
    mobileToggler.addEventListener('click', toggleMobileMenu);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);

  const mobileToggler = document.querySelector('.mobile-nav-toggler');
  if (mobileToggler) {
    mobileToggler.removeEventListener('click', toggleMobileMenu);
  }

  // Nettoyer l'écouteur de scroll mobile
  const scrollableContent = document.querySelector('.mobile-scrollable-content');
  if (scrollableContent) {
    scrollableContent.removeEventListener('scroll', handleMobileScroll);
  }

  document.body.style.overflow = '';
  document.body.classList.remove('mobile-menu-open');
});
</script>

<style scoped>
/* ==================== */
/* MENU FIXE AU SCROLL */
/* ==================== */

.fixed-header {
    position: fixed;
    top: -80px; /* Caché au début */
    left: 0;
    width: 100%;
    background: rgba(13, 84, 59, 0.209);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.fixed-header.visible {
    top: 0;
    transform: translateY(0);
}

.fixed-header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
}

.fixed-logo img {
    height: 40px;
    width: auto;
}

.fixed-navigation {
    flex: 1;
    display: flex;
    justify-content: center;
}

.fixed-nav-list {
    display: flex;
    align-items: center;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.fixed-nav-list li {
    position: relative;
}

.fixed-nav-list li a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    padding: 8px 0;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.fixed-nav-list li a:hover {
    color: #a87f1f;
}

/* Dropdown pour le menu fixe */
.fixed-nav-list .dropdown-menu {
    position: absolute;
    top: 100%;
    left: -10px;
    background: white;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 100;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.fixed-nav-list .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.fixed-nav-list .dropdown-menu li {
    margin: 0;
}

.fixed-nav-list .dropdown-menu li a {
    padding: 10px 20px;
    display: block;
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
}

.fixed-nav-list .dropdown-menu li a:hover {
    background: #f8f9fa;
    color: #a87f1f;
}

/* Actions du menu fixe */
.fixed-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.fixed-phone {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
}

.fixed-phone i {
    color: #a87f1f;
    font-size: 16px;
}

.fixed-phone a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
}

.fixed-phone a:hover {
    color: #a87f1f;
}

/* ==================== */
/* BOUTON PROFIL UTILISATEUR (menu fixe) */
/* ==================== */
.user-profile-menu {
    position: relative;
}

.fixed-btn-profile {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
    color: white;
    font-weight: 600;
    text-decoration: none;
    border-radius: 25px;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(168, 127, 31, 0.2);
}

.fixed-btn-profile:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(168, 127, 31, 0.3);
    background: linear-gradient(135deg, #0c401c 0%, #a87f1f 100%);
}

.user-avatar-small {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-avatar-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-avatar-small i {
    font-size: 14px;
    color: white;
}

.user-name {
    font-weight: 500;
    font-size: 13px;
}

.dropdown-icon {
    font-size: 12px;
    margin-left: 4px;
    transition: transform 0.3s ease;
}

.user-profile-menu:hover .dropdown-icon {
    transform: rotate(180deg);
}

/* Menu déroulant utilisateur (menu fixe) */
.user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    min-width: 220px;
    margin-top: 10px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.user-profile-menu:hover .user-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.user-dropdown-menu a,
.user-dropdown-menu button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    color: #333;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 14px;
    font-weight: 500;
}

.user-dropdown-menu a i,
.user-dropdown-menu button i {
    width: 20px;
    text-align: center;
    font-size: 14px;
}

.user-dropdown-menu a:hover {
    background: #f8f9fa;
    color: #a87f1f;
}

.dropdown-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
    margin: 5px 0;
}

.logout-btn {
    color: #e74c3c !important;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.logout-btn:hover {
    background: #fee !important;
}

/* ==================== */
/* PROFIL UTILISATEUR (menu principal) */
/* ==================== */
.user-profile-main {
    position: relative;
    cursor: pointer;
}

.user-profile-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
    border-radius: 30px;
    color: white;
    transition: all 0.3s ease;
}

.user-profile-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(168, 127, 31, 0.3);
}

.user-avatar-main {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-avatar-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-initial {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: bold;
    font-size: 16px;
}

.user-greeting {
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
}

.user-profile-toggle i {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.user-profile-main:hover .user-profile-toggle i {
    transform: rotate(180deg);
}

/* Menu déroulant principal */
.user-dropdown-main {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    min-width: 250px;
    margin-top: 10px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.user-profile-main:hover .user-dropdown-main {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.user-dropdown-main a,
.user-dropdown-main button {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 20px;
    text-align: left;
    color: #333;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 14px;
    font-weight: 500;
}

.user-dropdown-main a i,
.user-dropdown-main button i {
    width: 20px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.user-dropdown-main a:hover {
    background: #f8f9fa;
    color: #a87f1f;
}

.user-dropdown-main a:hover i {
    color: #a87f1f;
}

.logout-btn-main {
    color: #e74c3c !important;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.logout-btn-main:hover {
    background: #fee !important;
}

/* ==================== */
/* BOUTON INSCRIPTION (quand déconnecté) */
/* ==================== */
.fixed-btn-inscription {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
    color: white;
    font-weight: 600;
    text-decoration: none;
    border-radius: 25px;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(168, 127, 31, 0.2);
}

.fixed-btn-inscription:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(168, 127, 31, 0.3);
    background: linear-gradient(135deg, #0c401c 0%, #a87f1f 100%);
}

.btn-inscription {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
  color: white;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 234, 102, 0.4);
  position: relative;
  overflow: hidden;
}

.btn-inscription:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(219, 154, 14, 0.6);
  background: linear-gradient(135deg, #04a784 0%, #1a830e 100%);
}

.btn-inscription:active {
  transform: translateY(-1px);
}

.btn-inscription::after {
  content: '→';
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.btn-inscription:hover::after {
  transform: translateX(4px);
}

.separator {
    width: 1px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 20px;
}

/* ==================== */
/* LANGUAGE SWITCHER AU SURVOL - CORRIGÉ POUR ÊTRE EN PREMIER PLAN */
/* ==================== */
.language-switcher-hover {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.language-switcher-hover:hover {
  background: rgba(255, 255, 255, 0.1);
}

.current-language {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}

.language-switcher-hover .fa-chevron-down {
  font-size: 11px;
  color: #ffffff;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.language-switcher-hover:hover .fa-chevron-down {
  transform: rotate(180deg);
}

/* Menu déroulant simple - EN PREMIER PLAN */
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
  z-index: 99999 !important; /* Z-INDEX TRÈS ÉLEVÉ */
  padding: 8px 0;
  margin-top: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  overflow: visible !important;
  pointer-events: auto;
}

.language-switcher-hover:hover .language-dropdown-menu {
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
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  justify-content: space-between;
}

.language-option:hover {
  background: #f5f5f5;
  color: #a87f1f;
}

.language-option.active {
  background: #f0f9ff;
  color: #007bff;
  font-weight: 600;
}

.language-option.active .flag {
  color: #007bff;
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
}

/* IMPORTANT: S'assurer que le parent n'a pas d'overflow hidden */
.language-selector-item,
.info-list,
.top-left {
  overflow: visible !important;
}

/* Style pour le menu fixe */
.fixed-header .language-switcher-hover {
  padding: 6px 12px;
}

.fixed-header .current-language {
  color: #ffffff;
  font-size: 13px;
}

.fixed-header .language-dropdown-menu {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

/* Responsive pour le menu fixe */
@media (max-width: 991px) {
    .fixed-header {
        display: none; /* Cacher sur mobile */
    }

    .fixed-header.visible {
        display: none;
    }

    .user-greeting {
        display: none;
    }

    .user-profile-toggle {
        padding: 8px 12px;
    }
}

/* ==================== */
/* MENU MOBILE DROPDOWN */
/* ==================== */
.mobile-dropdown-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: none;
}

.mobile-dropdown-menu.open {
    display: block;
}

.mobile-menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
}

.mobile-menu-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 100%;
    background: linear-gradient(135deg, #0c401c 0%, #063232 100%);
    overflow: hidden;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

.mobile-dropdown-menu.open .mobile-menu-content {
    transform: translateX(0);
}

/* Header fixe */
.fixed-mobile-header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

/* Effet de shadow quand on scroll */
.mobile-dropdown-menu.scrolled .fixed-mobile-header {
    background: rgba(12, 64, 28, 0.95);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(168, 127, 31, 0.3);
}

.mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    min-height: 60px;
    flex-shrink: 0;
}

.mobile-logo img {
    height: 30px;
    width: auto;
    transition: transform 0.3s ease;
}

.mobile-dropdown-menu.scrolled .mobile-logo img {
    transform: scale(0.95);
}

.mobile-menu-close {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile-menu-close:hover {
    background: #a87f1f;
    transform: rotate(90deg);
    border-color: #a87f1f;
}

/* Contenu scrollable */
.mobile-scrollable-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;
    -webkit-overflow-scrolling: touch; /* Scroll fluide sur iOS */
}

/* Personnalisation de la scrollbar */
.mobile-scrollable-content::-webkit-scrollbar {
    width: 4px;
}

.mobile-scrollable-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.mobile-scrollable-content::-webkit-scrollbar-thumb {
    background: #a87f1f;
    border-radius: 2px;
}

.mobile-scrollable-content::-webkit-scrollbar-thumb:hover {
    background: #d4a838;
}

/* Le reste de vos styles CSS existants pour mobile-contact-info,
   mobile-navigation, etc. reste inchangé */
.mobile-contact-info {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-info-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 15px;
}

.mobile-info-item:last-child {
    margin-bottom: 0;
}

.mobile-info-item i {
    color: #a87f1f;
    font-size: 1.2rem;
    margin-top: 3px;
    min-width: 20px;
}

.mobile-info-item div {
    flex: 1;
}

.mobile-info-item strong {
    display: block;
    color: white;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.mobile-info-item p,
.mobile-info-item a {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    line-height: 1.4;
    text-decoration: none;
}

.mobile-info-item a:hover {
    color: #a87f1f;
}

.mobile-navigation {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mobile-nav-list li {
    margin-bottom: 5px;
}

.mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.05);
}

.mobile-nav-link:hover {
    background: rgba(168, 127, 31, 0.2);
    color: #a87f1f;
    transform: translateX(5px);
}

.mobile-nav-link i {
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
}

.mobile-dropdown {
    margin-bottom: 5px;
}

.dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
}

.dropdown-toggle i {
    transition: transform 0.3s ease;
}

.dropdown-toggle i.rotated {
    transform: rotate(180deg);
}

.mobile-dropdown-content {
    padding-left: 35px;
    padding-top: 10px;
}

.mobile-dropdown-content a {
    display: block;
    padding: 10px 15px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.1);
}

.mobile-dropdown-content a:hover {
    background: rgba(168, 127, 31, 0.2);
    color: #a87f1f;
}

.mobile-auth-section {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-user-profile {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
}

.mobile-user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);
}

.mobile-user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile-user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mobile-avatar-initial {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
}

.mobile-user-details {
    flex: 1;
}

.mobile-user-details strong {
    display: block;
    color: white;
    font-size: 1rem;
    margin-bottom: 5px;
}

.mobile-user-details span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
}

.mobile-user-links {
    padding: 10px;
}

.mobile-user-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    margin-bottom: 5px;
    transition: all 0.3s ease;
}

.mobile-user-link:hover {
    background: rgba(168, 127, 31, 0.2);
    color: #a87f1f;
}

.mobile-logout-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 12px 15px;
    background: rgba(231, 76, 60, 0.1);
    border: none;
    color: #e74c3c;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    margin-top: 5px;
}

.mobile-logout-btn:hover {
    background: rgba(231, 76, 60, 0.2);
}

.mobile-auth-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.mobile-login-btn,
.mobile-register-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.mobile-login-btn {
    background: rgba(168, 127, 31, 0.2);
    color: #a87f1f;
    border: 1px solid rgba(168, 127, 31, 0.3);
}

.mobile-login-btn:hover {
    background: rgba(168, 127, 31, 0.3);
    transform: translateY(-2px);
}

.mobile-register-btn {
    background: linear-gradient(135deg, #a87f1f 0%, #0c401c 100%);
    color: white;
}

.mobile-register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(168, 127, 31, 0.3);
}

.mobile-social-section {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}

.mobile-social-section h4 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.mobile-social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.mobile-social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.mobile-social-icon:hover {
    background: #a87f1f;
    transform: translateY(-3px);
}

.mobile-language-selector {
    padding: 20px;
}

.mobile-language-current {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: white;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
}

.mobile-language-current:hover {
    background: rgba(255, 255, 255, 0.1);
}

.mobile-language-current i:first-child {
    color: #a87f1f;
}

.mobile-language-current i:last-child {
    margin-left: auto;
    transition: transform 0.3s ease;
}

.mobile-language-current i.rotated {
    transform: rotate(180deg);
}

.mobile-language-options {
    margin-top: 10px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
}

.mobile-language-option {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 12px 15px;
    background: none;
    border: none;
    color: white;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    justify-content: space-between;
}

.mobile-language-option:last-child {
    border-bottom: none;
}

.mobile-language-option:hover {
    background: rgba(168, 127, 31, 0.2);
}

.mobile-language-option.active {
    background: rgba(0, 123, 255, 0.2);
    color: #4db8ff;
}

.mobile-language-option .flag {
    font-size: 1.2rem;
}

.mobile-language-option .fa-check {
    font-size: 12px;
    color: #4db8ff;
}

/* Responsive */
@media (max-width: 480px) {
    .mobile-menu-content {
        width: 280px;
    }

    .mobile-auth-buttons {
        grid-template-columns: 1fr;
    }
}

/* Animation smooth pour le body */
body {
    padding-top: 0;
    transition: padding-top 0.4s ease;
}

body.has-fixed-header {
    padding-top: 60px;
}

body.mobile-menu-open {
    overflow: hidden;
}

/* Styles existants restants */
.language-selector-item {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 99999 !important;
    overflow: visible !important;
}

/* CORRECTION IMPORTANTE: S'assurer que les parents n'ont pas d'overflow caché */
.header-top,
.top-left,
.auto-container,
.info-list {
  overflow: visible !important;
  position: relative;
}

.custom-burger-icon {
    width: 24px;
    height: 18px;
    position: relative;
    cursor: pointer;
}

.custom-burger-icon span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.25s ease-in-out;
}

.custom-burger-icon span:nth-child(1) {
    top: 0px;
}

.custom-burger-icon span:nth-child(2) {
    top: 8px;
}

.custom-burger-icon span:nth-child(3) {
    top: 16px;
}

/* Animation hover */
.custom-burger-icon:hover span {
    background: #a87f1f;
}

/* Animation quand le menu est ouvert */
.mobile-dropdown-menu.open .custom-burger-icon span:nth-child(1) {
    top: 8px;
    transform: rotate(45deg);
}

.mobile-dropdown-menu.open .custom-burger-icon span:nth-child(2) {
    opacity: 0;
}

.mobile-dropdown-menu.open .custom-burger-icon span:nth-child(3) {
    top: 8px;
    transform: rotate(-45deg);
}
</style>
