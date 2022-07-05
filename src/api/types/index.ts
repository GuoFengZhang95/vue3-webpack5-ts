import { Maybe } from '../../../types/index'
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

import { OnOff } from './enum'

export type LoginStatusModel = { success: boolean, avatar: string, cartCount: number, isLogin: boolean, loginurl: string, name: string, nologin: boolean, regUrl: string }

export type BaseUserInfoModel = JavaResModel<{ authenticated: OnOff, avatar: string, companyId: number, companyMember: { companyEquity: Maybe<OnOff>, equityCount: Maybe<number>, id: Maybe<number>, isAdmin: Maybe<OnOff>, mobile: string, moduleAuthority: Maybe<string>, position: Maybe<string>, realName: Maybe<string>, roleIds: string }, createtime: string, isAdmin: Maybe<OnOff>, isOfficial: OnOff, mobile: string, position: Maybe<string>, unitName: string, userId: number, userType: number }>

export type AdverModel = PhpResModel<{
  imgs: AdverItem[]
}[]>
export type AdverItem = {
  description: string
  img: string
  showDesc: string
  subTitle: string
  title: string
  type: number
  url: string
}