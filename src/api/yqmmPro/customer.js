import request from '@/utils/request'
import domain from '../domain'

// 获取客源详情
export function getCustomerDetail(data) {
  return request({
    url: '/web/saas/customer/getCustomerDetails',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取科研客户列表
 * @param {object} data
 * @returns
 */
export function getResearcherList(data) {
  return request({
    url: '/web/saas/customer/getCustomerList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取学校列表（关联客源）
 * @param {object} [data]
 */
export function getSchoolListWithResearchers(data) {
  return request({
    url: '/app/constant/querySchoolTree',
    method: 'get',
    params: data,
    baseURL: domain.Mis_Service_Url,
  })
}
/**
 * @description 获取学院列表
 * @param {object} data
 * @param {number} data.page
 * @param {number} data.pageSize
 * @param {number} data.schoolId
 */
export function getCollegeList(data) {
  return request({
    url: '/app/constant/queryCollege',
    method: 'get',
    params: data,
    baseURL: domain.Mis_Service_Url,
  })
}
