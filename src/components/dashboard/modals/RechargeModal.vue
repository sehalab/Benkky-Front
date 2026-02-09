<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="recharge-modal dark-modal">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="header-icon">
                    <i class="fa-solid fa-wallet"></i>
                </div>
                <div class="header-content">
                    <h3>Recharger le portefeuille</h3>
                    <p>Ajouter des fonds à votre portefeuille Benkky</p>
                </div>
                <button class="close-btn" @click="$emit('close')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>

            <!-- Current Balance -->
            <div class="balance-section">
                <div class="balance-card">
                    <div class="balance-label">Solde actuel</div>
                    <div class="balance-amount">{{ formatCurrency(currentBalance) }}</div>
                </div>
            </div>

            <!-- Recharge Methods -->
            <div class="methods-section">
                <h4 class="section-title">Méthode de recharge</h4>
                <div class="methods-grid">
                    <div
                        v-for="method in rechargeMethods"
                        :key="method.id"
                        :class="['method-card', { selected: selectedMethod === method.id }]"
                        @click="selectMethod(method.id)"
                    >
                        <div class="method-icon">
                            <i :class="method.icon"></i>
                        </div>
                        <div class="method-info">
                            <h5>{{ method.name }}</h5>
                            <span class="method-desc">{{ method.description }}</span>
                            <span v-if="method.fee" class="method-fee">
                                Frais: {{ method.fee }}
                            </span>
                        </div>
                        <div class="method-check">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Amount Selection -->
            <div class="amount-section">
                <h4 class="section-title">Montant à recharger</h4>

                <div class="amount-input-group">
                    <div class="currency-prefix">€</div>
                    <input
                        type="number"
                        v-model="amount"
                        placeholder="0.00"
                        class="amount-field"
                        :class="{ error: amountError }"
                        min="5"
                        max="5000"
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

            <!-- Summary -->
            <div class="summary-section">
                <h4 class="section-title">Récapitulatif</h4>
                <div class="summary-details">
                    <div class="summary-row">
                        <span>Montant rechargé</span>
                        <span class="value">€{{ formatCurrency(amount || 0) }}</span>
                    </div>
                    <div v-if="selectedMethodDetails.feeAmount > 0" class="summary-row">
                        <span>Frais de transaction</span>
                        <span class="value fee">€{{ formatCurrency(selectedMethodDetails.feeAmount) }}</span>
                    </div>
                    <div v-if="selectedMethodDetails.instant === false" class="summary-row">
                        <span>Délai de traitement</span>
                        <span class="value processing">24-48h</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row total">
                        <span>Total débité</span>
                        <span class="value">€{{ formatCurrency(totalAmount) }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Nouveau solde</span>
                        <span class="balance">€{{ formatCurrency(newBalance) }}</span>
                    </div>
                </div>
            </div>

            <!-- Bank Transfer Details -->
            <div v-if="selectedMethod === 'bank'" class="bank-details">
                <h4 class="section-title">Coordonnées bancaires</h4>
                <div class="bank-info">
                    <div class="bank-field">
                        <label>Bénéficiaire</label>
                        <div class="field-value">Benkky SARL</div>
                    </div>
                    <div class="bank-field">
                        <label>IBAN</label>
                        <div class="field-value copyable" @click="copyToClipboard('FR76 3000 4000 0100 1234 5678 900')">
                            FR76 3000 4000 0100 1234 5678 900
                            <i class="fa-regular fa-copy"></i>
                        </div>
                    </div>
                    <div class="bank-field">
                        <label>BIC</label>
                        <div class="field-value copyable" @click="copyToClipboard('BNPAFRPPXXX')">
                            BNPAFRPPXXX
                            <i class="fa-regular fa-copy"></i>
                        </div>
                    </div>
                    <div class="bank-field">
                        <label>Référence</label>
                        <div class="field-value reference">
                            {{ userReference }}
                        </div>
                    </div>
                </div>
                <p class="bank-note">
                    <i class="fa-solid fa-info-circle"></i>
                    Utilisez cette référence dans l'objet du virement pour un traitement rapide
                </p>
            </div>

            <!-- Crypto Details -->
            <div v-if="selectedMethod === 'crypto'" class="crypto-details">
                <h4 class="section-title">Adresse de réception</h4>
                <div class="crypto-options">
                    <div
                        v-for="crypto in cryptoCurrencies"
                        :key="crypto.id"
                        :class="['crypto-option', { selected: selectedCrypto === crypto.id }]"
                        @click="selectCrypto(crypto.id)"
                    >
                        <div class="crypto-icon">
                            <i :class="crypto.icon"></i>
                        </div>
                        <div class="crypto-info">
                            <h5>{{ crypto.name }}</h5>
                            <span>{{ crypto.symbol }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="selectedCrypto" class="crypto-address">
                    <div class="address-label">Votre adresse {{ selectedCryptoDetails.name }}</div>
                    <div class="address-value copyable" @click="copyToClipboard(userCryptoAddress)">
                        {{ userCryptoAddress }}
                        <i class="fa-regular fa-copy"></i>
                    </div>
                    <div class="crypto-qr">
                        <div ref="qrCode" class="qr-container"></div>
                    </div>
                    <p class="crypto-note">
                        <i class="fa-solid fa-exclamation-triangle"></i>
                        Envoyez uniquement {{ selectedCryptoDetails.symbol }} sur cette adresse
                    </p>
                </div>
            </div>

            <!-- Terms -->
            <div class="terms-section">
                <label class="terms-checkbox">
                    <input type="checkbox" v-model="acceptTerms" required>
                    <span class="checkmark"></span>
                    <span class="terms-text">
                        Je confirme que ces fonds proviennent de sources légitimes et j'accepte les
                        <a href="/terms" target="_blank" class="terms-link">conditions de recharge</a>
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
                    @click="submitRecharge"
                >
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    {{ submitButtonText }}
                </button>
            </div>

            <!-- Security Info -->
            <div class="security-info">
                <div class="security-item">
                    <i class="fa-solid fa-shield-check"></i>
                    <span>Recharges sécurisées</span>
                </div>
                <div class="security-item">
                    <i class="fa-solid fa-clock"></i>
                    <span>Support 24/7</span>
                </div>
                <div class="security-item">
                    <i class="fa-solid fa-euro-sign"></i>
                    <span>Pas de frais cachés</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import QRCode from 'qrcode';

const props = defineProps({
    currentBalance: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close', 'success']);

// State
const selectedMethod = ref('card');
const amount = ref('');
const amountError = ref('');
const acceptTerms = ref(false);
const selectedCrypto = ref('btc');
const copyNotification = ref(false);

// Constants
const quickAmounts = [20, 50, 100, 200, 500];

const rechargeMethods = [
    {
        id: 'card',
        name: 'Carte bancaire',
        icon: 'fa-solid fa-credit-card',
        description: 'Recharge instantanée',
        fee: '1.5%',
        feeAmount: 0,
        instant: true
    },
    {
        id: 'bank',
        name: 'Virement bancaire',
        icon: 'fa-solid fa-building-columns',
        description: 'Recharge par virement',
        fee: '0%',
        feeAmount: 0,
        instant: false
    },
    {
        id: 'crypto',
        name: 'Cryptomonnaie',
        icon: 'fa-solid fa-bitcoin-sign',
        description: 'BTC, ETH, USDT',
        fee: '0.5%',
        feeAmount: 0,
        instant: true
    },
    {
        id: 'paypal',
        name: 'PayPal',
        icon: 'fa-brands fa-paypal',
        description: 'Recharge via PayPal',
        fee: '2%',
        feeAmount: 0,
        instant: true
    }
];

const cryptoCurrencies = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: 'fa-brands fa-bitcoin' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'fa-brands fa-ethereum' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: 'fa-solid fa-coins' }
];

// Computed
const selectedMethodDetails = computed(() => {
    const method = rechargeMethods.find(m => m.id === selectedMethod.value);
    const amt = parseFloat(amount.value) || 0;

    if (method) {
        const feePercentage = parseFloat(method.fee) / 100;
        method.feeAmount = amt * feePercentage;
    }

    return method || rechargeMethods[0];
});

const totalAmount = computed(() => {
    const amt = parseFloat(amount.value) || 0;
    return amt + selectedMethodDetails.value.feeAmount;
});

const newBalance = computed(() => {
    return props.currentBalance + (parseFloat(amount.value) || 0);
});

const submitButtonText = computed(() => {
    if (selectedMethod.value === 'bank') {
        return 'Voir coordonnées';
    } else if (selectedMethod.value === 'crypto') {
        return 'Voir adresse';
    } else {
        return `Recharger €${formatCurrency(totalAmount.value)}`;
    }
});

const canSubmit = computed(() => {
    const amt = parseFloat(amount.value) || 0;

    if (amt < 5 || amt > 5000 || amountError.value) {
        return false;
    }

    if (!acceptTerms.value) {
        return false;
    }

    if (selectedMethod.value === 'crypto' && !selectedCrypto.value) {
        return false;
    }

    return true;
});

const userReference = computed(() => {
    return `BENKKY-${props.userId}-${Date.now()}`;
});

const userCryptoAddress = computed(() => {
    const addresses = {
        btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    };
    return addresses[selectedCrypto.value] || '';
});

const selectedCryptoDetails = computed(() => {
    return cryptoCurrencies.find(c => c.id === selectedCrypto.value) || cryptoCurrencies[0];
});

// Methods
const selectMethod = (methodId) => {
    selectedMethod.value = methodId;
};

const selectCrypto = (cryptoId) => {
    selectedCrypto.value = cryptoId;
};

const setAmount = (amt) => {
    amount.value = amt;
    validateAmount();
};

const validateAmount = () => {
    const amt = parseFloat(amount.value) || 0;

    if (amt < 5) {
        amountError.value = 'Le montant minimum est de €5';
    } else if (amt > 5000) {
        amountError.value = 'Le montant maximum est de €5,000';
    } else {
        amountError.value = '';
    }
};

const formatCurrency = (value) => {
    return parseFloat(value || 0).toFixed(2);
};

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        copyNotification.value = true;

        // Show success message
        const event = new CustomEvent('show-notification', {
            detail: {
                type: 'success',
                message: 'Copié dans le presse-papier !'
            }
        });
        window.dispatchEvent(event);

        setTimeout(() => {
            copyNotification.value = false;
        }, 2000);
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
    }
};

