


import type { NavItem } from '../index'
const navList: NavItem[] = [
  {
    label: '项目信息库',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-fan-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-fan-light.svg',
    path: '/yqmmpro/project',
    children: [
      {
        label: '重大商情',
        path: '/yqmmpro/project/major',
      },
      {
        label: '采购意向',
        path: '/yqmmpro/project/purchase',
      },
      {
        label: '招投标',
        path: '/yqmmpro/project/bid',
      },
    ],
  },
]
export default navList
