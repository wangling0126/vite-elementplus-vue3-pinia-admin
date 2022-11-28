import { login, getUserInfo } from '@/api/modules/user'
import { defineStore } from 'pinia'
import { Login } from '@/api/interface/login'
import { LStorage } from '@/utils/storage'
import router from '@/router'
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {
    hasUserInfo: (state) => JSON.stringify(state.userInfo) !== '{}'
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
      }
      return res
    },
    logout() {
      this.userInfo = {}
      this.token = ''
      LStorage.delete('token')
      router.push('/login')
    }
  }
})
