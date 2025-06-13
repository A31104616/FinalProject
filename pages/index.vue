<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 頁面標題 -->
    <h1 class="text-4xl font-bold text-center mb-12 gradient-text">藝術作品展示</h1>

    <!-- 繪圖區塊 -->
    <section class="mb-16">
      <div class="section-header">
        <h2 class="text-3xl font-bold">
          <span class="gradient-text-blue">熱門繪圖作品</span>
        </h2>
        <div class="tag-container">
          <span class="tag" @click="navigateToTag('draw', mostCommonDrawTag)">
            #{{ mostCommonDrawTag }}
          </span>
        </div>
      </div>
      
      <div class="list-container">
        <button 
          v-if="canScrollLeftDraw" 
          class="scroll-button left" 
          @click="scrollList('drawList', 'left')"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

      <div class="list" ref="drawList">
        <NuxtLink 
          v-for="item in topDrawings" 
          :key="item.id" 
          :to="`/draw/${item.id}`" 
          class="card"
        >
          <div class="card-image-wrapper">
            <img :src="item.path" :alt="item.name" class="preview-image">
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.name }}</h3>
          </div>
        </NuxtLink>
      </div>

      <button 
        v-if="canScrollRightDraw" 
        class="scroll-button right" 
        @click="scrollList('drawList', 'right')"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    </section>

    <!-- 攝影區塊 -->
    <section class="mb-16">
      <div class="section-header">
        <h2 class="text-3xl font-bold">
          <span class="gradient-text-green">熱門攝影作品</span>
        </h2>
        <div class="tag-container">
          <span class="tag" @click="navigateToTag('photo', mostCommonphotoTag)">
            #{{ mostCommonphotoTag }}
          </span>
        </div>
      </div>
      
      <div class="list-container">
      <button 
        v-if="canScrollLeftPhoto" 
        class="scroll-button left" 
        @click="scrollList('photoList', 'left')"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="list" ref="photoList">
        <NuxtLink 
          v-for="item in topPhotos" 
          :key="item.id" 
          :to="`/photo/${item.id}`" 
          class="card"
        >
          <div class="card-image-wrapper">
            <img :src="item.path" :alt="item.place.join(' ')" class="preview-image">
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.place.join(' · ') }}</h3>
          </div>
        </NuxtLink>
      </div>

      <button 
        v-if="canScrollRightPhoto" 
        class="scroll-button right" 
        @click="scrollList('photoList', 'right')"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    </section>
  </div>
</template>

<script setup lang="ts">import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { drawData, photoData } from '~/data/drawData'

const router = useRouter()

// 新增滾動相關的 ref
const drawList = ref<HTMLElement | null>(null)
const photoList = ref<HTMLElement | null>(null)

// 新增滾動狀態追蹤
const canScrollLeftDraw = ref(false)
const canScrollRightDraw = ref(false)
const canScrollLeftPhoto = ref(false)
const canScrollRightPhoto = ref(false)

// 檢查是否可以向左滾動
const canScrollLeft = (refName: 'drawList' | 'photoList') => {
  const element = refName === 'drawList' ? drawList.value : photoList.value
  if (!element) return false
  return element.scrollLeft > 0
}

// 檢查是否可以向右滾動
const canScrollRight = (refName: 'drawList' | 'photoList') => {
  const element = refName === 'drawList' ? drawList.value : photoList.value
  if (!element) return false
  const hasMoreContent = element.scrollLeft + element.clientWidth < element.scrollWidth
  return hasMoreContent
}

// 更新檢查函數
const updateScrollButtons = () => {
  if (drawList.value) {
    canScrollLeftDraw.value = drawList.value.scrollLeft > 0
    canScrollRightDraw.value = 
      drawList.value.scrollLeft + drawList.value.clientWidth < drawList.value.scrollWidth
  }
  
  if (photoList.value) {
    canScrollLeftPhoto.value = photoList.value.scrollLeft > 0
    canScrollRightPhoto.value = 
      photoList.value.scrollLeft + photoList.value.clientWidth < photoList.value.scrollWidth
  }
}

// 監聽滾動事件以更新按鈕狀態
onMounted(() => {
  const handleScroll = () => {
    updateScrollButtons()
  }

  drawList.value?.addEventListener('scroll', handleScroll)
  photoList.value?.addEventListener('scroll', handleScroll)
  
  // 初始檢查
  nextTick(() => {
    updateScrollButtons()
  })

  // 監聽窗口大小變化
  window.addEventListener('resize', handleScroll)

  // 清理事件監聽器
  onUnmounted(() => {
    drawList.value?.removeEventListener('scroll', handleScroll)
    photoList.value?.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
})

// 滾動列表
const scrollList = (refName: 'drawList' | 'photoList', direction: 'left' | 'right') => {
  const element = refName === 'drawList' ? drawList.value : photoList.value
  if (!element) return
  
  const scrollAmount = element.clientWidth * 0.8
  element.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
  
  // 滾動後更新按鈕狀態
  nextTick(() => {
    updateScrollButtons()
  })
}

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
/* 漸層文字效果 */
.gradient-text {
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-blue {
  background: linear-gradient(45deg, #2980b9, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-green {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 標籤樣式 */
.tag-container {
  display: flex;
  gap: 10px;
}

.tag {
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

/* 卡片樣式優化 */
.list-container {
  position: relative;
  padding: 1rem 0;
}

/* 修改列表樣式為橫向滾動 */
.list {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
  /* 隱藏滾動條但保持功能 */
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}

.list::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

/* 滾動按鈕樣式 */
.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.scroll-button:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.scroll-button.left {
  left: -20px;
}

.scroll-button.right {
  right: -20px;
}

.card {
  flex: 0 0 280px;
  border: none;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.card-image-wrapper {
  position: relative;
  padding-top: 75%; /* 4:3 比例 */
  overflow: hidden;
}

.preview-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .preview-image {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  background: white;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .list {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .scroll-button {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
}

@media (max-width: 640px) {
  .list {
    grid-template-columns: 1fr;
  }
}
</style>