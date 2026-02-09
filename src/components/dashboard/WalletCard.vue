<template>
    <div class="wallet-card dark-card">
        <!-- Card Header -->
        <div class="card-header">
            <div class="header-left">
                <div class="card-icon">
                    <i class="fa-solid fa-wallet"></i>
                </div>
                <div class="card-title">
                    <h3>Portefeuille Benkky</h3>
                    <span class="card-subtitle">Solde disponible</span>
                </div>
            </div>
            <button class="card-menu-btn">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>

        <!-- Balance -->
        <div class="card-balance">
            <div class="balance-amount">
                <span class="currency">€</span>
                <span class="amount">{{ formatCurrency(balance) }}</span>
            </div>
            <div class="balance-change" :class="changeType">
                <i :class="changeIcon"></i>
                <span>{{ changePercentage }}%</span>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card-actions">
            <button class="action-btn" @click="$emit('recharge')">
                <div class="action-icon recharge">
                    <i class="fa-solid fa-plus"></i>
                </div>
                <span class="action-text">Recharger</span>
            </button>
            <button class="action-btn" @click="$emit('send-money')">
                <div class="action-icon send">
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                <span class="action-text">Envoyer</span>
            </button>
            <button class="action-btn" @click="$emit('withdraw')">
                <div class="action-icon withdraw">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </div>
                <span class="action-text">Retirer</span>
            </button>
            <button class="action-btn" @click="$emit('history')">
                <div class="action-icon history">
                    <i class="fa-solid fa-history"></i>
                </div>
                <span class="action-text">Historique</span>
            </button>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
            <div class="footer-item">
                <span class="footer-label">Dépenses du mois</span>
                <span class="footer-value">€{{ formatCurrency(monthlySpending) }}</span>
            </div>
            <div class="footer-item">
                <span class="footer-label">Revenus du mois</span>
                <span class="footer-value">€{{ formatCurrency(monthlyIncome) }}</span>
            </div>
        </div>

        <!-- Animated Elements -->
        <div class="card-glow"></div>
        <div class="card-particles"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    balance: {
        type: Number,
        default: 0
    },
    changePercentage: {
        type: Number,
        default: 0
    },
    monthlySpending: {
        type: Number,
        default: 0
    },
    monthlyIncome: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['recharge', 'send-money', 'withdraw', 'history']);

const changeType = computed(() => props.changePercentage >= 0 ? 'positive' : 'negative');
const changeIcon = computed(() =>
    props.changePercentage >= 0 ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'
);

const formatCurrency = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
};
</script>

<style scoped>
.dark-card {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.dark-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-glow);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.card-icon {
    width: 50px;
    height: 50px;
    background: var(--gradient-green);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.card-title h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.card-subtitle {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.card-menu-btn {
    width: 40px;
    height: 40px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.card-menu-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.card-balance {
    margin-bottom: 40px;
    position: relative;
}

.balance-amount {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 15px;
}

.currency {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--light-color2);
}

.amount {
    font-size: 3.5rem;
    font-weight: 800;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.balance-change {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.balance-change.positive {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.balance-change.negative {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.card-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 30px;
}

.action-btn {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 16px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    transform: translateY(-3px);
}

.action-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
}

.action-icon.recharge {
    background: linear-gradient(135deg, var(--dark-color4) 0%, var(--accent-color2) 100%);
}

.action-icon.send {
    background: linear-gradient(135deg, var(--accent-color1) 0%, var(--accent-color3) 100%);
}

.action-icon.withdraw {
    background: linear-gradient(135deg, var(--dark-color1) 0%, #4267B2 100%);
}

.action-icon.history {
    background: linear-gradient(135deg, #9C27B0 0%, #E91E63 100%);
}

.action-text {
    font-size: 0.9rem;
    font-weight: 500;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

.footer-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.footer-label {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.footer-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--light-color1);
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(42, 140, 130, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
}

.card-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.card-particles::before,
.card-particles::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-color3) 0%, transparent 70%);
    opacity: 0.1;
    animation: float-particle 15s linear infinite;
}

.card-particles::before {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.card-particles::after {
    bottom: 30%;
    right: 15%;
    animation-delay: 7s;
}

@keyframes float-particle {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(20px, -20px) rotate(90deg);
    }
    50% {
        transform: translate(0, -40px) rotate(180deg);
    }
    75% {
        transform: translate(-20px, -20px) rotate(270deg);
    }
    100% {
        transform: translate(0, 0) rotate(360deg);
    }
}
</style>
