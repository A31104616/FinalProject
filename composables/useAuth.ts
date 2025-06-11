import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { ref } from 'vue'

export const useAuth = () => {
  const { $firebase } = useNuxtApp()
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // 監控用戶狀態
  onAuthStateChanged($firebase.auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })

  // 註冊
  const register = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword($firebase.auth, email, password)
      return userCredential.user
    } catch (e: any) {
      error.value = e.message
      return null
    }
  }

  // 登入
  const signIn = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await signInWithEmailAndPassword($firebase.auth, email, password)
      return userCredential.user
    } catch (e: any) {
      error.value = e.message
      return null
    }
  }

  // 登出
  const signOut = async () => {
    try {
      error.value = null
      await firebaseSignOut($firebase.auth)
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    }
  }

  return {
    user,
    loading,
    error,
    register,
    signIn,
    signOut
  }
}
