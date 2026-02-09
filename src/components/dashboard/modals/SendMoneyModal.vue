<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="send-money-modal dark-modal">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="header-icon">
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                <div class="header-content">
                    <h3>Envoyer de l'argent</h3>
                    <p>Transférez des fonds à un autre utilisateur</p>
                </div>
                <button class="close-btn" @click="$emit('close')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>

            <!-- Balance & Limits -->
            <div class="balance-section">
                <div class="balance-info">
                    <div class="balance-item">
                        <span class="label">Solde disponible</span>
                        <span class="value">{{ formatCurrency(availableBalance) }}</span>
                    </div>
                    <div class="balance-item">
                        <span class="label">Limite quotidienne</span>
                        <span class="value">{{ formatCurrency(dailyLimit) }}</span>
                    </div>
                    <div class="balance-item">
                        <span class="label">Limite transaction</span>
                        <span class="value">{{ formatCurrency(perTransactionLimit) }}</span>
                    </div>
                </div>
            </div>

            <!-- Recipient Selection -->
            <div class="recipient-section">
                <h4 class="section-title">Destinataire</h4>

                <!-- Recent Contacts -->
                <div v-if="recentContacts.length > 0" class="recent-contacts">
                    <div class="contacts-header">
                        <span class="contacts-title">Contacts récents</span>
                        <button class="view-all" @click="showAllContacts">
                            Tout voir
                        </button>
                    </div>
                    <div class="contacts-list">
                        <div
                            v-for="contact in recentContacts"
                            :key="contact.id"
                            :class="['contact-card', { selected: selectedRecipient?.id === contact.id }]"
                            @click="selectContact(contact)"
                        >
                            <div class="contact-avatar">
                                <img v-if="contact.avatar" :src="contact.avatar" :alt="contact.name">
                                <div v-else class="avatar-placeholder">
                                    {{ getInitials(contact.name) }}
                                </div>
                            </div>
                            <div class="contact-info">
                                <h5 class="contact-name">{{ contact.name }}</h5>
                                <span class="contact-email">{{ contact.email }}</span>
                            </div>
                            <div class="contact-check">
                                <i class="fa-solid fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search Recipient -->
                <div class="recipient-search">
                    <div class="search-input">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            v-model="searchQuery"
                            placeholder="Rechercher par nom, email ou ID..."
                            @input="searchRecipients"
                        >
                        <button
                            v-if="searchQuery"
                            class="clear-search"
                            @click="clearSearch"
                        >
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>

                    <!-- Search Results -->
                    <div v-if="searchResults.length > 0" class="search-results">
                        <div
                            v-for="user in searchResults"
                            :key="user.id"
                            class="search-result"
                            @click="selectUser(user)"
                        >
                            <div class="result-avatar">
                                <img v-if="user.avatar" :src="user.avatar" :alt="user.name">
                                <div v-else class="avatar-placeholder">
                                    {{ getInitials(user.name) }}
                                </div>
                            </div>
                            <div class="result-info">
                                <h5>{{ user.name }}</h5>
                                <span>{{ user.email }}</span>
                            </div>
                            <div class="result-action">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>

                    <!-- No Results -->
                    <div v-if="searchQuery && searchResults.length === 0" class="no-results">
                        <i class="fa-solid fa-user-xmark"></i>
                        <p>Aucun utilisateur trouvé</p>
                    </div>
                </div>

                <!-- Selected Recipient -->
                <div v-if="selectedRecipient" class="selected-recipient">
                    <div class="recipient-header">
                        <h5>Destinataire sélectionné</h5>
                        <button class="change-btn" @click="clearRecipient">
                            Changer
                        </button>
                    </div>
                    <div class="recipient-card">
                        <div class="recipient-avatar">
                            <img v-if="selectedRecipient.avatar" :src="selectedRecipient.avatar" :alt="selectedRecipient.name">
                            <div v-else class="avatar-placeholder large">
                                {{ getInitials(selectedRecipient.name) }}
                            </div>
                        </div>
                        <div class="recipient-details">
                            <h4 class="recipient-name">{{ selectedRecipient.name }}</h4>
                            <span class="recipient-email">{{ selectedRecipient.email }}</span>
                            <div v-if="selectedRecipient.verified" class="verified-badge">
                                <i class="fa-solid fa-check-circle"></i>
                                Vérifié
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Amount & Message -->
            <div class="transfer-section">
                <div class="amount-input">
                    <h4 class="section-title">Montant</h4>
                    <div class="input-group">
                        <div class="currency-prefix">€</div>
                        <input
                            type="number"
                            v-model="amount"
                            placeholder="0.00"
                            class="amount-field"
                            :class="{ error: amountError }"
                            :min="minAmount"
                            :max="maxAmount"
                            step="0.01"
                            @input="validateAmount"
                        >
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

                <!-- Message -->
                <div class="message-input">
                    <h4 class="section-title">Message (optionnel)</h4>
                    <textarea
                        v-model="message"
                        placeholder="Ajoutez un message personnel..."
                        class="message-field"
                        maxlength="200"
                        rows="3"
                    ></textarea>
                    <div class="message-counter">
                        {{ message.length }}/200 caractères
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="summary-section">
                <h4 class="section-title">Récapitulatif</h4>
                <div class="summary-details">
                    <div class="summary-row">
                        <span>Montant envoyé</span>
                        <span class="value">€{{ formatCurrency(amount || 0) }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Frais de transfert</span>
                        <span class="value fee">€{{ formatCurrency(fees) }}</span>
                    </div>
                    <div v-if="isInternational" class="summary-row">
                        <span>Taux de change</span>
                        <span class="value exchange">1 EUR = {{ exchangeRate }} {{ recipientCurrency }}</span>
                    </div>
                    <div v-if="isInternational" class="summary-row">
                        <span>Montant reçu</span>
                        <span class="value received">{{ formatCurrency(recipientAmount, recipientCurrency) }}</span>
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

            <!-- Security & Schedule -->
            <div class="options-section">
                <div class="security-options">
                    <label class="option-checkbox">
                        <input type="checkbox" v-model="requireConfirmation">
                        <span class="checkmark"></span>
                        <span class="option-text">
                            <i class="fa-solid fa-shield-check"></i>
                            Exiger une confirmation par email
                        </span>
                    </label>

                    <label class="option-checkbox">
                        <input type="checkbox" v-model="scheduleTransfer">
                        <span class="checkmark"></span>
                        <span class="option-text">
                            <i class="fa-solid fa-calendar"></i>
                            Programmer le transfert
                        </span>
                    </label>
                </div>

                <!-- Schedule Options -->
                <div v-if="scheduleTransfer" class="schedule-options">
                    <div class="schedule-input">
                        <label>Date d'envoi</label>
                        <input
                            type="datetime-local"
                            v-model="scheduledDate"
                            :min="minScheduleDate"
                        >
                    </div>
                    <div class="schedule-note">
                        <i class="fa-solid fa-info-circle"></i>
                        Le transfert sera effectué à la date spécifiée
                    </div>
                </div>
            </div>

            <!-- Terms -->
            <div class="terms-section">
                <label class="terms-checkbox">
                    <input type="checkbox" v-model="acceptTerms" required>
                    <span class="checkmark"></span>
                    <span class="terms-text">
                        Je confirme que ces fonds ne sont pas destinés à des activités illégales
                        et j'accepte les <a href="/terms" target="_blank" class="terms-link">conditions de transfert</a>
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
                    @click="submitTransfer"
                >
                    <i class="fa-solid fa-paper-plane"></i>
                    {{ scheduleTransfer ? 'Programmer' : 'Envoyer' }} €{{ formatCurrency(totalAmount) }}
                </button>
            </div>

            <!-- Security Badges -->
            <div class="security-badges">
                <div class="security-badge">
                    <i class="fa-solid fa-lock"></i>
                    <span>Transfert sécurisé</span>
                </div>
                <div class="security-badge">
                    <i class="fa-solid fa-bolt"></i>
                    <span>Instantané</span>
                </div>
                <div class="security-badge">
                    <i class="fa-solid fa-user-shield"></i>
                    <span>Protection Benkky</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    userBalance: {
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
const searchQuery = ref('');
const selectedRecipient = ref(null);
const amount = ref('');
const amountError = ref('');
const message = ref('');
const requireConfirmation = ref(false);
const scheduleTransfer = ref(false);
const scheduledDate = ref('');
const acceptTerms = ref(false);
const searchResults = ref([]);
const isSearching = ref(false);

// Constants
const quickAmounts = [10, 25, 50, 100, 200];
const minAmount = 1;
const maxAmount = 5000;
const dailyLimit = 10000;
const perTransactionLimit = 5000;
const transferFeeRate = 0.01; // 1%

// Données d'exemple
const recentContacts = ref([
    {
        id: 1,
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        avatar: null,
        verified: true,
        currency: 'EUR'
    },
    {
        id: 2,
        name: 'Jean Martin',
        email: 'jean.martin@email.com',
        avatar: null,
        verified: true,
        currency: 'EUR'
    },
    {
        id: 3,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        avatar: null,
        verified: true,
        currency: 'USD'
    }
]);

// Computed
const availableBalance = computed(() => {
    return props.userBalance;
});

const fees = computed(() => {
    const amt = parseFloat(amount.value) || 0;
    return amt * transferFeeRate;
});

const totalAmount = computed(() => {
    const amt = parseFloat(amount.value) || 0;
    return amt + fees.value;
});

const newBalance = computed(() => {
    return availableBalance.value - totalAmount.value;
});

const isInternational = computed(() => {
    return selectedRecipient.value && selectedRecipient.value.currency !== 'EUR';
});

const exchangeRate = computed(() => {
    // Taux fictifs
    const rates = {
        'USD': 1.08,
        'GBP': 0.86,
        'CHF': 0.95
    };
    return selectedRecipient.value ? rates[selectedRecipient.value.currency] || 1 : 1;
});

const recipientAmount = computed(() => {
    const amt = parseFloat(amount.value) || 0;
    return amt * exchangeRate.value;
});

const recipientCurrency = computed(() => {
    return selectedRecipient.value?.currency || 'EUR';
});

const minScheduleDate = computed(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes dans le futur
    return now.toISOString().slice(0, 16);
});

const canSubmit = computed(() => {
    if (!selectedRecipient.value) return false;

    const amt = parseFloat(amount.value) || 0;
    if (amt < minAmount || amt > Math.min(perTransactionLimit, maxAmount) || amountError.value) {
        return false;
    }

    if (totalAmount.value > availableBalance.value) {
        return false;
    }

    if (!acceptTerms.value) {
        return false;
    }

    // Vérifier la limite quotidienne
    const todayTransfers = 0; // À implémenter avec l'historique
    if (amt > (dailyLimit - todayTransfers)) {
        return false;
    }

    return true;
});

// Methods
const selectContact = (contact) => {
    selectedRecipient.value = contact;
    searchQuery.value = '';
    searchResults.value = [];
};

const selectUser = (user) => {
    selectedRecipient.value = user;
    searchQuery.value = '';
    searchResults.value = [];

    // Ajouter aux contacts récents si pas déjà présent
    if (!recentContacts.value.some(c => c.id === user.id)) {
        recentContacts.value.unshift(user);
        if (recentContacts.value.length > 5) {
            recentContacts.value.pop();
        }
    }
};

const clearRecipient = () => {
    selectedRecipient.value = null;
};

const searchRecipients = async () => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query || query.length < 2) {
        searchResults.value = [];
        return;
    }

    isSearching.value = true;

    // Simuler une recherche API
    setTimeout(() => {
        // Données d'exemple
        const mockUsers = [
            {
                id: 101,
                name: 'Pierre Bernard',
                email: 'pierre.bernard@email.com',
                avatar: null,
                verified: true,
                currency: 'EUR'
            },
            {
                id: 102,
                name: 'Julie Petit',
                email: 'julie.petit@email.com',
                avatar: null,
                verified: false,
                currency: 'EUR'
            },
            {
                id: 103,
                name: 'Thomas Robert',
                email: 'thomas.robert@email.com',
                avatar: null,
                verified: true,
                currency: 'USD'
            }
        ].filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

        searchResults.value = mockUsers;
        isSearching.value = false;
    }, 300);
};

