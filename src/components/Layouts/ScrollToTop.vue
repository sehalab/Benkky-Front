<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { IconChevronUp } from '@tabler/icons-vue'

const showButton = ref(false)

const handleScroll = () => {
  const doc = document.documentElement
  const scrollTop = doc.scrollTop

  showButton.value = scrollTop > 100
}

const scrollToTop = () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>


<template>
  <div
      v-if="showButton"
      class="go-top d-grid position-fixed"
      @click="scrollToTop"
  >
    <span class="progress-value d-flex align-items-center justify-content-center">
      <IconChevronUp :size="20" />
    </span>
  </div>
</template>

