import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const getUser = computed(() => user.value)

  async function login(credentials) {
    try {
      const response = await api.post('/login', credentials)
      const { token: authToken, user: userData } = response.data

      token.value = authToken
      user.value = userData
      localStorage.setItem('token', authToken)

      return response
    } catch (error) {
      throw error
    }
  }

  async function register(userData) {
    try {
      const response = await api.post('/register', userData)
      const { token: authToken, user: userData } = response.data

      token.value = authToken
      user.value = userData
      localStorage.setItem('token', authToken)

      return response
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      await api.post('/logout')
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      const response = await api.get('/user')
      user.value = response.data
    } catch (error) {
      logout()
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    getUser,
    login,
    register,
    logout,
    fetchUser
  }
})
