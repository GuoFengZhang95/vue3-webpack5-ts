import { Maybe } from '../../../types/index'
import { OnOff } from './enum'

type PhpResModel<T = any> = PhpCommonResModel<T>
type JavaResModel<T = any> = JavaCommonResModel<T>
interface PhpCommonResModel<T> {
  success: boolean
  msg: string,
  data: T
}
interface JavaCommonResModel<T> {
  code: '0' | '1'
  msg: string,
  time: number,
  data: T
}

export type JavaListReqModel = {
  pageNum: number,
  pageSize: number,
}

// api 返回类型
export type LoginStatusModel = { success: boolean, avatar: string, cartCount: number, isLogin: boolean, loginurl: string, name: string, nologin: boolean, regUrl: string }

export type BaseUserInfo = { authenticated: OnOff, avatar: string, userName: string, companyId: number, companyMember: { companyEquity: Maybe<OnOff>, equityCount: Maybe<number>, id: Maybe<number>, isAdmin: Maybe<OnOff>, mobile: string, moduleAuthority: Maybe<string>, position: Maybe<string>, realName: Maybe<string>, roleIds: string }, createtime: string, isAdmin: Maybe<OnOff>, isOfficial: OnOff, mobile: string, position: Maybe<string>, unitName: string, userId: number, userType: number }
export type BaseUserInfoModel = JavaResModel<BaseUserInfo>

export type AdverItem = {
  description: string
  img: string
  showDesc: string
  subTitle: string
  title: string
  type: number
  url: string
}
export type AdverModel = PhpResModel<{
  imgs: AdverItem[]
}[]>

export type SystemNoRead = {
  isRead: OnOff,
  noticeId: number,
  senderName: string,
  title: string,
  type: 1 | 2,
  updateTime: string,
}
export type SystemNoReadModel = PhpResModel<{
  total: number
  totalPage: number, list: SystemNoRead[]
} & JavaListReqModel>

export type UnlockStat = {
  /**招投标 */
  biddingCount: number,
  /**需求接单 */
  businessCount: number,
  /**科研客户 */
  customerCount: number,
  /**重大商情 */
  importantBusinessCount: number,
  /**采购单位 */
  purchaseAnalysisCount: number,
  /**采购意向 */
  purchaseCount: number,
  /**基金课题 */
  tprojectCount: number,
}
export type UnlockStatModel = JavaResModel<UnlockStat>

export type NoticeDetail = {
  content: string,
  noticeId: number,
  sendTime: string,
  senderId: number,
  senderName: string,
  title: string,
  type: 1 | 2,
  ossUploadResultList?: { name: string, originalFileName: string, originalSize: number, size: string, type: string, uploadTime: string, url: string }[]
}
export type NoticeDetailModel = JavaResModel<NoticeDetail>