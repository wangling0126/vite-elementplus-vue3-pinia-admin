import { ResultPageInfo } from '.'

export namespace UserMange {
  export interface Roles {
    id: number
    rolesName: string
  }

  export interface UserManage {
    avatar: string
    id: number
    mobile: string
    openTime: string
    rolesId: string
    username: string
    roles: Roles[]
  }
  export type ResList = ResultPageInfo<UserManage[]>
}
