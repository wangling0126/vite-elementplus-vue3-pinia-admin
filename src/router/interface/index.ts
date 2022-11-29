import { RouteMeta, RouteRecordRaw } from 'vue-router'
export type CustomRouteMeta = RouteMeta & {
  title: string
  icon: string
}

export type CustomRouteRecordRaw = RouteRecordRaw & {
  meta: CustomRouteMeta
  children: CustomRouteRecordRaw[]
}
