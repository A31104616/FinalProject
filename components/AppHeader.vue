<!-- components/AppHeader.vue -->
<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-links">
        <NuxtLink to="/">首頁</NuxtLink>
        <NuxtLink to="/draw">繪圖</NuxtLink>
        <NuxtLink to="/photo">攝影</NuxtLink>
      </div>
    </nav>
  </header>
</template>

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
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>