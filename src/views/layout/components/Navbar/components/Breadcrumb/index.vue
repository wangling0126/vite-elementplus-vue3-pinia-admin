<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item>
        <a class="redirect" @click.prevent="goHome">{{ $t('首页') }}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          $t(`route.${item.meta.title}`)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          $t(`route.${item.meta.title}`)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useVariablesStore } from '@/stores/modules/variables'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CustomRouteRecordRaw } from '@/router/interface/index'
// 处理点击事件
const router = useRouter()
const variablesStore = useVariablesStore()

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref<CustomRouteRecordRaw>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
const onLinkClick = (item) => {
  router.push(item.path)
}

const goHome = () => {
  router.push('/')
}

// 将来需要进行主题替换，所以这里获取下动态样式
const linkHoverColor = ref(variablesStore.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
