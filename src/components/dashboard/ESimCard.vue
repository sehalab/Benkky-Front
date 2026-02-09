<template>
    <div class="esim-card dark-card" :class="{ 'low-data': isLowData, 'expiring-soon': isExpiringSoon }">
        <!-- Card Header -->
        <div class="esim-header">
            <div class="header-left">
                <div class="esim-icon">
                    <i class="fa-solid fa-sim-card"></i>
                </div>
                <div class="esim-title">
                    <h3>{{ esim.name }}</h3>
                    <span class="esim-country">
                        <i class="fa-solid fa-globe"></i>
                        {{ esim.country }}
                    </span>
                </div>
            </div>
            <div class="header-right">
                <span :class="['status-badge', esim.status]">
                    {{ esim.status }}
                </span>
                <button class="menu-btn" @click.stop="toggleMenu">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>

        <!-- Data Usage -->
        <div class="data-usage">
            <div class="usage-header">
                <span class="usage-label">Utilisation des données</span>
                <span class="usage-percentage">{{ usagePercentage }}% utilisé</span>
            </div>
            <div class="usage-bar">
                <div class="usage-fill" :style="{ width: usagePercentage + '%' }"></div>
            </div>
            <div class="usage-details">
                <div class="data-info">
                    <span class="data-label">Restant</span>
                    <span class="data-value">{{ esim.data_remaining }}</span>
                </div>
                <div class="data-info">
                    <span class="data-label">Total</span>
                    <span class="data-value">{{ esim.total_data }}</span>
                </div>
            </div>
        </div>

        <!-- eSIM Details -->
        <div class="esim-details">
            <div class="detail-row">
                <div class="detail-item">
                    <span class="detail-label">
                        <i class="fa-solid fa-phone"></i>
                        Numéro
                    </span>
                    <span class="detail-value phone-number">{{ esim.phone_number }}</span>
                </div>
                <button class="copy-btn" @click.stop="copyPhoneNumber" title="Copier le numéro">
                    <i class="fa-solid fa-copy"></i>
                </button>
            </div>

            <div class="detail-row">
                <div class="detail-item">
                    <span class="detail-label">
                        <i class="fa-solid fa-calendar"></i>
                        Expiration
                    </span>
                    <span class="detail-value expiry-date">
                        {{ formatDate(esim.expiry_date) }}
                        <span class="days-left" :class="daysLeftClass">
                            ({{ daysLeftText }})
                        </span>
                    </span>
                </div>
            </div>

            <div class="detail-row">
                <div class="detail-item">
                    <span class="detail-label">
                        <i class="fa-solid fa-bolt"></i>
                        Forfait
                    </span>
                    <span class="detail-value plan-badge" :class="esim.plan">
                        {{ esim.plan }}
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">
                        <i class="fa-solid fa-qrcode"></i>
                        ICCID
                    </span>
                    <span class="detail-value iccid">{{ esim.iccid }}</span>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="esim-actions">
            <button class="action-btn primary" @click.stop="$emit('recharge')" :disabled="esim.status !== 'active'">
                <i class="fa-solid fa-bolt"></i>
                Recharger
            </button>
            <button class="action-btn secondary" @click.stop="showActivationQR">
                <i class="fa-solid fa-qrcode"></i>
                QR Code
            </button>
            <button class="action-btn outline" @click.stop="$emit('view-details')">
                <i class="fa-solid fa-eye"></i>
                Détails
            </button>
        </div>

        <!-- Auto Renew Toggle -->
        <div class="auto-renew">
            <label class="toggle-switch">
                <input
                    type="checkbox"
                    v-model="autoRenew"
                    @change="toggleAutoRenew"
                    :disabled="esim.status !== 'active'"
                />
                <span class="slider"></span>
            </label>
            <div class="auto-renew-info">
                <span class="auto-renew-label">Renouvellement automatique</span>
                <span class="auto-renew-desc">Recharge automatique à l'expiration</span>
            </div>
        </div>

        <!-- Dropdown Menu -->
        <div v-if="showMenu" class="esim-menu dark-dropdown">
            <button class="menu-item" @click.stop="shareESim">
                <i class="fa-solid fa-share"></i>
                Partager
            </button>
            <button class="menu-item" @click.stop="downloadProfile">
                <i class="fa-solid fa-download"></i>
                Télécharger profil
            </button>
            <button class="menu-item" @click.stop="showUsageStats">
                <i class="fa-solid fa-chart-bar"></i>
                Statistiques
            </button>
            <div class="menu-divider"></div>
            <button class="menu-item danger" @click.stop="deactivateESim" v-if="esim.status === 'active'">
                <i class="fa-solid fa-power-off"></i>
                Désactiver
            </button>
            <button class="menu-item danger" @click.stop="deleteESim" v-if="esim.status === 'expired'">
                <i class="fa-solid fa-trash"></i>
                Supprimer
            </button>
        </div>

        <!-- QR Code Modal -->
        <div v-if="showQRModal" class="modal-overlay" @click.self="closeQRModal">
            <div class="qr-modal dark-modal">
                <div class="modal-header">
                    <h3>Code d'activation</h3>
                    <button class="close-btn" @click="closeQRModal">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="qr-container">
                        <!-- Placeholder for QR Code -->
                        <div class="qr-placeholder">
                            <i class="fa-solid fa-qrcode"></i>
                            <p>QR Code de l'eSIM</p>
                        </div>
                        <p class="qr-instructions">
                            Scannez ce code avec votre appareil pour activer l'eSIM
                        </p>
                    </div>
                    <div class="activation-details">
                        <div class="detail-item">
                            <span>Code d'activation :</span>
                            <code class="activation-code">{{ esim.activation_code }}</code>
                            <button class="copy-btn small" @click="copyActivationCode">
                                <i class="fa-solid fa-copy"></i>
                            </button>
                        </div>
                        <div class="detail-item">
                            <span>Instructions :</span>
                            <ol class="instructions-list">
                                <li>Ouvrez l'appareil photo de votre téléphone</li>
                                <li>Scannez le code QR ci-dessus</li>
                                <li>Suivez les instructions à l'écran</li>
                                <li>Activez l'eSIM dans les paramètres</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="action-btn secondary" @click="closeQRModal">
                        Fermer
                    </button>
                    <button class="action-btn primary" @click="downloadQRCode">
                        <i class="fa-solid fa-download"></i>
                        Télécharger QR
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    esim: {
        type: Object,
        default: () => {},
        required: true
    }
});

