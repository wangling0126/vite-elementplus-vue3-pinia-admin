<template>
  <div class="sidebar-item-container">
    <el-sub-menu :index="route.path" v-if="route.children.length">
      <template #title>
        <svg-icon :icon="route.meta.icon"></svg-icon>
        <span class="sub-menu-title">{{
          $t(`route.${route.meta.title}`)
        }}</span>
      </template>
      <sidebar-item
        v-for="item in route.children"
        :key="item.path"
        :route="item"
      ></sidebar-item>
    </el-sub-menu>
    <el-menu-item :index="route.path" v-else>
      <svg-icon :icon="route.meta.icon"></svg-icon>
      <span class="sub-menu-title">{{ $t(`route.${route.meta.title}`) }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
export default { name: 'SidebarItem' }
</script>

<script setup lang="ts">
import { CustomRouteRecordRaw } from '@/router/interface/index'
interface Props {
  route: CustomRouteRecordRaw
}
defineProps<Props>()
</script>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

:deep .el-menu-item:hover {
  background-color: $subMenuHover;
}
</style>
