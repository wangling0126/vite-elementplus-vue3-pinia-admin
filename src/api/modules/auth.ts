import { Auth } from '../interface/auth'
import request from '../request'

export const getAllRolesList = () => {
  return request.get<Auth.ResRoles[]>('/auth/getAllRolesList')
}

export const getAllMenuList = () => {
  return request.get<Auth.ResMenu[]>('/auth/getAllMenuList')
}
