<template>
  <div>
    <div class="profile">{{ $t('home.welcome') }}</div>
    <el-table :data="[]" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <el-input v-model="text" placeholder="请输入文字"></el-input>
  </div>
</template>

<script lang="ts">
export default { name: 'profile' }
</script>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<style scoped></style>