const generateQRCode = async () => {
    if (!userCryptoAddress.value || !selectedCryptoDetails.value) return;

    try {
        const qrElement = document.querySelector('.qr-container');
        if (qrElement) {
            qrElement.innerHTML = '';

            const qrCode = await QRCode.toDataURL(userCryptoAddress.value, {
                width: 128,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            const img = document.createElement('img');
            img.src = qrCode;
            img.alt = `${selectedCryptoDetails.value.name} Address QR Code`;
            qrElement.appendChild(img);
        }
    } catch (err) {
        console.error('Erreur génération QR Code:', err);
    }
};

const submitRecharge = async () => {
    if (!canSubmit.value) return;

    try {
        // Pour les méthodes nécessitant un traitement supplémentaire
        if (selectedMethod.value === 'bank' || selectedMethod.value === 'crypto') {
            // Ces méthodes montrent juste les détails, pas de soumission directe
            return;
        }

        // Pour les méthodes directes (carte, PayPal)
        const rechargeData = {
            method: selectedMethod.value,
            amount: parseFloat(amount.value),
            total: totalAmount.value,
            fees: selectedMethodDetails.value.feeAmount
        };

        router.post('/api/wallet/recharge', rechargeData, {
            preserveScroll: true,
            onSuccess: () => {
                emit('success', {
                    amount: rechargeData.amount,
                    method: rechargeData.method,
                    newBalance: newBalance.value
                });

                emit('close');

                const event = new CustomEvent('show-notification', {
                    detail: {
                        type: 'success',
                        message: 'Recharge effectuée avec succès !'
                    }
                });
                window.dispatchEvent(event);
            },
            onError: (errors) => {
                console.error('Erreur recharge:', errors);
            }
        });

    } catch (error) {
        console.error('Erreur système:', error);
    }
};

// Lifecycle
onMounted(() => {
    amount.value = 50;
    validateAmount();
});

watch(selectedCrypto, () => {
    generateQRCode();
});

watch(selectedMethod, () => {
    if (selectedMethod.value === 'crypto') {
        setTimeout(() => {
            generateQRCode();
        }, 100);
    }
});
</script>

<style scoped>
.recharge-modal {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.balance-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.balance-card {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
}

.balance-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
}

.balance-amount {
    font-size: 32px;
    font-weight: 700;
    color: white;
}

.methods-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.methods-grid {
    display: grid;
    grid-template-columns: 1fr;
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

.method-desc {
    font-size: 12px;
    color: #9ca3af;
    display: block;
    margin-bottom: 4px;
}

.method-fee {
    font-size: 11px;
    color: #10b981;
    font-weight: 600;
}

.method-check {
    opacity: 0;
    color: #3b82f6;
    transition: opacity 0.2s ease;
}

.method-card.selected .method-check {
    opacity: 1;
}

.amount-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.amount-input-group {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 8px 16px;
    margin-bottom: 16px;
    transition: border-color 0.2s ease;
}

.amount-input-group:focus-within {
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
    min-width: 60px;
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

.summary-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    font-size: 14px;
}

.summary-row .value {
    color: white;
    font-weight: 600;
}

.summary-row .fee {
    color: #f59e0b;
}

.summary-row .processing {
    color: #8b5cf6;
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
    color: #10b981;
}

.bank-details,
.crypto-details {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bank-info {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
}

.bank-field {
    margin-bottom: 16px;
}

.bank-field:last-child {
    margin-bottom: 0;
}

.bank-field label {
    display: block;
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 4px;
}

.field-value {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: white;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.copyable {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s ease;
}

.copyable:hover {
    background: rgba(255, 255, 255, 0.15);
}

.copyable i {
    color: #3b82f6;
    font-size: 14px;
}

.field-value.reference {
    color: #3b82f6;
    font-weight: 600;
}

.bank-note {
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
}

.bank-note i {
    color: #3b82f6;
}

.crypto-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
}

.crypto-option {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.2s ease;
}

.crypto-option:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.crypto-option.selected {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
}

.crypto-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.crypto-icon i {
    font-size: 20px;
    color: #f59e0b;
}

.crypto-info h5 {
    font-size: 12px;
    font-weight: 600;
    color: white;
    margin: 0 0 2px 0;
}

.crypto-info span {
    font-size: 11px;
    color: #9ca3af;
}

.crypto-address {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
}

.address-label {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 8px;
}

.address-value {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: white;
    padding: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    margin-bottom: 20px;
    word-break: break-all;
}

.crypto-qr {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}

.qr-container {
    width: 128px;
    height: 128px;
    background: white;
    border-radius: 8px;
    padding: 8px;
}

.qr-container img {
    width: 100%;
    height: 100%;
}

.crypto-note {
    font-size: 11px;
    color: #ef4444;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
}

.terms-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

.security-info {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 0 24px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
}

.security-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #9ca3af;
    font-size: 12px;
}

.security-item i {
    font-size: 20px;
    color: #10b981;
}

/* Responsive */
@media (max-width: 640px) {
    .crypto-options {
        grid-template-columns: repeat(2, 1fr);
    }

    .modal-actions {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
    }
}
</style>