const clearSearch = () => {
    searchQuery.value = '';
    searchResults.value = [];
};

const setAmount = (amt) => {
    amount.value = amt;
    validateAmount();
};

const validateAmount = () => {
    const amt = parseFloat(amount.value) || 0;

    if (amt < minAmount) {
        amountError.value = `Le montant minimum est de €${minAmount}`;
    } else if (amt > perTransactionLimit) {
        amountError.value = `Le montant maximum par transaction est de €${perTransactionLimit}`;
    } else if (amt > dailyLimit) {
        amountError.value = `Vous avez dépassé votre limite quotidienne de €${dailyLimit}`;
    } else if (totalAmount.value > availableBalance.value) {
        amountError.value = 'Solde insuffisant';
    } else {
        amountError.value = '';
    }
};

const getInitials = (name) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

const showAllContacts = () => {
    // Logique pour afficher tous les contacts
    console.log('Show all contacts');
};

const submitTransfer = async () => {
    if (!canSubmit.value) return;

    try {
        const transferData = {
            recipient_id: selectedRecipient.value.id,
            amount: parseFloat(amount.value),
            total: totalAmount.value,
            fees: fees.value,
            message: message.value.trim() || null,
            require_confirmation: requireConfirmation.value,
            scheduled_date: scheduleTransfer.value ? scheduledDate.value : null,
            is_international: isInternational.value,
            exchange_rate: isInternational.value ? exchangeRate.value : null,
            recipient_amount: isInternational.value ? recipientAmount.value : null,
            recipient_currency: recipientCurrency.value
        };

        router.post('/api/transfer/send', transferData, {
            preserveScroll: true,
            onSuccess: () => {
                emit('success', {
                    recipient: selectedRecipient.value.name,
                    amount: transferData.amount,
                    total: transferData.total,
                    scheduled: scheduleTransfer.value
                });

                emit('close');

                // Notification
                const event = new CustomEvent('show-notification', {
                    detail: {
                        type: 'success',
                        message: scheduleTransfer.value
                            ? 'Transfert programmé avec succès !'
                            : 'Transfert effectué avec succès !'
                    }
                });
                window.dispatchEvent(event);
            },
            onError: (errors) => {
                console.error('Erreur transfert:', errors);
            }
        });

    } catch (error) {
        console.error('Erreur système:', error);
    }
};

