import request from '@/utils/request/index'
import { UnlockStatModel } from './types'
import domain from './domain'

/**获取解锁信息统计数据 （个人也是用这个接口） */
export function getCompanyUnlockStat() {
  return request<UnlockStatModel>({
    url: '/web/saas/companyManagement/getCompanyUnlockStat',
    method: 'post',
    // data,
    baseURL: domain.App_Web_Base_Url,
  })
}