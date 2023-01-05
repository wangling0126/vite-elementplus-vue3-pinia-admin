import { router } from '@/router'
import { TAGS_VIEW } from '@/constant'
import { LStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'
type RemoveTagsViewParams = {
  type: 'index' | 'other' | 'right'
  index: number
}
export const useTagsViewStore = defineStore('tagsView', {
  state() {
    return {
      tagsViewList: LStorage.get(TAGS_VIEW) || []
    }
  },
  actions: {
    /**
     * 添加tag,不能重复
     */
    addTagsView(tag: RouteLocationNormalizedLoaded) {
      const isFind = this.tagsViewList.find(
        (item: RouteLocationNormalizedLoaded) => item.path === tag.path
      )
      if (!isFind) {
        this.tagsViewList.push(tag)
        LStorage.set(TAGS_VIEW, this.tagsViewList)
      }
    },
    /**
     *
     * jumpRoute
     */
    jumpRoute() {
      const currentRoute = this.router.currentRoute.value
      const isFind = this.tagsViewList.find(
        (item: RouteLocationNormalizedLoaded) => item.path === currentRoute.path
      )
      if (isFind) {
        return
      }
      this.router.push(this.tagsViewList[0].path)
    },
    /**
     * 移除标签payload{type: other|index|right, index: number}
     */
    removeTagsView(payload: RemoveTagsViewParams) {
      const { type, index } = payload
      // 关闭当前l'
      if (type === 'index') {
        this.tagsViewList.splice(index, 1)
      } else if (type === 'other') {
        // 关闭其他
        this.tagsViewList = [this.tagsViewList[index]]
      } else if (type === 'right') {
        // 关闭右侧
        this.tagsViewList.splice(index + 1)
      }
      this.jumpRoute()
      LStorage.set(TAGS_VIEW, this.tagsViewList)
    }
  }
})
