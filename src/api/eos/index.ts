import request from '@/utils/request/index'
import domain from '../domain'
// import { GLOBAL_CONSTANT } from '../constant'

// 获取分销用户角色认证信息
export function getDistributionAuthInfo(data: any) {
  return request({
    url: '/eos/distribution/auth',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}