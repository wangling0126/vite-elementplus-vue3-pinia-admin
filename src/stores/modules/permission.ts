import { RouteRecordRaw } from 'vue-router'
import { otherRoutes, privateRoutes, publicRoutes } from './../../router/index'
import { addDynamicRoute, filterAsyncRoutes } from '@/utils/route'
import { defineStore } from 'pinia'
// 第一个参数是你的应用中 Store 的唯一 ID。
interface State {
  menuList: RouteRecordRaw[]
  addDynamicRouterTree: RouteRecordRaw[]
}
export const usePermission = defineStore('permission', {
  state: (): State => {
    return {
      menuList: [],
      addDynamicRouterTree: []
    }
  },

  actions: {
    generateRoutes(roles: string[]) {
      const addDynamicRouterTree = filterAsyncRoutes(privateRoutes, roles)
      addDynamicRoute([...addDynamicRouterTree, ...otherRoutes])
      this.menuList = [...publicRoutes, ...addDynamicRouterTree]
      this.addDynamicRouterTree = addDynamicRouterTree
    }
  }
})
