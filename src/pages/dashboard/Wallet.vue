<template>
    <div class="wallet-tab">
        <!-- Header -->
        <div class="tab-header">
            <h1 class="tab-title">
                <i class="fa-solid fa-wallet"></i>
                Mon Portefeuille
            </h1>
            <div class="header-actions">
                <button class="action-btn primary" @click="showRechargeModal">
                    <i class="fa-solid fa-plus"></i>
                    Recharger
                </button>
                <button class="action-btn secondary" @click="showSendModal">
                    <i class="fa-solid fa-paper-plane"></i>
                    Envoyer
                </button>
                <button class="action-btn outline" @click="showWithdrawModal">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    Retirer
                </button>
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="stats-overview">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-money-bill-wave"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">${{ formatCurrency(balance) }}</h3>
                    <p class="stat-label">Solde disponible</p>
                </div>
                <div class="stat-trend positive">
                    <i class="fa-solid fa-arrow-up"></i>
                    <span>+5.2% ce mois</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">${{ formatCurrency(monthlyStats.income) }}</h3>
                    <p class="stat-label">Revenus ce mois</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-arrow-down"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">${{ formatCurrency(monthlyStats.spending) }}</h3>
                    <p class="stat-label">Dépenses ce mois</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-exchange-alt"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ transactions.total }}</h3>
                    <p class="stat-label">Transactions</p>
                </div>
            </div>
        </div>

        <!-- Quick Transfer -->
        <div class="quick-transfer-section">
            <h2 class="section-title">Transfert rapide</h2>
            <div class="transfer-form">
                <div class="form-group">
                    <input
                        type="email"
                        v-model="transfer.email"
                        placeholder="Email du destinataire"
                        class="dark-input"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="number"
                        v-model="transfer.amount"
                        placeholder="Montant"
                        class="dark-input"
                        min="1"
                        max="5000"
                    />
                </div>
                <button class="transfer-btn" @click="quickTransfer" :disabled="!canTransfer">
                    <i class="fa-solid fa-paper-plane"></i>
                    Envoyer
                </button>
            </div>
        </div>

        <!-- Transactions History -->
        <div class="transactions-section">
            <div class="section-header">
                <h2 class="section-title">Historique des transactions</h2>
                <div class="filter-options">
                    <select v-model="filters.type" class="dark-select">
                        <option value="">Tous les types</option>
                        <option value="credit">Crédits</option>
                        <option value="debit">Débits</option>
                        <option value="transfer">Transferts</option>
                    </select>
                    <select v-model="filters.status" class="dark-select">
                        <option value="">Tous les statuts</option>
                        <option value="completed">Complété</option>
                        <option value="pending">En attente</option>
                        <option value="failed">Échoué</option>
                    </select>
                    <button class="filter-btn" @click="applyFilters">
                        <i class="fa-solid fa-filter"></i>
                        Filtrer
                    </button>
                </div>
            </div>

            <div class="transactions-list">
                <div v-if="transactions.data.length === 0" class="empty-state">
                    <i class="fa-solid fa-receipt"></i>
                    <p>Aucune transaction pour le moment</p>
                </div>

                <div v-for="transaction in transactions.data" :key="transaction.id" class="transaction-item">
                    <div class="transaction-icon" :class="transaction.type">
                        <i :class="transaction.icon"></i>
                    </div>
                    <div class="transaction-details">
                        <h4 class="transaction-description">{{ transaction.description }}</h4>
                        <span class="transaction-date">{{ formatDate(transaction.created_at) }}</span>
                        <span class="transaction-reference">Ref: {{ transaction.reference }}</span>
                    </div>
                    <div class="transaction-amount" :class="transaction.type">
                        {{ transaction.formatted_amount }}
                    </div>
                    <div class="transaction-status">
                        <span :class="['status-badge', transaction.status]">
                            {{ transaction.status }}
                        </span>
                    </div>
                    <button class="transaction-action" @click="viewTransaction(transaction)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="transactions.total > transactions.per_page" class="pagination">
                <button
                    :disabled="!transactions.prev_page_url"
                    @click="prevPage"
                    class="page-btn"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <span class="page-info">
                    Page {{ transactions.current_page }} sur {{ transactions.last_page }}
                </span>

                <button
                    :disabled="!transactions.next_page_url"
                    @click="nextPage"
                    class="page-btn"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    balance: Number,
    monthlyStats: Object,
    transactions: Object,
    filters: Object,
});

const emit = defineEmits(['show-recharge-modal', 'show-send-modal', 'show-withdraw-modal']);

const transfer = reactive({
    email: '',
    amount: '',
    description: '',
});

const filters = reactive({
    type: props.filters?.type || '',
    status: props.filters?.status || '',
    date_from: '',
    date_to: '',
});

const canTransfer = computed(() => {
    return transfer.email && transfer.amount > 0;
});

const showRechargeModal = () => {
    emit('show-recharge-modal');
};

const showSendModal = () => {
    emit('show-send-modal');
};

const showWithdrawModal = () => {
    emit('show-withdraw-modal');
};

