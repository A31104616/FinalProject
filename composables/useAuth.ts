import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth } from '~/plugins/firebase'
import { ref } from 'vue'

export const useAuth = () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // 監控用戶狀態
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })

  // 註冊
  const register = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
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
      await firebaseSignOut(auth)
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
