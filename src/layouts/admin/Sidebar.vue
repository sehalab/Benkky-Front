<template>
    <aside class="admin-sidebar dark-admin-sidebar">
        <!-- Admin Logo -->
        <div class="sidebar-logo">
            <div class="logo-wrapper">
                <img src="" alt="Admin Panel" class="logo-img">
                <div class="logo-glow"></div>
            </div>
            <div class="logo-text">
                <span class="logo-title">Admin Panel</span>
                <span class="logo-subtitle">Supervision</span>
            </div>
        </div>

        <!-- Admin Profile -->
        <div class="admin-profile">
            <div class="profile-avatar">
                <img :src="user.avatar || '/images/avatars/admin-avatar.jpg'" alt="Admin Avatar">
                <div class="admin-badge">
                    <i class="fa-solid fa-shield-check"></i>
                </div>
            </div>
            <div class="profile-info">
                <h3 class="profile-name">{{ user.name }}</h3>
                <span class="profile-role">{{ user.role }}</span>
            </div>
        </div>

        <!-- Admin Navigation -->
        <nav class="sidebar-nav">
            <div class="nav-section">
                <h4 class="section-title">Tableau de bord</h4>
                <ul class="nav-list">
                    <li v-for="item in dashboardItems" :key="item.id">
                        <router-link
                            :to="item.path"
                            :class="['nav-item', { active: isActive(item.path) }]"
                        >
                            <div class="nav-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <span class="nav-text">{{ item.label }}</span>
                            <div class="nav-glow"></div>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="nav-section">
                <h4 class="section-title">Gestion</h4>
                <ul class="nav-list">
                    <li v-for="item in managementItems" :key="item.id">
                        <router-link
                            :to="item.path"
                            :class="['nav-item', { active: isActive(item.path) }]"
                        >
                            <div class="nav-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <span class="nav-text">{{ item.label }}</span>
                            <div class="nav-glow"></div>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="nav-section">
                <h4 class="section-title">Système</h4>
                <ul class="nav-list">
                    <li v-for="item in systemItems" :key="item.id">
                        <router-link
                            :to="item.path"
                            :class="['nav-item', { active: isActive(item.path) }]"
                        >
                            <div class="nav-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <span class="nav-text">{{ item.label }}</span>
                            <div class="nav-glow"></div>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Quick Actions -->
        <div class="quick-actions">
            <h4 class="section-title">Actions rapides</h4>
            <div class="action-buttons">
                <button @click="refreshData" class="action-btn">
                    <i class="fa-solid fa-rotate"></i>
                    <span>Actualiser</span>
                </button>
                <button @click="showSystemStatus" class="action-btn">
                    <i class="fa-solid fa-server"></i>
                    <span>Status</span>
                </button>
            </div>
        </div>

        <!-- Logout -->
        <div class="sidebar-footer">
            <button class="logout-btn" @click="logout">
                <div class="logout-icon">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
                <span class="logout-text">Déconnexion</span>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});

const route = useRoute();
const router = useRouter();

const dashboardItems = ref([
    { id: 'overview', label: 'Aperçu', icon: 'fa-solid fa-chart-line', path: '/admin' },
    { id: 'analytics', label: 'Analytiques', icon: 'fa-solid fa-chart-bar', path: '/admin/analytics' },
    { id: 'reports', label: 'Rapports', icon: 'fa-solid fa-file-chart-column', path: '/admin/reports' },
]);

const managementItems = ref([
    { id: 'users', label: 'Utilisateurs', icon: 'fa-solid fa-users', path: '/admin/users' },
    { id: 'transactions', label: 'Transactions', icon: 'fa-solid fa-money-bill-transfer', path: '/admin/transactions' },
    { id: 'kyc', label: 'Vérifications KYC', icon: 'fa-solid fa-user-check', path: '/admin/kyc' },
    { id: 'cards', label: 'Cartes', icon: 'fa-solid fa-credit-card', path: '/admin/cards' },
    { id: 'esims', label: 'eSIMs', icon: 'fa-solid fa-sim-card', path: '/admin/esims' },
]);

