import { login } from '@/api/modules/user'
import { defineStore } from 'pinia'
import { Login } from '@/api/interface/login'
import { LStorage } from '@/utils/storage'
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
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
    }
  }
})
