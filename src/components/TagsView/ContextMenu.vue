<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('tagsView.refresh') }}
    </li>
    <li @click="onCloseCurrentClick">
      {{ $t('tagsView.closeCurrent') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsViewStore } from '@/stores/modules/tagsView'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const tagsViewStore = useTagsViewStore()

const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}
const onCloseCurrentClick = () => {
  tagsViewStore.removeTagsView({
    type: 'index',
    index: props.index
  })
}
const onCloseRightClick = () => {
  tagsViewStore.removeTagsView({
    type: 'right',
    index: props.index
  })
}

const onCloseOtherClick = () => {
  tagsViewStore.removeTagsView({
    type: 'other',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
