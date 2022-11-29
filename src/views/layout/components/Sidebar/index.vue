<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default { name: 'Sidebar' }
</script>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
</script>

<style scoped></style>
