import { message } from 'ant-design-vue'
// import router from '../router'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { loginCheckJump } from '@/api/index'
// interface  {}
// ========== 创建axios实例 ==========
const service = axios.create({
  // baseURL: '/test', // url = base url + request url
  withCredentials: true, // 跨域请求发送cookie
  timeout: 20000, // 超时时间
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    config.params = Object.assign(
      {},
      config.params ? config.params : { t: new Date().getTime() }
    ) //兼容IE请求缓存
    return config
  },
  error => {
    // eslint-disable-next-line no-console
    console.log('request error', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response
    if (Reflect.has(res.data, 'success')) {
      return phpResHandle(res)
    } else {
      return javaResHandle(res)
    }
  },
  error => {
    message.error('网络异常', 2)
    console.log('response error' + error)
    return Promise.reject(error)
  }
)

const request = async <T>(config: AxiosRequestConfig<T>): Promise<T> => {
  return await (await service(config)).data
}

function phpResHandle(res: AxiosResponse) {
  if (res.data.success === false) {
    // 登陆过期
    if (res.data.msg === '登录超时,请重新登录') {
      loginCheckJump()
      return Promise.reject(res.data)
    }
    return res
  } else {
    return res
  }
}

function javaResHandle(res: AxiosResponse) {
  if (res.data.code !== '0') {
    // 登陆过期
    if (res.data.code === '100001') {
      loginCheckJump()
      return Promise.reject(res)
    }
    if (res.data.msg !== '暂无查看全部权限') {
      message.error(res.data.msg, 2)
    }
    return res
  } else {
    return res
  }
}

export default request
