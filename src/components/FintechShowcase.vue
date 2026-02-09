<template>
    <div class="premium-fintech-section">
        <!-- SVG Gradient (nécessaire pour les cercles de progression) -->
        <svg style="position: absolute; width: 0; height: 0; visibility: hidden;">
            <defs>
                <linearGradient id="fintech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" />
                    <stop offset="50%" stop-color="#10b981" />
                    <stop offset="100%" stop-color="#8b5cf6" />
                </linearGradient>
            </defs>
        </svg>

        <!-- Section de la carte premium -->
        <div class="card-section">
            <div class="section-header">
                <div class="title-wrapper">
                    <div class="subtitle-line"></div>
                    <span class="subtitle">Votre Carte Premium</span>
                    <div class="subtitle-line"></div>
                </div>
                <h2 class="section-title">
                    Découvrez la puissance de la
                    <span class="highlight">carte Benkky Infinite</span>
                </h2>
                <p class="section-description">
                    La carte qui réinvente votre expérience bancaire avec des limites repoussées
                    et une sécurité absolue.
                </p>
            </div>

            <!-- Carte de crédit -->
            <div class="card-display-wrapper">
                <BenkkyPremiumCard />
                <div class="card-actions">
                    <button class="card-action-btn" @click="requestCard">
                        <i class="fa-solid fa-credit-card"></i>
                        <span>Demander ma carte</span>
                        <div class="btn-glow"></div>
                    </button>
                    <button class="card-action-btn secondary" @click="virtualCard">
                        <i class="fa-solid fa-mobile-alt"></i>
                        <span>Carte virtuelle</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Section Services Fintech -->
        <div class="fintech-services-section">
            <!-- En-tête services -->
            <div class="services-header">
                <h2 class="services-title">
                    Une suite complète de
                    <span class="gradient-text">services financiers</span>
                </h2>
                <p class="services-description">
                    Benkky va au-delà de la banque traditionnelle avec une gamme complète
                    de solutions innovantes pour gérer, protéger et faire fructifier votre argent.
                </p>
            </div>

            <!-- Grille de services -->
            <div class="services-grid">
                <!-- Service 1 : Transfert d'argent -->
                <div class="service-card" @mouseenter="hoverService(1)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 1 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-paper-plane"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">Transfert Instantané</h3>
                    <p class="service-description">
                        Envoyez de l'argent en quelques secondes, 24h/24 et 7j/7,
                        vers plus de 150 pays avec des frais minimums.
                    </p>
                    <div class="service-stats">
                        <div class="stat">
                            <div class="stat-value">0.3s</div>
                            <div class="stat-label">Moyenne</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">150+</div>
                            <div class="stat-label">Pays</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">0.5%</div>
                            <div class="stat-label">Frais max</div>
                        </div>
                    </div>
                    <button class="service-action">
                        <span>Envoyer de l'argent</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                <!-- Service 2 : Cartes virtuelles -->
                <div class="service-card" @mouseenter="hoverService(2)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 2 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-sim-card"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">Cartes Virtuelles</h3>
                    <p class="service-description">
                        Générez des cartes virtuelles jetables pour vos achats en ligne.
                        Sécurisez vos transactions et gérez vos plafonds en temps réel.
                    </p>
                    <div class="service-features">
                        <div class="feature">
                            <i class="fa-solid fa-check"></i>
                            <span>Cartes jetables</span>
                        </div>
                        <div class="feature">
                            <i class="fa-solid fa-check"></i>
                            <span>Plafonds ajustables</span>
                        </div>
                        <div class="feature">
                            <i class="fa-solid fa-check"></i>
                            <span>Activation instantanée</span>
                        </div>
                    </div>
                    <button class="service-action">
                        <span>Créer une carte</span>
                        <i class="fa-solid fa-plus-circle"></i>
                    </button>
                </div>

                <!-- Service 3 : Crédit communication -->
                <div class="service-card" @mouseenter="hoverService(3)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 3 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-signal"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">Crédit Communication</h3>
                    <p class="service-description">
                        Rechargez vos forfaits mobiles et internet en un clic.
                        Supports tous les opérateurs avec des bonus exclusifs.
                    </p>
                    <div class="operator-grid">
                        <div class="operator" v-for="operator in operators" :key="operator">
                            <div class="operator-logo">{{ operator }}</div>
                        </div>
                    </div>
                    <div class="recharge-cta">
                        <input type="number" v-model="rechargeAmount" placeholder="Montant (€)" class="recharge-input">
                        <button class="recharge-btn">
                            <i class="fa-solid fa-bolt"></i>
                            <span>Recharger</span>
                        </button>
                    </div>
                </div>

                <!-- Service 4 : Investissement -->
                <div class="service-card" @mouseenter="hoverService(4)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 4 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-chart-line"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">Investissement Intelligent</h3>
                    <p class="service-description">
                        Faites fructifier votre argent avec nos portefeuilles d'investissement
                        gérés par IA. Rendements optimisés, risques minimisés.
                    </p>
                    <div class="investment-stats">
                        <div class="performance">
                            <div class="performance-label">Performance annuelle</div>
                            <div class="performance-value">+12.5%</div>
                            <div class="performance-graph">
                                <div class="graph-bar" style="--height: 70%"></div>
                                <div class="graph-bar" style="--height: 85%"></div>
                                <div class="graph-bar" style="--height: 65%"></div>
                                <div class="graph-bar" style="--height: 90%"></div>
                                <div class="graph-bar" style="--height: 75%"></div>
                            </div>
                        </div>
                    </div>
                    <button class="service-action">
                        <span>Démarrer</span>
                        <i class="fa-solid fa-rocket"></i>
                    </button>
                </div>

                <!-- Service 5 : eSIM Globale -->
                <div class="service-card" @mouseenter="hoverService(5)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 5 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-sim-card"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">eSIM Globale</h3>
                    <p class="service-description">
                        Connectez-vous partout dans le monde avec notre eSIM.
                        Plus besoin de cartes SIM physiques, activez en quelques secondes.
                    </p>
                    <div class="esim-coverage">
                        <div class="coverage-item">
                            <i class="fa-solid fa-globe-americas"></i>
                            <span>180+ pays couverts</span>
                        </div>
                        <div class="coverage-item">
                            <i class="fa-solid fa-wifi"></i>
                            <span>4G/5G illimité</span>
                        </div>
                        <div class="coverage-item">
                            <i class="fa-solid fa-bolt"></i>
                            <span>Activation immédiate</span>
                        </div>
                    </div>
                    <button class="service-action">
                        <span>Activer eSIM</span>
                        <i class="fa-solid fa-qrcode"></i>
                    </button>
                </div>

                <!-- Service 6 : Change intelligent -->
                <div class="service-card" @mouseenter="hoverService(6)" @mouseleave="resetHover">
                    <div class="service-glow" :class="{ active: hoveredService === 6 }"></div>
                    <div class="service-icon">
                        <div class="icon-container">
                            <i class="fa-solid fa-exchange-alt"></i>
                            <div class="icon-pulse"></div>
                        </div>
                    </div>
                    <h3 class="service-title">Change Intelligent</h3>
                    <p class="service-description">
                        Changez vos devises aux meilleurs taux du marché.
                        Notre algorithme surveille les marchés 24h/24 pour vous.
                    </p>
                    <div class="exchange-rates">
                        <div class="rate" v-for="rate in exchangeRates" :key="rate.pair">
                            <div class="rate-pair">{{ rate.pair }}</div>
                            <div class="rate-value">{{ rate.value }}</div>
                            <div class="rate-change" :class="{ up: rate.change > 0, down: rate.change < 0 }">
                                {{ rate.change > 0 ? '+' : '' }}{{ rate.change }}%
                            </div>
                        </div>
                    </div>
                    <button class="service-action">
                        <span>Changer maintenant</span>
                        <i class="fa-solid fa-calculator"></i>
                    </button>
                </div>
            </div>

            <!-- Statistiques globales -->
            <div class="global-stats">
                <div class="stat-card-large">
                    <div class="stat-content">
                        <div class="stat-main">
                            <div class="stat-number">2.5M+</div>
                            <div class="stat-label">Utilisateurs actifs</div>
                        </div>
                        <div class="stat-trend">
                            <i class="fa-solid fa-arrow-up"></i>
                            <span>+45% cette année</span>
                        </div>
                    </div>
                </div>
                <div class="stat-card-large">
                    <div class="stat-content">
                        <div class="stat-main">
                            <div class="stat-number">€850M+</div>
                            <div class="stat-label">Transféré ce mois</div>
                        </div>
                        <div class="stat-trend">
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Croissance record</span>
                        </div>
                    </div>
                </div>
                <div class="stat-card-large">
                    <div class="stat-content">
                        <div class="stat-main">
                            <div class="stat-number">4.9/5</div>
                            <div class="stat-label">Satisfaction client</div>
                        </div>
                        <div class="stat-ratings">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Call to Action final -->
        <div class="ultimate-cta">
            <div class="cta-background">
                <div class="cta-glow"></div>
                <div class="cta-particles">
                    <div class="particle" v-for="(particle, index) in ctaParticles"
                         :key="index" :style="particle.style"></div>
                </div>
            </div>
            <div class="cta-content">
                <h2 class="cta-title">
                    Prêt à rejoindre la
                    <span class="gradient-text">révolution Fintech</span> ?
                </h2>
                <p class="cta-description">
                    Rejoignez des millions d'utilisateurs qui ont déjà transformé leur manière
                    de gérer leur argent. Simple, sécurisé, révolutionnaire.
                </p>
                <div class="cta-buttons">
                    <button class="cta-btn primary" @click="openAccount">
                        <i class="fa-solid fa-user-plus"></i>
                        <span>Créer mon compte</span>
                        <div class="btn-shine"></div>
                    </button>
                    <button class="cta-btn secondary" @click="seeDemo">
                        <i class="fa-solid fa-play-circle"></i>
                        <span>Voir la démo</span>
                    </button>
                </div>
                <div class="security-badges">
                    <div class="badge">
                        <i class="fa-solid fa-shield-check"></i>
                        <span>256-bit encryption</span>
                    </div>
                    <div class="badge">
                        <i class="fa-solid fa-certificate"></i>
                        <span>Certifié PCI DSS</span>
                    </div>
                    <div class="badge">
                        <i class="fa-solid fa-lock"></i>
                        <span>2FA obligatoire</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Référence à la carte premium (vous devez l'importer)
// import BenkkyPremiumCard from './BenkkyPremiumCard.vue';

// État pour les services survolés
const hoveredService = ref(0);
const rechargeAmount = ref(20);
const ctaParticles = ref([]);

// Opérateurs mobiles
const operators = ref(['ORANGE', 'SFR', 'FREE', 'BOUYGUES', 'LYCAMOBILE', 'LEBARA']);

// Taux de change
const exchangeRates = ref([
    { pair: 'EUR/USD', value: '1.0854', change: 0.24 },
    { pair: 'EUR/GBP', value: '0.8571', change: -0.12 },
    { pair: 'EUR/XAF', value: '655.96', change: 0.05 }
]);

// Fonctions pour l'interactivité
const hoverService = (index) => {
    hoveredService.value = index;
};

const resetHover = () => {
    hoveredService.value = 0;
};

const requestCard = () => {
    console.log('Demande de carte physique');
    // Implémentez la logique de demande de carte
    alert('Demande de carte physique envoyée !');
};

const virtualCard = () => {
    console.log('Génération de carte virtuelle');
    // Implémentez la logique de génération de carte virtuelle
    alert('Carte virtuelle générée avec succès !');
};

const openAccount = () => {
    console.log('Ouverture de compte');
    // Implémentez la logique d'ouverture de compte
    alert('Redirection vers la création de compte...');
};

const seeDemo = () => {
    console.log('Voir la démo');
    // Implémentez la logique pour montrer la démo
    alert('Lancement de la démo...');
};

// Initialiser les particules
const initParticles = () => {
    ctaParticles.value = [];
    for (let i = 0; i < 15; i++) {
        ctaParticles.value.push({
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.2 + 0.1,
                background: getRandomGradient()
            }
        });
    }
};

