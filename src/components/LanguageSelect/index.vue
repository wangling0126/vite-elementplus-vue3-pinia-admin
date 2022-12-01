<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon :icon="`lang_${language}`" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
export default { name: 'LanguageSelect' }
</script>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from '@/stores/global'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value: string) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const globalStore = useGlobalStore()
const language = computed(() => globalStore.language)
// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang: string) => {
  i18n.locale.value = lang
  globalStore.setLanguage(lang)
  ElMessage.success(i18n.t('message.更新成功'))
}
</script>

<style scoped></style>
