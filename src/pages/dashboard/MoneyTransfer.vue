<template>
    <div class="money-transfer-tab">
        <!-- Header -->
        <div class="tab-header">
            <h1 class="tab-title">
                <i class="fa-solid fa-money-bill-transfer"></i>
                Envoyer de l'argent
            </h1>
            <div class="header-actions">
                <button class="action-btn outline" @click="showTransferHistory">
                    <i class="fa-solid fa-history"></i>
                    Historique
                </button>
                <button class="action-btn outline" @click="showContacts">
                    <i class="fa-solid fa-users"></i>
                    Contacts
                </button>
            </div>
        </div>

        <!-- Transfer Form -->
        <div class="transfer-form-section">
            <div class="form-container">
                <div class="form-header">
                    <h2>Nouveau transfert</h2>
                    <div class="balance-info">
                        <span>Solde disponible:</span>
                        <span class="balance-amount">${{ formatCurrency(user.wallet_balance) }}</span>
                    </div>
                </div>

                <!-- Recipient Selection -->
                <div class="form-step">
                    <h3 class="step-title">
                        <span class="step-number">1</span>
                        Destinataire
                    </h3>
                    <div class="step-content">
                        <div class="recipient-selector">
                            <!-- Quick Contacts -->
                            <div class="quick-contacts" v-if="recentContacts.length > 0">
                                <h4>Contacts fréquents</h4>
                                <div class="contacts-grid">
                                    <button
                                        v-for="contact in recentContacts"
                                        :key="contact.id"
                                        :class="['contact-card', { active: form.receiver_id === contact.id }]"
                                        @click="selectContact(contact)"
                                    >
                                        <div class="contact-avatar">
                                            <img :src="contact.avatar || '/images/avatars/default-avatar.jpg'" :alt="contact.name">
                                        </div>
                                        <div class="contact-info">
                                            <h5>{{ contact.name }}</h5>
                                            <span>{{ contact.email }}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <!-- Search/Manual Input -->
                            <div class="recipient-input">
                                <div class="input-group">
                                    <label for="recipient">
                                        <i class="fa-solid fa-user"></i>
                                        Rechercher par email ou nom
                                    </label>
                                    <div class="input-with-search">
                                        <input
                                            id="recipient"
                                            type="text"
                                            v-model="searchQuery"
                                            placeholder="Entrez l'email du destinataire"
                                            class="dark-input"
                                            @input="searchRecipients"
                                        />
                                        <button class="search-btn" @click="searchRecipients">
                                            <i class="fa-solid fa-search"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Search Results -->
                                <div v-if="searchResults.length > 0" class="search-results">
                                    <div
                                        v-for="result in searchResults"
                                        :key="result.id"
                                        class="result-item"
                                        @click="selectRecipient(result)"
                                    >
                                        <div class="result-avatar">
                                            <img :src="result.avatar || '/images/avatars/default-avatar.jpg'" :alt="result.name">
                                        </div>
                                        <div class="result-info">
                                            <h5>{{ result.name }}</h5>
                                            <span>{{ result.email }}</span>
                                        </div>
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>

                                <!-- Selected Recipient -->
                                <div v-if="selectedRecipient" class="selected-recipient">
                                    <div class="recipient-card">
                                        <div class="recipient-avatar">
                                            <img :src="selectedRecipient.avatar || '/images/avatars/default-avatar.jpg'" :alt="selectedRecipient.name">
                                        </div>
                                        <div class="recipient-details">
                                            <h4>{{ selectedRecipient.name }}</h4>
                                            <span>{{ selectedRecipient.email }}</span>
                                        </div>
                                        <button class="remove-btn" @click="removeRecipient">
                                            <i class="fa-solid fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Amount -->
                <div class="form-step">
                    <h3 class="step-title">
                        <span class="step-number">2</span>
                        Montant
                    </h3>
                    <div class="step-content">
                        <div class="amount-input">
                            <div class="currency-prefix">$</div>
                            <input
                                type="number"
                                v-model="form.amount"
                                placeholder="0.00"
                                class="amount-field"
                                :class="{ error: amountError }"
                                min="1"
                                max="5000"
                                step="0.01"
                                @input="calculateFees"
                            />
                        </div>
                        <div v-if="amountError" class="error-message">
                            <i class="fa-solid fa-exclamation-circle"></i>
                            {{ amountError }}
                        </div>

                        <!-- Quick Amounts -->
                        <div class="quick-amounts">
                            <button
                                v-for="amount in quickAmounts"
                                :key="amount"
                                :class="['amount-btn', { active: form.amount == amount }]"
                                @click="setAmount(amount)"
                            >
                                ${{ amount }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Details -->
                <div class="form-step">
                    <h3 class="step-title">
                        <span class="step-number">3</span>
                        Détails
                    </h3>
                    <div class="step-content">
                        <div class="form-group">
                            <label for="description">
                                <i class="fa-solid fa-comment"></i>
                                Message (optionnel)
                            </label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                placeholder="Ajouter un message pour le destinataire"
                                class="dark-textarea"
                                rows="3"
                                maxlength="255"
                            ></textarea>
                            <div class="char-count">
                                {{ form.description.length }}/255
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary -->
                <div class="summary-section">
                    <h3 class="summary-title">Récapitulatif</h3>
                    <div class="summary-details">
                        <div class="summary-row">
                            <span>Montant à envoyer</span>
                            <span class="amount">${{ formatCurrency(form.amount || 0) }}</span>
                        </div>
                        <div class="summary-row">
                            <span>Frais de transfert ({{ feePercentage }}%)</span>
                            <span class="fee">${{ formatCurrency(fees) }}</span>
                        </div>
                        <div class="summary-divider"></div>
                        <div class="summary-row total">
                            <span>Total à débiter</span>
                            <span class="total-amount">${{ formatCurrency(totalAmount) }}</span>
                        </div>
                        <div class="summary-row balance-after">
                            <span>Solde après transfert</span>
                            <span :class="['balance', { negative: balanceAfter < 0 }]">
                                ${{ formatCurrency(balanceAfter) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="form-actions">
                    <button class="action-btn secondary" @click="resetForm">
                        <i class="fa-solid fa-rotate-left"></i>
                        Réinitialiser
                    </button>
                    <button
                        class="action-btn primary"
                        :disabled="!canSubmit"
                        @click="submitTransfer"
                    >
                        <i class="fa-solid fa-paper-plane"></i>
                        Envoyer maintenant
                    </button>
                </div>
            </div>

            <!-- Sidebar: Recent Transfers -->
            <div class="transfers-sidebar">
                <h3>Transferts récents</h3>
                <div class="transfers-list">
                    <div v-if="recentTransfers.length === 0" class="empty-transfers">
                        <i class="fa-solid fa-exchange-alt"></i>
                        <p>Aucun transfert récent</p>
                    </div>
                    <div
                        v-for="transfer in recentTransfers"
                        :key="transfer.id"
                        class="transfer-item"
                        @click="repeatTransfer(transfer)"
                    >
                        <div class="transfer-icon">
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                        <div class="transfer-info">
                            <h5>{{ transfer.receiver.name }}</h5>
                            <span class="transfer-date">{{ formatDate(transfer.created_at) }}</span>
                        </div>
                        <div class="transfer-amount">
                            ${{ formatCurrency(transfer.amount) }}
                        </div>
                    </div>
                </div>
                <button class="view-all-btn" @click="showTransferHistory">
                    Voir tout l'historique
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    user: Object,
    recentTransfers: Array,
    contacts: Array,
});

const emit = defineEmits(['show-pin-modal']);

const feePercentage = 1; // 1% fee
const quickAmounts = [10, 50, 100, 200, 500];

const form = reactive({
    receiver_id: null,
    amount: '',
    description: '',
});

const searchQuery = ref('');
const searchResults = ref([]);
const selectedRecipient = ref(null);
const amountError = ref('');

// Recent contacts (mock data - would come from backend)
const recentContacts = computed(() => {
    return props.contacts?.slice(0, 4) || [];
});

// Computed properties
const fees = computed(() => {
    const amount = parseFloat(form.amount) || 0;
    return (amount * feePercentage) / 100;
});

const totalAmount = computed(() => {
    const amount = parseFloat(form.amount) || 0;
    return amount + fees.value;
});

const balanceAfter = computed(() => {
    return props.user.wallet_balance - totalAmount.value;
});

const canSubmit = computed(() => {
    return (
        selectedRecipient.value &&
        form.amount &&
        parseFloat(form.amount) > 0 &&
        balanceAfter.value >= 0 &&
        !amountError.value
    );
});

// Methods
const searchRecipients = async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = [];
        return;
    }

    // In real app, this would be an API call
    // Mock search results
    searchResults.value = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: '/images/avatars/avatar1.jpg',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: '/images/avatars/avatar2.jpg',
        },
    ];
};

