
import type { NavItem } from '../index'
const navList: NavItem[] = [
  {
    label: '项目挖掘',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-camera-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-camera-light.svg',
    path: '/yqmmpro/mining',
    children: [
      {
        label: '订阅推送',
        path: '/yqmmpro/mining/subscription',
      },
      {
        label: '动态监控',
        path: '/yqmmpro/mining/dynamic',
      },
      {
        label: '收藏信息',
        path: '/yqmmpro/mining/collection',
      },
    ],
  },
]
export default navList