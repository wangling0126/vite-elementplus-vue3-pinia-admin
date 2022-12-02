<template>
  <el-drawer
    :title="$t('全局设置')"
    :model-value="visible"
    :before-close="handleClose"
    class="custom-theme-drawer"
    custom-class="custom-theme-drawer"
  >
    <el-divider>{{ $t('全局主题') }}</el-divider>
    <div class="common-container">
      <div class="common-item">
        <div class="title">{{ $t('主题颜色') }}</div>
        <div class="select"><ThemeColor /></div>
      </div>
      <div class="common-item">
        <div class="title">{{ $t('暗黑模式') }}</div>
        <div class="select"><el-switch v-model="isDrak" /></div>
      </div>
      <div class="common-item">
        <div class="title">{{ $t('灰色模式') }}</div>
        <div class="select"><el-switch v-model="isGrey" /></div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
export default { name: 'themeDrawer' }
</script>

<script setup lang="ts">
import ThemeColor from '@/components/ThemeSelete/compenonts/ThemeColor.vue'
import { ref } from 'vue'
interface Props {
  visible: boolean
}
withDefaults(defineProps<Props>(), {
  visible: false
})
const emit = defineEmits(['update:visible'])
const handleClose = () => {
  emit('update:visible', false)
}

const isDrak = ref(false)
const isGrey = ref(false)
</script>

<style lang="scss">
.custom-theme-drawer .el-drawer__body {
  border-top: 1px var(--el-border-color) var(--el-border-style);
}
</style>
<style lang="scss" scoped>
.common-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
