<template>
  <div class="not-found-page">
    <!-- Background Elements -->
    <div class="bg-elements">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
    </div>

    <div class="error-page">
      <div class="container">
        <div class="content-wrapper">
          <!-- Illustration Column -->
          <div class="illustration-container">
            <div class="zero-illustration">
              <!-- Floating particles -->
              <div class="particles-container">
                <div
                  v-for="(particle, index) in particles"
                  :key="index"
                  class="particle-dot"
                  :style="particle.style"
                ></div>
              </div>

              <!-- Zero with concentric circles -->
              <div class="circle circle-outer"></div>
              <div class="circle circle-middle"></div>
              <div class="circle circle-inner"></div>
              <div class="circle circle-center">
                <svg class="center-x" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Decorative Icons -->
              <div class="icon-decoration search-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div class="icon-decoration compass-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-6-4h.01M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Content Column -->
          <div class="content-section">
            <h1 class="error-code">404</h1>
            <h2 class="title">{{ $t('errors.page_not_found') }}</h2>
            <p class="subtitle">
              {{ $t('errors.page_not_found_description') }}
            </p>

            <!-- Stats -->
            <div class="stats-container">
              <div class="stat-card">
                <div class="stat-value">99.9%</div>
                <div class="stat-label">{{ $t('errors.availability') }}</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">24/7</div>
                <div class="stat-label">{{ $t('errors.support') }}</div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="buttons-container">
              <Link href="/" class="btn btn-primary">
                <i class="fas fa-home"></i>
                {{ $t('errors.return_home') }}
                <i class="fas fa-arrow-right"></i>
              </Link>
              <Link href="/contact" class="btn btn-outline">
                <i class="fas fa-headset"></i>
                {{ $t('errors.contact_support') }}
              </Link>
            </div>

            <!-- Search -->
            <div class="search-container">
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                :placeholder="$t('errors.search_placeholder')"
                @keypress.enter="handleSearch"
              >
              <div class="search-icon-input" @click="handleSearch">
                <i class="fas fa-search"></i>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="quick-links">
              <h3 class="quick-links-title">{{ $t('errors.quick_navigation') }}</h3>
              <div class="links-grid">
                <Link v-if="isAuthenticated" href="/dashboard" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.dashboard') }}</span>
                </Link>
                <Link v-else href="/auth/login" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-sign-in-alt"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.sign_in') }}</span>
                </Link>
                <Link href="/docs" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-book"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.documentation') }}</span>
                </Link>
                <Link href="/status" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-server"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.api_status') }}</span>
                </Link>
                <Link href="/services" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-cogs"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.services') }}</span>
                </Link>
                <Link href="/blog" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-newspaper"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.blog') }}</span>
                </Link>
                <Link href="/contact" class="link-card">
                  <div class="link-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <span class="link-text">{{ $t('navigation.contact') }}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer container">
      <p>&copy; {{ currentYear }} Benkky. {{ $t('common.all_rights_reserved') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const searchQuery = ref('');
const currentYear = new Date().getFullYear();

const isAuthenticated = computed(() => authStore.getIsAuthenticated);

// Particules animées
const particles = ref([
  { style: { top: '20%', left: '25%', animationDelay: '0s' } },
  { style: { top: '40%', left: '15%', animationDelay: '0.2s' } },
  { style: { top: '60%', left: '30%', animationDelay: '0.4s' } },
  { style: { top: '80%', left: '20%', animationDelay: '0.6s' } },
  { style: { top: '30%', left: '70%', animationDelay: '0.8s' } },
  { style: { top: '50%', left: '85%', animationDelay: '1s' } },
  { style: { top: '70%', left: '75%', animationDelay: '1.2s' } },
  { style: { top: '90%', left: '80%', animationDelay: '1.4s' } },
]);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    router.visit(`/search?q=${encodeURIComponent(query)}`);
  }
};

