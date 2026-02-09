<!-- @/layouts/AdminLayout.vue (version simplifiée) -->
<template>
    <MainLayout>
        <div class="admin-dashboard dark-admin">
            <!-- Admin Background -->
            <div class="admin-background">
                <div class="bg-shape shape-1"></div>
                <div class="bg-shape shape-2"></div>
                <div class="bg-shape shape-3"></div>
                <div class="bg-shape shape-4"></div>
                <div class="grid-pattern"></div>
            </div>

            <!-- Main Container -->
            <div class="admin-container">
                <!-- Admin Sidebar -->
                <AdminSidebar :user="userSafe" />

                <!-- Main Content -->
                <div class="main-content">
                    <!-- Admin Header -->
                    <AdminHeader :user="userSafe" />

                    <!-- Content Area -->
                    <div class="content-area">
                        <!-- Router View for Admin Pages -->
                        <router-view :user="userSafe" />
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import { computed } from 'vue';
import AdminSidebar from '@/layouts/Sidebar.vue';
import AdminHeader from '@/layouts/Header.vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});

const userSafe = computed(() => {
    if (!props.user) return null;

    return {
        id: props.user.id || '',
        name: props.user.name || 'Administrateur',
        email: props.user.email || '',
        avatar: props.user.avatar || '/images/avatars/admin-avatar.jpg',
        role: props.user.role || 'admin',
        permissions: props.user.permissions || [],
        is_super_admin: props.user.is_super_admin || false,
        is_online: props.user.is_online || true,
        last_login_at: props.user.last_login_at || '',
        created_at: props.user.created_at || ''
    };
});
</script>

<style scoped>
/* Garder les mêmes styles que précédemment */
.admin-dashboard {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f1a2e 0%, #1a2b3e 100%);
    position: relative;
    overflow: hidden;
}

.admin-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.grid-pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(rgba(66, 133, 244, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(66, 133, 244, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black, transparent 70%);
}

.bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.1;
}

.shape-1 {
    width: 400px;
    height: 400px;
    top: -200px;
    right: -200px;
    background: #4285f4;
}

.shape-2 {
    width: 300px;
    height: 300px;
    bottom: -150px;
    left: -150px;
    background: #0f3460;
}

.shape-3 {
    width: 250px;
    height: 250px;
    top: 20%;
    left: 10%;
    background: #34a853;
}

.shape-4 {
    width: 200px;
    height: 200px;
    bottom: 30%;
    right: 10%;
    background: #ea4335;
}

.admin-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    z-index: 2;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.content-area {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    position: relative;
}
</style>
