<template>
    <div class="esims-tab">
        <!-- Header -->
        <div class="tab-header">
            <h1 class="tab-title">
                <i class="fa-solid fa-sim-card"></i>
                Mes eSIMs
            </h1>
            <button class="action-btn primary" @click="showBuyESimModal">
                <i class="fa-solid fa-plus"></i>
                Acheter eSIM
            </button>
        </div>

        <!-- Stats -->
        <div class="esims-stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-sim-card"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ esims.length }}</h3>
                    <p class="stat-label">eSIMs totales</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-signal"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ formatData(totalDataRemaining) }}</h3>
                    <p class="stat-label">Données disponibles</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-globe"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ uniqueCountries }}</h3>
                    <p class="stat-label">Pays</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fa-solid fa-clock"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ expiringSoonCount }}</h3>
                    <p class="stat-label">Expirent bientôt</p>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="esims-filters">
            <div class="filter-group">
                <button
                    v-for="filter in statusFilters"
                    :key="filter.value"
                    :class="['filter-btn', { active: activeFilter === filter.value }]"
                    @click="setFilter(filter.value)"
                >
                    {{ filter.label }}
                    <span class="filter-count">{{ getCountByStatus(filter.value) }}</span>
                </button>
            </div>
            <div class="filter-actions">
                <select v-model="sortBy" class="dark-select" @change="sortESims">
                    <option value="name">Nom</option>
                    <option value="expiry">Date d'expiration</option>
                    <option value="data">Données restantes</option>
                    <option value="country">Pays</option>
                </select>
                <button class="action-btn outline" @click="exportESims">
                    <i class="fa-solid fa-download"></i>
                    Exporter
                </button>
            </div>
        </div>

        <!-- eSIMs Grid -->
        <div class="esims-grid">
            <ESimCard
                v-for="esim in filteredESims"
                :key="esim.id"
                :esim="esim"
                @recharge="showRechargeModal(esim)"
                @view-details="viewESimDetails(esim)"
                @toggle-auto-renew="toggleAutoRenew(esim)"
            />
        </div>

        <!-- Empty State -->
        <div v-if="filteredESims.length === 0" class="empty-state">
            <div class="empty-icon">
                <i class="fa-solid fa-sim-card"></i>
            </div>
            <h3>Aucun eSIM trouvé</h3>
            <p>{{ emptyStateMessage }}</p>
            <button v-if="activeFilter === 'active'" class="action-btn primary" @click="showBuyESimModal">
                <i class="fa-solid fa-plus"></i>
                Acheter votre premier eSIM
            </button>
            <button v-else class="action-btn secondary" @click="setFilter('active')">
                Voir les eSIMs actifs
            </button>
        </div>

        <!-- Countries Overview -->
        <div class="countries-section" v-if="hasActiveESims">
            <h2 class="section-title">Couverture par pays</h2>
            <div class="countries-grid">
                <div v-for="country in countries" :key="country.name" class="country-card">
                    <div class="country-flag">
                        <i class="fa-solid fa-flag"></i>
                    </div>
                    <div class="country-info">
                        <h4>{{ country.name }}</h4>
                        <p>{{ country.count }} eSIM(s)</p>
                    </div>
                    <div class="country-data">
                        <div class="data-info">
                            <i class="fa-solid fa-signal"></i>
                            <span>{{ formatData(country.totalData) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
            <h2 class="section-title">Actions rapides</h2>
            <div class="actions-grid">
                <button class="action-card" @click="showRechargeAllModal">
                    <div class="action-icon">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div class="action-content">
                        <h4>Recharger tout</h4>
                        <p>Recharger tous les eSIMs actifs</p>
                    </div>
                </button>
                <button class="action-card" @click="showActivationModal">
                    <div class="action-icon">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                    <div class="action-content">
                        <h4>Activer eSIM</h4>
                        <p>Scanner un code QR d'activation</p>
                    </div>
                </button>
                <button class="action-card" @click="showSupport">
                    <div class="action-icon">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="action-content">
                        <h4>Support eSIM</h4>
                        <p>Problèmes d'activation ou connexion</p>
                    </div>
                </button>
                <button class="action-card" @click="showUsageStats">
                    <div class="action-icon">
                        <i class="fa-solid fa-chart-bar"></i>
                    </div>
                    <div class="action-content">
                        <h4>Statistiques</h4>
                        <p>Voir l'utilisation des données</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import ESimCard from '../ESimCard.vue';

const props = defineProps({
    esims: Array,
});

const emit = defineEmits([
    'show-buy-esim-modal',
    'show-recharge-modal',
    'show-recharge-all-modal',
    'show-activation-modal'
]);

const activeFilter = ref('active');
const sortBy = ref('expiry');

const statusFilters = [
    { value: 'all', label: 'Tous' },
    { value: 'active', label: 'Actifs' },
    { value: 'expired', label: 'Expirés' },
    { value: 'low-data', label: 'Données faibles' },
    { value: 'expiring-soon', label: 'Expirent bientôt' },
];

// Computed properties
const filteredESims = computed(() => {
    let filtered = [...props.esims];

    // Apply status filter
    if (activeFilter.value !== 'all') {
        filtered = filtered.filter(esim => {
            switch (activeFilter.value) {
                case 'active':
                    return esim.status === 'active';
                case 'expired':
                    return esim.status === 'expired';
                case 'low-data':
                    return esim.status === 'active' && esim.data_remaining < 1; // Less than 1GB
                case 'expiring-soon':
                    if (esim.status !== 'active') return false;
                    const daysUntilExpiry = new Date(esim.expiry_date).getDate() - new Date().getDate();
                    return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
                default:
                    return true;
            }
        });
    }

    // Apply sorting
    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'expiry':
                return new Date(a.expiry_date) - new Date(b.expiry_date);
            case 'data':
                return b.data_remaining - a.data_remaining;
            case 'country':
                return a.country.localeCompare(b.country);
            default:
                return 0;
        }
    });

    return filtered;
});

