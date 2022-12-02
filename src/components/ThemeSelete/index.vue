<template>
  <div class="global-settion-container">
    <el-tooltip :content="$t('主题改变')">
      <svg-icon icon="change-theme" @click="openThemeDrawer" />
    </el-tooltip>
    <ThemeDrawerVue v-model:visible="drawerVisible" />
  </div>
</template>

<script lang="ts">
export default { name: 'GlobalSetting' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeDrawerVue from './compenonts/ThemeDrawer.vue'

const drawerVisible = ref(false)
const openThemeDrawer = () => {
  drawerVisible.value = true
}
</script>

<style scoped></style>
