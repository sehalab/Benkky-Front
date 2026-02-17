<script setup>
import { BRow } from 'bootstrap-vue-next'
// import AppLayout from "@/views/AppLayout.vue";
// import ProjectTopCards from "@/components/Dashboard/Project/ProjectTopCards.vue";
// import ProjectOverview from "@/components/Dashboard/Project/ProjectOverview.vue";
// import ProjectOtherCards from "@/components/Dashboard/Project/ProjectOtherCards.vue";
</script>
<template>
  <div class="dashboard-wrapper">
    <AppLayout>
      <main class="dashboard-main">
        <b-row>
        <ProjectTopCards />
        <ProjectOverview />
        <ProjectOtherCards />
        </b-row>
      </main>
    </AppLayout>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  font-family: var(--font-inter, 'Inter', sans-serif);
}

.dashboard-wrapper :deep(h1),
.dashboard-wrapper :deep(h2),
.dashboard-wrapper :deep(h3),
.dashboard-wrapper :deep(h4),
.dashboard-wrapper :deep(h5),
.dashboard-wrapper :deep(h6) {
  font-family: var(--font-poppins, 'Poppins', sans-serif) !important;
  font-weight: 600;
}

.dashboard-wrapper :deep(.card-title),
.dashboard-wrapper :deep(.badge),
.dashboard-wrapper :deep(.btn) {
  font-family: var(--font-poppins, 'Poppins', sans-serif) !important;
}

.dashboard-wrapper :deep(table thead) {
  font-family: var(--font-poppins, 'Poppins', sans-serif) !important;
}

.dashboard-wrapper :deep(p),
.dashboard-wrapper :deep(.text-body),
.dashboard-wrapper :deep(.table td) {
  font-family: var(--font-inter, 'Inter', sans-serif) !important;
}
</style>
