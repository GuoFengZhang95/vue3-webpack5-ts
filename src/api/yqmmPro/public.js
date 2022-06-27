import request from '@/utils/request'
import domain from '../domain'

// 获取解锁商机列表 （1客源，2采购意向，3标讯，4重大商情，5接单）
export function getUnLockList(data) {
  return request({
    url: '/web/saas/unlockData/getUnLockList',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 校验权限(企业成员) 是否可以访问成员管理
 * @param {*} data
 * @returns 1可以访问 2无卡导致无权限 3权限不足
 */
export function getMemberAuth(data) {
  return request({
    url: '/web/getProAuthority',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 校验权限 是否可查看已解锁信息列表
 * @param {object} data
 * @param {number} data.companyId
 * @param {number} data.module 1客源，2采购意向，3标讯，4重大商情，5接单 6基金
 * @returns {Promise<{data:{menuAuthority:1|2|3}}>} 1有权限 2无权限(没有企业 或者 没有生效的企业卡) 3无权限（有卡的企业用户但是管理员没有开权限）
 */
export function getUnlockAuth(data) {
  return request({
    url: '/web/getProUnLockListAuthority',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 点赞 取消点赞
 * @param {string|number} data.targetId
 * @param {string|number} data.module 1资讯、2产品、3展会、4企业、5商机、6评论 7方案 8圈子 9 找人 10标讯 11采购意向 12客源 历史原因 标讯采购意向暂时传1
 * @param {string|number} data.action 1点赞 2取消点赞
 * @returns {Promise<{success:boolean,msg: string}>}
 */
export function like(data = {}) {
  data.isRelease = process.env.ENV === '' ? 1 : 0
  return request({
    url: '/web/like/save',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 收藏 取消收藏
 * @param {string|number} data.targetId
 * @param {string|number} data.module 1资讯、2产品、3展会、4企业、5商机、6评论 7方案 8圈子 9 找人 10标讯 11采购意向 12客源
 * @param {string|number} data.action 1收藏 2取消收藏
 * @returns {Promise<{success:boolean,msg: string}>}
 */
export function collect(data = {}) {
  data.isRelease = process.env.ENV === '' ? 1 : 0
  return request({
    url: '/web/collect/save',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 获取仪器买卖小程序码
 * @param {object} data
 * @param {string} [data.page] 访问页面
 * @param {number} [data.checkPath] 检查 page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但 page 有数量上限（60000个）请勿滥用
 * @param {number} [data.envVersion] 要打开的小程序版本。正式版为 release，体验版为 trial，开发版为 develop
 * @param {boolean} [data.autoColor]
 * @param {boolean} [data.isHyaLine]
 * @param {object} [data.lineColor]
 * @param {string} [data.scene]
 * @param {number} [data.width]
 * @returns {Promise<{code:'0'|'1',data:string}>}
 */
export function getYqmmQrCode(data) {
  return request({
    url: '/app/yqmm/preview/getPublicYqmmPreviewQRCode',
    method: 'post',
    data,
    baseURL: domain.Mis_Service_Url,
  })
}
/**
 * @description 获取仪器买卖各模块热搜
 * @param {object} data
 * @param {boolean} data.searchType 搜索类型：1-首页搜索、2-标讯搜索、3-采购单位搜索、4-中标单位搜索、5-需求搜索 6-资讯搜索 7-采购意向搜索 8-采购方分析搜索 9客源搜索
 * @returns {Promise<{code:'0'|'1',msg:string,data:[{id:number,searchKey:string,createTime:string}]}>}
 */
export function getYqmmHotSearchByModule(data) {
  return request({
    url: '/web/yqmm/keyWordSearch/getHotSearch',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 新增仪器买卖搜索记录
 * @param {object} data
 * @param {boolean} data.isHotSearch     是否添加热门搜索：搜索是否有返回结果
 * @param {string} data.searchClient 	 注册客户端，1-Web（默认）、2-Wap、3-APP、4-微信小程序、5-应用
 * @param {string} data.searchKey
 * @param {string} data.searchPlatform  搜索平台，1-商城（默认）、2-仪器+、3-有需必应、4-翰林院、5-仪器买卖、6-木木课堂、7-芝麻研、8-SAAS分销、9-CMS
 * @param {number} data.searchType 		 搜索类型：1-首页搜索、2-标讯搜索、3-采购单位搜索、4-中标单位搜索、5-需求搜索 6-资讯搜索 7-采购意向搜索 8-采购方分析搜索 9-客源搜索 10学校搜索 11基金
 * @returns
 */
export function addYqmmSearchLog(data) {
  return request({
    url: '/web/yqmm/keyWordSearch/addSearchLog',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取仪器买卖搜索记录
 * @param {object} data
 * @param {number} data.searchType 		 搜索类型：1-首页搜索、2-标讯搜索、3-采购单位搜索、4-中标单位搜索、5-需求搜索 6-资讯搜索 7-采购意向搜索 8-采购方分析搜索 9-客源搜索
 * @returns {Promise<{code: '0'|'1',data: {yqmmHotSearchs:Array,yqmmSearchLogs:array}}>}
 */
export function getYqmmSearchLog(data) {
  return request({
    url: '/web/yqmm/keyWordSearch/getSearchLog',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 清空搜索记录
 * @param {object} data
 * @param {number} data.searchType
 */
export function deleteYqmmSearchLog(data) {
  return request({
    url: '/web/yqmm/keyWordSearch/deleteSearchLog',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取基金等导出列表
 * @param {object} data
 * @param {number} data.pageNum
 * @param {number} data.pageSize
 * @param {string} data.exportType 1科研客户导出,2基金课题导出,3采购意向导出
 * @param {string} data.operationStartTime 操作开始时间
 * @param {string} data.operationEndTime 操作结束时间
 * @param {string} data.operationIds 操作人ID
 * @param {number} data.sort  0 创建时间倒序 1 创建时间正序
 * @param {string} data.status  1等待中,2进行中,3已完成,4异常终止
 * @returns {Promise<{code:'0'|'1',data:{list:[{exportFileUrl:string,exportName:string,exportType:number,id:number,operationId:number,operationName:string,operationTime:string,status:number,taskCode:string}]}}}>}
 */
export function getExportList(data) {
  return request({
    url: '/web/saas/export/list',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取基金等导出列表
 * @param {object} data
 * @param {string} data.retryId
 * @returns {Promise<{code:'0'|'1', data:object}>}
 */
export function retryExport(data) {
  return request({
    url: '/web/saas/export/statusRetry',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 导出基金等excel
 * @param {object} data
 * @param {object} data
 * @param {number} data.type	导出类型(1.科研信息库-科研客户 2.科研信息库-基金课题3.项目信息库-采购意向 4.项目挖掘-采购意向订阅5.项目挖掘-标讯订阅6.收藏信息-科研客户7.收藏信息-基金课题 8.收藏信息-采购意向9.解锁信息-我的科研客户 10.解锁信息-全部科研客户)11.解锁信息-我的基金课题 12.解锁信息-全部基金课题)13.解锁信息-我的采购意向 14.解锁信息-全部采购意向)
 * @param {string} data.ids
 * @param {number} data.total
 * @param {string} data.filter
 * @returns {*}
 */
export function exportExcel(data) {
  return request({
    url: '/web/saas/export/excel',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 检查是否有导出权限 
 * @returns {Promise<{code:'0'|'1'}>}
 */
export function checkExportAuthority() {
  return request({
    url: '/web/saas/export/checkAuthority',
    method: 'get',
    params: '',
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取导出额度
 * @param {object} data
 * @param {number} data.type	导出类型(1.科研信息库-科研客户 2.科研信息库-基金课题3.项目信息库-采购意向 4.项目挖掘-采购意向订阅5.项目挖掘-标讯订阅6.收藏信息-科研客户7.收藏信息-基金课题 8.收藏信息-采购意向9.解锁信息-我的科研客户 10.解锁信息-全部科研客户)11.解锁信息-我的基金课题 12.解锁信息-全部基金课题)13.解锁信息-我的采购意向 14.解锁信息-全部采购意向)
 * @param {string} data.ids
 * @param {number} data.total
 * @param {string} data.filter
 * @returns {Promise<{data: {consumeQuota: number,exportExcelQuota: number,reduceQuota:number,total:number,exportUseAmount:number,configQuota:number}}>}
 */
export function getExportQuota(data) {
  return request({
    url: '/web/saas/export/queryQuota',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**
 * @description 获取导出的配置信息
 * @returns {Promise<{code:'0'|'1',data:{perExportLimit:number}}>}
 */
export function getExportConfig() {
  return request({
    url: '/web/saas/export/config',
    method: 'get',
    params: '',
    baseURL: domain.App_Web_Base_Url,
  })
}