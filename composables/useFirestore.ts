import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'

export const useFirestore = () => {
  // 獲取集合中的所有文檔
  const getCollection = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting collection:', error)
      return []
    }
  }

  // 獲取單個文檔
  const getDocument = async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(db, collectionName, docId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      }
      return null
    } catch (error) {
      console.error('Error getting document:', error)
      return null
    }
  }

  // 添加文檔（支持自定義 ID）
  const addDocument = async (collectionName: string, data: any, customId?: string) => {
    try {
      if (customId) {
        const docRef = doc(db, collectionName, customId)
        await setDoc(docRef, data)
        return customId
      } else {
        const docRef = await addDoc(collection(db, collectionName), data)
        return docRef.id
      }
    } catch (error) {
      console.error('Error adding document:', error)
      return null
    }
  }

  // 更新文檔
  const updateDocument = async (collectionName: string, docId: string, data: any) => {
    try {
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, data)
      return true
    } catch (error) {
      console.error('Error updating document:', error)
      return false
    }
  }

  // 刪除文檔
  const deleteDocument = async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(db, collectionName, docId)
      await deleteDoc(docRef)
      return true
    } catch (error) {
      console.error('Error deleting document:', error)
      return false
    }
  }
  // 查詢文檔
  const queryDocuments = async (
    collectionName: string, 
    conditions: { field: string; operator: any; value: any }[],
    orderByField?: { field: string; direction: 'asc' | 'desc' }
  ) => {
    try {
      const collectionRef = collection(db, collectionName)
      
      // 構建查詢
      let queryRef = query(collectionRef)
      
      // 添加條件
      conditions.forEach(condition => {
        queryRef = query(queryRef, where(condition.field, condition.operator, condition.value))
      })

      // 添加排序
      if (orderByField) {
        queryRef = query(queryRef, orderBy(orderByField.field, orderByField.direction))
      }

      const querySnapshot = await getDocs(queryRef)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error querying documents:', error)
      return []
    }
  }

  return {
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    queryDocuments
  }
}