const emit = defineEmits(['recharge', 'view-details', 'toggle-auto-renew']);

// State
const showMenu = ref(false);
const showQRModal = ref(false);
const autoRenew = ref(props.esim.auto_renew || false);

// Computed properties
const usagePercentage = computed(() => {
    if (props.esim.total_data === 0) return 0;
    return Math.round(((props.esim.total_data - props.esim.data_remaining) / props.esim.total_data) * 100);
});

const isLowData = computed(() => {
    return props.esim.status === 'active' && props.esim.data_remaining < 1; // Less than 1GB
});

const isExpiringSoon = computed(() => {
    if (props.esim.status !== 'active') return false;
    const daysLeft = getDaysLeft();
    return daysLeft > 0 && daysLeft <= 7;
});

const daysLeft = computed(() => {
    return getDaysLeft();
});

const daysLeftText = computed(() => {
    const days = daysLeft.value;
    if (days === 0) return 'Expire aujourd\'hui';
    if (days === 1) return '1 jour restant';
    if (days > 0) return `${days} jours restants`;
    return 'Expiré';
});

const daysLeftClass = computed(() => {
    const days = daysLeft.value;
    if (days <= 0) return 'expired';
    if (days <= 3) return 'critical';
    if (days <= 7) return 'warning';
    return 'normal';
});

