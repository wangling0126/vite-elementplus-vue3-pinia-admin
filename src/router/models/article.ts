import layout from '@/views/layout/index.vue'
export default {
  path: '/article',
  component: layout,
  name: 'article',
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/ArticleRanking/index.vue'),
      name: 'articleRanking',
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/ArticleDetail/index.vue'),
      meta: {
        title: 'articleDetail'
      }
    },
    {
      path: '/article/create',
      component: () => import('@/views/ArticleCreate/index.vue'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/ArticleCreate/index.vue'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
