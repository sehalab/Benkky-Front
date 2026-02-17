<script setup>
import { ref, watch, onMounted } from 'vue'
import { PhMoonStars, PhSunDim } from '@phosphor-icons/vue'

const theme = ref(localStorage.getItem('theme-mode') || 'light')

const applyTheme = (themeValue) => {
  document.body.classList.remove('light', 'dark')
  document.body.classList.add(themeValue)
}

onMounted(() => {
  applyTheme(theme.value)
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme-mode', theme.value)
}

watch(theme, (newTheme) => {
  applyTheme(newTheme)
})
</script>

<template>
  <div
      v-if="theme === 'light'"
      class="d-block head-icon bg-light-dark rounded-circle f-s-22 p-2 cursor-pointer"
      @click="toggleTheme"
  >
    <PhMoonStars size="24" weight="regular" />
  </div>

  <div
      v-else
      class="d-block head-icon bg-light-dark rounded-circle f-s-22 p-2 cursor-pointer"
      @click="toggleTheme"
  >
    <PhSunDim size="24" weight="regular" />
  </div>
</template>