// Methods
const getDaysLeft = () => {
    const expiry = new Date(props.esim.expiry_date);
    const now = new Date();
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const showActivationQR = () => {
    showQRModal.value = true;
    showMenu.value = false;
};

const closeQRModal = () => {
    showQRModal.value = false;
};

const toggleAutoRenew = () => {
    emit('toggle-auto-renew', {
        esimId: props.esim.id,
        autoRenew: autoRenew.value
    });
};

const copyPhoneNumber = async () => {
    try {
        await navigator.clipboard.writeText(props.esim.phone_number);
        // Show success toast/notification
        console.log('Numéro copié:', props.esim.phone_number);
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
    }
};

const copyActivationCode = async () => {
    try {
        await navigator.clipboard.writeText(props.esim.activation_code);
        console.log('Code d\'activation copié');
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
    }
};

const shareESim = () => {
    if (navigator.share) {
        navigator.share({
            title: `eSIM ${props.esim.name}`,
            text: `Détails de mon eSIM ${props.esim.name}`,
            url: window.location.href
        });
    } else {
        copyPhoneNumber();
    }
    showMenu.value = false;
};

const downloadProfile = () => {
    console.log('Téléchargement du profil eSIM:', props.esim.id);
    showMenu.value = false;
};

const showUsageStats = () => {
    console.log('Afficher les statistiques d\'utilisation');
    showMenu.value = false;
};

const deactivateESim = () => {
    if (confirm('Voulez-vous vraiment désactiver cet eSIM ?')) {
        console.log('Désactivation de l\'eSIM:', props.esim.id);
        showMenu.value = false;
    }
};

const deleteESim = () => {
    if (confirm('Voulez-vous vraiment supprimer cet eSIM ? Cette action est irréversible.')) {
        console.log('Suppression de l\'eSIM:', props.esim.id);
        showMenu.value = false;
    }
};

const downloadQRCode = () => {
    console.log('Téléchargement du QR Code');
    // Implement QR code download
};

const formatData = (gb) => {
    if (gb >= 1000) {
        return (gb / 1000).toFixed(1) + ' To';
    }
    return gb.toFixed(1) + ' Go';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

// Close menu when clicking outside
onMounted(() => {
    document.addEventListener('click', () => {
        showMenu.value = false;
    });
});
</script>

<style scoped>
.esim-card {
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8) 0%, rgba(26, 65, 55, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 25px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.esim-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color2);
    box-shadow: var(--shadow-accent);
}

.esim-card.low-data {
    border-color: #FF9800;
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8) 0%, rgba(255, 152, 0, 0.1) 100%);
}

.esim-card.expiring-soon {
    border-color: #F44336;
    background: linear-gradient(135deg, rgba(15, 39, 39, 0.8) 0%, rgba(244, 67, 54, 0.1) 100%);
}

.esim-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.esim-icon {
    width: 55px;
    height: 55px;
    background: var(--gradient-green);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.esim-title h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.esim-country {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--light-color2);
}

.esim-country i {
    color: var(--accent-color3);
    font-size: 0.9rem;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.status-badge {
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-badge.active {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.status-badge.expired {
    background: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.status-badge.pending {
    background: rgba(255, 152, 0, 0.1);
    color: #FF9800;
    border: 1px solid rgba(255, 152, 0, 0.2);
}

.menu-btn {
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
}

.menu-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.data-usage {
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(6, 20, 25, 0.4);
    border-radius: 18px;
}

.usage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.usage-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
}

.usage-percentage {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-color3);
}

.usage-bar {
    height: 8px;
    background: rgba(15, 39, 39, 0.6);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
}

.usage-fill {
    height: 100%;
    background: var(--gradient-accent);
    border-radius: 4px;
    transition: width 0.5s ease;
}

.usage-details {
    display: flex;
    justify-content: space-between;
}

.data-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.data-label {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.data-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--light-color1);
}

.esim-details {
    margin-bottom: 25px;
}

.detail-row {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.detail-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.detail-label i {
    color: var(--accent-color3);
    font-size: 0.9rem;
}

.detail-value {
    font-size: 0.95rem;
    color: var(--light-color1);
    font-weight: 500;
}

.phone-number {
    font-family: monospace;
    letter-spacing: 1px;
}

.copy-btn {
    width: 35px;
    height: 35px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--accent-color3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    align-self: flex-end;
}

.copy-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    transform: scale(1.05);
}

.copy-btn.small {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
}

.days-left {
    font-size: 0.85rem;
    font-weight: 600;
    margin-left: 5px;
}

.days-left.expired {
    color: #F44336;
}

.days-left.critical {
    color: #FF5722;
}

.days-left.warning {
    color: #FF9800;
}

.days-left.normal {
    color: #4CAF50;
}

.plan-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.plan-badge.premium {
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    color: var(--dark-color3);
}

.plan-badge.standard {
    background: rgba(106, 196, 166, 0.2);
    color: var(--accent-color3);
    border: 1px solid rgba(106, 196, 166, 0.3);
}

.iccid {
    font-family: monospace;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
}

.esim-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
}

