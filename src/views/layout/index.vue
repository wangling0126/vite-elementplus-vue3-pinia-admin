<template>
  <div class="layout-container">
    首页

    <el-button type="primary" style="width: 100%" @click="test"
      >测试请求</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { getTest } from '@/api/modules/user'
const test = () => {
  getTest().then((res) => {
    console.log(res, '测试')
  })
}
</script>
<style scoped lang="scss">
.layout-container {
  font-size: 100px;
  color: red;
}
</style>
