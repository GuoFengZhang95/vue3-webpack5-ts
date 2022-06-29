// import { message } from 'ant-design-vue'
// import router from '../router'

import axios from 'axios'

import { loginCheckJump } from '@/api/index.js'

// ========== 创建axios实例 ==========
const service = axios.create({
  // baseURL: '/test', // url = base url + request url
  crossDomain: true, // 跨域
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
    const res = response.data
    if (Reflect.has(res, 'success')) {
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

function request(opts) {
  return service(opts)
}

function phpResHandle(res) {
  if (res.success === false) {
    // 登陆过期
    if (res.msg === '登录超时,请重新登录') {
      loginCheckJump()
      return Promise.reject(res)
    }
    return res
  } else {
    return res
  }
}

function javaResHandle(res) {
  if (res.code !== '0') {
    // 登陆过期
    if (res.code === '100001') {
      loginCheckJump()
      return Promise.reject(res)
    }
    if (res.msg !== '暂无查看全部权限') {
      message.error(res.msg, 2)
    }
    return res
  } else {
    return res
  }
}

export default request
