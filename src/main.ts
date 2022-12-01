import { createApp } from 'vue'
import 'virtual:svg-icons-register'
// element-plus - element-plus引入以及国际化
import installElementPuls from './utils/elementPlus'
import 'element-plus/dist/index.css'
import router from './router/index'
import './app.scss'
import '@/styles/index.scss'
// 国际化
import I18n from './i18n/index'
import App from './App.vue'
import { createPinia } from 'pinia'
export const app = createApp(App)
// 自动注册全局组件
import regGlobalComponent from '@/components/common/regGlobalComponent'

app
  .use(router)
  .use(I18n)
  .use(createPinia())
  .use(regGlobalComponent)
  .mount('#app')

installElementPuls(app)
