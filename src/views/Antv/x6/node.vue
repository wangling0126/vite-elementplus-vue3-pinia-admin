<template>
  <div class="node-element">
    <div class="title">
      {{ question.title }}
    </div>
    <div v-for="item in question.list" :key="item" class="question-item">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'nodeElement' }
</script>

<script setup lang="ts">
export interface Question {
  id: number
  title: string
  // type: '01' | '02' | '03'
  list: string[]
}
defineProps<{
  question: Question
}>()
</script>
<style scoped lang="scss">
.node-element {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  padding: 4px;
  .title {
    font-weight: 700;
  }
}
</style>
