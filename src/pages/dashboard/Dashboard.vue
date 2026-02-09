<template>
    <div class="dashboard-home">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <div class="welcome-content">
                <h1 class="welcome-title">
                    Bienvenue sur votre tableau de bord, <span class="user-name">{{ user.name }}</span>
                </h1>
                <p class="welcome-subtitle">
                    Gérez votre compte Benkky, vos cartes, eSIMs et transactions en un seul endroit.
                </p>
            </div>
            <div class="welcome-actions">
                <button class="action-btn premium" @click="$emit('show-pin-modal')">
                    <i class="fa-solid fa-bolt"></i>
                    Accès rapide
                </button>
                <button class="action-btn secondary">
                    <i class="fa-solid fa-question-circle"></i>
                    Aide
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <StatsCard
                title="Solde Total"
                :value="totalBalance"
                icon="fa-solid fa-wallet"
                :change="12.5"
                color="primary"
            />
            <StatsCard
                title="Cartes Actives"
                :value="activeCards"
                icon="fa-solid fa-credit-card"
                :change="3"
                color="success"
            />
            <StatsCard
                title="eSIMs Actives"
                :value="activeESims"
                icon="fa-solid fa-sim-card"
                :change="8"
                color="info"
            />
            <StatsCard
                title="Transactions ce mois"
                :value="monthlyTransactions"
                icon="fa-solid fa-chart-line"
                :change="-2"
                color="warning"
            />
        </div>

        <!-- Wallet & Cards Section -->
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fa-solid fa-wallet"></i>
                    Portefeuille & Cartes
                </h2>
                <button class="section-action" @click="$emit('show-buy-credit')">
                    <i class="fa-solid fa-plus"></i>
                    Nouvelle carte
                </button>
            </div>
            <div class="content-grid">
                <div class="grid-col">
                    <WalletCard
                        :balance="walletBalance"
                        :change-percentage="5.2"
                        :monthly-spending="1250.50"
                        :monthly-income="3200.00"
                        @recharge="$emit('recharge')"
                        @send-money="$emit('send-money')"
                    />
                </div>
                <div class="grid-col">
                    <div class="cards-grid">
                        <CreditCard
                            v-for="card in userCards"
                            :key="card.id"
                            :card-number="card.number"
                            :card-holder="card.holder"
                            :expiry-date="card.expiry"
                            :balance="card.balance"
                            :status="card.status"
                            @request-pin="$emit('show-pin-modal')"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- eSIMs Section -->
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fa-solid fa-sim-card"></i>
                    Mes eSIMs
                </h2>
                <button class="section-action" @click="buyESim">
                    <i class="fa-solid fa-plus"></i>
                    Acheter eSIM
                </button>
            </div>
            <div class="esims-grid">
                <ESimCard
                    v-for="esim in userESims"
                    :key="esim.id"
                    :esim="esim"
                    @recharge="$emit('recharge')"
                    @view-details="viewESimDetails"
                />
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fa-solid fa-history"></i>
                    Transactions récentes
                </h2>
                <button class="section-action" @click="viewAllTransactions">
                    <i class="fa-solid fa-arrow-right"></i>
                    Voir tout
                </button>
            </div>
            <RecentTransactions :transactions="recentTransactions" />
        </div>
    </div>
</template>

<script setup>
import StatsCard from '../../components/dashboard/StatsCard.vue';
import WalletCard from '../../components/dashboard/WalletCard.vue';
import CreditCard from '../../components/dashboard/CreditCardItem.vue';
import ESimCard from '../../components/dashboard/ESimCard.vue';
import RecentTransactions from '../../components/dashboard/RecentTransactions.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    user: Object
});

const emit = defineEmits(['show-pin-modal', 'show-buy-credit', 'recharge', 'send-money']);

// Sample data - In real app, fetch from API
const walletBalance = ref(4250.75);
const totalBalance = computed(() => walletBalance.value + userCards.value.reduce((sum, card) => sum + card.balance, 0));
const activeCards = ref(3);
const activeESims = ref(2);
const monthlyTransactions = ref(24);

