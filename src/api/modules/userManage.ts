import { ReqPageInfo } from '../interface'
import { UserMange } from '../interface/userManage'

import request from '../request'
export const getUserManageList = (data: ReqPageInfo) => {
  return request.get<UserMange.ResList>('/userManage/getList', data)
}

export const deleteUserById = (id: number) => {
  return request.post<UserMange.ResList>('/userManage/deleteUserById', {
    id: id
  })
}

export const batchDeleteUserByIds = (ids: number[]) => {
  return request.post<UserMange.ResList>(
    '/userManage/batchDeleteUserByIds',
    ids
  )
}