// Initialisation
onMounted(() => {
    amount.value = 50;
    validateAmount();

    // Définir la date par défaut pour la programmation
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    scheduledDate.value = tomorrow.toISOString().slice(0, 16);
});
</script>

<style scoped>
.send-money-modal {
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

.balance-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.balance-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.balance-item .label {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 4px;
}

.balance-item .value {
    font-size: 16px;
    font-weight: 600;
    color: white;
}

.recipient-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.recent-contacts {
    margin-bottom: 20px;
}

.contacts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.contacts-title {
    font-size: 14px;
    font-weight: 600;
    color: white;
}

.view-all {
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.2s ease;
}

.view-all:hover {
    background: rgba(59, 130, 246, 0.1);
}

.contacts-list {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding-bottom: 8px;
}

.contact-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 16px;
    min-width: 180px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.contact-card:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.contact-card.selected {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
}

.contact-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
}

.contact-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 18px;
}

.avatar-placeholder.large {
    font-size: 24px;
}

.contact-info {
    text-align: center;
}

.contact-name {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0 0 4px 0;
}

.contact-email {
    font-size: 11px;
    color: #9ca3af;
}

.contact-check {
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 0;
    color: #3b82f6;
    transition: opacity 0.2s ease;
}

.contact-card.selected .contact-check {
    opacity: 1;
}

