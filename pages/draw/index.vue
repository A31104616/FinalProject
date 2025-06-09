<template>
  <div>
    <h1>{{ displayTitle }}</h1>
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜尋標籤..."
        class="search-input"
        @keyup.enter="handleSearch"
      >
      <button @click="handleSearch" class="search-button">搜尋</button>
      <button @click="clearSearch" class="clear-button">清空</button>
    </div>    <div class="pic-list">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { drawData } from '~/data/drawData'

// 將物件轉換為陣列並格式化日期
const draw = Object.values(drawData).map(item => ({
  ...item,
  date: item.date.split('/').join('-') // 轉換日期格式為 YYYY-MM-DD
}))

const route = useRoute()
const searchQuery = ref('')
const currentSearch = ref('')

// 在組件掛載時檢查 URL 參數
onMounted(() => {
  if (route.query.search) {
    currentSearch.value = route.query.search as string
  }
})

const displayTitle = computed(() => currentSearch.value || '繪圖')

// 處理搜尋
const handleSearch = () => {
  currentSearch.value = searchQuery.value
  searchQuery.value = ''
}

// 處理標籤點擊
const searchTag = (tag: string): void => {
  currentSearch.value = tag
}

// 清空搜尋
const clearSearch = (): void => {
  searchQuery.value = ''
  currentSearch.value = ''
}

// 導航到詳情頁
const router = useRouter()
const navigateToDetail = (item: any): void => {
  router.push(`/draw/${item.id}`)
}

// 用computed屬性對圖片進行過濾和排序
const filteredDraw = computed(() => {
  let filtered = [...draw]
  
  // 如果有搜尋條件，過濾包含該標籤的圖片
  if (currentSearch.value) {
    const query = currentSearch.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
    // 按日期排序
  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
})
</script>

<style scoped>
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

.pic-card p {
  margin: 5px 0;
}

.search-container {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 8px 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #219a52;
}

.clear-button {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: #c0392b;
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
