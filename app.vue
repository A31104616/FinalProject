<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initializeLikeCounts } from '~/data/drawData'

// 在應用啟動時初始化點讚數
onMounted(async () => {
  await initializeLikeCounts()
})
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.css';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>