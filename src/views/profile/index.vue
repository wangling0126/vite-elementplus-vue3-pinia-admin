<template>
  <div class="profile">{{ $t('home.welcome') }}</div>
  <el-table :data="[]" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts">
export default { name: 'profile' }
</script>

<script setup lang="ts"></script>

<style scoped></style>
