import request from '@/utils/request'
import domain from './domain'

/**
 * @description 数据字典api
 * @author zevan
 * @time 2022年3月2日 16:43:07
 */

/**
 * @description 获取行政职务
 * @param {*} data
 * @returns
 */
export function getAptsData(data) {
  return request({
    url: '/web/saas/constant/queryAtp',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取职称
 * @param {*} data
 * @returns
 */
export function getTitleData(data) {
  return request({
    url: '/web/saas/constant/queryTitle',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取学校数据
 * @param {*} data
 * @returns
 */
export function getSchoolData(data) {
  return request({
    url: '/web/saas/constant/querySchool',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取学院数据
 * @param {*} data
 * @returns
 */
export function getCollegeData(data) {
  return request({
    url: '/web/saas/constant/queryCollege',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 查询全国省市树
 * @param {*} data
 * @returns
 */
export function getCountryList(data) {
  return request({
    url: '/web/saas/constant/queryAddressTree',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取标讯类型
 * @param {*} data
 * @returns
 */
export function getBidType(data) {
  return request({
    url: '/app/yqmm/constant/queryBidType',
    method: 'get',
    params: data,
    baseURL: domain.Yqmm_Service_Base_Url,
  })
}
/**
 * @description 获取企业类型
 * @param {*} data
 * @returns
 */
export function getCompanyType(data) {
  return request({
    url: '/web/saas/constant/queryCompanyType',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 查询国家自然基金级别-来源-类别树
 */
export function getProjectCategoryTree() {
  return request({
    url: '/web/saas/tProject/getProjectCategoryTree',
    method: 'get',
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 查询国家自然基金学科树
 */
export function getProjectSubjectTree() {
  return request({
    url: '/web/saas/tProject/queryProjectSubjectTree',
    method: 'get',
    baseURL: domain.App_Web_Base_Url,
  })
}
