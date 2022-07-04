import request from '@/utils/request/index'
import { GLOBAL_CONSTANT } from './constant'
import domain from './domain'

export function login(data = {}) {
  return request({
    url: '/login/deal',
    method: 'get',
    params: data,
    baseURL: domain.SaaS_Base_Url,
  })
}
export function otherLogin(data = {}) {
  return request({
    url: '/service/otherLogin',
    method: 'post',
    data,
    baseURL: domain.Service_Login_Url,
  })
}
export function logout() {
  window.location.href = GLOBAL_CONSTANT.logoutUrl
}

export function queryAdvertisement(data = {}) {
  return request({
    url: '/yqmm/advertisement/info',
    method: 'get',
    params: data,
    baseURL: domain.Yqmm_Api_Url,
  })
}

export function loginCheckJump() {
  const newUrl = encodeURI(window.location.href)
  window.location.href = `${GLOBAL_CONSTANT.jumpUrl}?returnUrl=${newUrl}`
}
