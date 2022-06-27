import request from '@/utils/request'
import domain from '../domain'

// 获取企业成员列表
export function getCompanyMemberList(data) {
  return request({
    url: '/web/saas/companyManagement/getCompanyMemberList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 获取企业权益余额
export function getCompanyEquityCount(data) {
  return request({
    url: '/web/saas/companyManagement/getCompanyEquityResidueCount',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 取消企业权益, 单量or批量
export function cancelCompanyEquity(data) {
  return request({
    url: '/web/saas/companyManagement/batchDeleteUserCompanyEquity',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 添加企业权益, 单量or批量
export function addCompanyEquity(data) {
  return request({
    url: '/web/saas/companyManagement/batchCreateUserCompanyEquity',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 设置角色/批量设置角色
export function setMemberRole(data) {
  return request({
    url: '/web/saas/companyManagement/batchSetRole',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 移除企业成员, 单量or批量
export function deleteMember(data) {
  return request({
    url: '/web/saas/companyManagement/batchDeleteCompanyUser',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 企业成员姓名(筛选项)
export function queryMemberName(data) {
  return request({
    url: '/web/saas/companyManagement/getCompanyMemberName',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
// 修改普通用户的数据权限,单量or批量
export function updateAuth(data) {
  return request({
    url: '/web/saas/companyManagement/batchUpdateGeneralUserPower',
    method: 'post',
    data,
    baseURL: domain.App_Web_Base_Url,
  })
}
