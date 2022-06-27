import type { NavItem } from '../index'
const navList: NavItem[] = [
  {
    label: '客户信息库',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-info-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-info-light.svg',
    path: '/yqmmpro/customer',
    children: [
      {
        label: '科研客户',
        path: '/yqmmpro/customer/researcher',
      },
      {
        label: '基金课题',
        path: '/yqmmpro/customer/fund',
      },
      {
        label: '采购单位',
        path: '/yqmmpro/customer/purchase-company',
      },
      {
        label: '企业客户',
        path: '/yqmmpro/customer/company',
      },
    ],
  },
]
export default navList