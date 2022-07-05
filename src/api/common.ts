import request from '@/utils/request/index'
import { LoginStatusModel, BaseUserInfoModel } from './types'
import domain from './domain'

/**
 * @description 获取用户是否登录
 */
export function getLoginStatus() {
  return request<LoginStatusModel>({
    url: '/user/login/info',
    method: 'get',
    // params: data,
    baseURL: domain.Api_Base_Url,
  })
}
// 获取用户信息
export function getBaseUserInfo() {
  return request<BaseUserInfoModel>({
    url: '/web/getUserInfo',
    method: 'get',
    params: '',
    baseURL: domain.App_Web_Base_Url,
  })
}
