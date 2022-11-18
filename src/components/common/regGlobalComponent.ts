// 注册全局组件
import { App, AsyncComponentLoader, defineAsyncComponent } from 'vue'
const modules: Record<string, AsyncComponentLoader> = import.meta.glob(
  './*/index.vue'
)

export default function install(app: App<Element>) {
  Object.entries(modules).forEach(([path, component]) => {
    const componentName = (/(?<=\/).+(?=\/)/.exec(path) as RegExpExecArray)[0]
    app.component(componentName, defineAsyncComponent(component))
  })
}
