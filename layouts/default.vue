<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
  </div>
  <AppFooter />
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>