import request from '@/utils/request'
import domain from '../domain'

// 我的收藏
/**
 * @description 我的收藏
 * @param {object} data
 * @param {number} data.moduleType 1资讯、2产品、3、展会、4企业、5商机、6评论、7方案、8商业圈、9用户、10标讯、11采购意向、12客源 13基金课题
 * @param {number} data.pno
 * @param {number} data.perpage
 * @returns {Promise<{data:Array,dataType:string,msg:string,success:boolean,tno:number,totalCount:number}>}
 */
export function getMyCollection(data) {
  return request({
    url: '/web/collect/mycollect',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
