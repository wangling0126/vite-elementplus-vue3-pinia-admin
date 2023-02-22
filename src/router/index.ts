import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'
import articleRouter from './models/article'
import authRouter from './models/auth'
import functionRouter from './models/function'
// 路由信息
export const publicRoutes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'profile'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/ErrorPage/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/ErrorPage/401.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

/**
 * 私有路由表
 */
export const privateRoutes = [authRouter, functionRouter, articleRouter]

export const otherRoutes = [{ path: '/:pathMatch(.*)*', redirect: '/404' }]

// 路由器

const router = createRouter({
  history: createWebHistory(), // HTML5模式
  routes: [...publicRoutes]
})

export default router
