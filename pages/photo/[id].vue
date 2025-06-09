<!-- pages/equipment/[id].vue -->
<template>
  <div>
    <div v-if="picture" class="detail">
      <div class="detail-grid">
        <div class="image-region">
          <img :src="picture.path" class="responsive-image">
        </div>
        <div class="info-section">
          <div class="header-section">
            <button class="like-button" @click="toggleLike">
              <span v-if="isLiked">★</span>
              <span v-else>☆</span>
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
                style="cursor: pointer;"
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
                style="cursor: pointer;"
              >{{ tag }}</span>
            </span>
          </p>
          <p class="info-item"><strong>讚 </strong><span>{{ picture.like }}</span></p>
          <p class="info-item status-title"><strong>作品介紹 </strong></p>
          <div class="status-region">
            <span :class="statusClass">{{ picture.status }}</span>
          </div>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { photoData } from '~/data/drawData'

const route = useRoute()
const router = useRouter()

// 根據路由參數獲取圖片資料
const picture = computed(() => {
  return photoData[route.params.id as string]
})

// 導航到標籤搜尋結果
const navigateToTag = (tag: string) => {
  router.push({
    path: '/photo',
    query: { search: tag }
  })
}

// 回報問題功能
const reportIssue = () => {
  alert('問題回報功能開發中...')
}

// 計算狀態樣式
const statusClass = computed(() => {
  return {
    'status-text': true
  }
})

// 管理喜歡狀態
const isLiked = ref(false)

// 切換喜歡狀態
const toggleLike = () => {
  const pictureId = route.params.id as string
  if (pictureId && photoData[pictureId]) {
    isLiked.value = !isLiked.value
    photoData[pictureId].like += isLiked.value ? 1 : -1
  }
}
</script>

<style scoped>
.image-region {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  /* 讓圖片區域可以自由滾動 */
  overflow-y: auto;
}

.responsive-image {
  width: 100%;
  max-width: 66.67vw; /* viewport width 的 2/3 */
  height: auto;
  object-fit: contain;
}

.detail-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 30px;
  margin: 20px 0px;
  align-items: start;
  min-height: calc(100vh - 40px); /* 視窗高度減去上下margin */
  position: relative;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-item strong {
  min-width: 80px;
  margin-right: 10px;
}

.status-title {
  margin-bottom: 4px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #2c3e50;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9em;
}

.status-region {
  padding: 12px;
  background-color: #d9d9db;
  border-radius: 8px;
  flex-grow: 1;
  height: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.like-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #e74c3c;
  padding: 8px;
  transition: transform 0.2s;
}

.like-button:hover {
  transform: scale(1.1);
}

.info-section, .specs-section {
  background-color: #ebedef;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px); /* 視窗高度減去margin和padding */
  position: sticky;
  top: 20px;
  overflow-y: auto;
}

.specs-section ul {
  list-style: none;
  padding: 0;
}

.specs-section li {
  margin: 8px 0;
}

.status-available {
  color: #27ae60;
  font-weight: bold;
}

.status-maintenance {
  color: #e74c3c;
  font-weight: bold;
}

.status-borrowed {
  color: #f39c12;
  font-weight: bold;
}

.actions {
  margin-top: 30px;
}

.actions button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:first-child {
  background-color: #3498db;
  color: white;
}

.actions button:last-child {
  background-color: #95a5a6;
  color: white;
}

.actions button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.not-found {
  text-align: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>