<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="recharge-modal dark-modal">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="header-icon">
                    <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="header-content">
                    <h3>Recharger {{ targetName }}</h3>
                    <p v-if="targetType === 'wallet'">Augmentez votre solde portefeuille</p>
                    <p v-else-if="targetType === 'card'">Ajoutez des fonds à votre carte</p>
                    <p v-else>Ajoutez des données à votre eSIM</p>
                </div>
                <button class="close-btn" @click="$emit('close')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>

            <!-- Payment Methods -->
            <div class="payment-methods" v-if="targetType !== 'esim'">
                <h4>Méthode de paiement</h4>
                <div class="methods-grid">
                    <div
                        v-for="method in paymentMethods"
                        :key="method.id"
                        :class="['method-card', { selected: selectedMethod === method.id }]"
                        @click="selectMethod(method.id)"
                    >
                        <div class="method-icon">
                            <i :class="method.icon"></i>
                        </div>
                        <div class="method-info">
                            <h5>{{ method.name }}</h5>
                            <span>{{ method.description }}</span>
                        </div>
                        <div class="method-check">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selected Card (if paying with card) -->
            <div class="selected-card" v-if="selectedMethod === 'card' && userCards.length > 0">
                <h4>Carte sélectionnée</h4>
                <div class="cards-list">
                    <div
                        v-for="card in userCards"
                        :key="card.id"
                        :class="['card-item', { selected: selectedCardId === card.id }]"
                        @click="selectCard(card.id)"
                    >
                        <div class="card-icon">
                            <i class="fa-solid fa-credit-card"></i>
                        </div>
                        <div class="card-info">
                            <h5>{{ card.masked_card_number }}</h5>
                            <span>Solde: ${{ formatCurrency(card.balance) }}</span>
                        </div>
                        <div class="card-check">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Amount Selection -->
            <div class="amount-selection">
                <h4>Montant</h4>
                <div class="amount-input">
                    <div class="currency-prefix">$</div>
                    <input
                        type="number"
                        v-model="amount"
                        placeholder="0.00"
                        class="amount-field"
                        :class="{ error: amountError }"
                        min="10"
                        max="10000"
                        step="0.01"
                        @input="validateAmount"
                    />
                </div>
                <div v-if="amountError" class="error-message">
                    <i class="fa-solid fa-exclamation-circle"></i>
                    {{ amountError }}
                </div>

                <!-- Quick Amounts -->
                <div class="quick-amounts">
                    <button
                        v-for="quickAmount in quickAmounts"
                        :key="quickAmount"
                        :class="['amount-btn', { active: amount == quickAmount }]"
                        @click="setAmount(quickAmount)"
                    >
                        ${{ quickAmount }}
                    </button>
                </div>
            </div>

            <!-- eSIM Data Plans -->
            <div class="data-plans" v-if="targetType === 'esim'">
                <h4>Forfaits données</h4>
                <div class="plans-grid">
                    <div
                        v-for="plan in dataPlans"
                        :key="plan.id"
                        :class="['plan-card', { selected: selectedPlan === plan.id }]"
                        @click="selectPlan(plan.id)"
                    >
                        <div class="plan-icon">
                            <i class="fa-solid fa-database"></i>
                        </div>
                        <div class="plan-info">
                            <h5>{{ plan.data }}</h5>
                            <span>Valide 30 jours</span>
                        </div>
                        <div class="plan-price">
                            ${{ plan.price }}
                        </div>
                        <div class="plan-check">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="summary">
                <h4>Récapitulatif</h4>
                <div class="summary-details">
                    <div class="summary-row">
                        <span v-if="targetType === 'wallet'">Recharge portefeuille</span>
                        <span v-else-if="targetType === 'card'">Recharge carte</span>
                        <span v-else>Recharge eSIM</span>
                        <span class="value">
                            <span v-if="targetType === 'esim'">{{ selectedPlanData }}</span>
                            <span v-else>${{ formatCurrency(amount || 0) }}</span>
                        </span>
                    </div>
                    <div class="summary-row" v-if="targetType !== 'esim'">
                        <span>Frais de transaction</span>
                        <span class="value fee">${{ formatCurrency(fees) }}</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row total">
                        <span>Total à payer</span>
                        <span class="value">${{ formatCurrency(totalAmount) }}</span>
                    </div>
                    <div class="summary-row" v-if="selectedMethod === 'card' && selectedCard">
                        <span>Solde après paiement</span>
                        <span :class="['balance', { negative: cardBalanceAfter < 0 }]">
                            ${{ formatCurrency(cardBalanceAfter) }}
                        </span>
                    </div>
                    <div class="summary-row" v-if="selectedMethod === 'wallet'">
                        <span>Nouveau solde portefeuille</span>
                        <span class="balance">
                            ${{ formatCurrency(newWalletBalance) }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="modal-actions">
                <button class="action-btn secondary" @click="$emit('close')">
                    Annuler
                </button>
                <button
                    class="action-btn primary"
                    :disabled="!canSubmit"
                    @click="submitRecharge"
                >
                    <i class="fa-solid fa-bolt"></i>
                    Recharger maintenant
                </button>
            </div>

            <!-- Security Note -->
            <div class="security-note">
                <i class="fa-solid fa-shield-check"></i>
                <p>
                    Cette transaction est sécurisée et cryptée. Vous serez redirigé vers une
                    page de confirmation si nécessaire. Votre recharge sera traitée instantanément.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    targetType: {
        type: String,
        default: 'wallet' // 'wallet', 'card', 'esim'
    },
    target: {
        type: Object,
        default: null
    },
    userCards: {
        type: Array,
        default: () => []
    },
    userWallet: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['close', 'success']);

