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
  background-color: #2c3e50;
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
  color: #6094b7;
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
  background-color: #3f566d;
  border-radius: 8px;
  overflow: hidden;
}

.category-select {
  padding: 8px 12px;
  border: none;
  color: rgb(255, 255, 255);
  background-color: #597693;
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
  background-color: #405972;
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