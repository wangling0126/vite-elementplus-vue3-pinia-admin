import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', {
  state() {
    return {
      sidebarOpened: true
    }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})