const systemItems = ref([
    { id: 'settings', label: 'Paramètres', icon: 'fa-solid fa-gears', path: '/admin/settings' },
    { id: 'logs', label: 'Logs système', icon: 'fa-solid fa-terminal', path: '/admin/logs' },
    { id: 'api', label: 'API', icon: 'fa-solid fa-code', path: '/admin/api' },
    { id: 'backup', label: 'Sauvegarde', icon: 'fa-solid fa-database', path: '/admin/backup' },
]);

const isActive = (path) => {
    if (path === '/admin') {
        return route.path === '/admin' || route.path === '/admin/';
    }
    return route.path.startsWith(path);
};

const refreshData = () => {
    // Refresh data logic
    console.log('Refreshing admin data...');
};

const showSystemStatus = () => {
    // Show system status
    console.log('Showing system status...');
};

const logout = () => {
    // Admin logout logic
    router.push('/admin/logout');
};
</script>

<style scoped>
.dark-admin-sidebar {
    width: 280px;
    background: rgba(15, 26, 46, 0.9);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(66, 133, 244, 0.2);
    display: flex;
    flex-direction: column;
    padding: 25px 20px;
    position: relative;
    overflow: hidden;
}

.dark-admin-sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 43, 62, 0.3) 0%, transparent 50%);
    pointer-events: none;
}

.sidebar-logo {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
    padding: 0 10px;
}

.logo-wrapper {
    position: relative;
    width: 50px;
    height: 50px;
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 15px rgba(66, 133, 244, 0.4));
    position: relative;
    z-index: 2;
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #4285f4 0%, transparent 70%);
    opacity: 0.4;
    filter: blur(15px);
    z-index: 1;
}

.logo-text {
    display: flex;
    flex-direction: column;
}

.logo-title {
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(45deg, #4285f4, #34a853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.logo-subtitle {
    font-size: 0.8rem;
    color: #94a3b8;
    opacity: 0.8;
}

.admin-profile {
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}

.admin-profile::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4285f4, transparent);
}

.profile-avatar {
    position: relative;
    width: 50px;
    height: 50px;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #4285f4;
    object-fit: cover;
}

.admin-badge {
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #4285f4, #34a853);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    border: 2px solid #0f1a2e;
}

.profile-info {
    flex: 1;
}

.profile-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 4px;
}

.profile-role {
    font-size: 0.8rem;
    color: #94a3b8;
    background: rgba(66, 133, 244, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    display: inline-block;
}

.nav-section {
    margin-bottom: 25px;
}

.section-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 15px;
    padding-left: 20px;
    letter-spacing: 1px;
    font-weight: 600;
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-list li {
    margin-bottom: 5px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: #94a3b8;
    width: 100%;
    padding: 14px 20px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.nav-item:hover {
    background: rgba(66, 133, 244, 0.1);
    border-color: rgba(66, 133, 244, 0.2);
    color: #e2e8f0;
    transform: translateX(5px);
}

.nav-item.active {
    background: linear-gradient(135deg, rgba(66, 133, 244, 0.15) 50%, transparent 400%);
    border-color: #4285f4;
    color: #e2e8f0;
}

.nav-item.active .nav-indicator {
    transform: scaleY(1);
}

.nav-icon {
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
    position: relative;
    z-index: 2;
}

.nav-text {
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    z-index: 2;
}

.nav-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.nav-item:hover .nav-glow {
    opacity: 1;
}

.nav-indicator {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #4285f4, #34a853);
    border-radius: 0 4px 4px 0;
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.quick-actions {
    margin-top: auto;
    margin-bottom: 20px;
}

.action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 0 10px;
}

.action-btn {
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background: rgba(66, 133, 244, 0.1);
    border-color: #4285f4;
    color: #e2e8f0;
    transform: translateY(-2px);
}

.action-btn i {
    font-size: 1.2rem;
}

.action-btn span {
    font-size: 0.8rem;
    font-weight: 500;
}

.sidebar-footer {
    padding-top: 20px;
    border-top: 1px solid rgba(66, 133, 244, 0.1);
}

.logout-btn {
    width: 100%;
    padding: 16px 20px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(234, 67, 53, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: #ea4335;
    cursor: pointer;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background: rgba(234, 67, 53, 0.1);
    border-color: #ea4335;
    transform: translateX(5px);
}

.logout-icon {
    font-size: 1.1rem;
}

.logout-text {
    font-size: 0.95rem;
    font-weight: 500;
}
</style>
