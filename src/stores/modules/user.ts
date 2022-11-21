import { login } from '@/api/modules/user'
import { defineStore } from 'pinia'
import { Login } from '@/api/interface/login'
import { useRouter } from 'vue-router'
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  actions: {
    async login(params: Login.ReqLoginForm) {
      const res = await login(params)
      const { code, data } = res || {}
      if (code === 200) {
        localStorage.setItem('token', data.token)
      }
      return res
    }
  }
})
