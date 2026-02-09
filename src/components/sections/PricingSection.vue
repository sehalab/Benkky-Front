<template>
    <section class="pricing-section have-after pt-120 pb-120">
        <div class="container">
            <div class="sec-title center mb-50">
                <h6 class="sub-title wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">cartes premium benkky</h6>
                <h2 class="title wow splt-txt" data-splitting>cartes optimisées <br>pour vos passions digitales</h2>
                <p class="section-description wow fadeInUp" data-wow-delay="200ms">
                    Choisissez la carte qui correspond à votre style de vie digital
                </p>
            </div>

            <div class="cards-container">
                <div class="row g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6"
                         v-for="(card, index) in creditCards"
                         :key="card.id"
                         :class="`wow fadeInUp`"
                         :data-wow-delay="`${index * 200}ms`"
                         data-wow-duration="1500ms">

                        <div class="card-wrapper" :class="{ 'featured': card.featured }">
                            <!-- Badge recommandé -->
                            <div v-if="card.featured" class="recommended-badge">
                                <i class="fas fa-crown"></i>
                                <span>RECOMMANDÉ</span>
                            </div>

                            <!-- Carte de crédit physique -->
                            <div class="credit-card-visual" @click="flipCard(card.id)">
                                <div class="card-3d-container" :class="{ 'flipped': flippedCards[card.id] }">
                                    <!-- Face avant de la carte -->
                                    <div class="card-face card-front" :style="card.frontStyle">
                                        <!-- Effet de dégradé animé -->
                                        <div class="gradient-animation" :style="card.gradientStyle"></div>

                                        <!-- Effets visuels -->
                                        <div class="particles-container">
                                            <div class="particle" v-for="n in 8" :key="n"
                                                 :style="getParticleStyle(n, card.themeColor)"></div>
                                        </div>

                                        <!-- Logo de la plateforme -->
                                        <div class="platform-glow">
                                            <div class="platform-icon">
                                                <i :class="card.platformIcon"></i>
                                            </div>
                                        </div>

                                        <!-- En-tête de carte -->
                                        <div class="card-header">
                                            <div class="bank-logo">
                                                <img src="/images/logo_benkky.png" alt="Benkky" class="logo-img">
                                            </div>
                                            <div class="card-type">
                                                <span class="type-text">PREMIUM</span>
                                            </div>
                                        </div>

                                        <!-- Puce holographique -->
                                        <div class="holographic-chip">
                                            <div class="chip-core"></div>
                                            <div class="chip-reflect"></div>
                                            <div class="chip-glow" :style="{ background: card.chipGlow }"></div>
                                        </div>

                                        <!-- Numéro de carte stylisé -->
                                        <div class="card-number-display">
                                            <div class="number-group" v-for="group in card.cardNumber" :key="group">
                                                <span class="number-digit" v-for="digit in group" :key="digit">{{ digit }}</span>
                                            </div>
                                        </div>

                                        <!-- Nom de la carte avec effet néon -->
                                        <div class="card-title-neon">
                                            <h3 class="card-name" :style="{ color: card.titleColor }">{{ card.name }}</h3>
                                            <div class="card-subtitle">{{ card.subtitle }}</div>
                                        </div>

                                        <!-- Logo du réseau de paiement -->
                                        <div class="payment-network">
                                            <div class="network-icon">
                                                <i class="fas fa-wifi"></i>
                                            </div>
                                            <div class="contactless-badge">
                                                <i class="fas fa-bolt"></i>
                                                <span>CONTACTLESS</span>
                                            </div>
                                        </div>

                                        <!-- Infos détenteur -->
                                        <div class="card-holder-info">
                                            <div class="holder-label">TITULAIRE</div>
                                            <div class="holder-name">VOTRE NOM</div>
                                        </div>

                                        <!-- Date d'expiration -->
                                        <div class="expiry-info">
                                            <div class="expiry-label">VALIDE JUSQU'À</div>
                                            <div class="expiry-date">12/28</div>
                                        </div>

                                        <!-- Élément décoratif -->
                                        <div class="decorative-element">
                                            <div class="decor-line"></div>
                                            <div class="decor-dot"></div>
                                            <div class="decor-line"></div>
                                        </div>
                                    </div>

                                    <!-- Face arrière de la carte -->
                                    <div class="card-face card-back" :style="card.backStyle">
                                        <!-- Bande magnétique -->
                                        <div class="magnetic-strip"></div>

                                        <!-- Signature -->
                                        <div class="signature-area">
                                            <div class="signature-label">SIGNATURE DU TITULAIRE</div>
                                            <div class="signature-line"></div>
                                        </div>

                                        <!-- Code de sécurité -->
                                        <div class="security-code">
                                            <div class="cvv-label">CODE DE SÉCURITÉ</div>
                                            <div class="cvv-box">
                                                <div class="cvv-number">{{ card.securityCode }}</div>
                                            </div>
                                        </div>

                                        <!-- Contact et sécurité -->
                                        <div class="contact-security">
                                            <div class="contact-info">
                                                <i class="fas fa-phone-alt"></i>
                                                <span>24/7 SUPPORT</span>
                                            </div>
                                            <div class="security-seal">
                                                <i class="fas fa-shield-alt"></i>
                                                <span>3D SECURE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Détails de la carte dans des onglets -->
                            <div class="card-details-tabs">
                                <!-- Onglets -->
                                <div class="details-tabs-header">
                                    <button class="tab-btn"
                                            :class="{ active: activeTab === card.id + '-advantages' }"
                                            @click="setActiveTab(card.id + '-advantages')">
                                        <i class="fas fa-star"></i>
                                        <span>Avantages</span>
                                    </button>
                                    <button class="tab-btn"
                                            :class="{ active: activeTab === card.id + '-features' }"
                                            @click="setActiveTab(card.id + '-features')">
                                        <i class="fas fa-sliders-h"></i>
                                        <span>Caractéristiques</span>
                                    </button>
                                    <button class="tab-btn"
                                            :class="{ active: activeTab === card.id + '-pricing' }"
                                            @click="setActiveTab(card.id + '-pricing')">
                                        <i class="fas fa-euro-sign"></i>
                                        <span>Tarifs</span>
                                    </button>
                                </div>

                                <!-- Contenu des onglets -->
                                <div class="tab-content-wrapper">
                                    <!-- Avantages -->
                                    <div class="tab-content"
                                         :class="{ active: activeTab === card.id + '-advantages' }">
                                        <div class="advantages-grid">
                                            <div class="advantage-item" v-for="advantage in card.advantages" :key="advantage.title">
                                                <div class="advantage-icon" :style="{ color: card.themeColor }">
                                                    <i :class="advantage.icon"></i>
                                                </div>
                                                <div class="advantage-content">
                                                    <h5>{{ advantage.title }}</h5>
                                                    <p>{{ advantage.description }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Caractéristiques -->
                                    <div class="tab-content"
                                         :class="{ active: activeTab === card.id + '-features' }">
                                        <div class="features-list">
                                            <div class="feature-item" v-for="feature in card.features" :key="feature">
                                                <i class="fas fa-check" :style="{ color: card.themeColor }"></i>
                                                <span>{{ feature }}</span>
                                            </div>
                                        </div>
                                        <div class="card-limits">
                                            <div class="limit-item">
                                                <div class="limit-label">Plafond mensuel</div>
                                                <div class="limit-value">{{ card.monthlyLimit }}</div>
                                            </div>
                                            <div class="limit-item">
                                                <div class="limit-label">Transaction max</div>
                                                <div class="limit-value">{{ card.transactionLimit }}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tarifs -->
                                    <div class="tab-content"
                                         :class="{ active: activeTab === card.id + '-pricing' }">
                                        <div class="pricing-card">
                                            <div class="price-main">
                                                <div class="price-amount" :style="{ color: card.themeColor }">
                                                    {{ card.price }}
                                                </div>
                                                <div class="price-period">/ mois</div>
                                            </div>
                                            <div class="price-details">
                                                <div class="price-detail">
                                                    <span class="detail-label">Frais d'ouverture</span>
                                                    <span class="detail-value">{{ card.openingFees }}</span>
                                                </div>
                                                <div class="price-detail">
                                                    <span class="detail-label">Assurance</span>
                                                    <span class="detail-value">{{ card.insurance }}</span>
                                                </div>
                                            </div>
                                            <div class="effective-cost">
                                                <span class="cost-label">Coût effectif mensuel</span>
                                                <span class="cost-value" :style="{ color: card.themeColor }">
                                                    {{ card.effectiveCost }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bouton d'action -->
                                <div class="card-action">
                                    <Link :href="`/apply?card=${card.id}`"
                                          class="apply-btn"
                                          :style="{
                                            background: `linear-gradient(135deg, ${card.themeColor}, ${darkenColor(card.themeColor, 20)})`
                                          }">
                                        <span class="btn-text">Demander cette carte</span>
                                        <span class="btn-icon">
                                            <i class="fas fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                    <div class="approval-rate">
                                        <i class="fas fa-bolt"></i>
                                        <span>Approval instantané sous 24h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const activeTab = ref('streaming-advantages');
const flippedCards = ref({});

// Fonction pour assombrir une couleur
const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
};

