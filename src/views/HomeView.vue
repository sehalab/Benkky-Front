<!-- src/views/HomeView.vue -->
<template>
  <MainLayout>
    <div class="home">
      <h1>Bienvenue sur Benkky</h1>
      <p>Page d'accueil en cours de développement</p>
      <router-link to="/dashboard">Accéder au tableau de bord</router-link>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/layouts/MainLayout.vue'
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>
