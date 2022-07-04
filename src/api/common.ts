import request from '@/utils/request/index'
import { LoginStatusRes } from './types/api'
import domain from './domain'

/**
 * @description 获取用户是否登录
 */
export function getLoginStatus() {
  return request<LoginStatusRes>({
    url: '/user/login/info',
    method: 'get',
    // params: data,
    baseURL: domain.Api_Base_Url,
  })
}
