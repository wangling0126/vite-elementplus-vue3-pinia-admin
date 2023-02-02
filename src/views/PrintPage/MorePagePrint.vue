<template>
  <div>
    <el-card>
      <ul>
        <li>
          1.
          多页打印用到了两种方法，都有些问题，(主要是截断问题)，对于div的内容被截断，那就要通过js计算，看当前dom节点是否跨了两页，如果是，则强制分页。A4纸的高度转PX值是个不完全确定的因素。
          关于A4纸宽高转px详见：
          <a href="https://my.oschina.net/xautchao/blog/199912"
            >A4纸的象素分辨率计算 - 王超的个人空间 - OSCHINA</a
          >
        </li>
        <li>
          2.
          第一个按钮打印是用到的插件vue3-print-nb，但是只能打印第一页，我把源码弄下来扩展了下，现在能显示出来，猜想是css样式会影响
        </li>
        <li>3. 下面的测试手写打印，主要是用于自己玩的</li>
      </ul>
    </el-card>

    <el-row justify="end">
      <el-button type="primary" :loading="printLoading" v-print="printObj"
        >打印</el-button
      >
      <el-button type="primary" @click="handleNativePrint"
        >测试手写打印</el-button
      >
    </el-row>
    <div id="print">
      <div class="title">boeing联系试卷</div>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in boeingData.array"
          :key="item.title + item.code"
        >
          <div class="item-title">
            第{{ index + 1 }}题：{{ item.title }} - {{ item.code }}
          </div>
          <div class="item-content">
            <div
              class="sub-item"
              v-for="innerItem in item.list"
              :key="innerItem.label + innerItem.value"
            >
              {{ innerItem.label }}：{{ innerItem.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'MorePagePrint' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { boeingData } from '@/mock/boeingData'

const printLoading = ref(false)
const style = `
  .title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}
.item {
  margin-bottom: 20px;
}
.item-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.sub-item {
  width: 48%;
  flex-shrink: 0;
  font-size: 12px;
}
.item-title {
  font-size: 18px;
  color: #3661af;
}
  `
const printObj = {
  // 打印区域
  id: 'print',
  // 打印标题
  popTitle: '多页',
  style: style,
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  }
}

// 原生打印
const goPrint = () => {
  console.log('触发打印功能')
  // 创建iframe
  let iframe = document.createElement('IFRAME')
  let doc = null
  iframe.setAttribute(
    'style',
    'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'
  )

  document.body.appendChild(iframe)
  doc = iframe.contentWindow.document
  const div = document.querySelector('#print')
  // doc.body.appendChild()
  doc.write(
    `<!DOCTYPE html><html><style>${style}</style><body>${
      div!.cloneNode(true).outerHTML
    }</body></html>`
  )

  doc.close()
  iframe.contentWindow.focus()
  iframe.contentWindow.print()
  setTimeout(() => {
    document.body.removeChild(iframe)
  }, 10000)
}
const handleNativePrint = () => {
  // window.print()
  goPrint()
}
</script>
<style lang="scss">
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}
.item {
  margin-bottom: 20px;
}
.item-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.sub-item {
  width: 48%;
  flex-shrink: 0;
  font-size: 12px;
}
.item-title {
  font-size: 18px;
  color: #3661af;
}
</style>
