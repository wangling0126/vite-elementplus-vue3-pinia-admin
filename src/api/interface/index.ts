// * 请求响应参数(不包含data)
export interface Result {
  code: number
  msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T
}

// 请求响应参数 - 分页
export interface ResultPageInfo<T> {
  current: number
  size: number
  total: number
  data: T
}

// // 请求参数 - 分页
export interface ReqPageInfo<T = any> {
  current: number
  size: number
  data?: T
}
