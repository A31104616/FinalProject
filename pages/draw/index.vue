<template>
  <div>
    <div class="page-header">
    <button v-if="currentSearch" @click="clearSearch" class="clear-button">
      <span class="button-text">繪圖</span>
    </button>
    <h1>{{ displayTitle }}</h1>
    </div>
    <div class="pic-list">
      <div 
        class="pic-card" 
        v-for="item in filteredDraw" 
        :key="item.id"
        @click="navigateToDetail(item)"
      >
        <img :src="item.path" :alt="item.name" class="preview-image">
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <div class="tags-container">
            <span 
              v-for="tag in item.tags" 
              :key="tag" 
              class="tag"
              @click.stop="searchTag(tag)"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { drawData } from '~/data/drawData'

const draw = Object.values(drawData).map(item => ({
  ...item,
  date: item.date.split('/').join('-')
}))

const route = useRoute()
const router = useRouter()
const currentSearch = ref('')

// 監視 URL 參數變化
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    currentSearch.value = newSearch as string
  } else {
    currentSearch.value = ''
  }
}, { immediate: true })

const displayTitle = computed(() => currentSearch.value ? `${currentSearch.value}` : '繪圖')

// 清空搜尋並返回首頁
const clearSearch = (): void => {
  router.push('/draw')
}

// 處理標籤點擊
const searchTag = (tag: string): void => {
  router.push({ query: { search: tag } })
}

// 導航到詳情頁
const navigateToDetail = (item: any): void => {
  router.push(`/draw/${item.id}`)
}

// 過濾和排序圖片
const filteredDraw = computed(() => {
  let filtered = [...draw]
  
  if (currentSearch.value) {
    const query = currentSearch.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.name.toLowerCase().includes(query)
    )
  }
    
  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.page-header h1 {
  margin: 0;
  font-size: 2em;
}

.clear-button {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-text {
  font-size: 2em;
  font-weight: bold;
}

.clear-button:hover {
  background-color: #2980b9;
}

.pic-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.pic-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 350px;
  display: flex;
  flex-direction: column;
}

.pic-card:hover {
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

.pic-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  line-height: 1.4;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background-color: #eee;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tag:hover {
  background-color: #27ae60;
  color: white;
}
</style>
