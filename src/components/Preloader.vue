<template>
    <div class="preloader-premium" v-show="showPreloader">
        <!-- Background Étoilé -->
        <div class="starry-background">
            <div class="star" v-for="star in stars" :key="star.id" :style="star.style"></div>
        </div>

        <!-- Grid Pattern Dynamique -->
        <div class="dynamic-grid"></div>

        <!-- Container Principal -->
        <div class="preloader-container">
            <!-- Logo Central Animé -->
            <div class="premium-logo-animation">
                <div class="logo-orbital">
                    <!-- Orbite Principale -->
                    <div class="main-orbit">
                        <div class="orbiting-feature" v-for="feature in orbitingFeatures"
                             :key="feature.id" :style="feature.style">
                            <div class="feature-icon" :class="feature.color">
                                <i :class="feature.icon"></i>
                            </div>
                            <div class="feature-glow"></div>
                        </div>
                    </div>

                    <!-- Logo Central -->
                    <div class="central-logo">
                        <div class="logo-core">
                            <span class="logo-char">B</span>
                            <div class="core-pulse"></div>
                            <div class="core-rings">
                                <div class="ring ring-1"></div>
                                <div class="ring ring-2"></div>
                                <div class="ring ring-3"></div>
                            </div>
                        </div>
                        <div class="logo-name">
                            <span class="letter" v-for="(letter, index) in 'BENKKY'" :key="index"
                                  :style="{ animationDelay: `${index * 0.1}s` }">
                                {{ letter }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Bar Futuriste -->
            <div class="premium-progress">
                <div class="progress-title">Initialisation du Système Financier</div>
                <div class="progress-container">
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: progress + '%' }">
                            <div class="progress-shine"></div>
                            <div class="progress-sparkles">
                                <div class="sparkle" v-for="sparkle in sparkles"
                                     :key="sparkle.id" :style="sparkle.style"></div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-stats">
                        <div class="stat">
                            <div class="stat-value">{{ Math.round(progress) }}%</div>
                            <div class="stat-label">Complétion</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{{ Math.round(loadingTime) }}s</div>
                            <div class="stat-label">Temps</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Showcase -->
            <div class="features-showcase">
                <div class="showcase-track" :style="{ transform: `translateX(-${showcaseOffset}px)` }">
                    <div class="showcase-item" v-for="(feature, index) in allFeatures" :key="feature.id">
                        <div class="showcase-icon" :class="feature.color">
                            <i :class="feature.icon"></i>
                        </div>
                        <div class="showcase-content">
                            <div class="showcase-title">{{ feature.title }}</div>
                            <div class="showcase-desc">{{ feature.description }}</div>
                        </div>
                        <div class="showcase-glow"></div>
                    </div>
                </div>
            </div>

            <!-- Messages Motivants -->
            <div class="motivation-messages">
                <transition name="fade" mode="out-in">
                    <div class="message" :key="currentMessage">
                        <i class="message-icon" :class="messages[currentMessage].icon"></i>
                        <span class="message-text">{{ messages[currentMessage].text }}</span>
                    </div>
                </transition>
            </div>

            <!-- Particles de Fond -->
            <div class="floating-particles">
                <div class="particle" v-for="particle in particles"
                     :key="particle.id" :style="particle.style"></div>
            </div>

            <!-- Effets de Lumière -->
            <div class="light-effects">
                <div class="light-beam beam-1"></div>
                <div class="light-beam beam-2"></div>
                <div class="light-beam beam-3"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// État du preloader
const showPreloader = ref(false);
const loading = ref(true);
const progress = ref(0);
const showcaseOffset = ref(0);
const currentMessage = ref(0);
const loadingTime = ref(0);

// Éléments visuels
const stars = ref([]);
const particles = ref([]);
const sparkles = ref([]);

// Configuration
const PRELOADER_CONFIG = {
    storageKey: 'benkky_preloader_shown',
    sessionKey: 'benkky_session_active',
    // Contrôler quand afficher le preloader
    behavior: {
        showOnFirstVisit: true,
        showOnRefresh: false, // IMPORTANT: false pour ne pas montrer au rafraîchissement
        showAfterInactivity: true, // Montrer après 24h d'inactivité
        inactivityHours: 24,
        forceShow: false // Mettre à true pour tester/développer
    }
};

// Messages motivants
const messages = ref([
    { icon: 'fa-solid fa-rocket', text: 'Lancement du moteur financier...' },
    { icon: 'fa-solid fa-shield-check', text: 'Sécurité maximale activée...' },
    { icon: 'fa-solid fa-bolt', text: 'Optimisation des transactions...' },
    { icon: 'fa-solid fa-globe', text: 'Connexion au réseau global...' },
    { icon: 'fa-solid fa-chart-line', text: 'Analyse des marchés en temps réel...' }
]);

