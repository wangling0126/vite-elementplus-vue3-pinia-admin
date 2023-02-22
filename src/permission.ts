import { usePermission } from './stores/modules/permission'
import router from './router/index'
import { LStorage } from '@/utils/storage'
import { useUserStore } from '@/stores/modules/user'
import { LOGIN_URL } from '@/config/index'

router.beforeEach(async (to, from, next) => {
  // 白名单
  const whiteList = [LOGIN_URL]
  const userStore = useUserStore()
  const usePermissionStore = usePermission()
  const token = userStore.token || LStorage.get('token')
  // token存在的情况
  if (token) {
    if (to.path === LOGIN_URL) {
      return next('/')
    } else {
      if (!userStore.hasUserInfo) {
        await userStore.getUserInfo()
        usePermissionStore.generateRoutes(userStore.roleNames)
        return next({
          path: to.path, // 动态添加一个新的路由
          replace: true // 重定向,为了让刚刚添加的路由规则生效
        })
      } else {
        return next()
      }
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
