<!-- components/AppHeader.vue -->
<template>
  <header class="header">
    <nav class="nav">
      <!-- 漢堡選單按鈕 -->
      <button class="menu-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>

      <!-- 導覽列 -->
      <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
        <NuxtLink to="/" @click="closeMenu">首頁</NuxtLink>
        <NuxtLink to="/draw" @click="closeMenu">繪圖</NuxtLink>
        <NuxtLink to="/photo" @click="closeMenu">攝影</NuxtLink>
        <NuxtLink to="/upload" @click="closeMenu">上傳</NuxtLink>
      </div>

      <div class="search-wrapper">
        <div class="search-container">
          <div class="search-input-container">
            <select v-model="selectedCategory" class="category-select">
              <option value="draw">繪圖</option>
              <option value="photo">攝影</option>
            </select>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜尋..." 
              class="search-input"
              @keyup.enter="handleSearch"
            >
            <button class="search-button" @click="handleSearch">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref('draw')
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  router.push({
    path: `/${selectedCategory.value}`,
    query: { search: searchQuery.value }
  })
}
</script>

<style scoped>
.header {
  background-color: #20203D;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(318,636,282)'%3E%3Cstop offset='0' stop-color='%2320203D'/%3E%3Cstop offset='1' stop-color='%23406693'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='506' height='421.7' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.06'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  color: white;
  padding: 1rem 0;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #7289c2;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
}

.search-wrapper {
  flex: 1;
  max-width:500px;
  margin-left: 20px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input-container {
  flex: 1;
  display: flex;
  position: relative;
  color: rgb(255, 255, 255);
  background-color: #7d97bd99;
  border-radius: 8px;
  overflow: hidden;
}

.category-select {
  padding: 8px 12px;
  border: none;
  color: rgb(255, 255, 255);
  background-color: #42527b;
  cursor: pointer;
  border-right: 1px solid #405972;
}

.category-select:focus {
  outline: none;
}

.search-input {
  flex: 1;
  padding: 8px 20px 8px 12px;
  border: none;
  background-color: transparent;
  color: white;
}

.search-input::placeholder {
  color: #bdc3c7;
}

.search-input:focus {
  outline: none;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border: none;
  background: none;
  padding: 0 12px;
  color: #bdc3c7;
  cursor: pointer;
  transition: color 0.2s;
}

.search-button:hover {
  color: white;
}

/* 新增：整體容器懸停效果 */
.search-input-container:hover {
  background-color: #7d97bdc5;
}

@media (max-width: 576px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #2c3e50;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .nav-links.nav-active {
    display: flex;
  }

  .nav-links a {
    padding: 15px 20px;
    border-bottom: 1px solid #405972;
  }

  .nav-links a:last-child {
    border-bottom: none;
  }

  .nav-links a:hover {
    background-color: #3f566d;
  }

  .search-wrapper {
    max-width: none;
    width: auto;
    margin-left: 10px;
    flex: 1;
  }
}

@media (max-width: 768px) {
  .search-wrapper {
    max-width: 300px;
  }
}

@media (min-width: 577px) {
  .nav-links {
    display: flex !important;
    flex-direction: row;
  }
}
</style>