// Toutes les fonctionnalités de Benkky
const allFeatures = ref([
    { id: 1, icon: 'fa-solid fa-paper-plane', color: 'color-transfer',
      title: 'Transfert Instantané', description: 'Envoyez de l\'argent en quelques secondes' },
    { id: 2, icon: 'fa-solid fa-wallet', color: 'color-wallet',
      title: 'Portefeuille Sécurisé', description: 'Vos fonds protégés à 100%' },
    { id: 3, icon: 'fa-solid fa-credit-card', color: 'color-card',
      title: 'Cartes Virtuelles', description: 'Payez en ligne sans limites' },
    { id: 4, icon: 'fa-solid fa-sim-card', color: 'color-esim',
      title: 'eSIM Globale', description: 'Connectez-vous partout dans le monde' },
    { id: 5, icon: 'fa-solid fa-exchange-alt', color: 'color-exchange',
      title: 'Change Intelligent', description: 'Meilleurs taux garantis' },
    { id: 6, icon: 'fa-solid fa-chart-pie', color: 'color-invest',
      title: 'Investissement', description: 'Faites fructifier votre argent' },
    { id: 7, icon: 'fa-solid fa-shield-halved', color: 'color-security',
      title: 'Protection Avancée', description: 'Sécurité bancaire de niveau militaire' },
    { id: 8, icon: 'fa-solid fa-bolt', color: 'color-speed',
      title: 'Vitesse Max', description: 'Transactions en 0.3 secondes' }
]);

// Fonctionnalités en orbite
const orbitingFeatures = computed(() => {
    const count = 6;
    return Array.from({ length: count }, (_, i) => {
        const angle = (i * 360 / count) + (progress.value * 3.6);
        const radius = 120;
        return {
            id: i,
            icon: allFeatures.value[i % allFeatures.value.length].icon,
            color: allFeatures.value[i % allFeatures.value.length].color,
            style: {
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
            }
        };
    });
});

// Vérifier si on doit montrer le preloader
const shouldShowPreloader = () => {
    // Option pour forcer l'affichage (développement)
    if (PRELOADER_CONFIG.behavior.forceShow) {
        return true;
    }

    // Vérifier si c'est un rafraîchissement
    const isRefresh = performance.navigation?.type === 1 ||
                     performance.getEntriesByType('navigation')[0]?.type === 'reload';

    if (isRefresh && !PRELOADER_CONFIG.behavior.showOnRefresh) {
        return false;
    }

    // Vérifier le localStorage
    const preloaderShown = localStorage.getItem(PRELOADER_CONFIG.storageKey);
    const sessionActive = sessionStorage.getItem(PRELOADER_CONFIG.sessionKey);

    // Si session active existe, ne pas montrer
    if (sessionActive) {
        return false;
    }

    // Si jamais vu avant
    if (!preloaderShown && PRELOADER_CONFIG.behavior.showOnFirstVisit) {
        return true;
    }

    // Vérifier l'inactivité
    if (PRELOADER_CONFIG.behavior.showAfterInactivity && preloaderShown) {
        const lastShown = parseInt(preloaderShown);
        const hoursSinceLastShow = (Date.now() - lastShown) / (1000 * 60 * 60);

        if (hoursSinceLastShow >= PRELOADER_CONFIG.behavior.inactivityHours) {
            return true;
        }
    }

    return false;
};

