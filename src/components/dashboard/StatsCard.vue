<template>
    <div class="stats-card dark-card" :class="[color, { 'has-trend': showTrend }]">
        <!-- Card Glow -->
        <div class="stats-glow"></div>

        <!-- Header -->
        <div class="stats-header">
            <div class="stats-icon">
                <i :class="icon"></i>
            </div>
            <div class="stats-title">
                <h3>{{ title }}</h3>
                <span class="stats-subtitle">{{ subtitle }}</span>
            </div>
            <button class="stats-menu" @click="toggleMenu" v-if="hasMenu">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>

        <!-- Value -->
        <div class="stats-value">
            <div class="value-container">
                <span class="value-prefix" v-if="prefix">{{ prefix }}</span>
                <span class="value-number">{{ formattedValue }}</span>
                <span class="value-suffix" v-if="suffix">{{ suffix }}</span>
            </div>

            <!-- Trend Indicator -->
            <div v-if="showTrend" class="stats-trend" :class="trendClass">
                <i :class="trendIcon"></i>
                <span>{{ trendValue }}</span>
            </div>
        </div>

        <!-- Progress Bar (optional) -->
        <div v-if="showProgress" class="stats-progress">
            <div class="progress-bar">
                <div
                    class="progress-fill"
                    :style="{ width: progressPercentage + '%' }"
                ></div>
            </div>
            <div class="progress-labels">
                <span class="progress-current">{{ progressCurrent }}</span>
                <span class="progress-target">{{ progressTarget }}</span>
            </div>
        </div>

        <!-- Comparison (optional) -->
        <div v-if="showComparison" class="stats-comparison">
            <div class="comparison-item">
                <span class="comparison-label">vs période précédente</span>
                <span class="comparison-value" :class="comparisonClass">
                    {{ comparisonValue }}
                </span>
            </div>
        </div>

        <!-- Chart (optional) -->
        <div v-if="showChart" class="stats-chart">
            <div class="chart-placeholder">
                <i class="fa-solid fa-chart-line"></i>
                <span>Graphique des données</span>
            </div>
        </div>

        <!-- Menu Dropdown -->
        <div v-if="showMenu && hasMenu" class="stats-menu-dropdown dark-dropdown">
            <button class="menu-item" @click="exportData">
                <i class="fa-solid fa-download"></i>
                Exporter
            </button>
            <button class="menu-item" @click="viewDetails">
                <i class="fa-solid fa-eye"></i>
                Détails
            </button>
            <button class="menu-item" @click="refreshData">
                <i class="fa-solid fa-rotate"></i>
                Actualiser
            </button>
        </div>

        <!-- Footer -->
        <div class="stats-footer">
            <div class="footer-left">
                <span class="update-time">
                    <i class="fa-solid fa-clock"></i>
                    Mise à jour: {{ updateTime }}
                </span>
            </div>
            <div class="footer-right">
                <button class="action-btn" @click="$emit('action-click')" v-if="actionText">
                    {{ actionText }}
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="stats-loading">
            <div class="loading-spinner">
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>
            <span>Chargement...</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    icon: {
        type: String,
        default: 'fa-solid fa-chart-line'
    },
    color: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'success', 'warning', 'danger', 'info', 'purple'].includes(value)
    },
    prefix: {
        type: String,
        default: ''
    },
    suffix: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    trend: {
        type: Number,
        default: 0
    },
    showProgress: {
        type: Boolean,
        default: false
    },
    progressCurrent: {
        type: Number,
        default: 0
    },
    progressTarget: {
        type: Number,
        default: 100
    },
    showComparison: {
        type: Boolean,
        default: false
    },
    comparisonValue: {
        type: String,
        default: '+0%'
    },
    showChart: {
        type: Boolean,
        default: false
    },
    hasMenu: {
        type: Boolean,
        default: true
    },
    actionText: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    format: {
        type: String,
        default: 'number', // 'number', 'currency', 'percentage', 'custom'
        validator: (value) => ['number', 'currency', 'percentage', 'custom'].includes(value)
    },
    decimals: {
        type: Number,
        default: 2
    }
});