const selectedMethod = ref('card');
const selectedCardId = ref(null);
const amount = ref('');
const amountError = ref('');
const selectedPlan = ref('1gb');

const paymentMethods = [
    { id: 'card', name: 'Carte de crédit', icon: 'fa-solid fa-credit-card', description: 'Paiement sécurisé' },
    { id: 'wallet', name: 'Portefeuille Benkky', icon: 'fa-solid fa-wallet', description: 'Solde disponible' },
    { id: 'bank', name: 'Virement bancaire', icon: 'fa-solid fa-building-columns', description: '1-2 jours ouvrés' },
];

const quickAmounts = [50, 100, 200, 500, 1000];

const dataPlans = [
    { id: '1gb', data: '1 Go', price: 5 },
    { id: '3gb', data: '3 Go', price: 12 },
    { id: '5gb', data: '5 Go', price: 18 },
    { id: '10gb', data: '10 Go', price: 30 },
    { id: '20gb', data: '20 Go', price: 45 },
];

// Computed properties
const targetName = computed(() => {
    if (props.targetType === 'wallet') return 'le portefeuille';
    if (props.targetType === 'card') return `la carte ${props.target?.masked_card_number}`;
    return `l'eSIM ${props.target?.name}`;
});

const selectedCard = computed(() => {
    return props.userCards.find(card => card.id === selectedCardId.value);
});

const selectedPlanData = computed(() => {
    const plan = dataPlans.find(p => p.id === selectedPlan.value);
    return plan ? `${plan.data} - $${plan.price}` : '';
});

const fees = computed(() => {
    if (props.targetType === 'esim') return 0;
    const amt = parseFloat(amount.value) || 0;
    return amt * 0.015; // 1.5% fee
});

const totalAmount = computed(() => {
    if (props.targetType === 'esim') {
        const plan = dataPlans.find(p => p.id === selectedPlan.value);
        return plan?.price || 0;
    }
    const amt = parseFloat(amount.value) || 0;
    return amt + fees.value;
});

const cardBalanceAfter = computed(() => {
    if (selectedMethod.value !== 'card' || !selectedCard.value) return 0;
    return selectedCard.value.balance - totalAmount.value;
});

