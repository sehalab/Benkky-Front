<template>
    <div class="premium-stats-section">
        <!-- Fond décoratif -->
        <div class="premium-background">
            <div class="bg-grid"></div>
            <div class="bg-glow"></div>
            <div class="bg-particles">
                <div class="particle" v-for="(particle, index) in particles"
                     :key="index" :style="particle.style"></div>
            </div>
        </div>

        <!-- SVG Gradient défini ici -->
        <svg style="position: absolute; width: 0; height: 0; visibility: hidden;">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" />
                    <stop offset="50%" stop-color="#10b981" />
                    <stop offset="100%" stop-color="#8b5cf6" />
                </linearGradient>
            </defs>
        </svg>

        <div class="premium-container">
            <!-- En-tête -->
            <div class="premium-header">
                <div class="subtitle-wrapper">
                    <div class="subtitle-line"></div>
                    <span class="subtitle">À Propos de Nous</span>
                    <div class="subtitle-line"></div>
                </div>

                <h1 class="main-title">
                    Nous révolutionnons
                    <span class="title-gradient">l'expérience financière</span>
                    avec des solutions intelligentes
                </h1>

                <p class="description">
                    Benkky réinvente la banque moderne avec une approche innovante,
                    sécurisée et accessible. Notre technologie de pointe transforme
                    votre relation avec l'argent.
                </p>
            </div>

            <!-- Statistiques animées -->
            <div class="premium-stats-grid">
                <!-- Statistique 1 -->
                <div class="stat-card" ref="stat1">
                    <div class="stat-glow"></div>
                    <div class="stat-content">
                        <div class="stat-icon">
                            <i class="fa-solid fa-user-group"></i>
                            <div class="icon-ring"></div>
                        </div>

                        <div class="stat-numbers">
                            <div class="counter-wrapper">
                                <span class="counter" ref="counter1">0</span>
                                <span class="counter-suffix">K+</span>
                            </div>
                            <div class="stat-shine"></div>
                        </div>

                        <h3 class="stat-title">Clients Satisfaits</h3>
                        <p class="stat-description">
                            Des utilisateurs qui ont transformé leur gestion financière
                        </p>

                        <div class="progress-ring">
                            <svg class="ring-svg" width="80" height="80">
                                <circle class="ring-bg" cx="40" cy="40" r="35"></circle>
                                <circle class="ring-progress" cx="40" cy="40" r="35"
                                        :style="counterProgress1"></circle>
                            </svg>
                            <div class="ring-value">98%</div>
                        </div>
                    </div>

                    <div class="stat-badge">
                        <i class="fa-solid fa-trophy"></i>
                        <span>Leader du marché</span>
                    </div>
                </div>



                <!-- Statistique 3 -->

                <!-- Statistique 4 -->

            </div>

            <!-- Call to Action -->

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Références pour les compteurs
const counter1 = ref(0);
const counter2 = ref(0);
const counter3 = ref(0);
const counter4 = ref(0);

// Valeurs finales
const targetValues = {
    clients: 250, // 250K
    companies: 5.8, // 5.8M
    security: 99.9, // 99.9%
    speed: 300 // 300ms
};

// Particules de fond
const particles = ref([]);

// Progression du cercle pour la première statistique
const counterProgress1 = computed(() => {
    const progress = (counter1.value / targetValues.clients) * 98;
    return {
        strokeDasharray: `${progress} 100`
    };
});

// Style du cadran de vitesse
const speedDialStyle = computed(() => {
    const angle = (counter4.value / targetValues.speed) * 270;
    return {
        transform: `rotate(${angle}deg)`
    };
});

// Initialiser les particules
const initParticles = () => {
    particles.value = [];
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.3 + 0.1,
                background: getRandomGradient()
            }
        });
    }
};

