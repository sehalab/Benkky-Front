<template>
    <header class="admin-header dark-admin-header">
        <div class="header-left">
            <div class="welcome-section">
                <h1 class="welcome-title">
                    Administration <span class="user-role">{{ user.role }}</span>
                </h1>
                <p class="welcome-subtitle">
                    <i class="fa-solid fa-shield-check"></i>
                    Panneau de supervision
                </p>
            </div>

            <!-- Breadcrumbs pour admin -->
            <div class="breadcrumbs" v-if="breadcrumbs.length > 1">
                <span v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb">
                    <span v-if="index > 0" class="separator">/</span>
                    <router-link v-if="crumb.path && index < breadcrumbs.length - 1" :to="crumb.path" class="breadcrumb-link">
                        {{ crumb.title }}
                    </router-link>
                    <span v-else class="breadcrumb-current">{{ crumb.title }}</span>
                </span>
            </div>
        </div>

        <div class="header-right">
            <!-- Quick Actions -->
            <div class="quick-actions">
                <!-- Search -->
                <div class="search-box">
                    <i class="fa-solid fa-search search-icon"></i>
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Rechercher..."
                        class="search-input"
                        @keyup.enter="performSearch"
                    />
                </div>

                <!-- Quick Stats -->
                <div class="quick-stats">
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value">{{ stats.totalUsers || 0 }}</span>
                            <span class="stat-label">Utilisateurs</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fa-solid fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value">{{ stats.activeTransactions || 0 }}</span>
                            <span class="stat-label">Transactions</span>
                        </div>
                    </div>
                </div>

                <!-- Notification Button -->
                <button class="action-btn notification-btn" @click="toggleNotifications">
                    <i class="fa-solid fa-bell"></i>
                    <span class="notification-count" v-if="unreadNotifications > 0">
                        {{ unreadNotifications }}
                    </span>
                </button>

                <!-- Theme Toggle -->
                <button class="action-btn theme-btn" @click="toggleTheme">
                    <i :class="isDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </button>
            </div>

            <!-- User Menu -->
            <div class="user-menu">
                <button class="user-menu-btn" @click="toggleUserMenu">
                    <div class="user-avatar">
                        <img :src="user.avatar || '/images/avatars/admin-avatar.jpg'" alt="Admin Avatar">
                        <div class="avatar-status" :class="{ online: user.is_online }"></div>
                        <div class="admin-badge">
                            <i class="fa-solid fa-shield-check"></i>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-down menu-arrow"></i>
                </button>

                <div v-if="showUserMenu" class="user-dropdown dark-admin-dropdown">
                    <div class="dropdown-header">
                        <div class="dropdown-avatar">
                            <img :src="user.avatar || '/images/avatars/admin-avatar.jpg'" alt="Avatar">
                            <div class="admin-badge">
                                <i class="fa-solid fa-shield-check"></i>
                            </div>
                        </div>
                        <div class="dropdown-user-info">
                            <h4>{{ user.name }}</h4>
                            <span class="user-email">{{ user.email }}</span>
                            <span class="user-role-badge">{{ user.role }}</span>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <router-link to="/admin/profile" class="dropdown-item">
                        <i class="fa-solid fa-user"></i>
                        Mon Profil
                    </router-link>
                    <router-link to="/admin/settings" class="dropdown-item">
                        <i class="fa-solid fa-gear"></i>
                        Paramètres
                    </router-link>
                    <router-link to="/admin/logs" class="dropdown-item">
                        <i class="fa-solid fa-terminal"></i>
                        Logs système
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" @click="switchToUserDashboard">
                        <i class="fa-solid fa-right-left"></i>
                        Mode Utilisateur
                    </button>
                    <button class="dropdown-item logout-item" @click="logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>

        <!-- Notifications Panel -->
        <div v-if="showNotifications" class="notifications-panel dark-admin-panel">
            <div class="panel-header">
                <h3>Notifications système</h3>
                <div class="panel-actions">
                    <button class="mark-all-btn" @click="markAllAsRead" v-if="unreadNotifications > 0">
                        Tout marquer comme lu
                    </button>
                    <button class="close-btn" @click="toggleNotifications">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="notifications-list">
                <div v-for="notification in notifications" :key="notification.id"
                     :class="['notification-item', { unread: !notification.read }]">
                    <div class="notification-icon" :class="notification.type">
                        <i :class="notification.icon"></i>
                    </div>
                    <div class="notification-content">
                        <p class="notification-text">{{ notification.message }}</p>
                        <span class="notification-time">{{ notification.time }}</span>
                    </div>
                    <div class="notification-action">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div class="panel-footer" v-if="notifications.length === 0">
                <p class="no-notifications">Aucune notification</p>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});