// Initialiser les effets visuels
const initEffects = () => {
    // Créer des étoiles
    for (let i = 0; i < 50; i++) {
        stars.value.push({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3
            }
        });
    }

    // Créer des particules
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 3}s`,
                background: getRandomGradient()
            }
        });
    }
};

const getRandomGradient = () => {
    const gradients = [
        'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'linear-gradient(135deg, #10b981, #3b82f6)',
        'linear-gradient(135deg, #8b5cf6, #ec4899)',
        'linear-gradient(135deg, #f59e0b, #10b981)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

// Démarrer le chargement
const startLoading = () => {
    const interval = setInterval(() => {
        if (progress.value < 100) {
            progress.value += Math.random() * 3 + 1;
            loadingTime.value += 0.1;

            // Faire défiler les features
            showcaseOffset.value = (progress.value / 100) * 2000;

            // Ajouter des sparkles sur la progress bar
            if (Math.random() > 0.7) {
                sparkles.value.push({
                    id: Date.now(),
                    style: {
                        left: `${Math.random() * 100}%`,
                        animationDelay: '0s'
                    }
                });

                // Nettoyer les anciens sparkles
                if (sparkles.value.length > 10) {
                    sparkles.value.shift();
                }
            }
        } else {
            clearInterval(interval);
            setTimeout(() => {
                loading.value = false;
                // Animation de sortie
                document.querySelector('.preloader-premium').classList.add('fade-out');
                setTimeout(() => {
                    showPreloader.value = false;

                    // Marquer comme vu dans localStorage avec timestamp
                    localStorage.setItem(PRELOADER_CONFIG.storageKey, Date.now().toString());

                    // Créer une session active
                    sessionStorage.setItem(PRELOADER_CONFIG.sessionKey, 'true');
                }, 1000);
            }, 500);
        }
    }, 100);
};

// Rotation des messages
const rotateMessages = () => {
    setInterval(() => {
        currentMessage.value = (currentMessage.value + 1) % messages.value.length;
    }, 2500);
};

// Initialisation au montage
onMounted(() => {
    const shouldShow = shouldShowPreloader();

    if (shouldShow) {
        showPreloader.value = true;
        initEffects();
        startLoading();
        rotateMessages();
    } else {
        // Si le preloader ne doit pas être montré, s'assurer qu'il est caché
        showPreloader.value = false;
        loading.value = false;

        // Toujours mettre à jour la session
        sessionStorage.setItem(PRELOADER_CONFIG.sessionKey, 'true');
    }
});

// Nettoyage
onUnmounted(() => {
    // Nettoyer les intervalles si nécessaire
});

// Fonction utilitaire pour réinitialiser (utile pour le développement)
const resetPreloader = () => {
    localStorage.removeItem(PRELOADER_CONFIG.storageKey);
    sessionStorage.removeItem(PRELOADER_CONFIG.sessionKey);
    showPreloader.value = true;
    loading.value = true;
    progress.value = 0;
    showcaseOffset.value = 0;
    currentMessage.value = 0;
    loadingTime.value = 0;
    stars.value = [];
    particles.value = [];
    sparkles.value = [];

    initEffects();
    startLoading();
    rotateMessages();
};

// Exposer la fonction de réinitialisation pour le développement
defineExpose({ resetPreloader });
</script>

<style scoped>
.preloader-premium {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #061419 0%, #0F2727 50%, #063232 100%);
    z-index: 9999;
    overflow: hidden;
    transition: opacity 1s ease-out;
}

.preloader-premium.fade-out {
    opacity: 0;
}

/* Background Étoilé */
.starry-background {
    position: absolute;
    width: 100%;
    height: 100%;
}

.star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s infinite;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

/* Grid Dynamique */
.dynamic-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(90deg, rgba(106, 196, 166, 0.05) 1px, transparent 1px),
        linear-gradient(180deg, rgba(106, 196, 166, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
    animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
    from { transform: translateY(0); }
    to { transform: translateY(40px); }
}

/* Container Principal */
.preloader-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* Logo Animation */
.premium-logo-animation {
    position: relative;
    margin-bottom: 60px;
}

.logo-orbital {
    position: relative;
    width: 300px;
    height: 300px;
}

.main-orbit {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: orbitRotate 20s linear infinite;
}

@keyframes orbitRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.orbiting-feature {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
}

.feature-icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
}

.feature-icon:hover {
    transform: scale(1.2);
}

.feature-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: inherit;
    filter: blur(15px);
    opacity: 0.5;
    z-index: 1;
}

/* Couleurs des features */
.color-transfer { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
.color-wallet { background: linear-gradient(135deg, #10b981, #3b82f6); }
.color-card { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
.color-esim { background: linear-gradient(135deg, #f59e0b, #10b981); }
.color-exchange { background: linear-gradient(135deg, #ec4899, #3b82f6); }
.color-invest { background: linear-gradient(135deg, #3b82f6, #10b981); }
.color-security { background: linear-gradient(135deg, #10b981, #8b5cf6); }
.color-speed { background: linear-gradient(135deg, #f59e0b, #ec4899); }

/* Logo Central */
.central-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.logo-core {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
}

.logo-char {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    font-weight: 900;
    background: linear-gradient(135deg, #fff, #c2e0d8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: 3;
}

.core-pulse {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, #6BC4A6 0%, transparent 70%);
    animation: corePulse 2s ease-out infinite;
}

.core-rings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.ring-1 {
    width: 100%;
    height: 100%;
    border-color: rgba(106, 196, 166, 0.3);
    animation: ringExpand 3s ease-out infinite;
}

.ring-2 {
    width: 130%;
    height: 130%;
    border-color: rgba(76, 175, 147, 0.2);
    animation: ringExpand 3s ease-out infinite 0.5s;
}

.ring-3 {
    width: 160%;
    height: 160%;
    border-color: rgba(42, 140, 130, 0.1);
    animation: ringExpand 3s ease-out infinite 1s;
}

@keyframes corePulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
}

@keyframes ringExpand {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.8); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
}

.logo-name {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.logo-name .letter {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: letterGlow 2s infinite;
}

@keyframes letterGlow {
    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
    50% { filter: drop-shadow(0 0 20px currentColor); }
}

/* Progress Bar */
.premium-progress {
    width: 80%;
    max-width: 600px;
    margin-bottom: 40px;
}

.progress-title {
    text-align: center;
    color: #E8F4F2;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.progress-container {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    padding: 25px;
    backdrop-filter: blur(10px);
}

.progress-track {
    height: 12px;
    background: rgba(6, 20, 25, 0.8);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #10b981, #8b5cf6);
    border-radius: 6px;
    position: relative;
    transition: width 0.3s ease;
}

.progress-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shineMove 2s infinite;
}

.progress-sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: sparkleFloat 1s ease-out;
    box-shadow: 0 0 10px white;
}

@keyframes shineMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes sparkleFloat {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
}

.progress-stats {
    display: flex;
    justify-content: space-between;
    color: #C2E0D8;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #6BC4A6;
}

.stat-label {
    font-size: 14px;
    opacity: 0.8;
}

/* Features Showcase */
.features-showcase {
    width: 100%;
    max-width: 800px;
    height: 120px;
    overflow: hidden;
    margin-bottom: 30px;
    position: relative;
}

.features-showcase::before,
.features-showcase::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
}

.features-showcase::before {
    left: 0;
    background: linear-gradient(90deg, #061419, transparent);
}

.features-showcase::after {
    right: 0;
    background: linear-gradient(90deg, transparent, #061419);
}

.showcase-track {
    display: flex;
    gap: 20px;
    height: 100%;
    transition: transform 0.3s ease;
}

.showcase-item {
    flex: 0 0 250px;
    background: rgba(15, 39, 39, 0.7);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.showcase-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: white;
    flex-shrink: 0;
}

.showcase-content {
    flex: 1;
}

.showcase-title {
    font-weight: 600;
    color: #E8F4F2;
    margin-bottom: 5px;
    font-size: 16px;
}

.showcase-desc {
    font-size: 12px;
    color: #C2E0D8;
    opacity: 0.9;
}

.showcase-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent, rgba(106, 196, 166, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.showcase-item:hover .showcase-glow {
    opacity: 1;
}

/* Messages Motivants */
.motivation-messages {
    max-width: 600px;
    text-align: center;
    min-height: 60px;
}

.message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px 30px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 50px;
    backdrop-filter: blur(10px);
}

.message-icon {
    color: #6BC4A6;
    font-size: 18px;
}

.message-text {
    color: #E8F4F2;
    font-size: 16px;
    font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Particles Flottantes */
.floating-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.particle {
    position: absolute;
    border-radius: 50%;
    animation: floatParticle 20s infinite linear;
}

@keyframes floatParticle {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.5;
    }
    90% {
        opacity: 0.5;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* Effets de Lumière */
.light-effects {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.light-beam {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(106, 196, 166, 0.1), transparent);
    height: 2px;
    width: 100%;
    filter: blur(1px);
    animation: beamScan 4s infinite;
}

.beam-1 {
    top: 20%;
    animation-delay: 0s;
}

.beam-2 {
    top: 50%;
    animation-delay: 1.3s;
}

.beam-3 {
    top: 80%;
    animation-delay: 2.6s;
}

@keyframes beamScan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Responsive */
@media (max-width: 768px) {
    .logo-orbital {
        width: 200px;
        height: 200px;
    }

    .orbiting-feature {
        width: 40px;
        height: 40px;
        margin-left: -20px;
        margin-top: -20px;
    }

    .feature-icon {
        font-size: 18px;
    }

    .logo-core {
        width: 80px;
        height: 80px;
    }

    .logo-char {
        font-size: 40px;
    }

    .premium-progress {
        width: 90%;
    }

    .features-showcase {
        height: 100px;
    }

    .showcase-item {
        flex: 0 0 200px;
    }
}

@media (max-width: 480px) {
    .logo-orbital {
        width: 150px;
        height: 150px;
    }

    .orbiting-feature {
        width: 30px;
        height: 30px;
        margin-left: -15px;
        margin-top: -15px;
    }

    .feature-icon {
        font-size: 14px;
    }
}
</style>
