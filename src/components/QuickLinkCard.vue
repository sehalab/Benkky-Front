<template>
  <Link
    :href="href"
    class="group bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
  >
    <div class="flex items-start space-x-4">
      <div :class="`w-12 h-12 rounded-lg ${iconColorClasses} flex items-center justify-center group-hover:scale-110 transition-transform`">
        <i :class="`fas fa-${icon} text-xl ${iconTextColor}`"></i>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-white group-hover:text-violet-300 transition-colors">
          {{ title }}
        </h4>
        <p class="text-sm text-gray-400 mt-1">
          {{ description }}
        </p>
      </div>
      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
        <i class="fas fa-arrow-right text-gray-500 group-hover:text-violet-400 transition-colors"></i>
      </div>
    </div>
  </Link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  icon: String,
  href: String,
  color: {
    type: String,
    default: 'violet',
    validator: (value) => ['violet', 'indigo', 'purple', 'blue'].includes(value)
  }
})

const iconColorClasses = computed(() => {
  const colors = {
    violet: 'bg-gradient-to-br from-violet-500/20 to-violet-600/20',
    indigo: 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/20',
    purple: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
    blue: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
  }
  return colors[props.color] || colors.violet
})

const iconTextColor = computed(() => {
  const colors = {
    violet: 'text-violet-400',
    indigo: 'text-indigo-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400'
  }
  return colors[props.color] || colors.violet
})
</script>