const selectRecipient = (recipient) => {
    selectedRecipient.value = recipient;
    form.receiver_id = recipient.id;
    searchQuery.value = '';
    searchResults.value = [];
};

const selectContact = (contact) => {
    selectedRecipient.value = contact;
    form.receiver_id = contact.id;
};

const removeRecipient = () => {
    selectedRecipient.value = null;
    form.receiver_id = null;
};

const setAmount = (amount) => {
    form.amount = amount;
    calculateFees();
};

const calculateFees = () => {
    const amount = parseFloat(form.amount) || 0;

    if (amount > props.user.wallet_balance) {
        amountError.value = 'Solde insuffisant';
    } else if (amount > 5000) {
        amountError.value = 'Le montant maximum est de $5000';
    } else if (amount < 1) {
        amountError.value = 'Le montant minimum est de $1';
    } else {
        amountError.value = '';
    }
};

const resetForm = () => {
    form.receiver_id = null;
    form.amount = '';
    form.description = '';
    selectedRecipient.value = null;
    searchQuery.value = '';
    searchResults.value = [];
    amountError.value = '';
};

const submitTransfer = () => {
    if (!canSubmit.value) return;

    // Show PIN verification modal
    emit('show-pin-modal', {
        action: 'transfer',
        data: {
            receiver_id: form.receiver_id,
            amount: form.amount,
            description: form.description,
            fees: fees.value,
            total_amount: totalAmount.value,
        },
    });
};

