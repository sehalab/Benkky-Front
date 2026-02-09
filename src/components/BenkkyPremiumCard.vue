<template>
    <div class="premium-credit-card-container">
        <!-- Carte de crédit Benkky Premium -->
        <div class="benkky-premium-card" @click="flipCard" :class="{ 'flipped': isFlipped }">
            <!-- Face avant -->
            <div class="card-face card-front">
                <!-- Éléments décoratifs -->
                <div class="card-glare"></div>
                <div class="card-shine"></div>

                <!-- Particules flottantes -->
                <div class="floating-particle" v-for="(particle, index) in particles"
                     :key="index" :style="particle.style"></div>

                <!-- Logo et Nom -->
                <div class="card-header">
                    <div class="card-logo">
                        <div class="logo-text"><img src="/images/logo_benkky.png" alt="Consultez" title="Consultez"></div>
                    </div>
                    <div class="card-chip">
                        <div class="chip"></div>
                        <div class="chip-glow"></div>
                    </div>
                </div>

                <!-- Numéro de carte -->
                <div class="card-number">
                    <span class="number-group" v-for="(group, index) in cardNumber" :key="index">
                        {{ group }}
                    </span>
                </div>

                <!-- Info détenteur et date -->
                <div class="card-footer">
                    <div class="card-holder">
                        <div class="label">TITULAIRE</div>
                        <div class="value">{{ cardHolder }}</div>
                    </div>
                    <div class="card-expiry">
                        <div class="label">VALIDE JUSQU'AU</div>
                        <div class="value">{{ expiryDate }}</div>
                    </div>
                    <div class="card-type">
                        <div class="type-icon">
                            <i class="fa-solid fa-infinity"></i>
                        </div>
                        <div class="type-label">INFINITE</div>
                    </div>
                </div>

                <!-- Élément décoratif de bordure -->
                <div class="card-border">
                    <div class="border-light"></div>
                </div>
            </div>

            <!-- Face arrière -->
            <div class="card-face card-back">
                <!-- Bande magnétique -->
                <div class="magnetic-strip"></div>

                <!-- Bande signature -->
                <div class="signature-strip">
                    <div class="signature-label">SIGNATURE</div>
                    <div class="signature-line"></div>
                </div>

                <!-- Code CVV -->
                <div class="cvv-section">
                    <div class="cvv-label">CVV</div>
                    <div class="cvv-box">
                        <div class="cvv-dots">•••</div>
                        <div class="cvv-value">{{ cvv }}</div>
                    </div>
                </div>

                <!-- Logo et contact -->
                <div class="back-footer">
                    <div class="back-logo"><img src="/images/logo_benkky.png" alt="Consultez" title="Consultez"></div>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fa-solid fa-globe"></i>
                            <span>www.benkky.com</span>
                        </div>
                    </div>
                </div>

                <!-- Messages de sécurité -->
                <div class="security-messages">
                    <div class="message">● CARTE PREMIUM ● SÉCURITÉ MAXIMALE ●</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isFlipped = ref(false);

// Données de la carte
const cardNumber = ref(['4532', '8192', '5678', '1234']);
const cardHolder = ref('Robert SEHA');
const expiryDate = ref('12/28');
const cvv = ref('123');

// Particules flottantes
const particles = ref([]);

// Générer un numéro de carte aléatoire
const generateCardNumber = () => {
    const groups = [];
    for (let i = 0; i < 4; i++) {
        groups.push(Math.floor(1000 + Math.random() * 9000).toString());
    }
    return groups;
};

// Retourner la carte
const flipCard = () => {
    isFlipped.value = !isFlipped.value;
};

// Initialiser les particules
const initParticles = () => {
    particles.value = [];
    for (let i = 0; i < 15; i++) {
        particles.value.push({
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.4 + 0.2,
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

onMounted(() => {
    initParticles();
    // Générer un numéro initial aléatoire
    cardNumber.value = generateCardNumber();
});
</script>

<style scoped>
/* CONTAINER PRINCIPAL - CRITIQUE POUR LE FLIP */
.premium-credit-card-container {
    position: relative;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    perspective: 1000px;
    height: 280px; /* HAUTEUR FIXE POUR ÉVITER LE DÉPLACEMENT */
    margin-bottom: 20px;
}

/* Carte principale - LA CLÉ POUR LE FLIP CORRECT */
.benkky-premium-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    border-radius: 24px;
    /* Garder la carte dans son conteneur */
    will-change: transform;
    transform-origin: center center;
}

.benkky-premium-card.flipped {
    transform: rotateY(180deg);
}

/* Faces de la carte - TOUJOURS ABSOLUTES */
.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    /* S'assurer que les faces ne dépassent pas */
    top: 0;
    left: 0;
}

/* Face avant */
.card-front {
    background: linear-gradient(
        135deg,
        #0a1929 0%,
        #0F2727 30%,
        #063232 70%,
        #0a1929 100%
    );
    border: 1px solid rgba(106, 196, 166, 0.3);
}

/* Face arrière - DÉJÀ ROTATÉE DE 180° */
.card-back {
    background: linear-gradient(
        135deg,
        #0a1929 0%,
        #0F2727 100%
    );
    transform: rotateY(180deg); /* IMPORTANT: déjà tournée */
    border: 1px solid rgba(106, 196, 166, 0.3);
}

/* Effets de lumière */
.card-glare {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
    );
    pointer-events: none;
}

.card-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(255, 255, 255, 0.05) 50%,
        transparent 100%
    );
    animation: shineMove 8s infinite linear;
}

