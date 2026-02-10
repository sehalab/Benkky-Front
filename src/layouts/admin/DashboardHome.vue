<template>
    <div class="dashboard-home">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <div class="welcome-content">
                <h1 class="welcome-title">
                    Tableau de bord d'administration
                </h1>
                <p class="welcome-subtitle">
                    Gérez l'ensemble de la plateforme Benkky depuis un seul endroit
                </p>
            </div>
            <div class="welcome-actions">
                <button class="action-btn premium" @click="refreshAllData">
                    <i class="fa-solid fa-rotate"></i>
                    Actualiser les données
                </button>
                <button class="action-btn secondary" @click="exportReport">
                    <i class="fa-solid fa-download"></i>
                    Exporter le rapport
                </button>
            </div>
        </div>

        <!-- Overview Stats -->
        <div class="overview-stats">
            <div class="stats-grid">
                <OverviewCard
                    title="Utilisateurs totaux"
                    :value="stats.totalUsers"
                    :change="stats.monthlyGrowth"
                    icon="fa-solid fa-users"
                    color="primary"
                    @click="navigateTo('/admin/users')"
                />
                <OverviewCard
                    title="Revenus totaux"
                    :value="formatCurrency(stats.totalRevenue)"
                    :change="12.5"
                    icon="fa-solid fa-money-bill-wave"
                    color="success"
                    @click="navigateTo('/admin/transactions')"
                />
                <OverviewCard
                    title="Transactions actives"
                    :value="stats.activeTransactions"
                    :change="-2"
                    icon="fa-solid fa-chart-line"
                    color="info"
                    @click="navigateTo('/admin/transactions')"
                />
                <OverviewCard
                    title="Taux de conversion"
                    :value="stats.conversionRate + '%'"
                    :change="8"
                    icon="fa-solid fa-percentage"
                    color="warning"
                    @click="navigateTo('/admin/analytics')"
                />
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="content-grid">
            <!-- Left Column -->
            <div class="grid-left">
                <!-- Recent Activity -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fa-solid fa-history"></i>
                            Activité récente
                        </h3>
                        <button class="card-action" @click="viewAllActivity">
                            Voir tout
                        </button>
                    </div>
                    <div class="card-body">
                        <ActivityTimeline :activities="recentActivities" />
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fa-solid fa-chart-simple"></i>
                            Statistiques rapides
                        </h3>
                        <span class="card-time">Aujourd'hui</span>
                    </div>
                    <div class="card-body">
                        <QuickStats :stats="quickStats" />
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="grid-right">
                <!-- System Status -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fa-solid fa-server"></i>
                            État du système
                        </h3>
                        <div class="status-indicator" :class="systemStatus.class">
                            {{ systemStatus.label }}
                        </div>
                    </div>
                    <div class="card-body">
                        <SystemMonitor :metrics="systemMetrics" />
                    </div>
                </div>

                <!-- Pending Actions -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fa-solid fa-clock"></i>
                            Actions en attente
                        </h3>
                        <span class="pending-count">{{ pendingActions.length }}</span>
                    </div>
                    <div class="card-body">
                        <PendingActions :actions="pendingActions" @action-complete="handleActionComplete" />
                    </div>
                </div>

                <!-- Latest Users -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fa-solid fa-user-plus"></i>
                            Derniers utilisateurs
                        </h3>
                        <button class="card-action" @click="navigateTo('/admin/users')">
                            Voir tous
                        </button>
                    </div>
                    <div class="card-body">
                        <RecentUsers :users="latestUsers" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fa-solid fa-chart-line"></i>
                    Analytics en temps réel
                </h2>
                <div class="time-range">
                    <button v-for="range in timeRanges" :key="range"
                            :class="{ active: selectedRange === range }"
                            @click="selectedRange = range">
                        {{ range }}
                    </button>
                </div>
            </div>
            <div class="charts-grid">
                <div class="chart-card">
                    <h4 class="chart-title">Inscriptions utilisateurs</h4>
                    <UserRegistrationsChart :range="selectedRange" />
                </div>
                <div class="chart-card">
                    <h4 class="chart-title">Volume des transactions</h4>
                    <TransactionVolumeChart :range="selectedRange" />
                </div>
                <div class="chart-card">
                    <h4 class="chart-title">Distribution géographique</h4>
                    <GeoDistributionChart :range="selectedRange" />
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="content-card full-width">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fa-solid fa-money-bill-transfer"></i>
                    Transactions récentes
                </h3>
                <button class="card-action" @click="navigateTo('/admin/transactions')">
                    Voir toutes les transactions
                </button>
            </div>
            <div class="card-body">
                <RecentTransactions :transactions="recentTransactions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import OverviewCard from './components/OverviewCard.vue';
