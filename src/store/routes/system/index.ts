import type { NavItem } from '../index'
const routes = [
  {
    label: '通知消息',
    icon_h: require('@/assets/images/icon/side-notice-selected.png'),
    icon: require('@/assets/images/icon/side-notice-unselected.png'),
    path: '/system/notice',
  },
  {
    label: '成员管理',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-person-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-person-light.svg',
    path: '/system/member',
  },
]
export default routes as NavItem[]