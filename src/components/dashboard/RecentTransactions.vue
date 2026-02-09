<template>
    <div class="recent-transactions dark-card">
        <!-- Header -->
        <div class="transactions-header">
            <h3 class="section-title">
                <i class="fa-solid fa-clock-rotate-left"></i>
                Transactions récentes
            </h3>
            <button class="view-all-btn" @click="viewAllTransactions">
                Voir tout
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

        <!-- Filters -->
        <div class="transactions-filters">
            <div class="filter-buttons">
                <button
                    v-for="filter in timeFilters"
                    :key="filter.value"
                    :class="['filter-btn', { active: activeTimeFilter === filter.value }]"
                    @click="setTimeFilter(filter.value)"
                >
                    {{ filter.label }}
                </button>
            </div>
            <div class="search-box">
                <i class="fa-solid fa-search"></i>
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Rechercher une transaction..."
                    class="search-input"
                    @input="searchTransactions"
                />
            </div>
        </div>

        <!-- Transactions List -->
        <div class="transactions-list">
            <div v-if="filteredTransactions.length === 0" class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <h4>Aucune transaction</h4>
                <p>Aucune transaction trouvée pour cette période</p>
            </div>

            <div v-else>
                <div
                    v-for="transaction in filteredTransactions"
                    :key="transaction.id"
                    :class="['transaction-item', { expanded: expandedTransaction === transaction.id }]"
                    @click="toggleTransactionDetails(transaction.id)"
                >
                    <!-- Transaction Summary -->
                    <div class="transaction-summary">
                        <div class="transaction-icon" :class="transaction.type">
                            <i :class="transaction.icon"></i>
                        </div>
                        <div class="transaction-info">
                            <h4 class="transaction-title">{{ transaction.description }}</h4>
                            <div class="transaction-meta">
                                <span class="transaction-date">{{ formatDate(transaction.created_at) }}</span>
                                <span class="transaction-reference">#{{ transaction.reference }}</span>
                                <span :class="['transaction-status', transaction.status]">
                                    {{ transaction.status }}
                                </span>
                            </div>
                        </div>
                        <div class="transaction-amount" :class="transaction.type">
                            {{ formatCurrency(transaction.amount) }}
                        </div>
                        <button class="expand-btn">
                            <i :class="expandedTransaction === transaction.id ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
                        </button>
                    </div>

                    <!-- Transaction Details (expandable) -->
                    <div v-if="expandedTransaction === transaction.id" class="transaction-details">
                        <div class="details-grid">
                            <div class="detail-item">
                                <span class="detail-label">ID Transaction</span>
                                <span class="detail-value">{{ transaction.id }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Date</span>
                                <span class="detail-value">{{ formatDateTime(transaction.created_at) }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Référence</span>
                                <span class="detail-value">{{ transaction.reference }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Type</span>
                                <span class="detail-value type-badge" :class="transaction.type">
                                    {{ transaction.type }}
                                </span>
                            </div>
                            <div class="detail-item" v-if="transaction.metadata">
                                <span class="detail-label">Détails</span>
                                <span class="detail-value">
                                    {{ getMetadataDetails(transaction.metadata) }}
                                </span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Statut</span>
                                <span :class="['detail-value status-badge', transaction.status]">
                                    <i :class="getStatusIcon(transaction.status)"></i>
                                    {{ transaction.status }}
                                </span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="transaction-actions">
                            <button class="action-btn" @click.stop="downloadReceipt(transaction)">
                                <i class="fa-solid fa-download"></i>
                                Télécharger reçu
                            </button>
                            <button class="action-btn" @click.stop="reportIssue(transaction)" v-if="transaction.status === 'failed'">
                                <i class="fa-solid fa-flag"></i>
                                Signaler un problème
                            </button>
                            <button class="action-btn" @click.stop="repeatTransaction(transaction)" v-if="transaction.type === 'transfer'">
                                <i class="fa-solid fa-redo"></i>
                                Répéter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics -->
        <div class="transactions-stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div class="stat-content">
                    <h4 class="stat-value">{{ formatCurrency(stats.totalCredits) }}</h4>
                    <p class="stat-label">Crédits ce mois</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-arrow-down"></i>
                </div>
                <div class="stat-content">
                    <h4 class="stat-value">{{ formatCurrency(stats.totalDebits) }}</h4>
                    <p class="stat-label">Débits ce mois</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-exchange-alt"></i>
                </div>
                <div class="stat-content">
                    <h4 class="stat-value">{{ stats.transactionCount }}</h4>
                    <p class="stat-label">Transactions</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <h4 class="stat-value">{{ stats.successRate }}%</h4>
                    <p class="stat-label">Taux de réussite</p>
                </div>
            </div>
        </div>

        <!-- Export Section -->
        <div class="export-section">
            <h4>Exporter les transactions</h4>
            <div class="export-options">
                <button class="export-btn" @click="exportToCSV">
                    <i class="fa-solid fa-file-csv"></i>
                    CSV
                </button>
                <button class="export-btn" @click="exportToPDF">
                    <i class="fa-solid fa-file-pdf"></i>
                    PDF
                </button>
                <button class="export-btn" @click="exportToExcel">
                    <i class="fa-solid fa-file-excel"></i>
                    Excel
                </button>
                <div class="date-range">
                    <input
                        type="date"
                        v-model="exportStartDate"
                        class="date-input"
                    />
                    <span>à</span>
                    <input
                        type="date"
                        v-model="exportEndDate"
                        class="date-input"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const props = defineProps({
    transactions: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['view-all', 'transaction-click']);

// State
const activeTimeFilter = ref('today');
const searchQuery = ref('');
const expandedTransaction = ref(null);
const exportStartDate = ref('');
const exportEndDate = ref('');

// Time filters
const timeFilters = [
    { value: 'today', label: 'Aujourd\'hui' },
    { value: 'yesterday', label: 'Hier' },
    { value: 'week', label: '7 jours' },
    { value: 'month', label: 'Ce mois' },
    { value: 'all', label: 'Tout' }
];

// Statistics
const stats = computed(() => {
    const filtered = filteredTransactions.value;
    const credits = filtered.filter(t => t.type === 'credit');
    const debits = filtered.filter(t => t.type === 'debit');
    const completed = filtered.filter(t => t.status === 'completed');

    return {
        totalCredits: credits.reduce((sum, t) => sum + Math.abs(t.amount), 0),
        totalDebits: debits.reduce((sum, t) => sum + Math.abs(t.amount), 0),
        transactionCount: filtered.length,
        successRate: filtered.length > 0
            ? Math.round((completed.length / filtered.length) * 100)
            : 0
    };
});

// Filtered transactions
const filteredTransactions = computed(() => {
    let filtered = [...props.transactions];

    // Apply time filter
    if (activeTimeFilter.value !== 'all') {
        const now = new Date();
        filtered = filtered.filter(transaction => {
            const date = new Date(transaction.created_at);

            switch (activeTimeFilter.value) {
                case 'today':
                    return date.toDateString() === now.toDateString();
                case 'yesterday':
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    return date.toDateString() === yesterday.toDateString();
                case 'week':
                    const weekAgo = new Date(now);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return date >= weekAgo;
                case 'month':
                    return date.getMonth() === now.getMonth() &&
                           date.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });
    }

    // Apply search
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(transaction =>
            transaction.description.toLowerCase().includes(query) ||
            transaction.reference.toLowerCase().includes(query) ||
            transaction.type.toLowerCase().includes(query)
        );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );
});

// Methods
const setTimeFilter = (filter) => {
    activeTimeFilter.value = filter;
};

const searchTransactions = () => {
    // Search is handled in computed property
};

const toggleTransactionDetails = (transactionId) => {
    expandedTransaction.value = expandedTransaction.value === transactionId
        ? null
        : transactionId;
};

const viewAllTransactions = () => {
    emit('view-all');
};

const downloadReceipt = (transaction) => {
    console.log('Download receipt for:', transaction);
    // Implement receipt download logic
};

const reportIssue = (transaction) => {
    console.log('Report issue for:', transaction);
    // Implement issue reporting logic
};

const repeatTransaction = (transaction) => {
    console.log('Repeat transaction:', transaction);
    emit('transaction-click', transaction);
};

const exportToCSV = () => {
    console.log('Export to CSV');
    // Implement CSV export
};

const exportToPDF = () => {
    console.log('Export to PDF');
    // Implement PDF export
};

const exportToExcel = () => {
    console.log('Export to Excel');
    // Implement Excel export
};

const getStatusIcon = (status) => {
    const icons = {
        completed: 'fa-solid fa-check-circle',
        pending: 'fa-solid fa-clock',
        failed: 'fa-solid fa-times-circle',
        cancelled: 'fa-solid fa-ban'
    };
    return icons[status] || 'fa-solid fa-circle';
};

const getMetadataDetails = (metadata) => {
    if (!metadata) return '-';

    if (typeof metadata === 'string') {
        try {
            metadata = JSON.parse(metadata);
        } catch {
            return metadata;
        }
    }

    if (metadata.sender) return `De: ${metadata.sender}`;
    if (metadata.receiver) return `À: ${metadata.receiver}`;
    if (metadata.card_last_four) return `Carte: ****${metadata.card_last_four}`;

    return JSON.stringify(metadata);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
    });
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    const sign = num >= 0 ? '+' : '';
    return `${sign}€${Math.abs(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')}`;
};
</script>

<style scoped>
.recent-transactions {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 30px;
}

.transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.section-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--light-color1);
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title i {
    color: var(--accent-color3);
    font-size: 1.2rem;
}

.view-all-btn {
    padding: 10px 20px;
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

.view-all-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    gap: 12px;
}

.transactions-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(15, 39, 39, 0.4);
    border-radius: 18px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}

