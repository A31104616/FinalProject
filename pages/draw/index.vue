<template>
  <div>
    <div class="page-header">
      <button v-if="currentSearch" @click="clearSearch" class="clear-button">
        <span class="button-text">繪圖</span>
      </button>
      <h1>{{ displayTitle }}</h1>
      <!-- 添加卡片大小選擇器 -->
      <div class="size-selector">
        <div class="size-button-group">
          <button 
            v-for="size in availableSizes" 
            :key="size"
            @click="cardSize = size"
            :class="['size-button', { active: cardSize === size }]"
          >
            {{ getSizeLabel(size) }}
          </button>
        </div>
      </div>
    </div>
    <div class="pic-list" :class="cardSize">
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
import { collection, getDocs } from 'firebase/firestore'

interface DrawItem {
  id: string;
  path: string;
  name: string;
  tags: string[];
  date: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

const route = useRoute()
const router = useRouter()
const currentSearch = ref('')
const firestoreDrawings = ref<DrawItem[]>([])
// 添加卡片大小狀態
const cardSize = ref('medium')
const availableSizes = ref(['small', 'medium', 'large'])

const localDraw: DrawItem[] = Object.values(drawData).map(item => ({
  id: item.id,
  path: item.path,
  name: item.name,
  tags: item.tags,
  date: item.date.split('/').join('-'),
  // isLocal: true,
  createdAt: undefined // explicitly set createdAt for local items
}))

const fetchFirestoreDrawings = async () => {
  try {
    const { $firebase } = useNuxtApp()
    const querySnapshot = await getDocs(collection($firebase.db, 'drawings'))
    
    const drawings = querySnapshot.docs.map(doc => {
      const data = doc.data()
      if (!data.createdAt) return null
      return {
        id: doc.id,
        path: data.path || '',
        name: data.name || '',
        tags: data.tags || [],
        date: data.date || '',
        createdAt: data.createdAt,
        // isFirestore: true // 標記為 Firestore 圖片
      } as DrawItem
    })
    .filter((item): item is DrawItem => item !== null) // 添加類型保護過濾器

    firestoreDrawings.value = drawings
    console.log('Firestore drawings loaded:', drawings)
  } catch (error) {
    console.error('Error fetching Firestore drawings:', error)
  }
}

// 在組件掛載時獲取 Firestore 數據
onMounted(() => {
  fetchFirestoreDrawings()
})

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
  // 合併本地和 Firestore 的圖片
  // let allDrawings = [...localDraw, ...firestoreDrawings.value]
  let allDrawings = [...localDraw]
  if (firestoreDrawings.value) {
    allDrawings = [...allDrawings, ...firestoreDrawings.value]
  }
  
  if (currentSearch.value) {
    const query = currentSearch.value.toLowerCase()
    allDrawings = allDrawings.filter(item => 
      item.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      item.name?.toLowerCase().includes(query)
    )
  }
    
  return allDrawings.sort((a, b) => {
    const dateA = a.date.split('/').join('-')
    const dateB = b.date.split('/').join('-')

    if (dateA !== dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    }

    const getDateTime = (item: DrawItem) => {
      if (item.createdAt) {
        return new Date(item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000).getTime()
      }
      return new Date(`${item.date.split('/').join('-')}T00:00:00`).getTime()
    }

    return getDateTime(b) - getDateTime(a)
  })
})

// 獲取大小標籤
const getSizeLabel = (size: string) => {
  const labels = {
    small: '小',
    medium: '中',
    large: '大'
  }
  return labels[size as keyof typeof labels]
}

// 監聽視窗大小變化
onMounted(() => {
  // 初始化檢查
  checkScreenSize()
  // 監聽視窗大小變化
  window.addEventListener('resize', checkScreenSize)
})

// 清理監聽器
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// 檢查螢幕大小並更新選項
const checkScreenSize = () => {
  if (window.innerWidth < 768) {
    availableSizes.value = ['small', 'large']
    // 如果當前選擇是 medium，自動切換到 small
    if (cardSize.value === 'medium') {
      cardSize.value = 'small'
    }
  } else {
    availableSizes.value = ['small', 'medium', 'large']
  }
}
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

.size-selector {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.size-button-group {
  display: flex;
  background-color: #f5f5f5;
  padding: 4px;
  border-radius: 8px;
  gap: 0;
}

.size-button {
  padding: 6px 12px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
  font-size: 0.9em;
  position: relative;
}

.size-button.active {
  background-color: #3498db;
  color: white;
  border-radius: 6px;
}

.size-button:not(.active):hover {
  color: #3498db;
}

.pic-list {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

/* 修改卡片列表樣式 */
.pic-list.small {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.pic-list.medium {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.pic-list.large {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

/* 調整不同大小卡片的圖片高度 */
.pic-list.small .preview-image {
  height: 150px;
}

.pic-list.medium .preview-image {
  height: 250px;
}

.pic-list.large .preview-image {
  height: 350px;
}

/* 調整不同大小卡片的最小高度 */
.pic-list.small .pic-card {
  min-height: 250px;
}

.pic-list.medium .pic-card {
  min-height: 350px;
}

.pic-list.large .pic-card {
  min-height: 450px;
}

.pic-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  /* min-height: 350px; */
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
@media (max-width: 480px) {
  /* 修改卡片列表樣式 */
  .pic-list.small {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .pic-list.medium {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .pic-list.large {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

  /* 調整不同大小卡片的圖片高度 */
  .pic-list.small .preview-image {
    height: 111px;
  }

  .pic-list.medium .preview-image {
    height: 150px;
  }

  .pic-list.large .preview-image {
    height: 300px;
  }
  /* 調整不同大小卡片的最小高度 */
  .pic-list.small .pic-card {
    min-height: 200px;
  }

  .pic-list.medium .pic-card {
    min-height: 250px;
  }

  .pic-list.large .pic-card {
    min-height: 450px;
  }
}
</style>