const newWalletBalance = computed(() => {
    if (props.targetType === 'wallet') {
        return props.userWallet + (parseFloat(amount.value) || 0);
    }
    return props.userWallet;
});

const canSubmit = computed(() => {
    if (props.targetType === 'esim') {
        return !!selectedPlan.value;
    }

    const amt = parseFloat(amount.value) || 0;
    if (amt < 10 || amt > 10000 || amountError.value) {
        return false;
    }

    if (selectedMethod.value === 'card') {
        if (!selectedCardId.value) return false;
        if (cardBalanceAfter.value < 0) return false;
    }

    if (selectedMethod.value === 'wallet') {
        if (props.userWallet < totalAmount.value) return false;
    }

    return true;
});

// Methods
const selectMethod = (methodId) => {
    selectedMethod.value = methodId;
    if (methodId === 'card' && props.userCards.length > 0) {
        selectedCardId.value = props.userCards[0].id;
    }
};

const selectCard = (cardId) => {
    selectedCardId.value = cardId;
};

const setAmount = (amt) => {
    amount.value = amt;
    validateAmount();
};

const selectPlan = (planId) => {
    selectedPlan.value = planId;
};

const validateAmount = () => {
    const amt = parseFloat(amount.value) || 0;

    if (amt < 10) {
        amountError.value = 'Le montant minimum est de $10';
    } else if (amt > 10000) {
        amountError.value = 'Le montant maximum est de $10,000';
    } else {
        amountError.value = '';
    }
};

const submitRecharge = () => {
    if (!canSubmit.value) return;

    let routeName = '';
    let data = {};

    switch (props.targetType) {
        case 'wallet':
            routeName = 'wallet.recharge';
            data = {
                amount: amount.value,
                card_id: selectedCardId.value,
            };
            break;
        case 'card':
            routeName = 'cards.recharge';
            data = {
                amount: amount.value,
                card_id: props.target.id,
            };
            break;
        case 'esim':
            routeName = 'esims.recharge';
            data = {
                data_amount: selectedPlan.value,
                esim_id: props.target.id,
            };
            break;
    }

    router.post(route(routeName), data, {
        preserveScroll: true,
        onSuccess: () => {
            emit('success');
            emit('close');
        },
        onError: (errors) => {
            if (errors.amount) {
                amountError.value = errors.amount;
            }
        },
    });
};

const formatCurrency = (value) => {
    return parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

onMounted(() => {
    if (props.userCards.length > 0 && selectedMethod.value === 'card') {
        selectedCardId.value = props.userCards[0].id;
    }
    validateAmount();
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 20, 25, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.dark-modal {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.95) 0%, rgba(15, 39, 39, 0.95) 100%);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    width: 600px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
}

.modal-header {
    padding: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.header-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-green);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
}

.header-content {
    flex: 1;
}

.header-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light-color1);
    margin-bottom: 8px;
}

.header-content p {
    font-size: 0.95rem;
    color: var(--light-color2);
}

