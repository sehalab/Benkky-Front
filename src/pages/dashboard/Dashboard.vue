<script setup>
import { BRow } from 'bootstrap-vue-next'
// import AppLayout from "@/views/AppLayout.vue";
import ProjectTopCards from "@/components/Dashboard/Project/ProjectTopCards.vue";
import ProjectOverview from "@/components/Dashboard/Project/ProjectOverview.vue";
import ProjectOtherCards from "@/components/Dashboard/Project/ProjectOtherCards.vue";
import GlobalMoneyGlobe from '@/components/GlobalMoneyGlobe.vue'
</script>
<template>
  <AppLayout>
    <main>
      <b-row>
      <ProjectTopCards />
      <ProjectOverview />
      <ProjectOtherCards />
        <div class="my-page">
    <GlobalMoneyGlobe
      :autoRotate="true"
      :rotationSpeed="0.001"
      :showControls="false"
    />
  </div>
      </b-row>
    </main>
  </AppLayout>
</template>
