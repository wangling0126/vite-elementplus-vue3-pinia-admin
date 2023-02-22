import layout from '@/views/layout/index.vue'
export default {
  path: '/function',
  component: layout,
  name: 'function',
  redirect: '/function/print',
  meta: {
    title: 'function',
    icon: 'article'
  },
  children: [
    {
      path: '/function/print',
      component: () => import('@/views/PrintPage/index.vue'),
      meta: {
        title: 'PrintPage',
        icon: 'article-ranking'
      }
    }
  ]
}