import ActivityTimeline from './components/ActivityTimeline.vue';
import QuickStats from './components/QuickStats.vue';
import SystemMonitor from './components/SystemMonitor.vue';
import PendingActions from './components/PendingActions.vue';
import RecentUsers from './components/RecentUsers.vue';
import RecentTransactions from './components/RecentTransactions.vue';
import UserRegistrationsChart from './charts/UserRegistrationsChart.vue';
import TransactionVolumeChart from './charts/TransactionVolumeChart.vue';
import GeoDistributionChart from './charts/GeoDistributionChart.vue';

const props = defineProps({
    user: Object,
    stats: Object
});

const emit = defineEmits(['refresh-data']);

const router = useRouter();

// State
const selectedRange = ref('7d');

// Data
const stats = ref({
    totalUsers: 1542,
    monthlyGrowth: 12.5,
    totalRevenue: 125430.50,
    activeTransactions: 89,
    conversionRate: 24.8
});

const recentActivities = ref([
    { id: 1, type: 'user', action: 'Nouvelle inscription', user: 'John Doe', time: '2 min', icon: 'fa-solid fa-user-plus' },
    { id: 2, type: 'transaction', action: 'Transaction complétée', amount: 250.00, time: '5 min', icon: 'fa-solid fa-check' },
    { id: 3, type: 'system', action: 'Sauvegarde système', time: '1h', icon: 'fa-solid fa-database' },
    { id: 4, type: 'security', action: 'Tentative de connexion suspecte', user: 'admin@external.com', time: '2h', icon: 'fa-solid fa-shield' },
    { id: 5, type: 'update', action: 'Mise à jour système', version: '2.1.0', time: '3h', icon: 'fa-solid fa-upload' },
]);

const quickStats = ref({
    newUsersToday: 42,
    transactionsToday: 156,
    revenueToday: 5240.75,
    activeSessions: 87,
    kycPending: 23,
    cardsIssued: 15
});

const systemMetrics = ref({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 24,
    uptime: '15 jours'
});

const systemStatus = ref({
    label: 'Opérationnel',
    class: 'success'
});

const pendingActions = ref([
    { id: 1, type: 'kyc', title: 'Validation KYC', user: 'Alice Johnson', time: '2h', priority: 'high' },
    { id: 2, type: 'transaction', title: 'Transaction à vérifier', amount: 1250.00, time: '5h', priority: 'medium' },
    { id: 3, type: 'support', title: 'Ticket support', user: 'Bob Smith', time: '1j', priority: 'low' },
    { id: 4, type: 'card', title: 'Demande de carte', user: 'Carol Davis', time: '2j', priority: 'medium' },
]);

const latestUsers = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', joined: 'Il y a 2 min', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: 'Il y a 10 min', status: 'pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: 'Il y a 30 min', status: 'active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', joined: 'Il y a 1h', status: 'suspended' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', joined: 'Il y a 2h', status: 'active' },
]);

const recentTransactions = ref([
    { id: 1, user: 'John Doe', type: 'credit', amount: 500.00, status: 'completed', time: '2 min', method: 'Carte' },
    { id: 2, user: 'Jane Smith', type: 'debit', amount: -120.50, status: 'completed', time: '5 min', method: 'eSIM' },
    { id: 3, user: 'Bob Johnson', type: 'transfer', amount: -250.00, status: 'pending', time: '15 min', method: 'Transfert' },
    { id: 4, user: 'Alice Brown', type: 'credit', amount: 1000.00, status: 'completed', time: '1h', method: 'Dépôt' },
    { id: 5, user: 'Charlie Wilson', type: 'debit', amount: -75.25, status: 'failed', time: '2h', method: 'Carte' },
]);

const timeRanges = ['24h', '7d', '30d', '90d'];

// Methods
const refreshAllData = () => {
    emit('refresh-data');
};

const exportReport = () => {
    console.log('Exporting report...');
    // Export logic
};

const navigateTo = (path) => {
    router.push(path);
};

const viewAllActivity = () => {
    navigateTo('/admin/activity');
};

