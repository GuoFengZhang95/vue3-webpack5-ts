import request from '@/utils/request'
import domain from '../domain'

// 订阅采购意向列表
export function getPurchaseSubscriptionList(data) {
  return request({
    url: '/web/yqmm/subscribe/purchaseList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

// 订阅标讯列表
export function getBidSubscriptionList(data) {
  return request({
    url: '/web/yqmm/subscribe/biddingList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