.close-btn {
    width: 40px;
    height: 40px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.payment-methods {
    padding: 30px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.payment-methods h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.methods-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.method-card {
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.method-card:hover {
    border-color: rgba(106, 196, 166, 0.4);
}

.method-card.selected {
    border-color: var(--accent-color2);
    background: rgba(42, 140, 130, 0.1);
}

.method-icon {
    width: 50px;
    height: 50px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.5rem;
    margin-bottom: 15px;
}

.method-card.selected .method-icon {
    background: var(--gradient-green);
    color: white;
}

.method-info h5 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.method-info span {
    font-size: 0.85rem;
    color: var(--light-color2);
}

.method-check {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.method-card.selected .method-check {
    background: var(--accent-color2);
    border-color: var(--accent-color2);
}

.method-card.selected .method-check i {
    color: white;
    font-size: 0.8rem;
    opacity: 1;
}

.method-card:not(.selected) .method-check i {
    opacity: 0;
}

.selected-card {
    padding: 0 30px 30px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.selected-card h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.cards-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-item {
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card-item:hover {
    border-color: rgba(106, 196, 166, 0.4);
}

.card-item.selected {
    border-color: var(--accent-color2);
    background: rgba(42, 140, 130, 0.1);
}

.card-icon {
    width: 40px;
    height: 40px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.2rem;
}

.card-item.selected .card-icon {
    background: var(--gradient-green);
    color: white;
}

.card-info {
    flex: 1;
}

.card-info h5 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 3px;
}

.card-info span {
    font-size: 0.85rem;
    color: var(--light-color2);
}

.card-check {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.card-item.selected .card-check {
    background: var(--accent-color2);
    border-color: var(--accent-color2);
}

.card-item.selected .card-check i {
    color: white;
    font-size: 0.7rem;
    opacity: 1;
}

.card-item:not(.selected) .card-check i {
    opacity: 0;
}

.amount-selection {
    padding: 30px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.amount-selection h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.amount-input {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.currency-prefix {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--light-color1);
}

.amount-field {
    flex: 1;
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    padding: 20px;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--light-color1);
    text-align: center;
}

.amount-field:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.amount-field.error {
    border-color: #F44336;
}

.error-message {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #F44336;
    font-size: 0.9rem;
    margin-bottom: 20px;
}

.quick-amounts {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.amount-btn {
    padding: 12px 24px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--light-color2);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.amount-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: rgba(106, 196, 166, 0.3);
}

.amount-btn.active {
    background: rgba(42, 140, 130, 0.2);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.data-plans {
    padding: 30px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.data-plans h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.plan-card {
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
}

.plan-card:hover {
    border-color: rgba(106, 196, 166, 0.4);
    transform: translateY(-3px);
}

.plan-card.selected {
    border-color: var(--accent-color2);
    background: rgba(42, 140, 130, 0.1);
}

.plan-icon {
    width: 50px;
    height: 50px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    color: var(--accent-color3);
    font-size: 1.5rem;
}

.plan-card.selected .plan-icon {
    background: var(--gradient-green);
    color: white;
}

.plan-info h5 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.plan-info span {
    font-size: 0.85rem;
    color: var(--light-color2);
}

.plan-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent-color3);
    margin-top: 10px;
}

.plan-check {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.plan-card.selected .plan-check {
    background: var(--accent-color2);
    border-color: var(--accent-color2);
}

.plan-card.selected .plan-check i {
    color: white;
    font-size: 0.7rem;
    opacity: 1;
}

.plan-card:not(.selected) .plan-check i {
    opacity: 0;
}

.summary {
    padding: 30px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.summary h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.summary-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-row span:first-child {
    color: var(--light-color2);
    font-size: 0.95rem;
}

.summary-row .value {
    font-weight: 600;
    color: var(--light-color1);
    font-size: 1.1rem;
}

.summary-row .fee {
    color: #F44336;
}

.summary-row .balance {
    font-weight: 600;
    color: #4CAF50;
}

.summary-row .balance.negative {
    color: #F44336;
}

.summary-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(106, 196, 166, 0.3), transparent);
    margin: 10px 0;
}

.summary-row.total .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-color3);
}

.modal-actions {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.action-btn {
    padding: 16px 32px;
    border-radius: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.action-btn.secondary {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    color: var(--light-color2);
}

.action-btn.secondary:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.action-btn.primary {
    background: var(--gradient-green);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
}

.action-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.action-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.security-note {
    padding: 20px 30px 30px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

.security-note i {
    color: #4CAF50;
    font-size: 1.3rem;
    flex-shrink: 0;
    margin-top: 3px;
}

.security-note p {
    font-size: 0.9rem;
    color: var(--light-color2);
    line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
    .methods-grid {
        grid-template-columns: 1fr;
    }

    .plans-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .modal-actions {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .modal-header {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .header-icon {
        margin-bottom: 0;
    }

    .plans-grid {
        grid-template-columns: 1fr;
    }

    .amount-input {
        flex-direction: column;
        align-items: stretch;
    }

    .amount-field {
        font-size: 2rem;
    }
}
</style>
