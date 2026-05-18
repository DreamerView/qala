import { computed, readonly, ref } from 'vue'

const user = ref(null)
const accessToken = ref('')
const isLoading = ref(false)
const error = ref('')

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))

  const clearError = () => {
    error.value = ''
  }

  const signIn = async (payload) => {
    isLoading.value = true
    clearError()

    try {
      console.log('SignIn payload:', payload)

      user.value = {
        login: payload.login,
      }

      accessToken.value = 'demo-access-token'

      return true
    } catch {
      error.value = 'Не удалось войти в систему.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async (payload) => {
    isLoading.value = true
    clearError()

    try {
      console.log('SignUp payload:', payload)

      user.value = {
        phone: payload.phone,
        nickname: payload.nickname,
      }

      accessToken.value = 'demo-access-token'

      return true
    } catch {
      error.value = 'Не удалось создать аккаунт.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = ''
    clearError()
  }

  return {
    user: readonly(user),
    accessToken: readonly(accessToken),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isAuthenticated,

    signIn,
    signUp,
    logout,
    clearError,
  }
}