const repeatTransfer = (transfer) => {
    selectedRecipient.value = transfer.receiver;
    form.receiver_id = transfer.receiver.id;
    form.amount = transfer.amount;
    form.description = transfer.description || '';
};

const showTransferHistory = () => {
    router.get(route('transactions'));
};

const showContacts = () => {
    // Show contacts management modal
    console.log('Show contacts');
};

const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
    });
};

onMounted(() => {
    calculateFees();
});
</script>

<style scoped>
.money-transfer-tab {
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

.header-actions {
    display: flex;
    gap: 15px;
}

.action-btn.outline {
    padding: 12px 20px;
    background: transparent;
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 12px;
    color: var(--light-color2);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.action-btn.outline:hover {
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.action-btn.primary {
    padding: 14px 24px;
    background: var(--gradient-green);
    border: none;
    border-radius: 14px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.action-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.action-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.action-btn.secondary {
    padding: 14px 24px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    color: var(--accent-color3);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.action-btn.secondary:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
}

.transfer-form-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

.form-container {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 30px;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.form-header h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--light-color1);
}

.balance-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--light-color2);
}

.balance-amount {
    font-weight: 700;
    color: var(--accent-color3);
    font-size: 1.2rem;
}

.form-step {
    margin-bottom: 30px;
}

.step-title {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.step-number {
    width: 30px;
    height: 30px;
    background: var(--gradient-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
}

.step-content {
    padding-left: 45px;
}

.recipient-selector {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.quick-contacts h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--light-color2);
    margin-bottom: 15px;
}

.contacts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
}

.contact-card {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    border: none;
    color: var(--light-color2);
}

.contact-card:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: rgba(106, 196, 166, 0.3);
}

.contact-card.active {
    background: rgba(42, 140, 130, 0.2);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.contact-avatar {
    width: 40px;
    height: 40px;
}

.contact-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent-color2);
}

.contact-info h5 {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 3px;
    color: inherit;
}

.contact-info span {
    font-size: 0.8rem;
    opacity: 0.8;
    color: inherit;
}

.recipient-input {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input-group label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 10px;
}

.input-group label i {
    color: var(--accent-color3);
}

.input-with-search {
    position: relative;
}

.input-with-search .dark-input {
    width: 100%;
    padding-right: 50px;
}

.search-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--accent-color3);
    cursor: pointer;
    padding: 10px;
    transition: all 0.3s ease;
}

