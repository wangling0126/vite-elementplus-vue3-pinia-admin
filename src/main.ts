import { createApp, markRaw } from 'vue'
import 'virtual:svg-icons-register'
// element-plus - element-plus引入以及国际化
import installElementPuls from './utils/elementPlus'
import 'element-plus/dist/index.css'
import router from './router/index'
import type { Router } from 'vue-router'
import './app.scss'
import '@/styles/index.scss'
// 国际化
import I18n from './i18n/index'
import App from './App.vue'
import { createPinia } from 'pinia'
export const app = createApp(App)
// 自动注册全局组件
import regGlobalComponent from '@/components/common/regGlobalComponent'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(router).use(I18n).use(pinia).use(regGlobalComponent).mount('#app')

installElementPuls(app)
