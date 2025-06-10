<template>
  <div class="upload-container">
    <h1>上傳作品</h1>
    
    <div class="category-select">
      <button 
        :class="['category-btn', { active: category === 'draw' }]"
        @click="category = 'draw'"
      >繪圖</button>
      <button 
        :class="['category-btn', { active: category === 'photo' }]"
        @click="category = 'photo'"
      >攝影</button>
    </div>

    <div class="upload-form">
      <!-- 圖片預覽 -->
      <div class="preview-section">
        <div 
          class="image-preview" 
          @click="triggerFileInput"
          :class="{ 'has-image': imagePreview }"
        >
          <img v-if="imagePreview" :src="imagePreview" alt="預覽">
          <div v-else class="upload-placeholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>點擊選擇圖片</p>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileChange"
          class="hidden"
        >
      </div>

      <!-- 表單區域 -->
      <div class="form-section">
        <!-- 繪圖表單 -->
        <div v-if="category === 'draw'" class="form-fields">
          <div class="form-field">
            <label>作品名稱</label>
            <input v-model="drawForm.name" type="text" required>
          </div>
          <div class="form-field">
            <label>作者</label>
            <input v-model="drawForm.artist" type="text" required>
          </div>
          <div class="form-field">
            <label>標籤 (用逗號分隔)</label>
            <input v-model="drawForm.tags" type="text" placeholder="例：Original, Girl">
          </div>
          <div class="form-field">
            <label>描述 (選填)</label>
            <textarea v-model="drawForm.status" rows="3"></textarea>
          </div>
        </div>

        <!-- 攝影表單 -->
        <div v-else class="form-fields">
          <div class="form-field">
            <label>地點 (用逗號分隔)</label>
            <input v-model="photoForm.place" type="text" required placeholder="例：台北, 信義區">
          </div>
          <div class="form-field">
            <label>標籤 (用逗號分隔)</label>
            <input v-model="photoForm.tags" type="text" placeholder="例：cityscape, night">
          </div>
          <div class="form-field">
            <label>描述 (選填)</label>
            <textarea v-model="photoForm.status" rows="3"></textarea>
          </div>
        </div>

        <button 
          @click="handleUpload" 
          class="upload-button"
          :disabled="!selectedFile || uploading"
        >
          {{ uploading ? '上傳中...' : '上傳' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '~/composables/useStorage'
import { useFirestore } from '~/composables/useFirestore'

const router = useRouter()
const { uploadFile } = useStorage()
const { addDocument } = useFirestore()

const category = ref('draw')
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const uploading = ref(false)

const drawForm = reactive({
  name: '',
  artist: '',
  tags: '',
  status: ''
})

const photoForm = reactive({
  place: '',
  tags: '',
  status: ''
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
    imagePreview.value = URL.createObjectURL(input.files[0])
  }
}

const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

const handleUpload = async () => {
  if (!selectedFile.value) return

  try {
    uploading.value = true
    console.log('開始上傳流程...')
    
    // 生成一個唯一的 ID（使用時間戳和隨機數）
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log('生成的文檔 ID:', id)
    
    // 上傳圖片到 Storage
    const storagePath = `${category.value}/${id}-${selectedFile.value.name}`
    console.log('準備上傳到 Storage 路徑:', storagePath)
    
    const imageUrl = await uploadFile(storagePath, selectedFile.value)
    console.log('Storage 上傳結果 URL:', imageUrl)
    
    if (!imageUrl) throw new Error('上傳圖片失敗')

    // 準備要存入 Firestore 的數據
    const currentDate = getCurrentDate()
    console.log('準備存入 Firestore...')
    
    if (category.value === 'draw') {
      const drawData = {
        name: drawForm.name,
        path: imageUrl,
        date: currentDate,
        model: '繪圖',
        artist: drawForm.artist,
        like: 0,
        tags: drawForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: drawForm.status
      }
      console.log('繪圖數據:', drawData)
      const docId = await addDocument('drawings', drawData, id)
      console.log('Firestore 文檔已創建，ID:', docId)
      router.push('/draw')
    } else {
      const photoData = {
        place: photoForm.place.split(',').map(place => place.trim()).filter(Boolean),
        path: imageUrl,
        date: currentDate,
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: photoForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: photoForm.status
      }
      console.log('攝影數據:', photoData)
      const docId = await addDocument('photos', photoData, id)
      console.log('Firestore 文檔已創建，ID:', docId)
      router.push('/photo')
    }
  } catch (error) {
    console.error('上傳失敗，詳細錯誤:', error)
    alert('上傳失敗，請檢查控制台查看詳細錯誤訊息')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.category-select {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.category-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background-color: #eee;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn.active {
  background-color: #3498db;
  color: white;
}

.upload-form {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.preview-section {
  width: 100%;
}

.image-preview {
  width: 100%;
  height: 300px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.image-preview.has-image {
  border-style: solid;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.upload-placeholder {
  text-align: center;
  color: #666;
}

.upload-placeholder i {
  font-size: 48px;
  margin-bottom: 10px;
}

.form-section {
  display: flex;
  flex-direction: column;
}

.form-fields {
  flex: 1;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.hidden {
  display: none;
}

.upload-button {
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background-color: #219a52;
}

.upload-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>