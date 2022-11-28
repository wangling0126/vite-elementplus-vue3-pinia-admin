import { useUserStore } from '@/stores/modules/user'
import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_URL } from '@/config/index'
// 路由信息
const publicRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue')
  },
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

router.beforeEach((to, from, next) => {
  // 白名单
  const whiteList = [LOGIN_URL]
  const userStore = useUserStore()
  // token存在的情况
  if (userStore.token) {
    if (to.path === LOGIN_URL) {
      return next('/')
    } else {
      return next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next(LOGIN_URL)
    }
  }
})

export default router
