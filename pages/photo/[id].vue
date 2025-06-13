<!-- pages/equipment/[id].vue -->
<template>
  <div>
    <div v-if="picture" class="detail">
      <div class="detail-grid">
        <div class="image-region">
          <img :src="picture.path" class="responsive-image">
        </div>
        <div class="info-section">
          <div class="like-button-container">
            <button 
              class="like-button" 
              @click="handleLike"
              :disabled="isLiking"
              :class="{ 'liked': isLiked }"
            >
              <span v-if="isLiking">更新中...</span>
              <span v-else>
                <span class="like-icon">{{ isLiked ? '★' : '☆' }}</span>
                <span class="like-count">{{ likeCount }}</span>
              </span>
            </button>
          </div>
          
          <p class="info-item"><strong>類型 </strong><span>{{ picture.model }}</span></p>
          <p class="info-item"><strong>作者 </strong><span>{{ picture.artist }}</span></p>
          <p class="info-item"><strong>拍攝地點 </strong>
            <span class="tags-container">
              <span 
                v-for="place in picture.place" 
                :key="place" 
                class="tag"
                @click="navigateToTag(place)"
              >{{ place }}</span>
            </span>
          </p>
          <p class="info-item"><strong>日期 </strong><span>{{ picture.date }}</span></p>
          <p class="info-item"><strong>標籤 </strong>
            <span class="tags-container">
              <span 
                v-for="tag in picture.tags" 
                :key="tag" 
                class="tag"
                @click="navigateToTag(tag)"
              >{{ tag }}</span>
            </span>
          </p>
          <template v-if="picture.status && picture.status.trim()">
            <p class="info-item status-title"><strong>作品介紹 </strong></p>
            <div class="status-region">
              <span class="status-text">{{ picture.status }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>找不到圖片</h2>
      <p>圖片 "{{ route.params.id }}" 不存在</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { photoData } from '~/data/drawData'
import { useFirestore, type FirestoreDocument } from '~/composables/useFirestore'

interface PhotoDocument extends FirestoreDocument {
  place: string[];
  artist: string;
  model: string;
  tags: string[];
  status: string;
}

const route = useRoute()
const router = useRouter()
const { getDocument, updateDocument } = useFirestore()

const isLiked = ref(false)
const isLiking = ref(false)
const likeCount = ref(0)
const picture = ref<PhotoDocument | null>(null)

// 獲取圖片數據
const localphoto = computed(() => {
  return photoData[route.params.id as string]
})

onMounted(async () => {
  try {
    if (localphoto.value) {
      picture.value = {
        ...localphoto.value,
        like: 0, // 初始化點讚數
        id: route.params.id as string
      } as PhotoDocument
      
      // 從 Firestore 只獲取點讚數
      const firestoreData = await getDocument<PhotoDocument>('photos', route.params.id as string)
      if (firestoreData) {
        likeCount.value = firestoreData.like
      }
    } else {
    const data = await getDocument<PhotoDocument>('photos', route.params.id as string)
    if (data) {
      picture.value = data
      likeCount.value = data.like
    }
  }
  } catch (error) {
    console.error('獲取圖片數據失敗:', error)
  }
})

// 處理點讚
// ...existing imports...

// Add this interface
interface LikeData {
  like: number;
  isLiked: boolean;
}

// ...existing interface and setup code...

onMounted(async () => {
  try {
    // Get Firestore data first for like count
    const firestoreData = await getDocument<PhotoDocument>('photos', route.params.id as string)
    
    if (localphoto.value) {
      picture.value = {
        ...localphoto.value,
        like: firestoreData?.like || 0,
        id: route.params.id as string
      } as PhotoDocument
    } else if (firestoreData) {
      picture.value = firestoreData
    }

    // Set initial like count and state
    if (firestoreData) {
      likeCount.value = firestoreData.like
      isLiked.value = false // Reset like state
    }
  } catch (error) {
    console.error('獲取圖片數據失敗:', error)
  }
})

// Update handleLike function to toggle like
async function handleLike() {
  if (!picture.value || isLiking.value) return
  
  isLiking.value = true
  try {
    const newLikeCount = isLiked.value ? likeCount.value - 1 : likeCount.value + 1
    await updateDocument('photos', picture.value.id, { 
      like: newLikeCount
    })
    likeCount.value = newLikeCount
    isLiked.value = !isLiked.value // Toggle like state
  } catch (error) {
    console.error('點讚失敗:', error)
    alert('操作失敗，請稍後再試')
  } finally {
    isLiking.value = false
  }
}

// 處理標籤點擊
function navigateToTag(tag: string) {
  router.push({
    path: '/photo',
    query: { search: tag }
  })
}
</script>

<style scoped>
.detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .detail-grid {
    grid-template-columns: 3fr 2fr;
  }
}

.image-region {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  overflow-y: auto;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.info-section {
  position: relative;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  height: fit-content; /* 讓高度隨內容自適應 */
}

.like-button-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.like-button {
  padding: 8px 16px;
  background-color: #fff;
  border: 2px solid #ff4081;
  border-radius: 20px;
  color: #ff4081;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.like-button.liked {
  background-color: #ff4081;
  color: white;
}

.like-button.liked:hover {
  background-color: #ff1744;
}

.like-button:hover:not(:disabled) {
  background-color: #ff4081;
  color: white;
}

.like-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.like-icon {
  margin-right: 4px;
}

.info-item {
  margin-bottom: 15px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
}

.tag:hover {
  background-color: #d0d0d0;
}

.status-region {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
}

.not-found {
  text-align: center;
  padding: 40px;
}

.status-text {
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>