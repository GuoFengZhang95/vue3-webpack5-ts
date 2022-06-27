/**
 * @description 基金相关
 * @author zevan
 */

import request from '@/utils/request'
import domain from '../domain'

/**
 * @description 基金列表
 * @param {object} data
 * @param {number} data.page
 * @param {number} data.pageSize
 * @param {0|1} data.isHighlight
 * @param {1|2} data.listType mis列表 2-pc/saas列表
 * @param {string} data.maxEndTime 结项时间-结束
 * @param {string} data.minEndTime 结项时间-开始
 * @param {string} data.maxProjectFunds 最大项目经费
 * @param {string} data.minProjectFunds 最小项目经费
 * @param {string} data.maxStartTime 立项时间-结束
 * @param {string} data.minStartTime 立项时间-开始
 * @param {string} data.maxUpdateTime 更新时间-结束
 * @param {string} data.minUpdateTime 更新时间-开始
 * @param {string} data.memberCompanyIds 依托单位id
 * @param {string} data.memberUser 负责人名称
 * @param {string} data.memberUserIds 负责人id
 * @param {0|1|2|3} data.order 排序 0更新时间倒序 1更新时间正序 2立项时间倒序 3立项时间正序 4相关性排序
 * @param {string} data.projectCategory 项目类别ID
 * @param {string} data.projectCity 	所属城市ID
 * @param {string} data.projectSourceCity 项目来源城市ID
 * @param {string} data.projectSubject 学科ID
 * @param {'1'|'2'} data.projectType 项目类型 1基金项目 2横向项目
 * @param {string} data.searchKey
 * @param {number} data.searchType 	0 综合搜索 1项目名称 2批准号 3负责人 4依托单位 5关键词 6英文关键词 7中文摘要 8英文摘要 9结题摘要
 * @param {number} data.sort 	0更新时间倒序 1更新时间正序 2立项时间倒序 3立项时间正序 4经费倒序 5经费正序 6结项时间倒序 7结项时间升序 8相关性倒序
 * @returns {Promise<{code:'1'|'0',data:{list:array}}>}
 */
export function getFundList(data) {
  return request({
    url: '/web/saas/tProject/list',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 基金课题详情
 * @param {object} data
 * @param {number} data.targetId
 * @typedef {Object} FundDetailRes
 * @property {string} abstractChinese - 中文摘要
 * @property {string} abstractConclusion - 结题摘要
 * @property {string} abstractEnglish - 英文摘要
 * @property {string} approveYear - 批准年份
 * @property {string} approveYear - 批准年份
 * @property {string} endTime - 结项时间
 * @property {string} keyword - 关键词(多个逗号隔开)
 * @property {string} keywordEnglish - 英文关键词(多个逗号隔开)
 * @property {string} projectCategoryName - 项目类别名称(多个逗号隔开)
 * @property {string} projectCityName - 所属省市(多个逗号隔开)
 * @property {string} projectFunds - 项目经费
 * @property {string} projectLevelName - 	项目等级名称
 * @property {string} projectName - 	项目名称
 * @property {string} projectNum - 	批准号
 * @property {string} projectSourceCityName - 项目来源省市
 * @property {string} projectSourceName - 项目来源名称
 * @property {0|1|2} projectType - 项目类型 0未知 1基金项目 2横向项目
 * @property {string} projectTypeName - 项目类型名称
 * @property {string} remark - 备注
 * @property {string} startTime - 立项时间
 * @property {string} targetId - 加密targetId
 * @property {0|1} isDelete - 是否删除
 * @property {array} projectMemberInfoList - 项目单位|成员信息
 * @returns {Promise<{code:'0'|'1',data:FundDetailRes}>}
 */
export function getFundDetail(data) {
  return request({
    url: '/web/saas/tProject/detail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}

/**
 * @description 查询依托单位列表（企业库）
 * @param {object} data
 * @param {number} data.page
 * @param {number} data.pageSize
 * @param {string} data.searchKey
 * @returns {Promise<{code:'0'|'1',data:{list:array}}>
 * 
 */
export function getFundCompany(data) {
  return request({
    url: '/web/saas/tProject/queryCompanyPage',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}