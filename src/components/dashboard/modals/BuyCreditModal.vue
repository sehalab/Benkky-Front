<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="buy-credit-modal dark-modal">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="header-icon">
                    <i class="fa-solid fa-credit-card"></i>
                </div>
                <div class="header-content">
                    <h3>Acheter du crédit</h3>
                    <p>Choisissez le montant à ajouter à votre compte</p>
                </div>
                <button class="close-btn" @click="$emit('close')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>

            <!-- Payment Methods -->
            <div class="payment-section">
                <h4 class="section-title">Méthode de paiement</h4>
                <div class="payment-methods">
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

            <!-- Selected Card Details -->
            <div v-if="selectedMethod === 'card' && selectedCard" class="card-details">
                <h4 class="section-title">Carte sélectionnée</h4>
                <div class="selected-card-display">
                    <div class="card-chip">
                        <i class="fa-solid fa-microchip"></i>
                    </div>
                    <div class="card-number">
                        {{ selectedCard.masked_card_number }}
                    </div>
                    <div class="card-info">
                        <div class="card-holder">
                            <span>{{ selectedCard.card_holder }}</span>
                        </div>
                        <div class="card-expiry">
                            <span>Exp: {{ selectedCard.expiry_date }}</span>
                        </div>
                    </div>
                    <div class="card-balance">
                        Solde: €{{ formatCurrency(selectedCard.balance) }}
                    </div>
                </div>

                <div class="card-actions">
                    <button class="action-btn outline" @click="showCardList">
                        <i class="fa-solid fa-exchange-alt"></i>
                        Changer de carte
                    </button>
                </div>
            </div>

            <!-- Card List Modal -->
            <div v-if="showCardSelector" class="card-selector-modal">
                <h4>Sélectionner une carte</h4>
                <div class="cards-list">
                    <div
                        v-for="card in userCards"
                        :key="card.id"
                        :class="['card-option', { selected: card.id === selectedCardId }]"
                        @click="selectCard(card.id)"
                    >
                        <div class="card-option-icon">
                            <i class="fa-solid fa-credit-card"></i>
                        </div>
                        <div class="card-option-info">
                            <h5>{{ card.masked_card_number }}</h5>
                            <span>Solde: €{{ formatCurrency(card.balance) }}</span>
                        </div>
                        <div class="card-option-check">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
                <button class="close-selector-btn" @click="closeCardSelector">
                    Fermer
                </button>
            </div>

            <!-- Amount Selection -->
            <div class="amount-section">
                <h4 class="section-title">Montant</h4>
                <div class="amount-input">
                    <div class="currency-prefix">€</div>
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
                        €{{ quickAmount }}
                    </button>
                </div>
            </div>

            <!-- Promo Code -->
            <div class="promo-section">
                <div class="promo-toggle" @click="togglePromoCode">
                    <i :class="showPromoCode ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
                    <span>Code promotionnel</span>
                </div>

                <div v-if="showPromoCode" class="promo-input">
                    <div class="input-with-button">
                        <input
                            type="text"
                            v-model="promoCode"
                            placeholder="Entrez votre code promo"
                            class="promo-field"
                        />
                        <button class="apply-btn" @click="applyPromoCode" :disabled="!promoCode.trim()">
                            Appliquer
                        </button>
                    </div>
                    <div v-if="promoError" class="error-message">
                        {{ promoError }}
                    </div>
                    <div v-if="promoSuccess" class="success-message">
                        <i class="fa-solid fa-check-circle"></i>
                        Code appliqué avec succès !
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="summary-section">
                <h4 class="section-title">Récapitulatif</h4>
                <div class="summary-details">
                    <div class="summary-row">
                        <span>Montant crédit</span>
                        <span class="value">€{{ formatCurrency(amount || 0) }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Frais de transaction</span>
                        <span class="value fee">€{{ formatCurrency(fees) }}</span>
                    </div>
                    <div v-if="discount > 0" class="summary-row">
                        <span>Réduction promo</span>
                        <span class="value discount">-€{{ formatCurrency(discount) }}</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row total">
                        <span>Total à payer</span>
                        <span class="value">€{{ formatCurrency(totalAmount) }}</span>
                    </div>
                    <div v-if="selectedMethod === 'card' && selectedCard" class="summary-row">
                        <span>Nouveau solde carte</span>
                        <span :class="['balance', { negative: cardBalanceAfter < 0 }]">
                            €{{ formatCurrency(cardBalanceAfter) }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Terms -->
            <div class="terms-section">
                <label class="terms-checkbox">
                    <input type="checkbox" v-model="acceptTerms" required>
                    <span class="checkmark"></span>
                    <span class="terms-text">
                        J'accepte les
                        <a href="/terms" target="_blank" class="terms-link">conditions générales</a>
                        et la
                        <a href="/privacy" target="_blank" class="terms-link">politique de confidentialité</a>
                    </span>
                </label>
            </div>

            <!-- Actions -->
            <div class="modal-actions">
                <button class="action-btn secondary" @click="$emit('close')">
                    Annuler
                </button>
                <button
                    class="action-btn primary"
                    :disabled="!canSubmit"
                    @click="submitPurchase"
                >
                    <i class="fa-solid fa-lock"></i>
                    Payer €{{ formatCurrency(totalAmount) }}
                </button>
            </div>

            <!-- Security Badges -->
            <div class="security-badges">
                <div class="security-badge">
                    <i class="fa-solid fa-shield-check"></i>
                    <span>Paiement sécurisé</span>
                </div>
                <div class="security-badge">
                    <i class="fa-solid fa-lock"></i>
                    <span>Chiffrement SSL</span>
                </div>
                <div class="security-badge">
                    <i class="fa-solid fa-credit-card"></i>
                    <span>Aucune donnée stockée</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
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

// State
const selectedMethod = ref('card');
const selectedCardId = ref(null);
const amount = ref('');
const amountError = ref('');
const showPromoCode = ref(false);
const promoCode = ref('');
const promoError = ref('');
const promoSuccess = ref(false);
const discount = ref(0);
const acceptTerms = ref(false);
const showCardSelector = ref(false);

// Constants
const quickAmounts = [50, 100, 250, 500, 1000];
const transactionFee = 0.015; // 1.5%

const paymentMethods = [
    {
        id: 'card',
        name: 'Carte de crédit',
        icon: 'fa-solid fa-credit-card',
        description: 'Paiement instantané'
    },
    {
        id: 'wallet',
        name: 'Portefeuille Benkky',
        icon: 'fa-solid fa-wallet',
        description: 'Solde disponible'
    },
    {
        id: 'bank',
        name: 'Virement bancaire',
        icon: 'fa-solid fa-building-columns',
        description: '1-2 jours ouvrés'
    },
    {
        id: 'crypto',
        name: 'Cryptomonnaie',
        icon: 'fa-solid fa-bitcoin-sign',
        description: 'BTC, ETH, USDT'
    }
];


// ... continuation après les computed properties

const applyPromoCode = async () => {
    if (!promoCode.value.trim()) return;

    // Simuler un appel API
    try {
        promoError.value = '';
        promoSuccess.value = false;

        // Exemple de validation de code promo
        const validPromoCodes = {
            'WELCOME20': 0.20, // 20% de réduction
            'SUMMER15': 0.15,  // 15% de réduction
            'BENKKY10': 0.10   // 10% de réduction
        };

        const code = promoCode.value.toUpperCase();

        if (validPromoCodes[code]) {
            const discountRate = validPromoCodes[code];
            const amt = parseFloat(amount.value) || 0;
            discount.value = (amt + (amt * transactionFee)) * discountRate;
            promoSuccess.value = true;
            promoError.value = '';
        } else {
            promoError.value = 'Code promo invalide ou expiré';
            discount.value = 0;
        }
    } catch (error) {
        promoError.value = 'Erreur lors de la validation du code promo';
        discount.value = 0;
    }
};

const formatCurrency = (value) => {
    return parseFloat(value || 0).toFixed(2);
};

const submitPurchase = async () => {
    if (!canSubmit.value) return;

    try {
        // Préparer les données pour l'API
        const purchaseData = {
            method: selectedMethod.value,
            amount: parseFloat(amount.value),
            total: totalAmount.value,
            fees: fees.value,
            discount: discount.value,
            card_id: selectedMethod.value === 'card' ? selectedCardId.value : null,
            promo_code: promoCode.value.trim() || null,
            accept_terms: acceptTerms.value
        };

        // Exemple avec Inertia.js
        router.post('/api/purchase/credits', purchaseData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // Émettre un événement de succès
                emit('success', {
                    amount: purchaseData.amount,
                    total: purchaseData.total,
                    method: purchaseData.method
                });

                // Afficher un message de succès
                showNotification('success', 'Achat réussi ! Votre crédit a été ajouté à votre compte.');

                // Fermer le modal
                emit('close');
            },
            onError: (errors) => {
                if (errors.insufficient_balance) {
                    amountError.value = 'Solde insuffisant sur la carte sélectionnée';
                } else if (errors.payment_failed) {
                    showNotification('error', 'Le paiement a échoué. Veuillez réessayer.');
                } else {
                    showNotification('error', 'Une erreur est survenue. Veuillez réessayer.');
                }
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'achat:', error);
        showNotification('error', 'Erreur système. Veuillez contacter le support.');
    }
};

const showNotification = (type, message) => {
    // Utiliser le système de notifications de votre application
    // Ou émettez un événement global
    const event = new CustomEvent('show-notification', {
        detail: { type, message }
    });
    window.dispatchEvent(event);
};

// Initialisation
onMounted(() => {
    if (props.userCards.length > 0) {
        selectedCardId.value = props.userCards[0].id;
    }
    // Définir un montant par défaut
    amount.value = 100;
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: fadeIn 0.3s ease;
}

.buy-credit-modal {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-header {
    display: flex;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.header-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    flex-shrink: 0;
}

.header-icon i {
    font-size: 24px;
    color: white;
}

.header-content {
    flex: 1;
}

.header-content h3 {
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin: 0 0 4px 0;
}

.header-content p {
    font-size: 14px;
    color: #9ca3af;
    margin: 0;
}

.close-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.payment-section,
.amount-section,
.promo-section,
.summary-section,
.terms-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: white;
    margin: 0 0 16px 0;
}

.payment-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.method-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    position: relative;
}

.method-card:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.method-card.selected {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
}

.method-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
}

.method-icon i {
    font-size: 20px;
    color: #3b82f6;
}

.method-info {
    flex: 1;
}

.method-info h5 {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0 0 4px 0;
}

.method-info span {
    font-size: 12px;
    color: #9ca3af;
}

.method-check {
    opacity: 0;
    color: #3b82f6;
    transition: opacity 0.2s ease;
}

.method-card.selected .method-check {
    opacity: 1;
}

.card-details {
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.selected-card-display {
    background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;
}

.card-chip {
    font-size: 24px;
    color: #d1d5db;
    margin-bottom: 20px;
}

.card-number {
    font-family: 'Courier New', monospace;
    font-size: 18px;
    font-weight: 600;
    color: white;
    letter-spacing: 2px;
    margin-bottom: 20px;
}

.card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.card-holder span,
.card-expiry span {
    font-size: 14px;
    color: #d1d5db;
}

.card-balance {
    font-size: 16px;
    font-weight: 600;
    color: #10b981;
    text-align: right;
}

.card-actions {
    display: flex;
    gap: 12px;
}

.card-selector-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1f2937;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    z-index: 1001;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-selector-modal h4 {
    color: white;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
}

.cards-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.card-option {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
}

.card-option:hover {
    background: rgba(255, 255, 255, 0.1);
}

.card-option.selected {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
}

.card-option-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
}

.card-option-icon i {
    color: #3b82f6;
    font-size: 20px;
}

.card-option-info {
    flex: 1;
}

.card-option-info h5 {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0 0 4px 0;
}

.card-option-info span {
    font-size: 12px;
    color: #9ca3af;
}

.card-option-check {
    opacity: 0;
    color: #3b82f6;
}

.card-option.selected .card-option-check {
    opacity: 1;
}

.close-selector-btn {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.close-selector-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.amount-input {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 8px 16px;
    margin-bottom: 16px;
    transition: border-color 0.2s ease;
}

.amount-input:focus-within {
    border-color: #3b82f6;
}

.currency-prefix {
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-right: 8px;
}

.amount-field {
    flex: 1;
    background: transparent;
    border: none;
    font-size: 32px;
    font-weight: 700;
    color: white;
    outline: none;
    width: 100%;
}

.amount-field.error {
    color: #ef4444;
}

.amount-field::placeholder {
    color: #6b7280;
}

.error-message {
    color: #ef4444;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.quick-amounts {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.amount-btn {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 8px;
    color: #d1d5db;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    min-width: 80px;
}

.amount-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.amount-btn.active {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
    color: white;
}

.promo-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #9ca3af;
    cursor: pointer;
    user-select: none;
}

.promo-toggle i {
    transition: transform 0.2s ease;
}

.promo-toggle:hover {
    color: white;
}

.promo-input {
    margin-top: 16px;
    animation: slideDown 0.2s ease;
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.input-with-button {
    display: flex;
    gap: 12px;
}

.promo-field {
    flex: 1;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    outline: none;
}

.promo-field:focus {
    border-color: #3b82f6;
}

.apply-btn {
    padding: 12px 24px;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap;
}

.apply-btn:hover:not(:disabled) {
    background: #2563eb;
}

.apply-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.success-message {
    color: #10b981;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.summary-details {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    color: #d1d5db;
}

.summary-row .value {
    color: white;
    font-weight: 600;
}

.summary-row .fee {
    color: #f59e0b;
}

.summary-row .discount {
    color: #10b981;
}

.summary-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 12px 0;
}

.summary-row.total {
    color: white;
    font-size: 18px;
    font-weight: 700;
    padding: 16px 0 0 0;
}

.summary-row .balance {
    font-weight: 600;
}

.summary-row .balance.negative {
    color: #ef4444;
}

.terms-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    color: #d1d5db;
    font-size: 14px;
    line-height: 1.5;
}

