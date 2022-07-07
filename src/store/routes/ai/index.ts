import type { NavItem } from '../index'
const routes: NavItem[] = [
  {
    label: '获客中心',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-user-white.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-user-light.svg',
    path: '',
    children: [
      {
        label: 'AI外呼',
        icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-robot-gray.svg',
        icon_h:
          'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-robot-light.svg',
        path: '/ai/outbound',
      },
      {
        label: '话术设计',
        icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-book-gray.svg',
        icon_h:
          'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-book-light.svg',
        path: '/ai/speechcraft',
      },
    ],
  },
  {
    label: 'AI外呼',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-robot-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-robot-light.svg',
    path: '/ai/outbound',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '外呼任务',
        path: '/ai/outbound/task',
      },
      {
        icon: '',
        icon_h: '',
        label: '黑名单',
        path: '/ai/outbound/blacklist',
      },
      {
        icon: '',
        icon_h: '',
        label: '呼叫设置',
        path: '/ai/outbound/option',
      },
    ],
  },
  {
    label: '话术设计',
    icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-book-gray.svg',
    icon_h:
      'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-book-light.svg',
    path: '/ai/speech',
    children: [
      {
        icon: '',
        icon_h: '',
        label: '话术设计',
        path: '/ai/speech/design',
      },
      {
        icon: '',
        icon_h: '',
        label: '话术训练',
        path: '/ai/speech/train',
      },
      {
        icon: '',
        icon_h: '',
        label: '智能词典',
        path: '/ai/speech/dictionary',
      },
    ],
  },
]
export default routes
