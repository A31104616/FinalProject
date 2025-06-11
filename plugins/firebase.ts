// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// 初始化 Firebase 並導出服務
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  console.log('Nuxt Runtime Config loaded')

  // Firebase configuration
  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId
  }

  // console.log('Initializing Firebase with config:', {
  //   ...firebaseConfig,
  //   apiKey: '[HIDDEN]'
  // })

  console.log('Firebase config loaded:', {
    ...firebaseConfig,
    apiKey: '[HIDDEN]'
  })

  // 初始化 Firebase
  const app = initializeApp(firebaseConfig)
  console.log('Firebase initialized successfully')

  // 初始化並導出服務
  const db = getFirestore(app)
  console.log('Firestore initialized successfully')

  const storage = getStorage(app)
  console.log('Storage initialized successfully')

  const auth = getAuth(app)
  console.log('Auth initialized successfully')
  // Nuxt plugin
  // return {
  //   provide: {
  //     firebase: {
  //       app,
  //       db,
  //       storage,
  //       auth
  //     }
  //   }
  // }
  return {
    provide: {
      firebase: { app, db, storage, auth }
    }
  }
})
