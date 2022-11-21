import { getUserInfo } from '@/api/modules/user'
import { defineStore } from 'pinia'
import { Login } from '@/api/interface/login'
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  actions: {
    getUserInfo(data: Login.ReqLoginForm) {
      getUserInfo(data).then((res) => {
        console.log(res)
      })
    }
  }
})