const getRandomGradient = () => {
    const gradients = [
        'radial-gradient(circle, #6BC4A6, transparent)',
        'radial-gradient(circle, #3b82f6, transparent)',
        'radial-gradient(circle, #8b5cf6, transparent)',
        'radial-gradient(circle, #10b981, transparent)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

// Animation des compteurs
const animateCounter = (counterRef, targetValue, duration = 2000) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (targetValue - startValue) * easeOutQuart;

        counterRef.value = parseFloat(currentValue.toFixed(counterRef === counter3 ? 1 : 0));

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
};

// Observer pour l'animation au scroll
const initIntersectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Démarrer toutes les animations
                animateCounter(counter1, targetValues.clients);
                animateCounter(counter2, targetValues.companies);
                animateCounter(counter3, targetValues.security);
                animateCounter(counter4, targetValues.speed);

                // Ajouter l'animation d'entrée aux cartes
                entry.target.classList.add('animated');

                // Arrêter d'observer après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observer toutes les cartes de stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => observer.observe(card));
};

onMounted(() => {
    initParticles();
    initIntersectionObserver();
});
</script>

<style scoped>
.premium-stats-section {
    position: relative;
    background: linear-gradient(135deg, #061419 0%, #0F2727 50%, #063232 100%);
    padding: 100px 20px;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

/* Fond décoratif */
.premium-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.bg-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(90deg, rgba(106, 196, 166, 0.05) 1px, transparent 1px),
        linear-gradient(180deg, rgba(106, 196, 166, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 70%);
}

.bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(106, 196, 166, 0.1) 0%, transparent 70%);
    filter: blur(60px);
}

.bg-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.particle {
    position: absolute;
    border-radius: 50%;
    animation: floatParticle 20s infinite linear;
}

@keyframes floatParticle {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.3; }
    90% { opacity: 0.3; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

/* Conteneur principal */
.premium-container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

/* En-tête */
.premium-header {
    text-align: center;
    margin-bottom: 80px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.subtitle-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
}

.subtitle-line {
    height: 2px;
    width: 60px;
    background: linear-gradient(90deg, transparent, #6BC4A6, transparent);
}

.subtitle {
    color: #6BC4A6;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.main-title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    color: #E8F4F2;
    margin-bottom: 30px;
}

.title-gradient {
    background: linear-gradient(135deg, #2fb29f, #10b981, #e2f65c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
}

.description {
    font-size: 18px;
    line-height: 1.6;
    color: #C2E0D8;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

/* Grille de statistiques */
.premium-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 80px;
}

/* Carte de statistique */
.stat-card {
    background: rgba(15, 39, 39, 0.7);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 40px 30px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 0;
    transform: translateY(30px);
}

.stat-card.animated {
    animation: cardAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes cardAppear {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card:nth-child(1).animated { animation-delay: 0.1s; }
.stat-card:nth-child(2).animated { animation-delay: 0.2s; }
.stat-card:nth-child(3).animated { animation-delay: 0.3s; }
.stat-card:nth-child(4).animated { animation-delay: 0.4s; }

.stat-card:hover {
    transform: translateY(-10px);
    border-color: rgba(106, 196, 166, 0.4);
    box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(106, 196, 166, 0.1),
        inset 0 0 30px rgba(106, 196, 166, 0.05);
}

.stat-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(106, 196, 166, 0.1), transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.stat-card:hover .stat-glow {
    opacity: 1;
}

/* Contenu de la carte */
.stat-content {
    position: relative;
    z-index: 2;
}

.stat-icon {
    position: relative;
    width: 70px;
    height: 70px;
    margin-bottom: 25px;
}

.stat-icon i {
    font-size: 32px;
    color: #6BC4A6;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.icon-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 50%;
    animation: ringPulse 3s infinite;
}

@keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.5; }
}

/* Nombres */
.stat-numbers {
    position: relative;
    margin-bottom: 20px;
}

.counter-wrapper {
    display: flex;
    align-items: baseline;
    gap: 5px;
}

.counter {
    font-size: 56px;
    font-weight: 800;
    background: linear-gradient(135deg, #fff, #c2e0d8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.counter-suffix {
    font-size: 32px;
    font-weight: 600;
    color: #6BC4A6;
}

.stat-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shineMove 3s infinite;
}

/* Titre et description */
.stat-title {
    font-size: 22px;
    font-weight: 700;
    color: #E8F4F2;
    margin-bottom: 10px;
}

.stat-description {
    font-size: 14px;
    color: #C2E0D8;
    opacity: 0.8;
    line-height: 1.5;
    margin-bottom: 25px;
}

/* Éléments spécifiques */
.progress-ring {
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 20px;
}

.ring-svg {
    transform: rotate(-90deg);
}

.ring-bg {
    fill: none;
    stroke: rgba(106, 196, 166, 0.2);
    stroke-width: 6;
}

.ring-progress {
    fill: none;
    stroke: url(#gradient);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-dasharray: 0 100;
    transition: stroke-dasharray 1s ease-out;
}

.ring-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 700;
    color: #6BC4A6;
}

/* Features */
.stat-features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #C2E0D8;
}

.feature i {
    color: #10b981;
    font-size: 12px;
}

/* Sécurité */
.security-level {
    margin-top: 20px;
}

.level-bars {
    display: flex;
    gap: 4px;
    margin-bottom: 10px;
}

.level-bars .bar {
    height: 6px;
    width: 100%;
    background: rgba(106, 196, 166, 0.3);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
}

.level-bars .bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--width);
    background: linear-gradient(90deg, #10b981, #6BC4A6);
    animation: barFill 1.5s ease-out;
}

.level-text {
    font-size: 12px;
    color: #6BC4A6;
    font-weight: 600;
}

@keyframes barFill {
    from { width: 0; }
    to { width: var(--width); }
}

/* Vitesse */
.speed-indicator {
    margin-top: 20px;
    text-align: center;
}

.speed-dial {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: rgba(106, 196, 166, 0.1);
}

.dial-pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 35px;
    background: linear-gradient(to top, #3b82f6, #8b5cf6);
    transform-origin: bottom center;
    border-radius: 2px;
    transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dial-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #6BC4A6;
    border-radius: 50%;
}

.speed-label {
    font-size: 12px;
    color: #C2E0D8;
    opacity: 0.8;
}

/* Badges */
.stat-badge,
.stat-trend,
.security-badge,
.speed-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    backdrop-filter: blur(10px);
}

