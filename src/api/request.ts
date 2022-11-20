import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { ResultData } from './interface'

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: CreateAxiosDefaults) {
    this.service = axios.create(config)
  }
  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, data?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, data, _object)
  }
  put<T>(url: string, data?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, data, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
