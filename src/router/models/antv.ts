import layout from '@/views/layout/index.vue'
export default {
  path: '/antv',
  component: layout,
  name: 'antv',
  redirect: '/antv/x6',
  meta: {
    title: 'antv',
    icon: 'article'
  },
  children: [
    {
      path: '/antv/x6',
      component: () => import('@/views/Antv/x6/index.vue'),
      name: 'x6',
      meta: {
        title: 'x6',
        icon: 'article-ranking',
        noPadding: true
      }
    }
  ]
}