const handleActionComplete = (actionId) => {
    pendingActions.value = pendingActions.value.filter(a => a.id !== actionId);
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
};

onMounted(() => {
    // Fetch initial data
    console.log('Dashboard mounted');
});
</script>

<style scoped>
.dashboard-home {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.welcome-section {
    background: linear-gradient(135deg, var(--admin-bg-tertiary) 0%, var(--admin-bg-secondary) 100%);
    border: 1px solid var(--admin-border-color);
    border-radius: 24px;
    padding: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.welcome-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, rgba(42, 140, 130, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.welcome-content {
    flex: 1;
    position: relative;
    z-index: 2;
}

.welcome-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--admin-text-primary);
    margin-bottom: 15px;
    line-height: 1.3;
    background: linear-gradient(45deg, var(--admin-text-primary), var(--admin-text-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.welcome-subtitle {
    font-size: 1.1rem;
    color: var(--admin-text-secondary);
    max-width: 600px;
    line-height: 1.6;
}

.welcome-actions {
    display: flex;
    gap: 15px;
    position: relative;
    z-index: 2;
}

.action-btn {
    padding: 16px 28px;
    border-radius: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    border: none;
}

.action-btn.premium {
    background: linear-gradient(135deg, #2A8C82 0%, #4CAF93 100%);
    color: white;
    box-shadow: 0 4px 20px rgba(42, 140, 130, 0.3);
}

.action-btn.premium:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(42, 140, 130, 0.4);
    background: linear-gradient(135deg, #4CAF93 0%, #2A8C82 100%);
}

.action-btn.secondary {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid var(--admin-border-color);
    color: var(--admin-text-secondary);
}

.action-btn.secondary:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: #4CAF93;
    color: var(--admin-text-primary);
}

.overview-stats {
    margin-bottom: 30px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
}

.content-card {
    background: var(--admin-card-bg);
    border: 1px solid var(--admin-border-color);
    border-radius: 20px;
    padding: 25px;
    backdrop-filter: blur(10px);
}

.content-card.full-width {
    grid-column: 1 / -1;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.card-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--admin-text-primary);
    display: flex;
    align-items: center;
    gap: 12px;
}

.card-title i {
    color: #2A8C82;
    font-size: 1.1rem;
}

.card-action {
    padding: 8px 16px;
    background: rgba(42, 140, 130, 0.1);
    border: 1px solid rgba(42, 140, 130, 0.2);
    border-radius: 10px;
    color: #4CAF93;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card-action:hover {
    background: rgba(42, 140, 130, 0.2);
    border-color: #4CAF93;
    transform: translateX(5px);
}

.card-time {
    font-size: 0.85rem;
    color: var(--admin-text-secondary);
}

.status-indicator {
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-indicator.success {
    background: rgba(52, 168, 83, 0.1);
    color: #34a853;
}

.pending-count {
    background: #FF4757;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 10px;
}

.card-body {
    position: relative;
}

.charts-section {
    margin-bottom: 30px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--admin-text-primary);
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title i {
    color: #2A8C82;
    font-size: 1.3rem;
}

.time-range {
    display: flex;
    gap: 10px;
    background: var(--admin-card-bg);
    border: 1px solid var(--admin-border-color);
    border-radius: 12px;
    padding: 4px;
}

.time-range button {
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: var(--admin-text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.time-range button.active {
    background: rgba(42, 140, 130, 0.2);
    color: #4CAF93;
}

.time-range button:hover:not(.active) {
    color: var(--admin-text-primary);
}

.charts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.chart-card {
    background: var(--admin-card-bg);
    border: 1px solid var(--admin-border-color);
    border-radius: 16px;
    padding: 20px;
}

.chart-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--admin-text-primary);
    margin-bottom: 20px;
}

/* Responsive */
@media (max-width: 1400px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .charts-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 1200px) {
    .content-grid {
        grid-template-columns: 1fr;
    }

    .charts-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 992px) {
    .welcome-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 25px;
    }

    .welcome-actions {
        width: 100%;
        justify-content: flex-start;
    }
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .welcome-title {
        font-size: 1.8rem;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .time-range {
        align-self: flex-start;
    }
}

@media (max-width: 576px) {
    .welcome-section {
        padding: 30px 25px;
    }

    .content-card {
        padding: 20px;
    }

    .action-btn {
        padding: 14px 20px;
        font-size: 0.9rem;
    }
}
</style>
