import { login, getUserInfo } from '@/api/modules/user'
import { defineStore } from 'pinia'
import { Login } from '@/api/interface/login'
import { LStorage } from '@/utils/storage'
import router from '@/router'
import { usePermission } from './permission'
import { resetRouter } from '@/utils/route'
import { useTagsViewStore } from './tagsView'
import { ElMessage } from 'element-plus'
// 第一个参数是你的应用中 Store 的唯一 ID。

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {} as Login.ResUserInfo
    }
  },
  getters: {
    hasUserInfo: (state) => state.userInfo.id,
    roleNames: (state) =>
      state.userInfo.rolesList?.map?.((item) => item.name) || []
  },
  actions: {
    async login(params: Login.ReqLoginForm) {
      const res = await login(params)
      const { code, data } = res || {}
      if (code === 200) {
        this.token = data.token
        LStorage.set('token', data.token)
      }
      return res
    },
    async getUserInfo() {
      const res = await getUserInfo()
      const { code, data } = res || {}
      if (code === 200) {
        this.userInfo = data
        ElMessage.success(`欢迎${this.userInfo.username}~~~~`)

        const roles = this.userInfo.rolesList?.map?.((item) => item.name) || []
        usePermission().generateRoutes(roles)
      }
      return res
    },
    logout() {
      this.userInfo = {} as Login.ResUserInfo
      this.token = ''
      LStorage.delete('token')
      // 重置路由
      resetRouter(usePermission().addDynamicRouterTree)
      // 移除所有tag
      useTagsViewStore().removeTagsView({ type: 'all' })
      router.push('/login')
    }
  }
})