const totalDataRemaining = computed(() => {
    return props.esims
        .filter(esim => esim.status === 'active')
        .reduce((sum, esim) => sum + parseFloat(esim.data_remaining), 0);
});

const uniqueCountries = computed(() => {
    const countries = props.esims.map(esim => esim.country);
    return [...new Set(countries)].length;
});

const expiringSoonCount = computed(() => {
    return props.esims.filter(esim => {
        if (esim.status !== 'active') return false;
        const daysUntilExpiry = new Date(esim.expiry_date).getDate() - new Date().getDate();
        return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
    }).length;
});

const hasActiveESims = computed(() => {
    return props.esims.some(esim => esim.status === 'active');
});

const countries = computed(() => {
    const countryMap = {};

    props.esims.forEach(esim => {
        if (esim.status === 'active') {
            if (!countryMap[esim.country]) {
                countryMap[esim.country] = {
                    name: esim.country,
                    count: 0,
                    totalData: 0,
                };
            }
            countryMap[esim.country].count++;
            countryMap[esim.country].totalData += parseFloat(esim.data_remaining);
        }
    });

    return Object.values(countryMap);
});

const emptyStateMessage = computed(() => {
    switch (activeFilter.value) {
        case 'active':
            return 'Vous n\'avez aucun eSIM actif. Achetez votre premier eSIM pour commencer.';
        case 'expired':
            return 'Aucun eSIM expiré trouvé.';
        case 'low-data':
            return 'Aucun eSIM avec données faibles.';
        case 'expiring-soon':
            return 'Aucun eSIM n\'expire dans les 7 prochains jours.';
        default:
            return 'Aucun eSIM trouvé.';
    }
});

// Methods
const getCountByStatus = (status) => {
    switch (status) {
        case 'all':
            return props.esims.length;
        case 'active':
            return props.esims.filter(esim => esim.status === 'active').length;
        case 'expired':
            return props.esims.filter(esim => esim.status === 'expired').length;
        case 'low-data':
            return props.esims.filter(esim =>
                esim.status === 'active' && esim.data_remaining < 1
            ).length;
        case 'expiring-soon':
            return expiringSoonCount.value;
        default:
            return 0;
    }
};

const setFilter = (filter) => {
    activeFilter.value = filter;
};

const sortESims = () => {
    // Sorting is handled in computed property
};

const showBuyESimModal = () => {
    emit('show-buy-esim-modal');
};

const showRechargeModal = (esim) => {
    emit('show-recharge-modal', { esim });
};

const showRechargeAllModal = () => {
    emit('show-recharge-all-modal');
};

const showActivationModal = () => {
    emit('show-activation-modal');
};

const viewESimDetails = (esim) => {
    // Navigate to eSIM details
    console.log('View eSIM details:', esim);
};

const toggleAutoRenew = async (esim) => {
    // Toggle auto-renew status
    console.log('Toggle auto-renew for:', esim);
};

const exportESims = () => {
    // Export eSIMs data
    console.log('Export eSIMs');
};

const showSupport = () => {
    // Show support modal
    console.log('Show eSIM support');
};

const showUsageStats = () => {
    // Show usage statistics
    console.log('Show usage statistics');
};

const formatData = (gb) => {
    if (gb >= 1000) {
        return (gb / 1000).toFixed(1) + ' To';
    }
    return gb.toFixed(1) + ' Go';
};
</script>

<style scoped>
.esims-tab {
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

.esims-stats {
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

.esims-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}

.filter-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 20px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--light-color2);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
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

.filter-count {
    font-size: 0.8rem;
    background: rgba(106, 196, 166, 0.2);
    padding: 2px 8px;
    border-radius: 10px;
    color: var(--accent-color3);
}

.filter-actions {
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

.esims-grid {
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

.countries-section {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 30px;
    margin-bottom: 40px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 30px;
}

.countries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.country-card {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
}

.country-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-accent);
}

.country-flag {
    width: 50px;
    height: 50px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.5rem;
}

.country-info {
    flex: 1;
}

.country-info h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.country-info p {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.country-data {
    display: flex;
    align-items: center;
    gap: 10px;
}

.data-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--accent-color3);
    font-weight: 600;
}

.quick-actions {
    background: rgba(6, 20, 25, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 24px;
    padding: 30px;
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
    flex-direction: column;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
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
    width: 60px;
    height: 60px;
    background: rgba(26, 65, 55, 0.8);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.5rem;
}

.action-content h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: inherit;
}

.action-content p {
    font-size: 0.9rem;
    opacity: 0.8;
    color: inherit;
    line-height: 1.4;
}

/* Responsive */
@media (max-width: 1200px) {
    .esims-stats,
    .actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .countries-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
    .esims-grid {
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

    .esims-filters {
        flex-direction: column;
        align-items: stretch;
        gap: 20px;
    }

    .filter-group {
        justify-content: center;
    }

    .filter-actions {
        justify-content: center;
    }

    .esims-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .esims-stats,
    .actions-grid,
    .countries-grid {
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