const quickTransfer = () => {
    if (!canTransfer.value) return;

    router.post(route('wallet.send'), {
        receiver_email: transfer.email,
        amount: transfer.amount,
        description: transfer.description,
    }, {
        preserveScroll: true,
        onSuccess: () => {
            transfer.email = '';
            transfer.amount = '';
            transfer.description = '';
        },
    });
};

const applyFilters = () => {
    router.get(route('wallet'), filters, {
        preserveState: true,
        preserveScroll: true,
    });
};

const prevPage = () => {
    if (props.transactions.prev_page_url) {
        router.get(props.transactions.prev_page_url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }
};

const nextPage = () => {
    if (props.transactions.next_page_url) {
        router.get(props.transactions.next_page_url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }
};

const viewTransaction = (transaction) => {
    // Show transaction details
    console.log('View transaction:', transaction);
};

const formatCurrency = (amount) => {
    return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') || '0.00';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
</script>

<style scoped>
.wallet-tab {
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

.action-btn {
    padding: 14px 24px;
    border-radius: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
}

.action-btn.primary {
    background: var(--gradient-green);
    border: none;
    color: white;
}

.action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.action-btn.secondary {
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    color: var(--accent-color3);
}

.action-btn.secondary:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
}

.action-btn.outline {
    background: transparent;
    border: 1px solid rgba(106, 196, 166, 0.3);
    color: var(--light-color2);
}

.action-btn.outline:hover {
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.stats-overview {
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
    flex-direction: column;
    gap: 15px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-accent);
}

.stat-icon {
    width: 50px;
    height: 50px;
    background: rgba(26, 65, 55, 0.6);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.3rem;
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

.stat-trend {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 12px;
}

.stat-trend.positive {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.quick-transfer-section {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 30px;
    margin-bottom: 40px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 25px;
}

.transfer-form {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 15px;
    align-items: end;
}

.transfer-btn {
    padding: 16px 28px;
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

.transfer-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.transfer-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.transactions-section {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 30px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 20px;
}

.filter-options {
    display: flex;
    gap: 15px;
    align-items: center;
}

.dark-select {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--light-color1);
    font-size: 0.9rem;
    min-width: 150px;
    cursor: pointer;
}

.dark-select:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.filter-btn {
    padding: 12px 20px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--accent-color3);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
}

.transactions-list {
    margin-bottom: 30px;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--light-color2);
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 20px;
    opacity: 0.5;
}

.empty-state p {
    font-size: 1.1rem;
}

.transaction-item {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    gap: 20px;
    align-items: center;
    padding: 20px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 16px;
    margin-bottom: 15px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.transaction-item:hover {
    background: rgba(26, 65, 55, 0.4);
    border-color: rgba(106, 196, 166, 0.2);
    transform: translateX(5px);
}

.transaction-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
}

.transaction-icon.credit {
    background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
}

.transaction-icon.debit {
    background: linear-gradient(135deg, #F44336 0%, #FF9800 100%);
}

.transaction-icon.transfer {
    background: linear-gradient(135deg, #2196F3 0%, #03A9F4 100%);
}

.transaction-details {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.transaction-description {
    font-weight: 600;
    color: var(--light-color1);
    font-size: 1rem;
}

.transaction-date {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.transaction-reference {
    font-size: 0.75rem;
    color: var(--light-color2);
    opacity: 0.6;
    font-family: monospace;
}

.transaction-amount {
    font-size: 1.3rem;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 12px;
    min-width: 120px;
    text-align: center;
}

.transaction-amount.credit {
    color: #4CAF50;
    background: rgba(76, 175, 80, 0.1);
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.transaction-amount.debit {
    color: #F44336;
    background: rgba(244, 67, 54, 0.1);
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.transaction-amount.transfer {
    color: #2196F3;
    background: rgba(33, 150, 243, 0.1);
    border: 1px solid rgba(33, 150, 243, 0.2);
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-badge.completed {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.status-badge.pending {
    background: rgba(255, 152, 0, 0.1);
    color: #FF9800;
    border: 1px solid rgba(255, 152, 0, 0.2);
}

.status-badge.failed {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.transaction-action {
    width: 40px;
    height: 40px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.transaction-action:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
    transform: translateX(3px);
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

.page-btn {
    width: 40px;
    height: 40px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover:not(:disabled) {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.page-info {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

/* Responsive */
@media (max-width: 1200px) {
    .stats-overview {
        grid-template-columns: repeat(2, 1fr);
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
        flex-wrap: wrap;
    }

    .action-btn {
        flex: 1;
        min-width: 150px;
        justify-content: center;
    }

    .transfer-form {
        grid-template-columns: 1fr;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .filter-options {
        width: 100%;
        flex-wrap: wrap;
    }

    .transaction-item {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .transaction-amount {
        justify-self: start;
    }
}

@media (max-width: 576px) {
    .stats-overview {
        grid-template-columns: 1fr;
    }

    .tab-title {
        font-size: 1.6rem;
    }
}
</style>