.action-btn {
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.9rem;
}

.action-btn.primary {
    background: var(--gradient-green);
    border: none;
    color: white;
}

.action-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(42, 140, 130, 0.4);
}

.action-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

.auto-renew {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(15, 39, 39, 0.3);
    border-radius: 14px;
    border: 1px solid rgba(106, 196, 166, 0.1);
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 3px;
    background-color: var(--light-color2);
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--accent-color2);
    border-color: var(--accent-color2);
}

input:checked + .slider:before {
    transform: translateX(24px);
    background-color: white;
}

input:disabled + .slider {
    opacity: 0.5;
    cursor: not-allowed;
}

.auto-renew-info {
    flex: 1;
}

.auto-renew-label {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 3px;
}

.auto-renew-desc {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
}

/* Dropdown Menu */
.esim-menu {
    position: absolute;
    top: 70px;
    right: 25px;
    width: 200px;
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

.menu-item.danger {
    color: #F44336;
}

.menu-item.danger i {
    color: #F44336;
}

.menu-item.danger:hover {
    background: rgba(244, 67, 54, 0.1);
}

.menu-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(106, 196, 166, 0.3), transparent);
    margin: 8px 0;
}

/* QR Code Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 20, 25, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.dark-modal {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.95) 0%, rgba(15, 39, 39, 0.95) 100%);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    width: 500px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
}

.modal-header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.modal-header h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--light-color1);
}

.close-btn {
    width: 35px;
    height: 35px;
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

.close-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.modal-content {
    padding: 25px;
}

.qr-container {
    text-align: center;
    margin-bottom: 30px;
}

.qr-placeholder {
    width: 200px;
    height: 200px;
    margin: 0 auto 20px;
    background: rgba(15, 39, 39, 0.6);
    border: 2px dashed rgba(106, 196, 166, 0.3);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
}

.qr-placeholder i {
    font-size: 4rem;
    margin-bottom: 15px;
    opacity: 0.5;
}

.qr-placeholder p {
    font-size: 0.9rem;
    color: var(--light-color2);
}

.qr-instructions {
    font-size: 0.9rem;
    color: var(--light-color2);
    text-align: center;
    max-width: 300px;
    margin: 0 auto;
}

.activation-details {
    background: rgba(15, 39, 39, 0.4);
    border-radius: 16px;
    padding: 20px;
    margin-top: 20px;
}

.activation-details .detail-item {
    margin-bottom: 20px;
}

.activation-details .detail-item:last-child {
    margin-bottom: 0;
}

.activation-details span {
    display: block;
    font-size: 0.9rem;
    color: var(--light-color2);
    margin-bottom: 10px;
    font-weight: 600;
}

.activation-code {
    display: block;
    font-family: monospace;
    background: rgba(6, 20, 25, 0.6);
    padding: 12px;
    border-radius: 10px;
    color: var(--accent-color3);
    margin-bottom: 10px;
    word-break: break-all;
    font-size: 0.9rem;
}

.instructions-list {
    margin-left: 20px;
    color: var(--light-color2);
    font-size: 0.9rem;
}

.instructions-list li {
    margin-bottom: 8px;
    line-height: 1.4;
}

.modal-actions {
    padding: 20px 25px 25px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
    .esim-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .header-right {
        width: 100%;
        justify-content: space-between;
    }

    .esim-actions {
        flex-wrap: wrap;
    }

    .action-btn {
        min-width: 120px;
    }

    .detail-row {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    .copy-btn {
        align-self: flex-start;
    }
}
</style>
