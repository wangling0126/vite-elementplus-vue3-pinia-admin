import { Login } from '../interface/login'
import request from '../request'

export const login = (data: any) => {
  return request.post<Login.ResLogin>('/user/login', data)
}

export const getTest = () => {
  return request.get('/user/test')
}

export const getUserInfo = () => {
  return request.get<Login.ResUserInfo>('/user/getUserInfo')
}