// Générer un style de particule
const getParticleStyle = (index, color) => {
    const size = Math.random() * 6 + 2;
    const opacity = Math.random() * 0.3 + 0.1;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    return {
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}, transparent)`,
        opacity: opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
    };
};

// Données des cartes de crédit
const creditCards = ref([
    {
        id: 'streaming',
        name: '',
        subtitle: 'Carte Divertissement Digital',
        platformIcon: 'fas fa-film',
        themeColor: '#0c401c', // Vert foncé du thème
        titleColor: '#0c401c',
        cardNumber: ['4532', '8192', '5678', '1234'],
        securityCode: '123',
        price: '9,99€',
        openingFees: '0€',
        insurance: 'Incluse',
        effectiveCost: '6,99€',
        monthlyLimit: '2 500€',
        transactionLimit: '500€',
        frontStyle: {
            background: 'linear-gradient(135deg, #0a1929 0%, #0F2727 100%)',
            border: '1px solid rgba(12, 64, 28, 0.3)' // Vert foncé avec transparence
        },
        backStyle: {
            background: 'linear-gradient(135deg, #0F2727 0%, #0a1929 100%)',
            border: '1px solid rgba(12, 64, 28, 0.3)'
        },
        gradientStyle: {
            background: 'linear-gradient(45deg, transparent, rgba(12, 64, 28, 0.1), transparent)'
        },
        chipGlow: 'radial-gradient(circle, rgba(12, 64, 28, 0.5), transparent)',
        advantages: [
            {
                icon: 'fas fa-tv',
                title: 'Optimisé Streaming',
                description: 'Cartes virtuelles dédiées pour Netflix, Disney+, Amazon Prime'
            },
            {
                icon: 'fas fa-gem',
                title: 'Avantages exclusifs',
                description: 'Accès anticipé aux nouveautés et contenu exclusif'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Sécurité renforcée',
                description: 'Protection optimisée contre les fraudes d\'abonnement'
            }
        ],
        features: [
            'Plafond mensuel élevé',
            'Transactions sans contact',
            'Assurances incluses',
            'Service client premium',
            'Alertes en temps réel',
            'Gestion via application'
        ],
        featured: false
    },
    {
        id: 'tech',
        name: '',
        subtitle: 'Carte Innovation & Technologie',
        platformIcon: 'fas fa-satellite',
        themeColor: '#2A8C82', // Vert turquoise du thème
        titleColor: '#2A8C82',
        cardNumber: ['5578', '4321', '9876', '5432'],
        securityCode: '456',
        price: '14,99€',
        openingFees: '0€',
        insurance: 'Premium',
        effectiveCost: '10,49€',
        monthlyLimit: '5 000€',
        transactionLimit: '1 000€',
        frontStyle: {
            background: 'linear-gradient(135deg, #0a1929 0%, #0F2727 100%)',
            border: '1px solid rgba(42, 140, 130, 0.3)' // Vert turquoise avec transparence
        },
        backStyle: {
            background: 'linear-gradient(135deg, #0F2727 0%, #0a1929 100%)',
            border: '1px solid rgba(42, 140, 130, 0.3)'
        },
        gradientStyle: {
            background: 'linear-gradient(45deg, transparent, rgba(42, 140, 130, 0.1), transparent)'
        },
        chipGlow: 'radial-gradient(circle, rgba(42, 140, 130, 0.5), transparent)',
        advantages: [
            {
                icon: 'fas fa-rocket',
                title: 'Support Tech Premium',
                description: 'Assistance dédiée pour Starlink, Apple, Amazon Tech'
            },
            {
                icon: 'fas fa-wrench',
                title: 'Garantie Étendue',
                description: 'Extension automatique de garantie sur achats high-tech'
            },
            {
                icon: 'fas fa-bolt',
                title: 'Priorité Maximum',
                description: 'Traitement prioritaire des transactions et réclamations'
            }
        ],
        features: [
            'Plafond élevé techno',
            'Payement sans contact NFC',
            'Assurances voyage',
            'Support 24/7 VIP',
            'Alertes personnalisées',
            'App gestion avancée'
        ],
        featured: true
    },
    {
        id: 'shopping',
        name: '',
        subtitle: 'Carte E-commerce International',
        platformIcon: 'fas fa-shopping-cart',
        themeColor: '#a87f1f', // Or/vert doré du thème
        titleColor: '#a87f1f',
        cardNumber: ['3782', '8224', '6310', '0055'],
        securityCode: '789',
        price: '12,99€',
        openingFees: '0€',
        insurance: 'Complète',
        effectiveCost: '8,99€',
        monthlyLimit: '10 000€',
        transactionLimit: '2 500€',
        frontStyle: {
            background: 'linear-gradient(135deg, #0a1929 0%, #0F2727 100%)',
            border: '1px solid rgba(168, 127, 31, 0.3)' // Or avec transparence
        },
        backStyle: {
            background: 'linear-gradient(135deg, #0F2727 0%, #0a1929 100%)',
            border: '1px solid rgba(168, 127, 31, 0.3)'
        },
        gradientStyle: {
            background: 'linear-gradient(45deg, transparent, rgba(168, 127, 31, 0.1), transparent)'
        },
        chipGlow: 'radial-gradient(circle, rgba(168, 127, 31, 0.5), transparent)',
        advantages: [
            {
                icon: 'fas fa-globe',
                title: 'Shopping International',
                description: '0% de frais sur Amazon, AliExpress, eBay et Shopify'
            },
            {
                icon: 'fas fa-box',
                title: 'Protection Acheteur',
                description: 'Remboursement garanti en cas de problème de livraison'
            },
            {
                icon: 'fas fa-truck',
                title: 'Avantages Livraison',
                description: 'Réductions exclusives sur les frais de livraison'
            }
        ],
        features: [
            'Plafond e-commerce étendu',
            'Transactions internationales',
            'Protection achats',
            'Service client shopping',
            'Alertes promotions',
            'App gestion shopping'
        ],
        featured: false
    }
]);

const flipCard = (cardId) => {
    flippedCards.value[cardId] = !flippedCards.value[cardId];
};

const setActiveTab = (tabId) => {
    activeTab.value = tabId;
};
</script>

<style scoped>
/* Section principale --gradient-dark: linear-gradient(135deg, var(--dark-color1) 0%, var(--dark-color3) 100%); */
.pricing-section {
    background: linear-gradient(135deg, var(--dark-color1) 39%, var(--dark-color3) 100%);
    position: relative;
    overflow: hidden;
}

.pricing-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #6BC4A6, transparent);
}

.sec-title .title {
    background: linear-gradient(135deg, #fff, #6BC4A6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 42px;
    margin-bottom: 15px;
}

.sub-title {
    color: #0d1512;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 14px;
    font-weight: 600;
}

.section-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto;
}

/* Wrapper de la carte */
.card-wrapper {
    background: rgba(15, 39, 39, 0.4);
    border-radius: 25px;
    padding: 25px;
    position: relative;
    border: 1px solid rgba(106, 196, 166, 0.1);
    transition: all 0.3s ease;
    height: 100%;
    backdrop-filter: blur(10px);
}

.card-wrapper:hover {
    transform: translateY(-10px);
    border-color: rgba(106, 196, 166, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-wrapper.featured {
    border: 2px solid #ffffff;
    background: rgba(15, 39, 39, 0.6);
}

.recommended-badge {
    position: absolute;
    top: -12px;
    right: 25px;
    background: linear-gradient(135deg, #7acc00, #995e00);
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 1px;
    z-index: 10;
    box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
}

.recommended-badge i {
    font-size: 14px;
}

/* Carte de crédit visuelle */
.credit-card-visual {
    height: 250px;
    perspective: 1000px;
    margin-bottom: 30px;
    cursor: pointer;
}

.card-3d-container {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
}

.card-3d-container.flipped {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    padding: 25px;
}

.card-front {
    background: linear-gradient(135deg, #0a1929 0%, #0F2727 100%);
    position: relative;
    z-index: 2;
}

.card-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #0F2727 0%, #0a1929 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Effets visuels sur la carte */
.gradient-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: gradientFlow 3s infinite linear;
}

@keyframes gradientFlow {
    0% { transform: translateX(-100%) translateY(-100%); }
    100% { transform: translateX(100%) translateY(100%); }
}

.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.particle {
    position: absolute;
    border-radius: 50%;
    animation: particleFloat linear infinite;
    z-index: 1;
}

@keyframes particleFloat {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0;
    }
}

.platform-glow {
    position: absolute;
    top: 20px;
    right: 25px;
    z-index: 3;
}

.platform-icon {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.platform-icon i {
    font-size: 24px;
    color: white;
}

/* Header de carte */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 3;
}

.bank-logo img {
    height: 30px;
    width: auto;
    filter: brightness(0) invert(1);
}

.card-type {
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 15px;
    border-radius: 15px;
    backdrop-filter: blur(5px);
}

.type-text {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: white;
}

/* Puce holographique */
.holographic-chip {
    position: absolute;
    top: 70px;
    left: 25px;
    width: 50px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    z-index: 3;
}

.chip-core {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #d4af37, #ffd700, #d4af37);
}

.chip-reflect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.chip-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    filter: blur(10px);
    animation: chipGlow 2s infinite alternate;
}

@keyframes chipGlow {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
}

/* Numéro de carte */
.card-number-display {
    display: flex;
    gap: 20px;
    margin: 40px 0 25px;
    justify-content: center;
    position: relative;
    z-index: 3;
}

.number-group {
    display: flex;
    gap: 2px;
}

.number-digit {
    font-family: 'Courier New', monospace;
    font-size: 18px;
    font-weight: 600;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    animation: digitGlow 3s infinite alternate;
}

@keyframes digitGlow {
    0% {
        opacity: 0.9;
        text-shadow: 0 0 5px currentColor;
    }
    100% {
        opacity: 1;
        text-shadow: 0 0 15px currentColor, 0 0 20px currentColor;
    }
}

/* Titre néon */
.card-title-neon {
    text-align: center;
    margin-bottom: 25px;
    position: relative;
    z-index: 3;
}

.card-name {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 5px;
    text-shadow: 0 0 10px currentColor;
    animation: neonPulse 2s infinite alternate;
}

@keyframes neonPulse {
    0% { text-shadow: 0 0 10px currentColor; }
    100% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

.card-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
}

/* Réseau de paiement */
.payment-network {
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 3;
}

.network-icon i {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.9);
    transform: rotate(90deg);
}

.contactless-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
}

.contactless-badge i {
    color: #FFD700;
    font-size: 12px;
}

.contactless-badge span {
    font-size: 9px;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
}

/* Infos détenteur et expiration */
.card-holder-info {
    position: absolute;
    bottom: 25px;
    left: 25px;
    z-index: 3;
}

.expiry-info {
    position: absolute;
    bottom: 25px;
    left: 150px;
    z-index: 3;
}

.holder-label, .expiry-label {
    font-size: 9px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
    margin-bottom: 3px;
}

.holder-name, .expiry-date {
    font-size: 14px;
    font-weight: 600;
    color: white;
    letter-spacing: 1px;
}

/* Élément décoratif */
.decorative-element {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 3;
}

.decor-line {
    width: 40px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
}

.decor-dot {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
}

/* Face arrière */
.magnetic-strip {
    height: 40px;
    background: linear-gradient(to right, #000, #333, #666, #333, #000);
    border-radius: 5px;
    margin-top: 20px;
}

.signature-area {
    margin: 30px 0;
}

.signature-label {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
}

.signature-line {
    height: 40px;
    background: repeating-linear-gradient(
        45deg,
        #fff,
        #fff 5px,
        #f0f0f0 5px,
        #f0f0f0 10px
    );
    border-radius: 5px;
}

.security-code {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.cvv-label {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
}

.cvv-box {
    width: 60px;
    height: 30px;
    background: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cvv-number {
    font-family: 'Courier New', monospace;
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

.contact-security {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-info, .security-seal {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.8);
}

.contact-info i, .security-seal i {
    color: #6BC4A6;
    font-size: 12px;
}

/* Onglets de détails */
.card-details-tabs {
    margin-top: 25px;
}

.details-tabs-header {
    display: flex;
    gap: 5px;
    background: rgba(10, 25, 41, 0.5);
    border-radius: 15px;
    padding: 5px;
    margin-bottom: 20px;
}

.tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: transparent;
    border: none;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab-btn i {
    font-size: 14px;
}

.tab-btn.active {
    background: rgba(106, 196, 166, 0.2);
    color: white;
}

.tab-btn:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
    color: white;
}

.tab-content-wrapper {
    min-height: 200px;
}

.tab-content {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Contenu des onglets */
.advantages-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.advantage-item {
    display: flex;
    gap: 15px;
    align-items: flex-start;
}

.advantage-icon {
    width: 40px;
    height: 40px;
    min-width: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.advantage-content h5 {
    color: white;
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
}

.advantage-content p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    line-height: 1.5;
    margin: 0;
}

.features-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
}

.feature-item i {
    font-size: 12px;
}

.card-limits {
    display: flex;
    gap: 20px;
    background: rgba(10, 25, 41, 0.5);
    border-radius: 15px;
    padding: 20px;
}

.limit-item {
    flex: 1;
    text-align: center;
}

.limit-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
}

.limit-value {
    font-size: 18px;
    font-weight: 700;
    color: white;
}

.pricing-card {
    background: rgba(10, 25, 41, 0.5);
    border-radius: 15px;
    padding: 25px;
    text-align: center;
}

.price-main {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    margin-bottom: 20px;
}

.price-amount {
    font-size: 36px;
    font-weight: 800;
}

.price-period {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
}

.price-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.price-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
}

.detail-value {
    font-size: 14px;
    font-weight: 600;
    color: white;
}

.effective-cost {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.cost-label {
    font-size: 14px;
    color: white;
    font-weight: 600;
}

.cost-value {
    font-size: 24px;
    font-weight: 800;
}

/* Bouton d'action */
.card-action {
    margin-top: 25px;
}

.apply-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 18px;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
}

.apply-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.btn-text {
    flex: 1;
    text-align: center;
}

.btn-icon i {
    transition: transform 0.3s ease;
}

.apply-btn:hover .btn-icon i {
    transform: translateX(5px);
}

.approval-rate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
}

.approval-rate i {
    color: #FFD700;
}

/* Responsive */
@media (max-width: 1199px) {
    .credit-card-visual {
        height: 230px;
    }

    .card-name {
        font-size: 24px;
    }

    .number-digit {
        font-size: 16px;
    }
}

@media (max-width: 991px) {
    .col-lg-4 {
        margin-bottom: 30px;
    }

    .credit-card-visual {
        height: 250px;
    }
}

@media (max-width: 767px) {
    .card-wrapper {
        padding: 20px;
    }

    .credit-card-visual {
        height: 220px;
    }

    .card-name {
        font-size: 22px;
    }

    .price-amount {
        font-size: 32px;
    }

    .tab-btn {
        font-size: 12px;
        padding: 10px;
    }

    .tab-btn i {
        font-size: 12px;
    }
}

@media (max-width: 575px) {
    .sec-title .title {
        font-size: 32px;
    }

    .card-3d-container {
        max-width: 350px;
        margin: 0 auto;
    }

    .card-limits {
        flex-direction: column;
        gap: 15px;
    }

    .apply-btn {
        padding: 16px;
        font-size: 15px;
    }
}
</style>
