import type { NavItem } from '../index'
const businessRoutes = [
  {
    label: '已解锁信息',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-lock-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-lock-light.svg',
    path: '/yqmmpro/business',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '科研客户',
        path: '/yqmmpro/business/customer',
      },
      {
        icon: '',
        icon_h: '',
        label: '基金课题',
        path: '/yqmmpro/business/fund',
      },
      {
        icon: '',
        icon_h: '',
        label: '采购单位',
        path: '/yqmmpro/business/purchase-company',
      },
      {
        icon: '',
        icon_h: '',
        label: '重大商情',
        path: '/yqmmpro/business/major',
      },
      {
        icon: '',
        icon_h: '',
        label: '采购意向',
        path: '/yqmmpro/business/purchase',
      },
      {
        icon: '',
        icon_h: '',
        label: '招投标',
        path: '/yqmmpro/business/bid',
      },
      {
        icon: '',
        icon_h: '',
        label: '需求接单',
        path: '/yqmmpro/business/order',
      },
      {
        icon: '',
        icon_h: '',
        label: '导出记录',
        path: '/yqmmpro/business/export-record',
      },
      {
        icon: '',
        icon_h: '',
        label: '企业导出',
        path: '/yqmmpro/business/company-export',
      },
    ],
  },
]
const customerRoutes = [
  {
    label: '客户信息库',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-info-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-info-light.svg',
    path: '/yqmmpro/customer',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '科研客户',
        path: '/yqmmpro/customer/researcher',
      },
      {
        icon: '',
        icon_h: '',
        label: '基金课题',
        path: '/yqmmpro/customer/fund',
      },
      {

        icon: '',
        icon_h: '',
        label: '采购单位',
        path: '/yqmmpro/customer/purchase-company',
      },
      {
        icon: '',
        icon_h: '',
        label: '企业客户',
        path: '/yqmmpro/customer/company',
      },
    ],
  },
]
const miningRoutes = [
  {
    label: '项目挖掘',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-camera-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-camera-light.svg',
    path: '/yqmmpro/mining',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '订阅推送',
        path: '/yqmmpro/mining/subscription',
      },
      {
        icon: '',
        icon_h: '',
        label: '动态监控',
        path: '/yqmmpro/mining/dynamic',
      },
      {
        icon: '',
        icon_h: '',
        label: '收藏信息',
        path: '/yqmmpro/mining/collection',
      },
    ],
  },
]
const projectRoutes = [
  {
    label: '项目信息库',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-fan-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-fan-light.svg',
    path: '/yqmmpro/project',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '重大商情',
        path: '/yqmmpro/project/major',
      },
      {
        icon: '',
        icon_h: '',
        label: '采购意向',
        path: '/yqmmpro/project/purchase',
      },
      {
        icon: '',
        icon_h: '',
        label: '招投标',
        path: '/yqmmpro/project/bid',
      },
    ],
  },
]
export default [
  ...businessRoutes,
  ...customerRoutes,
  ...miningRoutes,
  ...projectRoutes,
] as NavItem[]