.stat-badge {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.1));
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #f59e0b;
}

.stat-trend {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.1));
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
}

.security-badge {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
}

.speed-badge {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: #8b5cf6;
}

/* Call to Action */
.premium-cta {
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8), rgba(6, 50, 50, 0.8));
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    padding: 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
}

.premium-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(106, 196, 166, 0.05), transparent 70%);
}

.cta-content {
    position: relative;
    z-index: 2;
    margin-bottom: 40px;
}

.cta-content h2 {
    font-size: 36px;
    font-weight: 700;
    color: #E8F4F2;
    margin-bottom: 15px;
}

.cta-content p {
    font-size: 18px;
    color: #C2E0D8;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    position: relative;
    z-index: 2;
}

.cta-btn {
    padding: 18px 35px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: none;
}

.cta-btn.primary {
    background: linear-gradient(135deg, #3b82f6, #10b981);
    color: white;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.cta-btn.primary:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
}

.cta-btn.secondary {
    background: rgba(106, 196, 166, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.3);
    color: #6BC4A6;
}

.cta-btn.secondary:hover {
    background: rgba(106, 196, 166, 0.2);
    transform: translateY(-3px);
}

.btn-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shineMove 2s infinite;
}

@keyframes shineMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Responsive */
@media (max-width: 1200px) {
    .premium-stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .main-title {
        font-size: 42px;
    }
}

@media (max-width: 768px) {
    .premium-stats-section {
        padding: 60px 20px;
    }

    .premium-stats-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .main-title {
        font-size: 32px;
    }

    .premium-cta {
        padding: 40px 20px;
    }

    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }

    .cta-btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }

    .counter {
        font-size: 48px;
    }
}

@media (max-width: 480px) {
    .stat-card {
        padding: 30px 20px;
    }

    .counter {
        font-size: 40px;
    }

    .stat-title {
        font-size: 20px;
    }

    .cta-content h2 {
        font-size: 28px;
    }
}
</style>
