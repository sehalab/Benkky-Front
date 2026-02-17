<script setup>
defineProps({
  iconId: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 20
  }
})
</script>

<template>
  <svg
      stroke="currentColor"
      stroke-width="1.5"
      :width="size"
      :height="size"
      :class="className"
  >
    <use :href="`/svg/_sprite.svg#${iconId}`" />
  </svg>
</template>
