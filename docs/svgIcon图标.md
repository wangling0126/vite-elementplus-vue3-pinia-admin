# 功能

[github地址](https://github.com/wangling0126/vite-elementplus-vue3-pinia-admin)

支持内部外部svg图片的引用

svg图片在项目中使用的非常广泛，如何在vue3 + vite 中使用svg图标。

# 实现

### **安装**

```bash
yarn add vite-plugin-svg-icons -D
# or
npm i vite-plugin-svg-icons -D
# or
pnpm install vite-plugin-svg-icons -D
```

### **vite.config.ts 中的配置插件**

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),
    ],
  }
}
```

### **在 src/main.js 内引入注册脚本**

```ts
import 'virtual:svg-icons-register'
```

### **创建SvgIcon组件**

```vue
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  'mask-image': `url(${props.icon})`,
  '-webkit-mask': `url(${props.icon})`
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: v-bind('props.color');
  overflow: hidden;
}

.svg-external-icon {
  background-color: v-bind('props.color');
  mask-size: cover !important;
  -webkit-mask-size: cover !important;
  display: inline-block;
}
</style>

```

**icons目录结构**

svg图标全部放到src/icons里面

```
# src/icons

- icon1.svg
- icon2.svg
- icon3.svg
- dir/icon1.svg
```

**注册全局组件**

由于svg图标用的比较多，注册下全局组件

**方法1**

这个是对以后common文件夹里面的自动注册为全局组件

```ts
// regGlobalComponent.ts
// 注册全局组件
import { App, AsyncComponentLoader, defineAsyncComponent } from 'vue'
// 使用vite的import.meta.glob，类似webpack的 require.context
const modules: Record<string, AsyncComponentLoader> = import.meta.glob(
  './*/index.vue'
)

export default function install(app: App<Element>) {
  Object.entries(modules).forEach(([path, component]) => {
      // 主要是提取./SvgIcon/index.vue里的SvgIcon
    const componentName = (/(?<=\/).+(?=\/)/.exec(path) as RegExpExecArray)[0]
    app.component(componentName, defineAsyncComponent(component))
  })
}


// main.ts
const app = createApp(App)
import regGlobalComponent from '@/components/common/regGlobalComponent'
app.use(regGlobalComponent)

```

**方法2**

```ts
// main.ts
const app = createApp(App)
import SvgIcon from '@/components/common/SvgIcon/index.vue'
app.use(SvgIcon)
```



# 使用

```vue
<svg-icon icon="user" color="#fff" />
<svg-icon icon="https:XXX.svg" />
<svg-icon icon=password" style="color: #fff"/>
```



# 参考链接

[vue-element-admin的svgIcon](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)