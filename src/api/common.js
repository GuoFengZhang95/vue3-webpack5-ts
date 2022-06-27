import request from '@/utils/request'
import domain from './domain'

/**
 * @description 获取用户是否登录
 * @returns {Promise<{success:boolean,isLogin:boolean}>}
 */
export function getLoginStatus() {
  return request({
    url: '/user/login/info',
    method: 'get',
    // params: data,
    baseURL: domain.Api_Base_Url,
    jsonp: false,
  })
}

// 获取物流订单
export function getExpressInfo(data) {
  return request({
    url: '/common/express/logisticsinfo',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取产品分类
export function getProductCata(data) {
  return request({
    url: '/seller/catalog/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取用户信息
export function getBaseUserInfo(data) {
  return request({
    url: '/web/getUserInfo',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

// 获取通知列表
export function getSystemNoticeList(data) {
  return request({
    url: '/app/yqmm/notice/list',
    method: 'get',
    params: data,
    baseURL: domain.Mis_Service_Url,
  })
}
// 获取未读通知列表
export function getSystemNoReadList(data) {
  return request({
    url: '/web/noReadList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取通知详情
export function getNoticeDetail(data) {
  return request({
    url: '/web/noticeDetail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

// 获取文件的阿里云下载地址
export function getAliyunOSSUrl(data) {
  return request({
    url: '/app/aliyun/oss/generateUrl',
    method: 'get',
    params: data,
    baseURL: domain.Mis_Service_Url,
  })
}

/**
 * @description 获取文件在阿里云的动态下载地址
 * @param {object} data
 * @param {string} data.fileUrl
 * @returns {Promise<{code:'0'|'1', data:string}>}
 */
export function getFileUrl(data) {
  return request({
    url: '/web/aliyun/oss/generatePreSignedUrl',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 获取商机提醒列表
 * @param {object} data
 * @param {number} data.pageNum
 * @param {number} data.pageSize
 * @param {string} data.onlyView 	只看,多个用英文,隔开
 * @param {string} data.notView 不看,多个用英文,隔开
 * @param {string} data.importance 重要程度,多个用英文,隔开
 * @returns 
 */
export function getBusinessRemind(data) {
  return request({
    url: '/web/saas/business/remind',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 查询卡内剩余次数
 * @param {object} data 
 * @param {1|2|3|4|5|6|7} data.type 	类型 1采购意向 2标讯 3需求 4重大商情 5客户分析 6客源 7基金课题 8采购单位
 * @returns {Promise<{code:'0'|'1',data:{isShared:boolean,remainCardTimes:number,sysShareTimes:number}}>}
 */
export function getRemainCardTimes(data) {
  return request({
    url: '/web/commonInfo/getRemainCardTimes',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 生成微信小程序页面链接
 * @param {object} data 
 * @param {string} data.path
 * @param {string} data.query
 * @returns {Promise<{code:'0'|'1',data:string}>}
 */
export function getWxShareLink(data) {
  return request({
    url: '/web/wx/webCommon/getShareLink',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}