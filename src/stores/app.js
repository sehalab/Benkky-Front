import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const loadingMessage = ref('')
  const notifications = ref([])

  function showLoading(message = '') {
    isLoading.value = true
    loadingMessage.value = message
  }

  function hideLoading() {
    isLoading.value = false
    loadingMessage.value = ''
  }

  function addNotification(notification) {
    notifications.value.push(notification)
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    isLoading,
    loadingMessage,
    notifications,
    showLoading,
    hideLoading,
    addNotification,
    removeNotification
  }
})
