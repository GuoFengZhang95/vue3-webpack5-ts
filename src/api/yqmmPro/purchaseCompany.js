/**
 * @description 采购单位相关
 * @author zevan
 */

import request from '@/utils/request'
import domain from '../domain'

/**
 * @description 采购单位列表
 * @param {object} data
 * @param {number} data.pageNum
 * @param {number} data.pageSize
 * @param {string} data.cityIds
 * @param {string} data.companyIds
 * @param {string} data.companyType
 * @param {string} data.contactFilter 联系人条件筛选 : 1有科研客户 2有采购联系人, 多个用,隔开
 * @param {number} data.isHighlight
 * @param {string} data.searchKey
 * @param {string} data.searchType 搜索类型: 1综合搜索 2单位名称 3产品名称
 * @param {number} data.sort 排序:0总数倒序(默认) 1相关性倒序
 * @returns {Promise<{code:'1'|'0',data:{list:[{bidProduct:string,biddingCount:number,cityId:number,cityName:string,companyName:string,contactsCount:number,customerNumber:number,logo:string,purchaseCount:number,type:number,companyTokenId:string}]}}>}
 */
export function getPurchaseCompanyList(data) {
  return request({
    url: '/web/saas/purchaseCompany/list',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 采购单位详情
 * @param {object} data
 * @param {number} data.targetId
 * @returns {Promise<{code:'0'|'1',data:object}>}
 */
export function getPurchaseCompanyDetail(data) {
  return request({
    url: '/web/saas/tProject/detail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}