import { createApp } from 'vue'
import 'virtual:svg-icons-register'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import './app.scss'
import '@/styles/index.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
export const app = createApp(App)
// 自动注册全局组件
import regGlobalComponent from '@/components/common/regGlobalComponent'

app
  .use(router)
  .use(ElementPlus)
  .use(createPinia())
  .use(regGlobalComponent)
  .mount('#app')
