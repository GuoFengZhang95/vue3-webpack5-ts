import request from '@/utils/request'
import domain from '../domain'

// 重大商情列表
export function getNewsList(data) {
  return request({
    url: '/web/article/search/list',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

// 重大商情详情
export function getNewsDetail(data) {
  return request({
    url: '/web/article/info',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