@keyframes shineMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Particules flottantes */
.floating-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: floatParticle 15s infinite linear;
    z-index: 1;
}

@keyframes floatParticle {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 0.5;
    }
    90% {
        opacity: 0.5;
    }
    100% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0;
    }
}

/* En-tête de carte */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px 0;
    position: relative;
    z-index: 2;
}

.card-logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-symbol {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #10b981);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 900;
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.logo-text {
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, #fff, #c2e0d8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
}

/* Puce de carte */
.card-chip {
    position: relative;
    width: 50px;
    height: 40px;
}

.chip {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #d4af37, #ffd700, #d4af37);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.chip::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(0, 0, 0, 0.3);
}

.chip::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(0, 0, 0, 0.3);
}

.chip-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
    border-radius: 8px;
    filter: blur(5px);
    animation: chipGlow 2s infinite alternate;
}

@keyframes chipGlow {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
}

/* Numéro de carte */
.card-number {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 40px 0;
    position: relative;
    z-index: 2;
}

.number-group {
    font-family: 'Courier New', monospace;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    animation: numberGlow 3s infinite alternate;
}

@keyframes numberGlow {
    0% {
        text-shadow: 0 0 5px rgba(106, 196, 166, 0.5),
                     0 0 10px rgba(106, 196, 166, 0.3);
    }
    100% {
        text-shadow: 0 0 10px rgba(106, 196, 166, 0.8),
                     0 0 20px rgba(106, 196, 166, 0.5),
                     0 0 30px rgba(106, 196, 166, 0.3);
    }
}

/* Pied de carte */
.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 30px 25px;
    position: relative;
    z-index: 2;
}

.card-holder,
.card-expiry {
    color: rgba(255, 255, 255, 0.9);
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
    margin-bottom: 5px;
}

.value {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
}

.card-type {
    text-align: center;
}

.type-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 5px;
    color: white;
    font-size: 20px;
}

.type-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.9);
}

/* Bordure décorative */
.card-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    border-radius: 24px;
    z-index: 1;
}

.border-light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(106, 196, 166, 0.1),
        transparent
    );
    animation: borderFlow 4s infinite linear;
}

@keyframes borderFlow {
    0% { transform: translateX(-100%) translateY(-100%); }
    100% { transform: translateX(100%) translateY(100%); }
}

/* ========== FACE ARRIÈRE ========== */

/* Bande magnétique */
.magnetic-strip {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 45px;
    background: linear-gradient(
        to right,
        #000 0%,
        #333 25%,
        #666 50%,
        #333 75%,
        #000 100%
    );
}

/* Bande signature */
.signature-strip {
    position: absolute;
    top: 90px;
    left: 20px;
    right: 20px;
    height: 40px;
    background: repeating-linear-gradient(
        45deg,
        #fff,
        #fff 5px,
        #f0f0f0 5px,
        #f0f0f0 10px
    );
    border-radius: 4px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.signature-label {
    font-size: 12px;
    color: #666;
    font-style: italic;
}

.signature-line {
    flex: 1;
    height: 1px;
    background: #ccc;
    margin: 0 15px;
}

/* Section CVV */
.cvv-section {
    position: absolute;
    top: 145px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cvv-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
}

.cvv-box {
    width: 60px;
    height: 30px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    font-family: 'Courier New', monospace;
}

.cvv-dots {
    position: absolute;
    color: #000;
    font-size: 20px;
    letter-spacing: 2px;
}

.cvv-value {
    color: #666;
    font-size: 14px;
    font-weight: 600;
}

/* Pied arrière */
.back-footer {
    position: absolute;
    bottom: 60px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-logo {
    font-size: 18px;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
}

.contact-item i {
    font-size: 10px;
    color: #6BC4A6;
}

/* Messages de sécurité */
.security-messages {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
}

.message {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 1px;
    text-transform: uppercase;
}

/* Responsive */
@media (max-width: 768px) {
    .premium-credit-card-container {
        height: 250px;
        max-width: 400px;
    }

    .card-header {
        padding: 20px 25px 0;
    }

    .logo-symbol {
        width: 35px;
        height: 35px;
        font-size: 20px;
    }

    .logo-text {
        font-size: 18px;
    }

    .card-number {
        margin: 30px 0;
        gap: 15px;
    }

    .number-group {
        font-size: 20px;
    }

    .card-footer {
        padding: 0 25px 20px;
    }

    .value {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .premium-credit-card-container {
        height: 230px;
        max-width: 350px;
    }

    .card-header {
        padding: 15px 20px 0;
    }

    .card-number {
        margin: 25px 0;
        gap: 10px;
    }

    .number-group {
        font-size: 18px;
    }

    .card-footer {
        padding: 0 20px 15px;
    }

    .label {
        font-size: 8px;
    }

    .value {
        font-size: 12px;
    }

    .magnetic-strip {
        top: 20px;
        height: 40px;
    }

    .signature-strip {
        top: 75px;
        height: 35px;
    }

    .cvv-section {
        top: 125px;
    }
}

/* Style pour l'intégration dans votre page */
:global(.benkky-card-integration) {
    margin: 40px auto;
    padding: 20px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}
</style>
