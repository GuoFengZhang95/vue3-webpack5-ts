import { defineStore } from 'pinia'
import yqmmpro from './yqmmpro/index'
import ai from './ai/index'
import system from './system'
type NavKey = 'yqmmpro' | 'ai' | 'system'
export type NavItem = {
  icon_h: string,
  icon: string,
  label: string,
  path: string,
  children?: NavItem[]
}
export type AllNavList = {
  [key in NavKey]: NavItem
}
const useRoutesStore = defineStore('routes', {
  state: () => {
    return {
      allNavList: {
        yqmmpro: {
          icon_h:
            'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-yqmm-light.svg',
          icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-yqmm-gray.svg',
          label: '情报中心',
          path: '/yqmmpro',
          children: [...yqmmpro],
        },
        ai: {
          icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-user-white.svg',
          icon_h:
            'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-user-light.svg',
          label: '获客中心',
          path: '/ai',
          children: [...ai],
        },
        system: {
          icon_h: require('@/assets/images/icon/icon-header-system-selected.png'),
          icon: require('@/assets/images/icon/icon-header-system-unselected.png'),
          label: '系统管理',
          path: '/system',
          children: [...system],
        },
      },
      asideList: [] as NavItem[],
    }
  },
  actions: {
    // 异步获取导航栏
    getAsideList(module: NavKey) {
      setTimeout(() => {
        this.asideList = this.allNavList[module]?.children ?? []
      }, 500)
    },
  },
  getters: {

  }
})
export default useRoutesStore