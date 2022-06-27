import request from '@/utils/request'
import domain from '../domain'

// 获取需求详情
export function getBusinessDetail(data) {
  return request({
    url: '/web/saas/business/mis/detail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取需求接单人列表
export function getBusinessList(data) {
  return request({
    url: '/web/saas/business/mis/orderList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取需求附件列表
export function getFilesList(data) {
  return request({
    url: '/web/saas/business/mis/attachmentList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取接单详情
export function getOrderDetail(data) {
  return request({
    url: '/web/saas/business/mis/orderDetail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取接单详情附件
export function getOrderFiles(data) {
  return request({
    url: '/web/saas/business/mis/orderAttachmentList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
