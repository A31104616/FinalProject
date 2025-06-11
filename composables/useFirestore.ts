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
  orderBy,
  Timestamp 
} from 'firebase/firestore'

// 基礎文檔接口
export interface FirestoreDocument {
  id: string;
  path: string;
  name?: string;
  artist?: string;
  model?: string;
  tags?: string[];
  place?: string[];
  status?: string;
  date: string | Date;
  like: number;
  createdAt: Date;
  updatedAt: Date;
}

export const useFirestore = () => {
  // 獲取集合中的所有文檔
  const getCollection = async <T extends FirestoreDocument>(collectionName: string): Promise<T[]> => {
    const { $firebase } = useNuxtApp()
    try {
      console.log(`正在獲取 ${collectionName} 集合的所有文檔...`)
      const querySnapshot = await getDocs(collection($firebase.db, collectionName))
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
      console.log(`成功獲取 ${documents.length} 個文檔`)
      return documents
    } catch (error) {
      console.error(`獲取集合 ${collectionName} 時發生錯誤:`, error)
      return []
    }
  }

  // 獲取單個文檔
const getDocument = async <T extends FirestoreDocument>(
    collectionName: string,
    docId: string
  ): Promise<T | null> => {
    const { $firebase } = useNuxtApp()
    try {
      console.log(`正在獲取文檔 ${collectionName}/${docId}...`)
      const docRef = doc($firebase.db, collectionName, docId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = {
          id: docSnap.id,
          ...docSnap.data()
        } as T
        console.log('文檔數據:', data)
        return data
      }
      console.log('文檔不存在')
      return null
    } catch (error) {
      console.error(`獲取文檔 ${collectionName}/${docId} 時發生錯誤:`, error)
      return null
    }
  }  // 添加文檔
  const addDocument = async (collectionName: string, data: any, customId?: string) => {
    const { $firebase } = useNuxtApp()
    try {
      console.log(`正在添加文檔到 ${collectionName}...`)
      console.log('原始文檔數據:', data)
      
      // 基本數據驗證
      if (!data || typeof data !== 'object') {
        throw new Error('無效的文檔數據');
      }

      // 建立一個新的物件來儲存清理後的數據
      const cleanData: Record<string, any> = {};

      // 處理主要欄位
      const fields = ['path', 'name', 'artist', 'model', 'status'] as const;
      fields.forEach((field: string) => {
        if (data[field]) {
          cleanData[field] = String(data[field]).trim();
        }
      });

      // 處理數字欄位
      if ('like' in data) {
        cleanData.like = Number(data.like) || 0;
      }

      // 處理標籤
      if (data.tags) {
        if (Array.isArray(data.tags)) {
          cleanData.tags = data.tags
            .filter((tag: unknown): tag is string => Boolean(tag))
            .map((tag: string) => String(tag).trim())
            .filter((tag: string) => tag.length > 0);
        } else if (typeof data.tags === 'string') {
          cleanData.tags = data.tags
            .split(',')
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag.length > 0);
        } else {
          cleanData.tags = [];
        }
      }

      // 處理日期欄位
      const dateFields = ['date', 'createdAt'] as const;
      dateFields.forEach((dateField: string) => {
        if (data[dateField]) {
          try {
            const date = new Date();
            cleanData[dateField] = Timestamp.fromDate(date);
          } catch (e) {
            console.error(`日期轉換錯誤 ${dateField}:`, e);
            cleanData[dateField] = Timestamp.fromDate(new Date());
          }
        }
      });

      console.log('清理後的數據:', cleanData);

      // 確保至少有必要的欄位
      const requiredFields = ['path', 'name'] as const;
      const missingFields = requiredFields.filter(field => !cleanData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`缺少必要欄位: ${missingFields.join(', ')}`);
      }

      if (customId) {
        const docRef = doc($firebase.db, collectionName, customId);
        await setDoc(docRef, cleanData);
        console.log(`成功使用自定義 ID ${customId} 添加文檔`);
        return customId;
      } else {
        const docRef = await addDoc(collection($firebase.db, collectionName), cleanData);
        console.log(`成功添加文檔，自動生成的 ID: ${docRef.id}`);
        return docRef.id;
      }
    } catch (error) {
      console.error(`添加文檔到 ${collectionName} 時發生錯誤:`, error);
      throw error;
    }
  }

  // 更新文檔
  const updateDocument = async (
    collectionName: string,
    docId: string,
    data: Partial<FirestoreDocument>
  ) => {
    const { $firebase } = useNuxtApp()
    const docRef = doc($firebase.db, collectionName, docId)
    await updateDoc(docRef, data)
  }

  return {
    getDocument,
    updateDocument
  }

  // 刪除文檔
  const deleteDocument = async (collectionName: string, docId: string) => {
    const { $firebase } = useNuxtApp()
    try {
      console.log(`正在刪除文檔 ${collectionName}/${docId}...`)
      const docRef = doc($firebase.db, collectionName, docId)
      await deleteDoc(docRef)
      console.log('文檔刪除成功')
      return true
    } catch (error) {
      console.error(`刪除文檔 ${collectionName}/${docId} 時發生錯誤:`, error)
      return false
    }
  }

  // 查詢文檔
  const queryDocuments = async (
    collectionName: string, 
    conditions: { field: string; operator: any; value: any }[],
    orderByField?: { field: string; direction: 'asc' | 'desc' }
  ) => {
    const { $firebase } = useNuxtApp()
    try {
      console.log(`正在查詢 ${collectionName} 集合...`)
      console.log('查詢條件:', conditions)
      
      const collectionRef = collection($firebase.db, collectionName)
      let queryRef = query(collectionRef)
      
      conditions.forEach(condition => {
        queryRef = query(queryRef, where(condition.field, condition.operator, condition.value))
      })

      if (orderByField) {
        queryRef = query(queryRef, orderBy(orderByField.field, orderByField.direction))
      }

      const querySnapshot = await getDocs(queryRef)
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log(`查詢成功，找到 ${documents.length} 個文檔`)
      return documents
    } catch (error) {
      console.error(`查詢文檔時發生錯誤:`, error)
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