const userCards = ref([
    {
        id: 1,
        number: '**** **** **** 1234',
        holder: props.user.name.toUpperCase(),
        expiry: '12/25',
        balance: 1500.00,
        status: 'active'
    },
    {
        id: 2,
        number: '**** **** **** 5678',
        holder: props.user.name.toUpperCase(),
        expiry: '09/24',
        balance: 800.50,
        status: 'active'
    },
    {
        id: 3,
        number: '**** **** **** 9012',
        holder: props.user.name.toUpperCase(),
        expiry: '03/26',
        balance: 3200.25,
        status: 'active'
    }
]);

const userESims = ref([
    {
        id: 1,
        name: 'eSIM Europe',
        phoneNumber: '+33 6 12 34 56 78',
        dataRemaining: '3.2 Go',
        totalData: '10 Go',
        expiryDate: '2024-12-31',
        status: 'active',
        country: 'France',
        plan: 'Premium'
    },
    {
        id: 2,
        name: 'eSIM USA',
        phoneNumber: '+1 555 123 4567',
        dataRemaining: '1.5 Go',
        totalData: '5 Go',
        expiryDate: '2024-11-30',
        status: 'active',
        country: 'USA',
        plan: 'Standard'
    }
]);

const recentTransactions = ref([
    {
        id: 1,
        type: 'credit',
        amount: 500.00,
        description: 'Recharge carte',
        date: '2024-01-15 14:30',
        status: 'completed',
        icon: 'fa-solid fa-plus'
    },
    {
        id: 2,
        type: 'debit',
        amount: -120.50,
        description: 'Achat eSIM Europe',
        date: '2024-01-14 09:15',
        status: 'completed',
        icon: 'fa-solid fa-sim-card'
    },
    {
        id: 3,
        type: 'transfer',
        amount: -250.00,
        description: 'Transfert à John Doe',
        date: '2024-01-13 16:45',
        status: 'pending',
        icon: 'fa-solid fa-paper-plane'
    },
    {
        id: 4,
        type: 'credit',
        amount: 1000.00,
        description: 'Dépôt bancaire',
        date: '2024-01-12 11:20',
        status: 'completed',
        icon: 'fa-solid fa-building-columns'
    }
]);

const buyESim = () => {
    // Navigate to eSIM purchase page
    console.log('Buy eSIM');
};

const viewESimDetails = (esim) => {
    // View eSIM details
    console.log('View eSIM details:', esim);
};

const viewAllTransactions = () => {
    // Navigate to transactions page
    console.log('View all transactions');
};
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
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
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
    color: var(--light-color1);
    margin-bottom: 15px;
    line-height: 1.3;
}

.welcome-title .user-name {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.welcome-subtitle {
    font-size: 1.1rem;
    color: var(--light-color2);
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
}

.action-btn.premium {
    background: var(--gradient-green);
    border: none;
    color: white;
}

.action-btn.premium:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow);
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

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.content-section {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 30px;
    margin-bottom: 30px;
    position: relative;
}

.content-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 65, 55, 0.1) 0%, transparent 100%);
    border-radius: 24px;
    pointer-events: none;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light-color1);
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title i {
    color: var(--accent-color3);
    font-size: 1.3rem;
}

.section-action {
    padding: 12px 24px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    color: var(--accent-color3);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-action:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    transform: translateX(5px);
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 30px;
}

.cards-grid {
    display: grid;
    gap: 20px;
}

.esims-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

/* Responsive Design */
@media (max-width: 1400px) {
    .content-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 1200px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
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

    .esims-grid {
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

    .section-action {
        align-self: flex-start;
    }
}

@media (max-width: 576px) {
    .welcome-section {
        padding: 30px 25px;
    }

    .content-section {
        padding: 25px 20px;
    }

    .action-btn {
        padding: 14px 20px;
        font-size: 0.9rem;
    }

    .section-action {
        padding: 10px 18px;
        font-size: 0.9rem;
    }
}
</style>
