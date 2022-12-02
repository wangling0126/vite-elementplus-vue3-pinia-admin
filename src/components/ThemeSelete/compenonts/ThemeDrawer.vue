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
      <!-- <div class="common-item">
        <div class="title">{{ $t('暗黑模式') }}</div>
        <div class="select">
          <el-switch v-model="isDrak" @change="changeDrakMode" />
        </div>
      </div> -->
      <div class="common-item">
        <div class="title">{{ $t('灰色模式') }}</div>
        <div class="select">
          <el-switch v-model="isGrey" @change="changeGreyMode" />
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
export default { name: 'themeDrawer' }
</script>

<script setup lang="ts">
import ThemeColor from '@/components/ThemeSelete/compenonts/ThemeColor.vue'
import { addClass, removeClass } from '@/utils/dom'
// import { generateNewStyle, writeNewStyle } from '@/utils/theme'
// import { useThemeStore } from '@/stores/modules/theme'
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

// const isDrak = ref(false)
const isGrey = ref(false)
// const themeStore = useThemeStore()
// 暗黑模式
// const changeDrakMode = async (value: boolean) => {
//   // 1.1 获取主题色
//   const newStyleText = await generateNewStyle(
//     value ? '#000' : themeStore.mainColor
//   )
//   // 1.2 写入最新主题色
//   writeNewStyle(newStyleText as string)
// }
// 重大致敬 - > 置灰
const changeGreyMode = (value: boolean) => {
  const htmlDom = document.documentElement
  if (value) {
    addClass(htmlDom, 'filter-gray')
  } else {
    removeClass(htmlDom, 'filter-gray')
  }
}
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
