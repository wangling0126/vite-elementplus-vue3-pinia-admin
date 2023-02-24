<template>
  <div class="app-main">
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component, route }">
      <div :style="{ padding: route.meta.noPadding ? 0 : '20px' }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </div>
    </router-view>
  </div>
</template>

<script lang="ts">
export default { name: 'AppMain' }
</script>

<script setup lang="ts">
import { isTags } from '@/utils/tagsView'
import { watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useTagsViewStore } from '@/stores/modules/tagsView'
const route = useRoute()

const tagsStore = useTagsViewStore()
watch(
  route,
  (to) => {
    if (!isTags(to.path)) {
      return
    }
    const { fullPath, meta, name, params, path, query } = to
    tagsStore.addTagsView({
      fullPath,
      meta,
      name,
      params,
      path,
      query
    } as RouteLocationNormalizedLoaded)
  },
  {
    immediate: true
  }
)
</script>

<style scoped scss>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  flex-shrink: 0;
  overflow-y: auto;
}
</style>
