<template>
  <div id="x6-container" ref="container"></div>
</template>

<script lang="ts">
export default { name: 'antvX6' }
</script>

<script setup lang="ts">
import { Graph, Path } from '@antv/x6'
import { onMounted, ref, shallowRef } from 'vue'
import '@antv/x6-vue3-shape'
import CustomNode, { Question } from './node.vue'
import { getProtsGroup } from './utlis'
Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    console.log(s, e)
    const offset = 2
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `
    )
  },
  true
)
const container = ref<HTMLElement | null>(null)
const graph = shallowRef<Graph | null>()
const init = () => {
  const appMain = document.querySelector('.app-main') as HTMLElement
  graph.value = new Graph({
    container: container.value as HTMLElement,
    width: appMain.clientWidth,
    height: appMain?.clientHeight,
    panning: true,
    mousewheel: true,
    background: {
      color: '#F2F7FA'
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4
          }
        }
      }
    }
  })
}

const nextPositon = ref(40)
const nodeDistance = ref(100)
const nodeWidth = ref(200)
const setNextPosition = () => {
  nextPositon.value = nextPositon.value + nodeWidth.value + nodeDistance.value
}
const createStartAndEndNode = ({
  x,
  y,
  id
}: {
  x: number
  y: number
  id: string
}) => {
  if (!graph.value) {
    return
  }
  graph.value.addNode({
    id: id,
    shape: 'rect',
    x: x,
    y: y,
    width: nodeWidth.value,
    height: 100,
    label: 'hello',
    attrs: {
      // body 是选择器名称，选中的是 rect 元素
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6
      }
    },
    ports: {
      ...getProtsGroup(),
      items: [
        {
          id: id,
          group: 'out'
        }
      ]
    }
  })
  setNextPosition()
}
const createAddNode = (data: Question) => {
  if (!graph.value) {
    return
  }
  const id = 'node' + data.id
  graph.value.addNode({
    id: id,
    x: nextPositon.value,
    y: 40,
    width: nodeWidth.value,
    height: 40,
    shape: 'vue3-shape',
    component: {
      template: `<CustomNode :question="data" />`,
      data() {
        return {
          data
        }
      },
      components: { CustomNode }
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4
          }
        }
      }
    },
    router: 'orth',
    connector: {
      name: 'rounded',
      args: {}
    }
  })
  setNextPosition()
}

onMounted(() => {
  init()
  createStartAndEndNode({
    x: nextPositon.value,
    y: 40,
    id: 'start'
  })
  createAddNode({
    id: 1,
    title: '人之初',
    list: ['床前明月光', '疑是地上霜', '莎莎哈啥还是']
  })
  graph.value &&
    graph.value.addEdge({
      shape: 'edge', // 指定使用何种图形，默认值为 'edge'
      source: { cell: 'start', port: 'start' }, // 源节点和链接桩 ID
      target: 'node1'
    })
})
</script>
<style scoped lang="scss"></style>
