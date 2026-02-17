<script setup>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import Loader from "@/components/Layouts/Loader.vue";

const loading = ref(true);

onMounted(() => {
  const head = document.head;

  const tablerLink = document.createElement("link");
  tablerLink.rel = "stylesheet";
  tablerLink.type = "text/css";
  tablerLink.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
  head.appendChild(tablerLink);

  const weights = ["regular", "thin", "light", "bold", "fill", "duotone"];
  weights.forEach((weight) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `https://unpkg.com/@phosphor-icons/web@2.0.3/src/${weight}/style.css`;
    head.appendChild(link);
  });


  setTimeout(() => {
    loading.value = false;
  }, 1500);
});

import 'bootstrap/dist/css/bootstrap.min.css';
</script>


<template>
  <div id="app">
    <Loader v-if="loading" />
    <RouterView v-else />
  </div>
</template>



