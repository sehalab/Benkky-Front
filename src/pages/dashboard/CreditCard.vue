<template>
    <div class="credit-cards-tab">
        <!-- Header -->
        <div class="tab-header">
            <h1 class="tab-title">
                <i class="fa-solid fa-credit-card"></i>
                Mes Cartes de Crédit
            </h1>
            <button class="action-btn primary" @click="showBuyCardModal">
                <i class="fa-solid fa-plus"></i>
                Nouvelle carte
            </button>
        </div>

        <!-- Stats -->
        <div class="cards-stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-credit-card"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ cards.length }}</h3>
                    <p class="stat-label">Cartes totales</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-check-circle"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ activeCardsCount }}</h3>
                    <p class="stat-label">Cartes actives</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-euro-sign"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">€{{ formatCurrency(totalBalance) }}</h3>
                    <p class="stat-label">Solde total</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ monthlyTransactions }}</h3>
                    <p class="stat-label">Transactions/mois</p>
                </div>
            </div>
        </div>

        <!-- Cards Grid -->
        <div class="cards-grid">
            <CreditCardItem
                v-for="card in cards"
                :key="card.id"
                :card-number="card.masked_card_number"
                :card-holder="card.card_holder"
                :expiry-date="card.formatted_expiry_date"
                :balance="card.balance"
                :status="card.status"
                :requires-pin="true"
                @request-pin="showPinModal(card)"
                @recharge="showRechargeModal(card)"
                @block="showBlockModal(card)"
                @view="viewCardDetails(card)"
            />
        </div>

        <!-- Empty State -->
        <div v-if="cards.length === 0" class="empty-state">
            <div class="empty-icon">
                <i class="fa-solid fa-credit-card"></i>
            </div>
            <h3>Aucune carte de crédit</h3>
            <p>Commencez par créer votre première carte</p>
            <button class="action-btn primary" @click="showBuyCardModal">
                <i class="fa-solid fa-plus"></i>
                Créer une carte
            </button>
        </div>

        <!-- Card Actions -->
        <div class="cards-actions">
            <h2 class="section-title">Actions rapides</h2>
            <div class="actions-grid">
                <button class="action-card" @click="showPinModal()">
                    <div class="action-icon">
                        <i class="fa-solid fa-key"></i>
                    </div>
                    <div class="action-content">
                        <h4>Modifier PIN</h4>
                        <p>Changer le code PIN de vos cartes</p>
                    </div>
                    <i class="fa-solid fa-chevron-right action-arrow"></i>
                </button>
                <button class="action-card" @click="showLimitsModal">
                    <div class="action-icon">
                        <i class="fa-solid fa-sliders"></i>
                    </div>
                    <div class="action-content">
                        <h4>Gérer les limites</h4>
                        <p>Ajuster les limites de dépenses</p>
                    </div>
                    <i class="fa-solid fa-chevron-right action-arrow"></i>
                </button>
                <button class="action-card" @click="exportCards">
                    <div class="action-icon">
                        <i class="fa-solid fa-download"></i>
                    </div>
                    <div class="action-content">
                        <h4>Exporter</h4>
                        <p>Télécharger les détails des cartes</p>
                    </div>
                    <i class="fa-solid fa-chevron-right action-arrow"></i>
                </button>
                <button class="action-card" @click="showSupport">
                    <div class="action-icon">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="action-content">
                        <h4>Support cartes</h4>
                        <p>Obtenir de l'aide pour vos cartes</p>
                    </div>
                    <i class="fa-solid fa-chevron-right action-arrow"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CreditCardItem from '../../components/dashboard/CreditCardItem.vue';

const props = defineProps({
    cards: Array,
    user: Object,
});

const emit = defineEmits([
    'show-pin-modal',
    'show-buy-credit',
    'show-recharge-modal',
    'show-block-modal'
]);

const totalBalance = computed(() => {
    return props.cards.reduce((sum, card) => sum + parseFloat(card.balance), 0);
});

const activeCardsCount = computed(() => {
    return props.cards.filter(card => card.status === 'active').length;
});

const monthlyTransactions = computed(() => {
    // This would come from backend
    return 24;
});

const showBuyCardModal = () => {
    emit('show-buy-credit');
};

const showPinModal = (card = null) => {
    emit('show-pin-modal', { card });
};

const showRechargeModal = (card) => {
    emit('show-recharge-modal', { card });
};

const showBlockModal = (card) => {
    emit('show-block-modal', { card });
};

const viewCardDetails = (card) => {
    // Navigate to card details page
    console.log('View card details:', card);
};

const showLimitsModal = () => {
    // Show limits management modal
    console.log('Show limits modal');
};

const exportCards = () => {
    // Export cards data
    console.log('Export cards');
};

const showSupport = () => {
    // Show support modal
    console.log('Show support');
};

const formatCurrency = (amount) => {
    return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') || '0.00';
};
</script>

<style scoped>
.credit-cards-tab {
    animation: fadeIn 0.5s ease;
}

.tab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.tab-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--light-color1);
    display: flex;
    align-items: center;
    gap: 15px;
}

.tab-title i {
    color: var(--accent-color3);
    font-size: 1.8rem;
}

.action-btn.primary {
    padding: 14px 24px;
    background: var(--gradient-green);
    border: none;
    border-radius: 14px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

.action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.cards-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    padding: 25px;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-accent);
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: rgba(26, 65, 55, 0.6);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.5rem;
}

.stat-content .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.stat-content .stat-label {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.empty-state {
    text-align: center;
    padding: 80px 40px;
    background: rgba(15, 39, 39, 0.3);
    border: 2px dashed rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    margin: 40px 0;
}

.empty-icon {
    width: 100px;
    height: 100px;
    background: rgba(26, 65, 55, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    color: var(--accent-color3);
    font-size: 3rem;
}

.empty-state h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--light-color1);
    margin-bottom: 15px;
}

.empty-state p {
    font-size: 1.1rem;
    color: var(--light-color2);
    margin-bottom: 30px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.cards-actions {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 30px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 30px;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.action-card {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    padding: 25px;
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    border: none;
    color: var(--light-color2);
}

.action-card:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    transform: translateY(-5px);
    color: var(--light-color1);
}

.action-icon {
    width: 50px;
    height: 50px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.3rem;
    flex-shrink: 0;
}

.action-content {
    flex: 1;
}

.action-content h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: inherit;
}

.action-content p {
    font-size: 0.9rem;
    opacity: 0.8;
    color: inherit;
}

.action-arrow {
    color: var(--accent-color3);
    font-size: 1rem;
    transition: transform 0.3s ease;
}

.action-card:hover .action-arrow {
    transform: translateX(5px);
}

/* Responsive */
@media (max-width: 1200px) {
    .actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .cards-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .tab-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .action-btn.primary {
        align-self: stretch;
        justify-content: center;
    }

    .cards-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .cards-stats {
        grid-template-columns: 1fr;
    }

    .actions-grid {
        grid-template-columns: 1fr;
    }

    .empty-state {
        padding: 40px 20px;
    }

    .empty-icon {
        width: 70px;
        height: 70px;
        font-size: 2rem;
    }
}
</style>
