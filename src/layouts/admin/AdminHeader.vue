<!-- /src/layouts/admin/AdminHeader.vue -->
<template>
    <header class="admin-header">
        <!-- Left Section -->
        <div class="header-left">
            <!-- Page Title -->
            <div class="page-title">
                <h1 class="title">
                    <i class="fa-solid fa-gauge-high"></i>
                    Tableau de bord
                </h1>
                <p class="subtitle">Panneau d'administration Benkky</p>
            </div>
        </div>

        <!-- Right Section -->
        <div class="header-right">
            <!-- Quick Stats -->
            <div class="quick-stats">
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">1,542</span>
                        <span class="stat-label">Utilisateurs</span>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fa-solid fa-money-bill-wave"></i>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">125K</span>
                        <span class="stat-label">Revenus</span>
                    </div>
                </div>
            </div>

            <!-- User Menu -->
            <div class="user-menu">
                <div class="user-avatar">
                    <img :src="user?.avatar || '/images/avatars/admin-avatar.jpg'" alt="Admin Avatar">
                    <div class="avatar-status" :class="{ online: user?.is_online || true }"></div>
                </div>
                <div class="user-info">
                    <span class="user-name">{{ user?.name || 'Administrateur' }}</span>
                    <span class="user-role">{{ user?.role || 'Super Admin' }}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});
</script>

<style scoped>
.admin-header {
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
    align-items: center;
    gap: 20px;
}

.page-title {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
}

.title i {
    color: #4285f4;
    font-size: 1.4rem;
}

.subtitle {
    font-size: 0.9rem;
    color: #94a3b8;
    margin: 0;
    opacity: 0.8;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 25px;
}

.quick-stats {
    display: flex;
    gap: 20px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 15px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 140px;
}

.stat-item:hover {
    border-color: #4285f4;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(66, 133, 244, 0.1);
}

.stat-icon {
    width: 36px;
    height: 36px;
    background: rgba(66, 133, 244, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4285f4;
    font-size: 1rem;
}

.stat-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-value {
    font-size: 0.95rem;
    font-weight: 700;
    color: #e2e8f0;
    line-height: 1;
}

.stat-label {
    font-size: 0.75rem;
    color: #94a3b8;
    opacity: 0.8;
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    background: rgba(26, 43, 62, 0.6);
    border: 1px solid rgba(66, 133, 244, 0.2);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
}

.user-menu:hover {
    border-color: #4285f4;
}

.user-avatar {
    position: relative;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
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
    box-shadow: 0 0 10px #4CD964;
}

.user-info {
    flex: 1;
    min-width: 0;
}

.user-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-role {
    display: block;
    font-size: 0.8rem;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
