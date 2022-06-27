import request from '@/utils/request'
import domain from '../domain'

// 获取登录用户的权益状态及是否注册云蝠相关信息
export function getUserStatus(data) {
  return request({
    url: '/web/saas/ai/getUserStatus',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

// 获取用户登录云蝠的iframe地址
export function getLoginAddress(data) {
  return request({
    url: '/web/saas/ai/registerAndLogin',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