const getRandomGradient = () => {
    const gradients = [
        'radial-gradient(circle, #6BC4A6, transparent)',
        'radial-gradient(circle, #3b82f6, transparent)',
        'radial-gradient(circle, #8b5cf6, transparent)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

onMounted(() => {
    initParticles();
});
</script>

<style scoped>
.premium-fintech-section {
    background: linear-gradient(135deg, #061419 0%, #0F2727 50%, #063232 100%);
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
}

/* Section de la carte */
.card-section {
    max-width: 1200px;
    margin: 0 auto 100px;
    text-align: center;
}

.section-header {
    margin-bottom: 60px;
}

.title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 25px;
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

.section-title {
    font-size: 48px;
    font-weight: 800;
    color: #E8F4F2;
    margin-bottom: 20px;
    line-height: 1.2;
}

.highlight {
    background: linear-gradient(135deg, #3b82f6, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-description {
    font-size: 18px;
    color: #C2E0D8;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
    line-height: 1.6;
}

/* Affichage de la carte */
.card-display-wrapper {
    max-width: 500px;
    margin: 0 auto;
    position: relative;
}

.card-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 40px;
}

.card-action-btn {
    padding: 16px 32px;
    background: linear-gradient(135deg, #3b82f6, #10b981);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.card-action-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.card-action-btn.secondary {
    background: rgba(106, 196, 166, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.3);
    color: #6BC4A6;
}

.card-action-btn.secondary:hover {
    background: rgba(106, 196, 166, 0.2);
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

/* Section des services Fintech */
.fintech-services-section {
    max-width: 1400px;
    margin: 0 auto 100px;
}

.services-header {
    text-align: center;
    margin-bottom: 60px;
}

.services-title {
    font-size: 42px;
    font-weight: 800;
    color: #E8F4F2;
    margin-bottom: 20px;
    line-height: 1.2;
}

.gradient-text {
    background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.services-description {
    font-size: 18px;
    color: #C2E0D8;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
    line-height: 1.6;
}

/* Grille de services */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

/* Carte de service */
.service-card {
    background: rgba(15, 39, 39, 0.7);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    padding: 35px 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    backdrop-filter: blur(10px);
}

.service-card:hover {
    transform: translateY(-10px);
    border-color: rgba(106, 196, 166, 0.4);
    box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(106, 196, 166, 0.1);
}

.service-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(106, 196, 166, 0.1), transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.service-glow.active {
    opacity: 1;
}

.service-icon {
    margin-bottom: 25px;
}

.icon-container {
    position: relative;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-container i {
    font-size: 28px;
    color: #6BC4A6;
    position: relative;
    z-index: 2;
}

.icon-pulse {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 18px;
    animation: pulse 3s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.5; }
}

.service-title {
    font-size: 22px;
    font-weight: 700;
    color: #E8F4F2;
    margin-bottom: 15px;
}

.service-description {
    font-size: 14px;
    color: #C2E0D8;
    opacity: 0.9;
    line-height: 1.5;
    margin-bottom: 25px;
}

/* Stats du service */
.service-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
}

.stat {
    text-align: center;
    flex: 1;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #6BC4A6;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 12px;
    color: #C2E0D8;
    opacity: 0.8;
}

/* Features */
.service-features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 25px;
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

/* Opérateurs */
.operator-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 25px;
}

.operator {
    background: rgba(106, 196, 166, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
}

.operator-logo {
    font-size: 12px;
    font-weight: 600;
    color: #6BC4A6;
}

/* Recharge */
.recharge-cta {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

.recharge-input {
    flex: 1;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 8px;
    color: #E8F4F2;
    font-size: 16px;
}

.recharge-input::placeholder {
    color: rgba(194, 224, 216, 0.5);
}

.recharge-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #3b82f6, #10b981);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

/* Investissement */
.investment-stats {
    margin-bottom: 25px;
}

.performance {
    text-align: center;
}

.performance-label {
    font-size: 12px;
    color: #C2E0D8;
    opacity: 0.8;
    margin-bottom: 5px;
}

.performance-value {
    font-size: 28px;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 15px;
}

.performance-graph {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 60px;
    padding: 0 10px;
}

.graph-bar {
    flex: 1;
    height: var(--height);
    background: linear-gradient(to top, #10b981, #6BC4A6);
    border-radius: 4px 4px 0 0;
    animation: barGrow 1.5s ease-out;
}

@keyframes barGrow {
    from { height: 0; }
    to { height: var(--height); }
}

/* eSIM Coverage */
.esim-coverage {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 25px;
}

.coverage-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #C2E0D8;
}

.coverage-item i {
    color: #6BC4A6;
    width: 20px;
}

/* Taux de change */
.exchange-rates {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 25px;
}

.rate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    background: rgba(106, 196, 166, 0.05);
    border-radius: 8px;
}

.rate-pair {
    font-weight: 600;
    color: #E8F4F2;
}

.rate-value {
    font-weight: 700;
    color: #6BC4A6;
}

.rate-change {
    font-size: 12px;
    font-weight: 600;
}

.rate-change.up {
    color: #10b981;
}

.rate-change.down {
    color: #ef4444;
}

/* Action button commun */
.service-action {
    width: 100%;
    padding: 14px;
    background: rgba(106, 196, 166, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 10px;
    color: #6BC4A6;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.service-action:hover {
    background: rgba(106, 196, 166, 0.2);
    transform: translateX(5px);
}

/* Statistiques globales */
.global-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 60px;
}

.stat-card-large {
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8), rgba(6, 50, 50, 0.8));
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 20px;
    padding: 40px;
    backdrop-filter: blur(10px);
}

.stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-main {
    text-align: left;
}

.stat-number {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(135deg, #fff, #c2e0d8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 10px;
}

.stat-label {
    font-size: 16px;
    color: #C2E0D8;
    opacity: 0.9;
}

.stat-trend {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 20px;
    color: #10b981;
    font-weight: 600;
    font-size: 14px;
}

.stat-ratings {
    display: flex;
    gap: 5px;
    color: #f59e0b;
    font-size: 20px;
}

/* Call to Action final */
.ultimate-cta {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.9), rgba(6, 50, 50, 0.9));
    border: 1px solid rgba(106, 196, 166, 0.3);
    padding: 80px 60px;
    text-align: center;
}

.cta-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.cta-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(106, 196, 166, 0.1) 0%, transparent 70%);
    filter: blur(40px);
}