const route = useRoute();
const router = useRouter();

// State
const showUserMenu = ref(false);
const showNotifications = ref(false);
const isDarkTheme = ref(true);
const searchQuery = ref('');

// Stats
const stats = ref({
    totalUsers: 1542,
    activeTransactions: 89,
    pendingKYC: 23,
    systemLoad: 45
});

const notifications = ref([
    {
        id: 1,
        icon: 'fa-solid fa-user-plus',
        message: 'Nouvel utilisateur inscrit: John Doe',
        time: '2 min',
        read: false,
        type: 'success'
    },
    {
        id: 2,
        icon: 'fa-solid fa-money-bill-transfer',
        message: 'Transaction suspecte détectée',
        time: '5 min',
        read: false,
        type: 'warning'
    },
    {
        id: 3,
        icon: 'fa-solid fa-user-check',
        message: 'KYC en attente de validation',
        time: '10 min',
        read: true,
        type: 'info'
    },
    {
        id: 4,
        icon: 'fa-solid fa-database',
        message: 'Sauvegarde système complétée',
        time: '1h',
        read: true,
        type: 'info'
    },
    {
        id: 5,
        icon: 'fa-solid fa-server',
        message: 'Charge système élevée détectée',
        time: '2h',
        read: true,
        type: 'warning'
    },
]);

// Computed
const unreadNotifications = computed(() => {
    return notifications.value.filter(n => !n.read).length;
});

const breadcrumbs = computed(() => {
    const pathArray = route.path.split('/').filter(x => x);
    const breadcrumbs = [];

    // Start with admin
    breadcrumbs.push({ title: 'Admin', path: '/admin' });

    // Add other segments
    let cumulativePath = '/admin';
    for (let i = 1; i < pathArray.length; i++) {
        cumulativePath += '/' + pathArray[i];
        const segment = pathArray[i];
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
        breadcrumbs.push({
            title,
            path: i < pathArray.length - 1 ? cumulativePath : null
        });
    }

    return breadcrumbs;
});

// Methods
const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
    if (showNotifications.value) showNotifications.value = false;
};

const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    if (showUserMenu.value) showUserMenu.value = false;
};

const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    // Implement theme switching logic
};

const performSearch = () => {
    if (searchQuery.value.trim()) {
        console.log('Searching for:', searchQuery.value);
        // Implement search logic
    }
};

const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true);
};

const switchToUserDashboard = () => {
    router.push('/dashboard');
};

const logout = () => {
    // Admin logout logic
    router.push('/admin/logout');
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
    if (!event.target.closest('.user-menu')) {
        showUserMenu.value = false;
    }
    if (!event.target.closest('.notification-btn') && !event.target.closest('.notifications-panel')) {
        showNotifications.value = false;
    }
};

// Fetch stats on mount
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    // Fetch initial stats
    // fetchAdminStats();
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Styles principaux adaptés du header existant */

.dark-admin-header {
    background: rgba(15, 26, 46, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(66, 133, 244, 0.2);
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
}

.welcome-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 5px;
}

.welcome-title .user-role {
    background: linear-gradient(45deg, #4285f4, #34a853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
}

.welcome-subtitle {
    color: #94a3b8;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 8px;
}

.welcome-subtitle i {
    color: #4285f4;
}

/* Breadcrumbs */
.breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
}

.separator {
    color: #64748b;
    margin: 0 5px;
}

.breadcrumb-link {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.3s ease;
}

.breadcrumb-link:hover {
    color: #4285f4;
}

.breadcrumb-current {
    color: #e2e8f0;
    font-size: 0.85rem;
    font-weight: 500;
}

/* Header Right */
.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.quick-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

/* Search Box */
.search-box {
    position: relative;
    width: 250px;
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 0.9rem;
}

.search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 10px;
    color: #e2e8f0;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #4285f4;
    background: rgba(26, 43, 62, 0.8);
}

/* Quick Stats */
.quick-stats {
    display: flex;
    gap: 15px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 15px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.stat-item:hover {
    border-color: #4285f4;
    transform: translateY(-2px);
}

.stat-icon {
    width: 30px;
    height: 30px;
    background: rgba(66, 133, 244, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4285f4;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 0.9rem;
    font-weight: 700;
    color: #e2e8f0;
}

.stat-label {
    font-size: 0.7rem;
    color: #94a3b8;
}

/* Action Buttons */
.action-btn {
    width: 45px;
    height: 45px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 12px;
    color: #4285f4;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.action-btn:hover {
    background: rgba(66, 133, 244, 0.1);
    border-color: #4285f4;
    transform: translateY(-2px);
}

.notification-btn {
    position: relative;
}

.notification-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ea4335;
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #0f1a2e;
}

/* User Menu */
.user-menu {
    position: relative;
}

.user-menu-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 12px;
    padding: 8px 15px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-menu-btn:hover {
    background: rgba(66, 133, 244, 0.1);
    border-color: #4285f4;
}

.user-avatar {
    position: relative;
    width: 40px;
    height: 40px;
}

.user-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #4285f4;
}

