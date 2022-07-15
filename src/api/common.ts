import request from '@/utils/request/index'
import {
  JavaListReqModel,
  LoginStatusModel,
  BaseUserInfoModel,
  SystemNoReadModel,
  NoticeDetailModel
} from './types'
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
/**获取用户信息 */
export function getBaseUserInfo() {
  return request<BaseUserInfoModel>({
    url: '/web/getUserInfo',
    method: 'get',
    params: '',
    baseURL: domain.App_Web_Base_Url,
  })
}
/**获取未读通知列表 */
export function getSystemNoReadList(data: JavaListReqModel) {
  return request<SystemNoReadModel>({
    url: '/web/noReadList',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**获取通知详情 */
export function getNoticeDetail(data: { noticeId: number }) {
  return request<NoticeDetailModel>({
    url: '/web/noticeDetail',
    method: 'get',
    params: data,
    baseURL: domain.App_Web_Base_Url,
  })
}
/**获取文件的阿里云下载地址 */
export function getAliyunOSSUrl(data: { fileUrl: string }) {
  return request<{ data: string }>({
    url: '/app/aliyun/oss/generateUrl',
    method: 'get',
    params: data,
    baseURL: domain.Mis_Service_Url,
  })
}