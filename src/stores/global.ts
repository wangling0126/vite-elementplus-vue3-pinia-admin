import { defineStore } from 'pinia'
import { LANGUAGE } from '@/constant'
import { LStorage } from '@/utils/storage'
export const useGlobalStore = defineStore('global', {
  state() {
    return {
      sidebarOpened: true, // 菜单折叠还是展开
      language: LStorage.get(LANGUAGE) || 'zh',
      publicKey: ''
    }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    /**
     * 设置国际化
     */
    setLanguage(lang: string) {
      LStorage.set(LANGUAGE, lang)
      this.language = lang
    },
    /**
     * rsa公钥
     */
    setPublicKey(key: string) {
      this.publicKey = key
    }
  }
})
