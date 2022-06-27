import request from '@/utils/request'
import domain from '../domain'
import { GLOBAL_CONSTANT } from '../constant'

// 省市区接口
export function getRegionList(data) {
  data['isDisabled'] = 0
  return request({
    url: '/seller/area/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取分销用户角色认证信息
export function getDistributionAuthInfo(data) {
  return request({
    url: '/eos/distribution/auth',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 申请成为分销商
export function applyDistributor(data) {
  return request({
    url: '/eos/distribution/apply',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}

// ========== 产品管理 ==========
// 获取产品列表
export function getProductList(data) {
  Object.assign(data, { source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/product/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取产品详情
export function getProductDetail(data) {
  return request({
    url: '/eos/product/info',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取某个spu下的sku
export function getSkuList(data) {
  return request({
    url: '/eos/product/skulist',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取品牌列表(用于产品管理中品牌筛选)
export function getBrandListScreen(data) {
  return request({
    url: '/eos/brand/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取品牌列表（品牌管理中的品牌列表）
export function getBrandList(data) {
  return request({
    url: '/eos/distribution/brandlist',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 获取供应商列表
export function getSupplierListByLetter() {
  return request({
    method: 'get',
    url: '/common/supplier/list',
    baseURL: domain.Mall_Base_Url,
  })
}

// 产品详情页获取组合类型的sku信息
export function getCombinesSkuInfo(data) {
  return request({
    url: '/eos/sku/info',
    method: 'get',
    baseURL: domain.Mall_Base_Url,
    params: data,
  })
}

// ========== 购物车管理 ==========

// 获取购物车列表
export function getShopcartList(data = {}) {
  Object.assign(data, { source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/product/cartlist',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 添加购物车
export function addShopcart(data) {
  Object.assign(data, { source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/product/cart',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 删除购物车
export function deleteShopcart(data) {
  return request({
    url: '/eos/product/removecart',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取购物车结算信息
export function getSettlementInfo(data) {
  Object.assign(data, { source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/order/settlementinfo',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 创建订单
export function createOrder(data) {
  Object.assign(data, {
    ordergenre: GLOBAL_CONSTANT.ordergenre,
    source: GLOBAL_CONSTANT.source,
  })
  return request({
    url: '/eos/order/generateorder',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}

// ========== 地址管理 ==========

// 获取用户地址列表
export function getAddressList(data) {
  return request({
    url: '/common/address/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取用户默认地址
export function getDefaultAdress(data) {
  return request({
    url: '/common/address/default',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 新增 编辑 用户地址
export function editAdress(data) {
  return request({
    url: '/common/address/add',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 设为默认 删除 用户地址
export function operateAdress(data) {
  return request({
    url: '/common/address/operate',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}

// ========== 订单管理 ==========

// 获取订单列表
export function getOrderList(data = {}) {
  Object.assign(data, { type: GLOBAL_CONSTANT.type, source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/order/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取订单详情
export function getOrderInfo(data) {
  return request({
    url: '/eos/order/info',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 取消订单
export function cancelOrder(data) {
  return request({
    url: '/eos/order/cancelorder',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 处理订单 确认收货 取消订单 删除订单
export function dealOrder(data) {
  return request({
    url: '/eos/order/alertorderstatus',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 取消订单
export function moreOneOrder(data) {
  return request({
    url: '/eos/order/anotherorder',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取所有结算订单
export function getAllSettleOrders(data) {
  Object.assign(data, { type: GLOBAL_CONSTANT.type, source: GLOBAL_CONSTANT.source })
  return request({
    url: '/eos/order/allsettleorders',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取收货人地址列表
export function getReceiverAddressList(data) {
  return request({
    url: '',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取订单列表不同订单状态的数据
export function getOrderListStatusNum(data) {
  return request({
    url: '/eos/order/statistic',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// ========== 发票管理 ==========

// 申请记录列表 可开票订单列表
export function getInvoiceApplicationList(data) {
  Object.assign(data, {
    source: GLOBAL_CONSTANT.source,
    ordergenre: GLOBAL_CONSTANT.ordergenre,
    orderType: GLOBAL_CONSTANT.orderType,
  })
  return request({
    url: '/eos/invoice/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}

// 新增 编辑增指数普通发票
export function editCommonInvoice(data) {
  return request({
    url: '/common/invoice/add',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取发票列表
export function getInvoiceList(data) {
  return request({
    url: '/common/invoice/list',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 操作普票 （删除 设为默认）
export function operateCommonInvoice(data) {
  return request({
    url: '/common/invoice/operate',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 获取发票内容
export function getInvoiceContent(data) {
  return request({
    url: '/eos/invoice/content',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 发票申请详情
export function getInvoiceApplyInfo(data) {
  return request({
    url: '/eos/invoice/apply/info',
    method: 'get',
    params: data,
    baseURL: domain.Mall_Base_Url,
  })
}
// 申请发票
export function applyInvoice(data) {
  Object.assign(data, {
    source: GLOBAL_CONSTANT.source,
    orderType: GLOBAL_CONSTANT.orderType,
  })
  return request({
    url: '/eos/invoice/apply',
    method: 'post',
    data,
    baseURL: domain.Mall_Base_Url,
  })
}