const emit = defineEmits(['action-click', 'export', 'refresh', 'view-details']);

// State
const showMenu = ref(false);
const updateTime = ref('à l\'instant');

// Computed properties
const formattedValue = computed(() => {
    const value = parseFloat(props.value);

    switch (props.format) {
        case 'currency':
            return formatCurrency(value);
        case 'percentage':
            return `${value.toFixed(props.decimals)}%`;
        case 'custom':
            return props.value;
        default:
            return formatNumber(value);
    }
});

const showTrend = computed(() => {
    return props.trend !== 0;
});

const trendValue = computed(() => {
    const trend = props.trend;
    const sign = trend > 0 ? '+' : '';
    return `${sign}${Math.abs(trend).toFixed(1)}%`;
});

const trendClass = computed(() => {
    return props.trend >= 0 ? 'positive' : 'negative';
});

const trendIcon = computed(() => {
    return props.trend >= 0 ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down';
});

const progressPercentage = computed(() => {
    if (props.progressTarget === 0) return 0;
    return Math.min((props.progressCurrent / props.progressTarget) * 100, 100);
});

const comparisonClass = computed(() => {
    const value = props.comparisonValue;
    if (value.startsWith('+')) return 'positive';
    if (value.startsWith('-')) return 'negative';
    return 'neutral';
});

// Color mapping
const colorMap = {
    primary: {
        background: 'linear-gradient(135deg, var(--accent-color1) 0%, var(--accent-color3) 100%)',
        light: 'rgba(42, 140, 130, 0.1)',
        border: 'rgba(106, 196, 166, 0.3)'
    },
    success: {
        background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
        light: 'rgba(76, 175, 80, 0.1)',
        border: 'rgba(76, 175, 80, 0.3)'
    },
    warning: {
        background: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)',
        light: 'rgba(255, 152, 0, 0.1)',
        border: 'rgba(255, 152, 0, 0.3)'
    },
    danger: {
        background: 'linear-gradient(135deg, #F44336 0%, #FF5722 100%)',
        light: 'rgba(244, 67, 54, 0.1)',
        border: 'rgba(244, 67, 54, 0.3)'
    },
    info: {
        background: 'linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)',
        light: 'rgba(33, 150, 243, 0.1)',
        border: 'rgba(33, 150, 243, 0.3)'
    },
    purple: {
        background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
        light: 'rgba(156, 39, 176, 0.1)',
        border: 'rgba(156, 39, 176, 0.3)'
    }
};

const currentColor = computed(() => {
    return colorMap[props.color] || colorMap.primary;
});

// Methods
const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const exportData = () => {
    emit('export', {
        title: props.title,
        value: props.value,
        type: props.format
    });
    showMenu.value = false;
};

const viewDetails = () => {
    emit('view-details');
    showMenu.value = false;
};

const refreshData = () => {
    emit('refresh');
    updateTime.value = 'maintenant';
    showMenu.value = false;

    // Reset update time after 5 seconds
    setTimeout(() => {
        updateTime.value = 'à l\'instant';
    }, 5000);
};

const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    return `€${Math.abs(num).toFixed(props.decimals).replace(/\d(?=(\d{3})+\.)/g, '$& ')}`;
};

const formatNumber = (number) => {
    const num = parseFloat(number);

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }

    return num.toFixed(props.decimals);
};

