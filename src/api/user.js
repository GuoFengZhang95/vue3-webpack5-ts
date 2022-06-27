import request from '@/utils/request'
import domain from './domain'
/**
 * @description 获取用户配置信息
 * @returns {Promise<{code:'0'|'1',data:{businessImportance:string,businessOnlyView:string,businessNotView:string,businessRemindLevel:0|1,isFirstView:0|1,joinRank:0|1}}>}
 */
export function getUserConfigInfo() {
  return request({
    url: '/web/commonInfo/getUserConfigInfo',
    method: 'get',
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 更新用户配置信息
 * @param {object} data 
 * @param {string} data.businessImportance 动态监控筛选项
 * @param {string} data.businessOnlyView 动态监控筛选项
 * @param {number} data.type 需要更新的类型（开关类： 1商机提醒相关 2名片是否上榜 3是否首次浏览	）
 * @param {0|1} data.targetStatus 需要更新的值（开关类）默认0否 1是
 * @returns 
 */
export function updateUserConfigInfo(data) {
  return request({
    url: '/web/commonInfo/updateUserConfigInfo',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 获取解锁信息统计数据 （个人也是用这个接口）
 * @returns {Promise<{code:string,data:{biddingCount:number|null,businessCount:number|null,customerCount:number|null,importantBusinessCount:number|null,purchaseAnalysisCount:number|null,purchaseCount:number|null,tprojectCount:number|null}}>}
 */
export function getCompanyUnlockStat() {
  return request({
    url: '/web/saas/companyManagement/getCompanyUnlockStat',
    method: 'post',
    // data,
    baseURL: domain.App_Web_Base_Url,
  })
}