.search-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
}

.search-results {
    background: rgba(15, 39, 39, 0.8);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    overflow: hidden;
    max-height: 300px;
    overflow-y: auto;
}

.result-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.result-item:hover {
    background: rgba(26, 65, 55, 0.6);
}

.result-item:last-child {
    border-bottom: none;
}

.result-avatar {
    width: 40px;
    height: 40px;
}

.result-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.result-info {
    flex: 1;
}

.result-info h5 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 3px;
}

.result-info span {
    font-size: 0.85rem;
    color: var(--light-color2);
}

.result-item i {
    color: var(--light-color2);
    opacity: 0.5;
    transition: all 0.3s ease;
}

.result-item:hover i {
    opacity: 1;
    transform: translateX(5px);
}

.selected-recipient {
    background: rgba(42, 140, 130, 0.1);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 16px;
    padding: 20px;
}

.recipient-card {
    display: flex;
    align-items: center;
    gap: 15px;
}

.recipient-avatar {
    width: 50px;
    height: 50px;
}

.recipient-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent-color2);
}

.recipient-details {
    flex: 1;
}

.recipient-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.recipient-details span {
    font-size: 0.9rem;
    color: var(--light-color2);
}

.remove-btn {
    width: 35px;
    height: 35px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(244, 67, 54, 0.2);
    border-radius: 10px;
    color: #F44336;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    background: rgba(244, 67, 54, 0.1);
    border-color: #F44336;
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

.dark-textarea {
    width: 100%;
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    padding: 15px;
    color: var(--light-color1);
    font-size: 1rem;
    resize: vertical;
    transition: all 0.3s ease;
}

.dark-textarea:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.char-count {
    text-align: right;
    font-size: 0.8rem;
    color: var(--light-color2);
    margin-top: 5px;
}

.summary-section {
    background: rgba(15, 39, 39, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 30px;
}

.summary-title {
    font-size: 1.3rem;
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

.summary-row .amount,
.summary-row .fee {
    font-weight: 600;
    color: var(--light-color1);
    font-size: 1.1rem;
}

.summary-row .fee {
    color: #F44336;
}

.summary-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(106, 196, 166, 0.3), transparent);
    margin: 10px 0;
}

.summary-row.total {
    border-top: 1px solid rgba(106, 196, 166, 0.2);
    padding-top: 15px;
    margin-top: 5px;
}

.summary-row.total .total-amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-color3);
}

.summary-row.balance-after .balance {
    font-weight: 600;
    color: #4CAF50;
}

.summary-row.balance-after .balance.negative {
    color: #F44336;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.transfers-sidebar {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 25px;
    display: flex;
    flex-direction: column;
}

.transfers-sidebar h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.transfers-list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
}

.empty-transfers {
    text-align: center;
    padding: 40px 20px;
    color: var(--light-color2);
}

.empty-transfers i {
    font-size: 2.5rem;
    margin-bottom: 15px;
    opacity: 0.5;
}

.empty-transfers p {
    font-size: 0.95rem;
}

.transfer-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.transfer-item:hover {
    background: rgba(26, 65, 55, 0.4);
    transform: translateX(5px);
}

.transfer-icon {
    width: 40px;
    height: 40px;
    background: rgba(26, 65, 55, 0.6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.1rem;
}

.transfer-info {
    flex: 1;
}

.transfer-info h5 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 3px;
}

.transfer-date {
    font-size: 0.8rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.transfer-amount {
    font-weight: 700;
    color: var(--accent-color3);
    font-size: 1.1rem;
}

.view-all-btn {
    width: 100%;
    padding: 14px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    color: var(--accent-color3);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.view-all-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    gap: 15px;
}

/* Responsive */
@media (max-width: 1200px) {
    .transfer-form-section {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .tab-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .header-actions {
        width: 100%;
        justify-content: flex-start;
    }

    .form-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .step-content {
        padding-left: 0;
    }

    .contacts-grid {
        grid-template-columns: 1fr;
    }

    .amount-input {
        flex-direction: column;
        align-items: stretch;
    }

    .amount-field {
        font-size: 2rem;
    }

    .form-actions {
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .quick-amounts {
        justify-content: center;
    }

    .amount-btn {
        flex: 1;
        min-width: 80px;
    }
}
</style>
