<template>
  <div class="print-page">
    <el-tabs type="border-card">
      <el-tab-pane label="一页">
        <OnePagePrint />
      </el-tab-pane>
      <el-tab-pane label="多页">
        <MorePagePrint />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
export default { name: 'PrintPage' }
</script>

<script setup lang="ts">
import OnePagePrint from './OnePagePrint.vue'
import MorePagePrint from './MorePagePrint.vue'
</script>

<style scoped></style>
