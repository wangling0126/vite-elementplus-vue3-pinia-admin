import { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import router from '@/router'
/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes: RouteRecordRaw[]) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route: RouteRecordRaw) => {
    return !childrenRoutes.find((childrenRoute: RouteRecordRaw) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data: any) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes: RouteRecordRaw[], basePath = '') {
  const result: RouteRecordRaw[] = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as []))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      const meta = route.meta || {}
      // icon 与 title 必须全部存在
      if (meta.icon && meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }
    // 存在 children 进入迭代到children
    if (item.children) {
      ;(route.children as RouteRecordRaw[]).push(
        ...generateMenus(item.children, route.path)
      )
    }
  })
  return result
}

/**
 * @description: 当前用户是否有当前路由权限
 * @param {string} roles
 * @param {RouteRecordRaw} route
 * @return {boolean}
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => (route.meta!.roles as string[]).includes(role))
  } else {
    return true
  }
}

/**
 * @description: 根据用户权限过滤路由
 * @param {RouteRecordRaw} routes
 * @param {string} roles
 * @return {*}
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// export function flatRouteTree(routes: RouteRecordRaw[]) {
//   return routes.reduce((result, route: RouteRecordRaw) => {
//     result.push(route)
//     if (route.children) {
//       flatRouteTree(route.children)
//     }
//     return result
//   }, [] as RouteRecordRaw[])
// }

/**
 * @description: 根据权限动态添加路由
 * @param {RouteRecordRaw} routes
 * @return {*}
 */
export function addDynamicRoute(routes: RouteRecordRaw[]) {
  // const allDynamicRouter = flatRouteTree(routes)
  routes.forEach((route) => {
    router.addRoute({
      ...route
    })
  })
}

export function resetRouter(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    route.name && router.removeRoute(route.name)
  })
}
