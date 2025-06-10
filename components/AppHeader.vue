<!-- components/AppHeader.vue -->
<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-links">
        <NuxtLink to="/">首頁</NuxtLink>
        <NuxtLink to="/draw">繪圖</NuxtLink>
        <NuxtLink to="/photo">攝影</NuxtLink>
        <NuxtLink to="/upload">上傳</NuxtLink>

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
  padding: 8px 40px 8px 12px;
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
</style>