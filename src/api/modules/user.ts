import request from '../request'

export const getUserInfo = (data: any) => {
  return request.get('/user/userInfo', data)
}
