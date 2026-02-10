<!-- /src/layouts/admin/AdminSidebar.vue -->
<template>
    <aside class="admin-sidebar">
        <!-- Sidebar Logo -->
        <div class="sidebar-logo">
            <router-link to="/admin">
                <div class="logo-wrapper">
                    <img src="/images/logo_benkky.png" alt="Benkky" class="logo-img">
                    <div class="logo-glow"></div>
                </div>
                <div class="logo-text">
                    <span class="logo-title">Benkky</span>
                    <span class="logo-subtitle">Admin Panel</span>
                </div>
            </router-link>
        </div>

        <!-- Admin Profile -->
        <div class="admin-profile">
            <div class="profile-avatar">
                <img :src="user?.avatar || '/images/avatars/admin-avatar.jpg'" alt="Admin Avatar">
                <div class="admin-badge">
                    <i class="fa-solid fa-shield-check"></i>
                </div>
                <div class="online-indicator" :class="{ online: user?.is_online || true }"></div>
            </div>
            <div class="profile-info">
                <h3 class="profile-name">{{ user?.name || 'Administrateur' }}</h3>
                <span class="profile-role">{{ user?.role || 'Super Admin' }}</span>
                <div class="profile-status">
                    <i class="fa-solid fa-circle" :class="user?.is_online ? 'online' : 'offline'"></i>
                    <span>{{ user?.is_online ? 'En ligne' : 'Hors ligne' }}</span>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <nav class="sidebar-nav">
            <!-- Dashboard Section -->
            <div class="nav-section">
                <h4 class="section-title">
                    <i class="fa-solid fa-gauge-high"></i>
                    Tableau de bord
                </h4>
                <ul class="nav-list">
                    <li>
                        <router-link to="/admin" class="nav-item" :class="{ active: $route.path === '/admin' }">
                            <div class="nav-icon">
                                <i class="fa-solid fa-chart-line"></i>
                            </div>
                            <span class="nav-text">Aperçu</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/analytics" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-chart-bar"></i>
                            </div>
                            <span class="nav-text">Analytiques</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/reports" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-file-chart-column"></i>
                            </div>
                            <span class="nav-text">Rapports</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Management Section -->
            <div class="nav-section">
                <h4 class="section-title">
                    <i class="fa-solid fa-briefcase"></i>
                    Gestion
                </h4>
                <ul class="nav-list">
                    <li>
                        <router-link to="/admin/users" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-users"></i>
                                <span class="notification-badge">12</span>
                            </div>
                            <span class="nav-text">Utilisateurs</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/transactions" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-money-bill-transfer"></i>
                            </div>
                            <span class="nav-text">Transactions</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/kyc" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-user-check"></i>
                                <span class="notification-badge">5</span>
                            </div>
                            <span class="nav-text">Vérifications KYC</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/cards" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-credit-card"></i>
                            </div>
                            <span class="nav-text">Cartes</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/esims" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-sim-card"></i>
                            </div>
                            <span class="nav-text">eSIMs</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- System Section -->
            <div class="nav-section">
                <h4 class="section-title">
                    <i class="fa-solid fa-server"></i>
                    Système
                </h4>
                <ul class="nav-list">
                    <li>
                        <router-link to="/admin/settings" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-gears"></i>
                            </div>
                            <span class="nav-text">Paramètres</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/logs" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-terminal"></i>
                            </div>
                            <span class="nav-text">Logs système</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/api" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-code"></i>
                            </div>
                            <span class="nav-text">API</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/backup" class="nav-item">
                            <div class="nav-icon">
                                <i class="fa-solid fa-database"></i>
                            </div>
                            <span class="nav-text">Sauvegarde</span>
                            <div class="nav-indicator"></div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Quick Actions -->
        <div class="quick-actions">
            <h4 class="section-title">
                <i class="fa-solid fa-bolt"></i>
                Actions rapides
            </h4>
            <div class="action-buttons">
                <button class="action-btn" @click="refreshData" title="Actualiser">
                    <i class="fa-solid fa-rotate"></i>
                    <span>Actualiser</span>
                </button>
                <button class="action-btn" @click="showSystemStatus" title="Status système">
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
import { useRouter } from 'vue-router';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
    // Supprimé: stats n'est plus requis
});

const router = useRouter();

const refreshData = () => {
    console.log('Refreshing admin data...');
    // Émettre un événement ou appeler API
};

const showSystemStatus = () => {
    console.log('Showing system status...');
    router.push('/admin/system-status');
};

const logout = () => {
    // Logique de déconnexion
    router.push('/admin/logout');
};
</script>

<style scoped>
.admin-sidebar {
    width: 280px;
    background: rgba(15, 26, 46, 0.9);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(66, 133, 244, 0.2);
    display: flex;
    flex-direction: column;
    padding: 25px 20px;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
}

.admin-sidebar::before {
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
    margin-bottom: 40px;
}

.sidebar-logo a {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
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
    flex-shrink: 0;
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

.online-indicator {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: #FF3B30;
    border: 2px solid #0f1a2e;
    border-radius: 50%;
}

.online-indicator.online {
    background: #4CD964;
    box-shadow: 0 0 10px #4CD964;
}

.profile-info {
    flex: 1;
    min-width: 0;
}

.profile-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.profile-role {
    font-size: 0.8rem;
    color: #94a3b8;
    background: rgba(66, 133, 244, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    display: inline-block;
    font-weight: 500;
}

.profile-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    font-size: 0.8rem;
    color: #94a3b8;
}

.profile-status i {
    font-size: 0.6rem;
}

.profile-status i.online {
    color: #4CD964;
}

.profile-status i.offline {
    color: #FF3B30;
}

.nav-section {
    margin-bottom: 25px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 15px;
    padding-left: 10px;
    letter-spacing: 1px;
    font-weight: 600;
}

.section-title i {
    font-size: 0.9rem;
    color: #4285f4;
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
    position: relative;
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
    z-index: 2;
    flex-shrink: 0;
}

.notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    background: #FF4757;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}

.nav-text {
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    z-index: 2;
    flex: 1;
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
    border: none;
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
    border: none;
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
