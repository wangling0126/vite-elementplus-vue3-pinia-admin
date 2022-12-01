import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import ElementPlus from 'element-plus'
import { App } from 'vue'
import { useGlobalStore } from '@/stores/global'
export default function installElementPuls(app: App<Element>) {
  const store = useGlobalStore()
  app.use(ElementPlus, {
    locale: store.language === 'en' ? en : zhCn
  })
}
