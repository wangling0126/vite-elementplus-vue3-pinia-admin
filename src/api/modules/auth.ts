import { Auth } from '../interface/auth'
import request from '../request'

export const getAllRolesList = () => {
  return request.get<Auth.ResRoles[]>('/auth/getAllRolesList')
}

export const getAllMenuList = () => {
  return request.get<Auth.ResMenu[]>('/auth/getAllMenuList')
}

export const checkRepeatMenuRouterName = (routerName: string) => {
  return request.get<Auth.ResMenu[]>('/auth/checkRepeatMenuRouterName', {
    routerName
  })
}

export const addMenu = (params) => {
  return request.post('/auth/addMenu', params)
}

export const updateMenu = (params) => {
  return request.post('/auth/updateMenu', params)
}

export const deleteMenuById = (id: number) => {
  return request.get('/auth/deleteMenuById', { id })
}
