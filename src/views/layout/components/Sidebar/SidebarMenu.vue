<template>
  <div class="sidebar-menu-container">
    <el-menu
      :active-text-color="variablesStore.cssVar.menuActiveText"
      :background-color="variablesStore.cssVar.menuBg"
      :default-active="defaultActiveRoute"
      :text-color="variablesStore.cssVar.menuText"
      router
      :collapse="!sidebarOpened"
    >
      <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
    </el-menu>
  </div>
</template>

<script lang="ts">
export default { name: 'sidebarMenu' }
</script>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { useGlobalStore } from '@/stores/global'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVariablesStore } from '@/stores/modules/variables'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { sidebarOpened } = storeToRefs(store)
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
const route = useRoute()
const defaultActiveRoute = computed(() => {
  return route.path
})
const variablesStore = useVariablesStore()
</script>

<style scoped></style>
