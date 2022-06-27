
// 全局常量
const GLOBAL_CONSTANT = {
  source: 6, //平台类型 6仪器买卖分销
  type: 2, //类型 ：1普通；2平台
  ordergenre: 2, //订单类型 ：1普通订单；2平台订单
  orderType: 'NORMAL', //订单类型：NORMAL个人；TEAM课题组
  logoutUrl: `https://api${process.env.ENV}.17m17.com/login/out?returnUrl=${window.location.origin}/login`,
  jumpUrl: `https://login-api${process.env.ENV}.mumuxili.com/jump`,
  eslimit: 5000
}
export { GLOBAL_CONSTANT }
