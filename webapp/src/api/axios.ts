import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from './type'
import config from "../config"
import { API_MOCK,MOCK_API_BASE_URL } from '../config/constant'
import { getToken } from "../utils/auth"

const showMessage = (status:any) => {
    // 展示消息
}

// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.baseApi + ''
  // transformRequest: [
  //   function (data) {
  //     //由于使用的 form-data传数据所以要格式化
  //     delete data.Authorization
  //     data = qs.stringify(data)
  //     return data
  //   },
  // ],
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else if (response.data && response.data.token) {
    //   localStorage.setItem('app_token', response.data.token)
    // }

    if (response.status === 200) {
      return response
    }
    showMessage(response.status)
    return response
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    }
    showMessage('网络连接异常,请稍后再试!')
  }
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `${token}`
    }

    // 如果开启的mock模式，则请求修改BASE_URL
    if(API_MOCK){
        config.baseURL = MOCK_API_BASE_URL
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export function request<T = any>(config: AxiosRequestConfig): Promise<T>{
  const conf = config
  return new Promise((resolve) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        // resolve(res as unknown as Promise<T>);
        const {
          data: { data }
        } = res
        resolve(data as T)
      })
  })
}


export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' })
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' })
}

export default request
export type { AxiosInstance, AxiosResponse }
/**
 * @description: 用户登录案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
