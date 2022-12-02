<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import { useThemeStore } from './stores/modules/theme'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

// 初始化主题颜色
const themeStore = useThemeStore()
generateNewStyle(themeStore.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText as string)
})

// 初始化国际化
const store = useGlobalStore()
const locale = computed(() => (store.language === 'en' ? en : zhCn))
</script>

<style scoped></style>