onMounted(() => {
  // Animation des particules
  const particleElements = document.querySelectorAll('.particle-dot');
  particleElements.forEach((particle, index) => {
    particle.classList.add('particle');
    particle.style.animationDelay = `${index * 0.2}s`;
  });

  // Effet hover sur les cartes
  const cards = document.querySelectorAll('.link-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});
</script>

<style scoped>
/* Variables du thème Benkky */
:root {
  --dark-color1: #063232;
  --dark-color2: #0F2727;
  --dark-color3: #061419;
  --dark-color4: #1A4137;
  --accent-color1: #a87f1f; /* Or */
  --accent-color2: #0c401c; /* Vert foncé */
  --accent-color3: #04a784; /* Vert clair */
  --light-color1: #E8F4F2;
  --light-color2: #C2E0D8;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.not-found-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, var(--dark-color3) 0%, var(--dark-color1) 90%, var(--dark-color2) 150%);
  color: var(--light-color2);
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-10px) translateX(5px); }
  66% { transform: translateY(5px) translateX(-5px); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

.particle {
  animation: float 3s ease-in-out infinite;
}

.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

/* Background Elements */
.bg-elements {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.1;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--accent-color1);
  top: -200px;
  left: -200px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--accent-color2);
  bottom: -150px;
  right: -150px;
}

/* Main Content */
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

/* Illustration Section */
.illustration-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.zero-illustration {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  margin: 0 auto;
}

.circle {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-style: solid;
}

.circle-outer {
  width: 100%;
  height: 100%;
  border-width: 15px;
  border-color: var(--accent-color1);
  opacity: 0.2;
}

.circle-middle {
  width: 75%;
  height: 75%;
  border-width: 10px;
  border-color: var(--accent-color2);
  opacity: 0.3;
}

.circle-inner {
  width: 50%;
  height: 50%;
  border-width: 5px;
  border-color: var(--accent-color3);
  opacity: 0.4;
}

.circle-center {
  width: 30%;
  height: 30%;
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(168, 127, 31, 0.5);
}

.center-x {
  color: white;
  font-size: 2.5rem;
}

/* Floating Particles */
.particles-container {
  position: absolute;
  inset: 0;
}

.particle-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2));
}

/* Icons around zero */
.icon-decoration {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.search-icon {
  top: 10%;
  right: 10%;
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2));
}

.compass-icon {
  bottom: 10%;
  left: 10%;
  background: linear-gradient(135deg, var(--accent-color2), var(--accent-color3));
}

.icon-decoration svg {
  width: 30px;
  height: 30px;
  color: white;
}

/* Content Section */
.content-section {
  text-align: center;
}

@media (min-width: 1024px) {
  .content-section {
    text-align: left;
  }
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2), var(--accent-color3));
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-shift 3s ease infinite;
}

@media (min-width: 768px) {
  .error-code {
    font-size: 10rem;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--light-color1);
  margin-bottom: 1rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .title {
    font-size: 3rem;
  }
}

.subtitle {
  font-size: 1.25rem;
  color: var(--light-color2);
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(15, 39, 39, 0.6);
  border: 1px solid var(--dark-color4);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color1);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color2);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--light-color2);
  opacity: 0.8;
}

/* Buttons */
.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .buttons-container {
    flex-direction: row;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2));
  color: white;
  box-shadow: 0 10px 25px rgba(168, 127, 31, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--accent-color2), var(--accent-color3));
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(168, 127, 31, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--accent-color1);
  border: 2px solid var(--accent-color1);
}

.btn-outline:hover {
  background: rgba(168, 127, 31, 0.1);
  transform: translateY(-2px);
}

/* Search */
.search-container {
  position: relative;
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  background: rgba(15, 39, 39, 0.6);
  border: 1px solid var(--dark-color4);
  border-radius: 12px;
  color: var(--light-color2);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--accent-color1);
  box-shadow: 0 0 0 3px rgba(168, 127, 31, 0.1);
}

.search-icon-input {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color1);
  cursor: pointer;
}

/* Quick Links */
.quick-links {
  border-top: 1px solid var(--dark-color4);
  padding-top: 2rem;
}

.quick-links-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--light-color1);
  margin-bottom: 1rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .links-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.link-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(15, 39, 39, 0.6);
  border: 1px solid var(--dark-color4);
  border-radius: 8px;
  text-decoration: none;
  color: var(--light-color2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.link-card:hover {
  background: var(--dark-color4);
  border-color: var(--accent-color1);
  transform: translateY(-2px);
}

.link-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent-color1), var(--accent-color2));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.link-icon i {
  color: white;
  font-size: 0.875rem;
}

.link-text {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Footer */
.footer {
  text-align: center;
  padding: 2rem 0;
  color: var(--light-color2);
  opacity: 0.8;
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 640px) {
  .error-code {
    font-size: 6rem;
  }

  .title {
    font-size: 2rem;
  }

  .illustration-container {
    max-width: 300px;
  }

  .icon-decoration {
    width: 50px;
    height: 50px;
  }

  .icon-decoration svg {
    width: 24px;
    height: 24px;
  }
}
</style>