.filter-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 8px 16px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.filter-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: rgba(106, 196, 166, 0.3);
}

.filter-btn.active {
    background: rgba(42, 140, 130, 0.2);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.search-box {
    position: relative;
    min-width: 250px;
}

.search-box i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light-color2);
    opacity: 0.7;
}

.search-input {
    width: 100%;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    padding: 12px 15px 12px 45px;
    color: var(--light-color1);
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.search-input::placeholder {
    color: var(--light-color2);
    opacity: 0.6;
}

.transactions-list {
    margin-bottom: 30px;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--light-color2);
}

.empty-icon {
    width: 80px;
    height: 80px;
    background: rgba(26, 65, 55, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: var(--accent-color3);
    font-size: 2.5rem;
}

.empty-state h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 10px;
}

.empty-state p {
    font-size: 0.95rem;
    opacity: 0.8;
}

.transaction-item {
    background: rgba(15, 39, 39, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 18px;
    margin-bottom: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.transaction-item:hover {
    background: rgba(26, 65, 55, 0.5);
    border-color: rgba(106, 196, 166, 0.2);
}

.transaction-item.expanded {
    background: rgba(26, 65, 55, 0.6);
    border-color: var(--accent-color2);
}

.transaction-summary {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 20px;
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
    flex-shrink: 0;
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

.transaction-icon.recharge {
    background: linear-gradient(135deg, #9C27B0 0%, #E91E63 100%);
}

.transaction-info {
    flex: 1;
}

.transaction-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 8px;
}

.transaction-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.transaction-date,
.transaction-reference {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.transaction-status {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.transaction-status.completed {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.transaction-status.pending {
    background: rgba(255, 152, 0, 0.1);
    color: #FF9800;
    border: 1px solid rgba(255, 152, 0, 0.2);
}

.transaction-status.failed {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.transaction-amount {
    font-size: 1.3rem;
    font-weight: 700;
    min-width: 130px;
    text-align: right;
}

.transaction-amount.credit {
    color: #4CAF50;
}

.transaction-amount.debit {
    color: #F44336;
}

.transaction-amount.transfer {
    color: #2196F3;
}

.expand-btn {
    width: 35px;
    height: 35px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.expand-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.transaction-details {
    padding: 0 20px 20px 90px;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
    padding: 20px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 14px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.detail-label {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.detail-value {
    font-size: 0.95rem;
    color: var(--light-color1);
    font-weight: 500;
}

.type-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
}

.type-badge.credit {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.type-badge.debit {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.type-badge.transfer {
    background: rgba(33, 150, 243, 0.1);
    color: #2196F3;
    border: 1px solid rgba(33, 150, 243, 0.2);
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
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

.transaction-actions {
    display: flex;
    gap: 15px;
    padding: 0 20px;
}

.action-btn {
    padding: 10px 18px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--accent-color3);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.action-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
}

.transactions-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 30px 0;
    padding: 25px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 15px;
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
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.stat-content .stat-label {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.export-section {
    padding: 25px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}

.export-section h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 20px;
}

.export-options {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.export-btn {
    padding: 12px 24px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--accent-color3);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.export-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    transform: translateY(-2px);
}

.date-range {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
}

.date-input {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 8px;
    padding: 10px 12px;
    color: var(--light-color1);
    font-size: 0.9rem;
}

.date-input:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.date-range span {
    color: var(--light-color2);
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 1200px) {
    .transactions-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
    .transactions-filters {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
    }

    .search-box {
        min-width: 100%;
    }

    .transaction-summary {
        flex-wrap: wrap;
    }

    .transaction-amount {
        text-align: left;
        min-width: auto;
    }
}

@media (max-width: 768px) {
    .transactions-stats {
        grid-template-columns: 1fr;
    }

    .transaction-details {
        padding-left: 20px;
    }

    .details-grid {
        grid-template-columns: 1fr;
    }

    .transaction-actions {
        flex-direction: column;
    }

    .export-options {
        flex-direction: column;
        align-items: stretch;
    }

    .date-range {
        margin-left: 0;
        justify-content: center;
    }
}
</style>
