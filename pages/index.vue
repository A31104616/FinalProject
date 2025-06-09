<template>
    <!-- 繪圖區塊 -->
    <div class="section-header">
      <h2 class="text-2xl font-semibold">熱門繪圖作品</h2>
    </div>
    <h3 class="text-gray-600 mb-4 cursor-pointer hover:text-blue-600" @click="navigateToTag('draw', mostCommonDrawTag)">
      {{ mostCommonDrawTag }}
    </h3>
    <div class="list">
      <NuxtLink v-for="item in topDrawings" :key="item.id" :to="`/draw/${item.id}`" class="card">
        <img :src="item.path" :alt="item.id" class="preview-image">
        <div class="card-content">
          <p>{{ item.name }}</p>
        </div>
      </NuxtLink>
    </div>

<!-- 攝影區塊 -->
    <div class="section-header">
      <h2 class="text-2xl font-semibold">熱門攝影作品</h2>
    </div>
    <h3 class="text-gray-600 mb-4 cursor-pointer hover:text-green-600" @click="navigateToTag('photo', mostCommonphotoTag)">
      {{ mostCommonphotoTag }}
    </h3>
    <div class="list">
      <NuxtLink v-for="item in topPhotos" :key="item.id" :to="`/photo/${item.id}`" class="card">
        <img :src="item.path" :alt="item.id" class="preview-image">
        <div class="card-content">
          <p>{{ item.place.join(' ') }}</p>
        </div>
      </NuxtLink>
    </div>


</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { drawData, photoData } from '~/data/drawData'

const router = useRouter()

// 點擊標籤時的導航函數
const navigateToTag = (type: 'draw' | 'photo', tag: string) => {
  router.push({
    path: `/${type}`,
    query: { search: tag }
  })
}

// 計算最常見的繪圖標籤
const mostCommonDrawTag = computed(() => {
  // 將所有繪圖的標籤合併成一個數組
  const allTags = Object.values(drawData).flatMap(item => item.tags)
  // 計算每個標籤出現的次數
  const tagCount = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  // 找出出現次數最多的標籤
  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    [0][0]
})

// 處理繪圖資料
const topDrawings = computed(() => {
  const tag = mostCommonDrawTag.value
  return Object.values(drawData)
    .filter(item => item.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)  // 限制最多顯示5張
})

// 計算最常見的攝影標籤
const mostCommonphotoTag = computed(() => {
  // 將所有攝影的標籤合併成一個數組
  const allTags = Object.values(photoData).flatMap(item => item.tags)
  // 計算每個標籤出現的次數
  const tagCount = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  // 找出出現次數最多的標籤
  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    [0][0]
})

// 處理攝影資料
const topPhotos = computed(() => {
  const tag = mostCommonphotoTag.value
  return Object.values(photoData)
    .filter(item => item.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)  // 限制最多顯示5張
})
</script>

<style scoped>
.list {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

/* 自定義滾動條樣式 */
.list::-webkit-scrollbar {
  height: 8px;
}

.list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 300px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0; /* 防止卡片被壓縮 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  line-height: 1.4;
}

.card p {
  margin: 5px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>