// Close menu when clicking outside
onMounted(() => {
    document.addEventListener('click', () => {
        showMenu.value = false;
    });

    // Update time periodically
    setInterval(() => {
        const now = new Date();
        const minutes = now.getMinutes();
        updateTime.value = `${minutes.toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }, 30000);
});
</script>

<style scoped>
.stats-card {
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8) 0%, rgba(26, 65, 55, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 25px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    min-height: 200px;
    display: flex;
    flex-direction: column;
}

.stats-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-accent);
}

.stats-card.primary {
    border-color: var(--accent-color2);
}

.stats-card.success {
    border-color: #4CAF50;
}

.stats-card.warning {
    border-color: #FF9800;
}

.stats-card.danger {
    border-color: #F44336;
}

.stats-card.info {
    border-color: #2196F3;
}

.stats-card.purple {
    border-color: #9C27B0;
}

.stats-glow {
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, currentColor 0%, transparent 50%);
    opacity: 0.05;
    pointer-events: none;
    z-index: 1;
}

.stats-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 25px;
    position: relative;
    z-index: 2;
}

.stats-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: white;
    background: v-bind('currentColor.background');
    flex-shrink: 0;
}

.stats-title {
    flex: 1;
    margin-left: 20px;
}

.stats-title h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
    line-height: 1.3;
}

.stats-subtitle {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.stats-menu {
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

.stats-menu:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.stats-value {
    margin-bottom: 25px;
    position: relative;
    z-index: 2;
}

.value-container {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 10px;
}

.value-prefix {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light-color1);
    opacity: 0.8;
}

.value-number {
    font-size: 2.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--light-color1) 0%, var(--accent-color3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.value-suffix {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light-color1);
    opacity: 0.8;
}

.stats-trend {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.stats-trend.positive {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.stats-trend.negative {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.stats-progress {
    margin-bottom: 20px;
    position: relative;
    z-index: 2;
}

.progress-bar {
    height: 8px;
    background: rgba(15, 39, 39, 0.6);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-fill {
    height: 100%;
    background: v-bind('currentColor.background');
    border-radius: 4px;
    transition: width 1s ease;
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
}

.progress-current {
    color: var(--light-color1);
    font-weight: 600;
}

.progress-target {
    color: var(--light-color2);
    opacity: 0.8;
}

.stats-comparison {
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(15, 39, 39, 0.4);
    border-radius: 14px;
    border: 1px solid rgba(106, 196, 166, 0.1);
    position: relative;
    z-index: 2;
}

.comparison-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comparison-label {
    font-size: 0.9rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.comparison-value {
    font-size: 1rem;
    font-weight: 700;
}

.comparison-value.positive {
    color: #4CAF50;
}

.comparison-value.negative {
    color: #F44336;
}

.comparison-value.neutral {
    color: var(--light-color2);
}

.stats-chart {
    margin-bottom: 20px;
    padding: 20px;
    background: rgba(6, 20, 25, 0.4);
    border-radius: 16px;
    border: 1px solid rgba(106, 196, 166, 0.1);
    position: relative;
    z-index: 2;
}

.chart-placeholder {
    text-align: center;
    color: var(--light-color2);
    opacity: 0.6;
}

.chart-placeholder i {
    font-size: 2rem;
    margin-bottom: 10px;
    display: block;
}

.chart-placeholder span {
    font-size: 0.9rem;
}

.stats-menu-dropdown {
    position: absolute;
    top: 70px;
    right: 25px;
    width: 180px;
    background: rgba(6, 20, 25, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 16px;
    padding: 10px 0;
    box-shadow: var(--shadow-dark);
    z-index: 100;
    animation: slideDown 0.2s ease;
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

.menu-item {
    width: 100%;
    padding: 12px 20px;
    background: none;
    border: none;
    color: var(--light-color2);
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.menu-item:hover {
    background: rgba(26, 65, 55, 0.6);
    color: var(--light-color1);
}

.menu-item i {
    width: 20px;
    color: var(--accent-color3);
    font-size: 0.9rem;
}

.stats-footer {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
}

.footer-left {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.update-time {
    display: flex;
    align-items: center;
    gap: 8px;
}

.update-time i {
    font-size: 0.8rem;
}

.action-btn {
    padding: 8px 16px;
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
    font-size: 0.9rem;
}

.action-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    gap: 12px;
}

.stats-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 20, 25, 0.9);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 24px;
}

.loading-spinner {
    margin-bottom: 15px;
}

.loading-spinner i {
    font-size: 2rem;
    color: var(--accent-color3);
}

.stats-loading span {
    color: var(--light-color2);
    font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
    .value-number {
        font-size: 2.2rem;
    }

    .stats-header {
        flex-wrap: wrap;
        gap: 15px;
    }

    .stats-title {
        margin-left: 0;
        order: 3;
        width: 100%;
    }

    .stats-footer {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
    }

    .action-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
