import layout from '@/views/layout/index.vue'
export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'auth',
  meta: {
    title: 'user',
    icon: 'personnel',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/UserManage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
        roles: ['admin']
      }
    },
    {
      path: '/user/role',
      component: () => import('@/views/RoleList/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/user/permission',
      component: () => import('@/views/PermissionList/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/user/menu',
      component: () => import('@/views/UserMenu/index.vue'),
      meta: {
        title: 'userMenu',
        icon: 'permission',
        roles: ['admin']
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
}
