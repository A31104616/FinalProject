import { 
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore'

interface FileUploadResult {
  success: boolean;
  id: string;
  url: string;
  error?: string;
}

interface FileMetadata {
  id: string;
  name?: string;
  artist?: string;
  model?: string;
  tags?: string[];
  place?: string[];
  status?: string;
  date: string | Date;
  like: number;
  createdAt: Date;
}

export const useStorage = () => {
  // 上傳文件並保存元數據到 Firestore
  const uploadFileWithMetadata = async (
    file: File,
    storagePath: string,
    collectionName: string,
    metadata: Partial<FileMetadata>
  ): Promise<{
    success: boolean;
    id?: string;
    url?: string;
    error?: string;
  }> => {
    const { $firebase } = useNuxtApp()
    try {
      // 上傳文件到 Storage
      const fileRef = storageRef($firebase.storage, storagePath)
      await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(fileRef)

      // 保存數據到 Firestore
      const collectionRef = collection($firebase.db, collectionName)
      const docRef = await addDoc(collectionRef, {
        ...metadata,
        path: downloadURL,
        like: 0,
        date: new Date().toISOString()
      })

      return {
        success: true,
        id: docRef.id,
        url: downloadURL
      }
    } catch (error) {
      console.error('上傳失敗:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : '上傳失敗'
      }
    }
  }

  return {
    uploadFileWithMetadata
  }

  // 刪除文件及其元數據
  const deleteFileWithMetadata = async (
    storagePath: string,
    collectionName: string,
    docId: string
  ) => {
    const { $firebase } = useNuxtApp()
    
    try {
      // 1. 刪除 Storage 中的文件
      const fileRef = storageRef($firebase.storage, storagePath)
      await deleteObject(fileRef)
      
      // 2. 刪除 Firestore 中的元數據
      const docRef = doc($firebase.db, collectionName, docId)
      await deleteDoc(docRef)
      
      return true
    } catch (error) {
      console.error('刪除過程發生錯誤:', error)
      throw error
    }
  }

  // 更新文件元數據
  const updateFileMetadata = async (
    collectionName: string,
    docId: string,
    metadata: any
  ) => {
    const { $firebase } = useNuxtApp()
    
    try {
      const docRef = doc($firebase.db, collectionName, docId)
      await updateDoc(docRef, {
        ...metadata,
        updatedAt: Timestamp.fromDate(new Date())
      })
      
      return true
    } catch (error) {
      console.error('更新元數據時發生錯誤:', error)
      throw error
    }
  }

  // 上傳文件（僅 Storage）
  const uploadFile = async (path: string, file: File) => {
    const { $firebase } = useNuxtApp()
    
    try {
      console.log('開始上傳文件到 Storage...')
      console.log('上傳路徑:', path)
      console.log('文件大小:', file.size, 'bytes')
      
      const fileRef = storageRef($firebase.storage, path)
      console.log('Storage 參考已創建')
      
      const uploadResult = await uploadBytes(fileRef, file)
      console.log('文件已成功上傳到 Storage')
      
      const url = await getDownloadURL(uploadResult.ref)
      console.log('成功獲取下載 URL:', url)
      
      return url
    } catch (error: any) {
      console.error('Storage 上傳錯誤:', error)
      console.error('詳細錯誤信息:', JSON.stringify(error, null, 2))
      return null
    }
  }

  // 刪除文件（僅 Storage）
  const deleteFile = async (path: string) => {
    const { $firebase } = useNuxtApp()
    
    try {
      const fileRef = storageRef($firebase.storage, path)
      await deleteObject(fileRef)
      return true
    } catch (error) {
      console.error('Error deleting file:', error)
      return false
    }
  }

  return {
    uploadFile,
    deleteFile,
    uploadFileWithMetadata,
    deleteFileWithMetadata,
    updateFileMetadata
  }
}
