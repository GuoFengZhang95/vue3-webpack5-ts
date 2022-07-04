type PhpRes<T> = PhpCommonRes & T
type JavaRes<T> = JavaCommonRes & T
interface PhpCommonRes {
  success: boolean
  msg: string,
}
interface JavaCommonRes {
  code: '0' | '1'
  msg: string,
}

export type LoginStatusRes = Omit<PhpRes<{ avatar: string, cartCount: number, isLogin: boolean, loginurl: string, name: string, nologin: boolean, regUrl: string }>, 'msg'>