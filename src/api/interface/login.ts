import { Auth } from './auth'

export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }

  export interface ResLogin {
    token: string
  }

  type Role = Pick<Auth.ResRoles, 'name' | 'rolesName'> & { rolesId: number }
  export interface ResUserInfo {
    avatar: string
    id: number
    username: string
    mobile: string
    is_admin: string
    rolesList: Role[]
  }
}
