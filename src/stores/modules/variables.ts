import variables from '@/styles/variables.module.scss'
import { defineStore } from 'pinia'
export const useVariablesStore = defineStore('variables', {
  getters: {
    cssVar: () => variables
  }
})
