import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/modules/user'
import { LStorage } from '@/utils/storage'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults
} from 'axios'
import { ResultData } from './interface'
import { ElMessage } from 'element-plus'

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: CreateAxiosDefaults) {
    this.service = axios.create(config)
    // axios 请求拦截器处理请求数据
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = LStorage.get('token')
        if (!config.headers) {
          config.headers = {}
        }
        config.headers.Authorization = 'Bearer ' + token // 留意这里的 Authorization
        config.headers.lang = useGlobalStore().language
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, msg } = response.data || {}
        if (code === 401) {
          const userStore = useUserStore()
          userStore.logout()
        } else if (code !== 200) {
          ElMessage.error(msg || '服务出小差了~~~')
        }
        return response.data
      },
      (error: AxiosError) => {
        ElMessage.error(error.message || '服务出小差了~~')
        return Promise.reject(error)
      }
    )
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
