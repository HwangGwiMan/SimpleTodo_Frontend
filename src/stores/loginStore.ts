import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const accessToken = ref(localStorage.getItem('accessToken') || '')
  const refreshToken = ref(localStorage.getItem('refreshToken') || '')
  const isLoggedIn = ref(!!localStorage.getItem('accessToken'))
  const username = ref(localStorage.getItem('username') || '')
  const userId = ref<number | null>(localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null)

  const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken
    localStorage.setItem('accessToken', newAccessToken)
  }

  const setRefreshToken = (newRefreshToken: string) => {
    refreshToken.value = newRefreshToken
    localStorage.setItem('refreshToken', newRefreshToken)
  }

  const getAccessToken = () => {
    return accessToken.value
  }

  const getRefreshToken = () => {
    return refreshToken.value
  }

  const clearToken = () => {
    accessToken.value = ''
    refreshToken.value = ''
    isLoggedIn.value = false
    username.value = ''
    userId.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')

    // 새로고침
    window.location.reload()
  }

  const loginAccess = (newAccessToken: string, newRefreshToken: string, newUsername: string, newUserId: number) => {
    setAccessToken(newAccessToken)
    setRefreshToken(newRefreshToken)
    isLoggedIn.value = true
    username.value = newUsername
    userId.value = newUserId
    localStorage.setItem('username', newUsername)
    localStorage.setItem('userId', String(newUserId))
  }

  return { getAccessToken, getRefreshToken, clearToken, isLoggedIn, loginAccess, username, userId }
})
