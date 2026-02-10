<template>
  <div class="not-found-page">
    <!-- Background avec le theme -->
    <div class="not-found-bg"></div>

    <div class="not-found-container">
      <!-- Header fixe -->


      <!-- Contenu principal -->
      <main class="not-found-main">
        <div class="error-content">
          <!-- Code d'erreur -->
          <div class="error-code">
            <span class="code-4">4</span>
            <span class="code-0">0</span>
            <span class="code-4">4</span>
          </div>

          <!-- Message -->
          <div class="error-message">
            <h1>Page introuvable</h1>
            <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
          </div>

          <!-- Actions principales -->
          <div class="main-actions">

            <button @click="goBack" class="action-btn secondary-btn">
              <i class="fas fa-arrow-left"></i>
              Page précédente
            </button>


          </div>

          <!-- Recherche -->


          <!-- Liens rapides -->


          <!-- Compteur de redirection -->

        </div>
      </main>

      <!-- Footer -->

    </div>
  </div>
</template>

<script setup>
import { Link, router } from '@inertiajs/vue3'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const searchQuery = ref('')
const showRedirect = ref(true)
const countdown = ref(20)
let countdownInterval = null

const currentYear = computed(() => new Date().getFullYear())

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    router.visit('/')
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.visit(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}

const startRedirectTimer = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownInterval)
      router.visit('/')
    }
  }, 1000)
}

const cancelRedirect = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    showRedirect.value = false
  }
}

onMounted(() => {
  startRedirectTimer()

  // Ajouter une classe au body pour le style de la page 404
  document.body.classList.add('not-found-active')
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
  document.body.classList.remove('not-found-active')
})
</script>

<style scoped>
/* Styles généraux pour la page 404 */
.not-found-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.not-found-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #000000 100%, #084034c3 100%, #000000 100%);
  z-index: -2;
}

.not-found-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 15% 100%, rgba(0, 248, 25, 0.116) 0%, transparent 50%),
    radial-gradient(circle at 85% 30%, rgb(10, 47, 47) 0%, transparent 50%);
  z-index: -1;
}

.not-found-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
}

/* Header fixe */
.not-found-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(6, 20, 25, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(6, 194, 194, 0.2);
  z-index: 1000;
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
}

.back-home-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(6, 194, 194, 0.2);
  border: 1px solid rgba(6, 194, 194, 0.3);
  border-radius: 8px;
  color: #06C2C2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-home-btn:hover {
  background: rgba(6, 194, 194, 0.3);
  transform: translateY(-1px);
}

/* Contenu principal */
.not-found-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 4rem; /* Espace pour le header fixe */
}

.error-content {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

/* Code d'erreur */
.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.code-4, .code-0 {
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(45deg, #d4e4da, #bef9db, #0f4545);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 10px 30px rgba(9, 237, 180, 0.507);
  animation: float 3s ease-in-out infinite;
}

.code-0 {
  animation-delay: 0.2s;
}

.code-4:last-child {
  animation-delay: 0.4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Message */
.error-message {
  margin-bottom: 3rem;
}

.error-message h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
}

.error-message p {
  font-size: 1.25rem;
  color: #B0D4D4;
  opacity: 0.9;
}

/* Actions principales */
.main-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.primary-btn {
  background: linear-gradient(45deg, #06C2C2, #0A8A8A);
  color: white;
  box-shadow: 0 4px 20px rgba(6, 194, 194, 0.3);
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(6, 194, 194, 0.4);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Recherche */
.search-box {
  margin-bottom: 3rem;
}

.search-wrapper {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  outline: none;
}

.search-input::placeholder {
  color: #B0D4D4;
}

.search-btn {
  padding: 0 1.5rem;
  background: rgba(6, 194, 194, 0.2);
  border: none;
  color: #06C2C2;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: rgba(6, 194, 194, 0.3);
}

/* Liens rapides */
.quick-links-section {
  margin-bottom: 3rem;
}

.quick-links-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.quick-link i {
  font-size: 1.5rem;
  color: #06C2C2;
}

.quick-link span {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Compteur de redirection */
.redirect-timer {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(6, 194, 194, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.countdown {
  font-weight: 700;
  color: #06C2C2;
  font-size: 1.5rem;
  animation: pulse 1s infinite;
}

.cancel-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Footer */
.not-found-footer {
  padding: 2rem 0;
  background: rgba(6, 20, 25, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: #B0D4D4;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #06C2C2;
}

/* Responsive */
@media (max-width: 768px) {
  .code-4, .code-0 {
    font-size: 7rem;
  }

  .error-message h1 {
    font-size: 2rem;
  }

  .main-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .code-4, .code-0 {
    font-size: 5rem;
  }

  .quick-links-grid {
    grid-template-columns: 1fr;
  }

  .redirect-timer {
    flex-direction: column;
    text-align: center;
  }
}

/* Style global pour le body pendant la page 404 */
:global(body.not-found-active) {
  overflow: hidden;
  height: 100vh;
}
</style>
