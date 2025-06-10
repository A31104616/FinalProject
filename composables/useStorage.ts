import { 
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { storage } from '~/plugins/firebase'

export const useStorage = () => {
  // 上傳文件
  const uploadFile = async (path: string, file: File) => {
    try {
      console.log('開始上傳文件到 Storage...')
      console.log('上傳路徑:', path)
      console.log('文件大小:', file.size, 'bytes')
      
      const fileRef = storageRef(storage, path)
      console.log('Storage 參考已創建')
      
      const uploadResult = await uploadBytes(fileRef, file)
      console.log('文件已上傳到 Storage')
      
      const url = await getDownloadURL(uploadResult.ref)
      console.log('獲取到下載 URL:', url)
      
      return url
    } catch (error: any) {
      console.error('Storage 上傳錯誤:', error)
      console.error('詳細錯誤信息:', JSON.stringify(error, null, 2))
      return null
    }
  }

  // 刪除文件
  const deleteFile = async (path: string) => {
    try {
      const fileRef = storageRef(storage, path)
      await deleteObject(fileRef)
      return true
    } catch (error) {
      console.error('Error deleting file:', error)
      return false
    }
  }

  // 獲取文件 URL
  const getFileUrl = async (path: string) => {
    try {
      const fileRef = storageRef(storage, path)
      const url = await getDownloadURL(fileRef)
      return url
    } catch (error) {
      console.error('Error getting file URL:', error)
      return null
    }
  }

  return {
    uploadFile,
    deleteFile,
    getFileUrl
  }
}
