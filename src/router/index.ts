import { createRouter, createWebHistory } from 'vue-router'

// 路由信息
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

// 路由器
const router = createRouter({
  history: createWebHistory(), // HTML5模式
  routes: publicRoutes
})

export default router