.terms-checkbox input {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    flex-shrink: 0;
    position: relative;
    transition: all 0.2s ease;
}

.checkmark::after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #3b82f6;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.terms-checkbox input:checked ~ .checkmark {
    background: #3b82f6;
    border-color: #3b82f6;
}

.terms-checkbox input:checked ~ .checkmark::after {
    display: block;
}

.terms-link {
    color: #3b82f6;
    text-decoration: none;
}

.terms-link:hover {
    text-decoration: underline;
}

.modal-actions {
    display: flex;
    gap: 12px;
    padding: 24px;
}

.action-btn {
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 2px solid transparent;
}

.action-btn.secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #9ca3af;
    border-color: rgba(255, 255, 255, 0.1);
}

.action-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.action-btn.primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
}

.action-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
}

.action-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
}

.security-badges {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 0 24px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
}

.security-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #9ca3af;
    font-size: 12px;
}

.security-badge i {
    font-size: 20px;
    color: #10b981;
}

/* Scrollbar styling */
.buy-credit-modal::-webkit-scrollbar {
    width: 8px;
}

.buy-credit-modal::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.buy-credit-modal::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.buy-credit-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 640px) {
    .modal-overlay {
        padding: 10px;
    }

    .payment-methods {
        grid-template-columns: 1fr;
    }

    .quick-amounts {
        grid-template-columns: repeat(2, 1fr);
    }

    .amount-btn {
        min-width: 60px;
    }

    .modal-actions {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
    }
}
</style>
