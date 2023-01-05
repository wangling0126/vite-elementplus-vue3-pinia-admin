<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : 'not-active'"
        :style="{
          backgroundColor: isActive(tag) ? varStore.cssVar.menuBg : '',
          borderColor: isActive(tag) ? varStore.cssVar.menuBg : ''
        }"
        v-for="(tag, index) in tagsViewStore.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ $t(`route.${tag.meta.title}`) }}
        <svg-icon
          icon="close"
          v-show="!isActive(tag)"
          class="el-icon-close"
          @click.prevent.stop="onCloseClick(index)"
        />
      </router-link>
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script lang="ts">
export default { name: 'TagsView' }
</script>

<script setup lang="ts">
import ContextMenu from './ContextMenu.vue'
import { useTagsViewStore } from '@/stores/modules/tagsView'
import { useVariablesStore } from '@/stores/modules/variables'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const varStore = useVariablesStore()
const tagsViewStore = useTagsViewStore()
const route = useRoute()

/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (index: number) => {
  tagsViewStore.removeTagsView({
    type: 'index',
    index
  })
}

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: '0px',
  top: '0px'
})
/**
 * 展示 menu
 */
const openMenu = (event: MouseEvent, index: number) => {
  const { x, y } = event
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tags-view-wrapper {
  display: flex;
}
.tags-view-item {
  position: relative;
  cursor: pointer;
  height: 26px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  transition: all 0.3s;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active,
  &:hover {
    color: #fff;
    background-color: v-bind('varStore.cssVar.menuBg');
    border-color: v-bind('varStore.cssVar.menuBg');
    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 4px;
    }
  }

  // close 按钮
  .el-icon-close {
    width: 12px;
    height: 12px;
    line-height: 10px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 12px;
    margin-left: 10px;
    &:hover {
      transform: scale(1.2);
    }
  }
}
.not-active {
  &:hover {
    &::before {
      content: none;
    }
  }
}
</style>
