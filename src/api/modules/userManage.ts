import { ReqPageInfo } from '../interface'
import { UserMange } from '../interface/userManage'
import request from '../request'
export const getUserManageList = (data: ReqPageInfo) => {
  return request.get<UserMange.ResList>('/userManage/getList', data)
}
