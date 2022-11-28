export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }

  export interface ResLogin {
    token: string
  }

  export interface ResUserInfo {
    avatar: string
  }
}