.recipient-search {
    margin-bottom: 20px;
}

.search-input {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px 16px;
    transition: border-color 0.2s ease;
}

.search-input:focus-within {
    border-color: #3b82f6;
}

.search-input i {
    color: #9ca3af;
    margin-right: 12px;
}

.search-input input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-size: 14px;
    outline: none;
    width: 100%;
}

.clear-search {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    margin-left: 8px;
}

.clear-search:hover {
    color: white;
}

.search-results {
    margin-top: 12px;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
}

.search-result {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.search-result:hover {
    background: rgba(255, 255, 255, 0.1);
}

.search-result:last-child {
    border-bottom: none;
}

.result-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    flex-shrink: 0;
}

.result-info {
    flex: 1;
}

.result-info h5 {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0 0 2px 0;
}

.result-info span {
    font-size: 12px;
    color: #9ca3af;
}

.result-action {
    color: #3b82f6;
    font-size: 14px;
}

.no-results {
    text-align: center;
    padding: 32px 20px;
    color: #9ca3af;
}

.no-results i {
    font-size: 32px;
    margin-bottom: 12px;
}

.no-results p {
    margin: 0;
    font-size: 14px;
}

.selected-recipient {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.recipient-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.recipient-header h5 {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0;
}

.change-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: white;
    font-size: 12px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.change-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.recipient-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 16px;
}

.recipient-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    flex-shrink: 0;
}

.recipient-details {
    flex: 1;
}

.recipient-name {
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin: 0 0 4px 0;
}

.recipient-email {
    font-size: 12px;
    color: #9ca3af;
    display: block;
    margin-bottom: 8px;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
}

.transfer-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.amount-input,
.message-input {
    margin-bottom: 24px;
}

.amount-input:last-child,
.message-input:last-child {
    margin-bottom: 0;
}

.input-group {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 8px 16px;
    margin-bottom: 12px;
    transition: border-color 0.2s ease;
}

.input-group:focus-within {
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

.message-field {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px 16px;
    color: white;
    font-size: 14px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s ease;
}

.message-field:focus {
    border-color: #3b82f6;
}

.message-counter {
    text-align: right;
    font-size: 11px;
    color: #9ca3af;
    margin-top: 4px;
}

.options-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.security-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
}

.option-checkbox {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: #d1d5db;
    font-size: 14px;
}

.option-text {
    display: flex;
    align-items: center;
    gap: 8px;
}

.option-text i {
    color: #3b82f6;
}

.schedule-options {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
}

.schedule-input {
    margin-bottom: 12px;
}

.schedule-input label {
    display: block;
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 8px;
}

.schedule-input input {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 10px 12px;
    color: white;
    font-size: 14px;
    outline: none;
}

.schedule-note {
    font-size: 11px;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 8px;
}

.schedule-note i {
    color: #3b82f6;
}

/* Scrollbar styling */
.send-money-modal::-webkit-scrollbar {
    width: 8px;
}

.send-money-modal::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.send-money-modal::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.send-money-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 640px) {
    .balance-info {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .contact-card {
        min-width: 160px;
    }

    .modal-actions {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
    }
}
</style>
