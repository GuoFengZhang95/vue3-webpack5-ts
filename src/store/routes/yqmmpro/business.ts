import type { NavItem } from '../index'
const navList: NavItem[] = [
  {
    label: '已解锁信息',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-lock-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-lock-light.svg',
    path: '/yqmmpro/business',
    children: [
      {
        label: '科研客户',
        path: '/yqmmpro/business/customer',
      },
      {
        label: '基金课题',
        path: '/yqmmpro/business/fund',
      },
      {
        label: '采购单位',
        path: '/yqmmpro/business/purchase-company',
      },
      {
        label: '重大商情',
        path: '/yqmmpro/business/major',
      },
      {
        label: '采购意向',
        path: '/yqmmpro/business/purchase',
      },
      {
        label: '招投标',
        path: '/yqmmpro/business/bid',
      },
      {
        label: '需求接单',
        path: '/yqmmpro/business/order',
      },
      {
        label: '导出记录',
        path: '/yqmmpro/business/export-record',
      },
      {
        label: '企业导出',
        path: '/yqmmpro/business/company-export',
      },
    ],
  },
]
export default navList
