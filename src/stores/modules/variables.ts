import { MAIN_COLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'
import { LStorage } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
import { defineStore } from 'pinia'
import { useThemeStore } from './theme'
export const useVariablesStore = defineStore('variables', {
  getters: {
    cssVar: () => {
      const themeStore = useThemeStore()
      return {
        ...themeStore.variables,
        ...generateColors(LStorage.get(MAIN_COLOR))
      }
    }
  }
})