.avatar-status {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: #FF3B30;
    border: 2px solid #0f1a2e;
    border-radius: 50%;
}

.avatar-status.online {
    background: #4CD964;
}

.admin-badge {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #4285f4, #34a853);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7rem;
    border: 2px solid #0f1a2e;
}

.menu-arrow {
    color: #94a3b8;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
}

.user-menu-btn:hover .menu-arrow {
    transform: rotate(180deg);
}

/* Dropdown */
.dark-admin-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 320px;
    background: rgba(15, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
    z-index: 1000;
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

.dropdown-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.dropdown-avatar {
    position: relative;
    width: 60px;
    height: 60px;
}

.dropdown-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #4285f4;
}

.dropdown-user-info {
    flex: 1;
}

.dropdown-user-info h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 5px;
}

.user-email {
    font-size: 0.85rem;
    color: #94a3b8;
    display: block;
    margin-bottom: 8px;
}

.user-role-badge {
    font-size: 0.75rem;
    color: #34a853;
    background: rgba(52, 168, 83, 0.1);
    padding: 3px 10px;
    border-radius: 12px;
    font-weight: 500;
}

.dropdown-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.3), transparent);
    margin: 15px 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 0.95rem;
}

.dropdown-item:hover {
    background: rgba(66, 133, 244, 0.1);
    color: #e2e8f0;
}

.dropdown-item i {
    width: 20px;
    text-align: center;
    color: #4285f4;
}

.dropdown-item.logout-item {
    color: #ea4335;
}

.dropdown-item.logout-item:hover {
    background: rgba(234, 67, 53, 0.1);
}

/* Notifications Panel */
.notifications-panel {
    position: absolute;
    top: calc(100% + 10px);
    right: 20px;
    width: 450px;
    background: rgba(15, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
    z-index: 1000;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid rgba(66, 133, 244, 0.1);
}

.panel-header h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #e2e8f0;
}

.panel-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.mark-all-btn {
    background: none;
    border: none;
    color: #4285f4;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 5px;
    transition: color 0.3s ease;
}

.mark-all-btn:hover {
    color: #34a853;
}

.close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 5px;
    transition: all 0.3s ease;
}

.close-btn:hover {
    color: #e2e8f0;
    transform: rotate(90deg);
}

.notifications-list {
    max-height: 400px;
    overflow-y: auto;
}

.notification-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border-bottom: 1px solid rgba(66, 133, 244, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
}

.notification-item:hover {
    background: rgba(66, 133, 244, 0.05);
}

.notification-item.unread {
    background: rgba(66, 133, 244, 0.1);
}

.notification-icon {
    width: 45px;
    height: 45px;
    background: rgba(26, 43, 62, 0.6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4285f4;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.notification-icon.success {
    background: rgba(52, 168, 83, 0.1);
    color: #34a853;
}

.notification-icon.warning {
    background: rgba(251, 188, 5, 0.1);
    color: #fbbc05;
}

.notification-icon.info {
    background: rgba(66, 133, 244, 0.1);
    color: #4285f4;
}

.notification-content {
    flex: 1;
}

.notification-text {
    font-size: 0.95rem;
    color: #e2e8f0;
    margin-bottom: 5px;
    line-height: 1.4;
}

.notification-time {
    font-size: 0.8rem;
    color: #94a3b8;
    opacity: 0.8;
}

.notification-action {
    color: #94a3b8;
    opacity: 0.5;
    transition: all 0.3s ease;
}

.notification-item:hover .notification-action {
    opacity: 1;
    transform: translateX(5px);
}

.panel-footer {
    padding: 20px;
    text-align: center;
    border-top: 1px solid rgba(66, 133, 244, 0.1);
}

.no-notifications {
    color: #94a3b8;
    font-size: 0.95rem;
    margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
    .quick-stats {
        display: none;
    }

    .search-box {
        width: 200px;
    }
}

@media (max-width: 992px) {
    .search-box {
        display: none;
    }

    .dark-admin-header {
        padding: 15px 20px;
    }
}

@media (max-width: 768px) {
    .welcome-title {
        font-size: 1.5rem;
    }

    .breadcrumbs {
        display: none;
    }

    .notifications-panel {
        width: 350px;
        right: 10px;
    }
}
</style>
