<template>
  <div
    class="app-wrapper"
    :class="[store.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: varStore.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
        <TagsView />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { useGlobalStore } from '@/stores/global'
import { useVariablesStore } from '@/stores/modules/variables'
const store = useGlobalStore()
const varStore = useVariablesStore()
</script>
<style scoped lang="scss">
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
}

.fixed-header {
  width: calc(100vw - #{$sideBarWidth});
  box-shadow: 0 0 14px 6px rgba(0, 0, 0, 0.1);
}
.hideSidebar .fixed-header {
  width: calc(100vw - #{$hideSideBarWidth});
}
</style>
