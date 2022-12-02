import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { LStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'
export const useThemeStore = defineStore('theme', {
  state() {
    return {
      mainColor: LStorage.get(MAIN_COLOR) || DEFAULT_COLOR,
      variables
    }
  },
  actions: {
    setMainColor(newColor: string) {
      this.mainColor = newColor
      this.variables.menuBg = newColor
      LStorage.set(MAIN_COLOR, newColor)
    }
  }
})