.cta-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.cta-particles .particle {
    position: absolute;
    border-radius: 50%;
    animation: floatParticle 15s infinite linear;
}

.cta-content {
    position: relative;
    z-index: 2;
}

.cta-title {
    font-size: 42px;
    font-weight: 800;
    color: #E8F4F2;
    margin-bottom: 20px;
    line-height: 1.2;
}

.cta-description {
    font-size: 18px;
    color: #C2E0D8;
    max-width: 600px;
    margin: 0 auto 40px;
    opacity: 0.9;
    line-height: 1.6;
}

.cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;
}

.cta-btn {
    padding: 18px 40px;
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

.btn-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shineMove 2s infinite;
}

.security-badges {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(106, 196, 166, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    color: #6BC4A6;
    font-size: 14px;
    font-weight: 500;
}

.badge i {
    font-size: 16px;
}

/* Animations */
@keyframes shineMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes floatParticle {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.3; }
    90% { opacity: 0.3; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

/* Responsive */
@media (max-width: 1200px) {
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .section-title {
        font-size: 42px;
    }

    .services-title {
        font-size: 36px;
    }
}

@media (max-width: 768px) {
    .premium-fintech-section {
        padding: 60px 20px;
    }

    .services-grid {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 32px;
    }

    .services-title {
        font-size: 28px;
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

    .card-actions {
        flex-direction: column;
        align-items: center;
    }

    .card-action-btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }

    .ultimate-cta {
        padding: 50px 20px;
    }

    .cta-title {
        font-size: 32px;
    }
}

@media (max-width: 480px) {
    .service-card {
        padding: 25px 20px;
    }

    .stat-number {
        font-size: 36px;
    }

    .stat-card-large {
        padding: 30px 20px;
    }

    .global-stats {
        grid-template-columns: 1fr;
    }
}
</style>
