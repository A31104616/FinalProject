// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_xXc6ZvM9Eb-tNjSOPkb4igQCS5FpMh8",
  authDomain: "artphotogallery-d7552.firebaseapp.com",
  projectId: "artphotogallery-d7552",
  storageBucket: "artphotogallery-d7552.appspot.com",
  messagingSenderId: "951224899842",
  appId: "1:951224899842:web:3d335c4d7d0a3ab41e7dcc"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Storage
export const storage = getStorage(app)

// Initialize Auth
export const auth = getAuth(app)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      db,
      storage,
      auth
    }
  }
})
