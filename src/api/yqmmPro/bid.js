/**
 * @description 标讯相关的api
 * @author zevan
 * @time 2022年3月2日 14:25:58
 */
import request from '@/utils/request'
import domain from '../domain'
/**
 * @description 获取采购意向详情
 * @param {object} data
 * @returns
 */
export function getPurchaseDetail(data) {
  return request({
    url: '/web/yqmm/bidding/purchaseDetail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取通用采购意向列表
 * @param {object} data
 * @returns {Promise<{code: '0'|'1', data:{list:array,totalCount:number,top:array,todayCount:number,searchList:array,pages:number,pageNum:number}}>}
 */
export function getPurchaseList(data) {
  return request({
    url: '/web/yqmm/bidding/purchaseList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取标讯详情
 * @param {object} data
 * @returns
 */
export function getBidDetail(data) {
  return request({
    url: '/web/yqmm/bidding/biddingDetail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取通用标讯列表
 * @param {object} data
 * @returns
 */
export function getBidList(data) {
  return request({
    url: '/web/yqmm/bidding/list',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 标讯、采购意向是否点赞/收藏
 * @param {object} data
 * @returns {Promise<{code:'0'|'1',data:{isCollect:0|1,isLike:0|1},msg:string}>}
 */
export function getBidLikeCollectInfo(data) {
  return request({
    url: '/web/yqmm/bidding/getBxRecord',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取标讯 采购意向相关商机
 * @param {object} data
 * @param {number} data.id 文章id
 * @param {string} data.pageNum
 * @param {string} data.pageSize
 * @param {string} data.pageType 	    页面类型 1采购意向详情 2标讯详情
 * @param {string} data.recommendType 推荐相关商机类型 1采购品目 2采购产品 3采购单位 4招标单位 5中标单位
 * @param {string} data.tokenEncodeId 加密的文章id
 * @returns
 */
export function getBidRelatdBusiness(data) {
  return request({
    url: '/web/saas/unlockData/getRecommend',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
