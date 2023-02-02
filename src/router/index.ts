import { LStorage } from '@/utils/storage'
import { useUserStore } from '@/stores/modules/user'
import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_URL } from '@/config/index'
import layout from '@/views/layout/index.vue'
import i18n from '@/i18n'

// 路由信息
const publicRoutes = [
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
const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/UserManage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/RoleList/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/PermissionList/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/UserInfo/index.vue'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/ArticleRanking/index.vue'),
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
  },
  {
    path: '/function',
    component: layout,
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
]

// 路由器
const router = createRouter({
  history: createWebHistory(), // HTML5模式
  routes: [...publicRoutes, ...privateRoutes]
})

router.beforeEach((to, from, next) => {
  // 白名单
  const whiteList = [LOGIN_URL]
  const userStore = useUserStore()
  const token = userStore.token || LStorage.get('token')
  // token存在的情况
  if (token) {
    if (to.path === LOGIN_URL) {
      return next('/')
    } else {
      if (!userStore.hasUserInfo) {
        userStore.getUserInfo()
      }
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
