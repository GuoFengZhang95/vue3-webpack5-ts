import { defineStore } from 'pinia'
import business from './yqmmpro/business'
import project from './yqmmpro/project'
import customer from './yqmmpro/customer'
import mining from './yqmmpro/mining'
export type NavItem = {
  icon_h?: string,
  icon?: string,
  label: string,
  path: string,
  children?: NavItem[],
}
type NavList = {
  [key in 'yqmmpro']: NavItem
}
type RouteState = {
  allNavList: NavList,
  asideList: [],
}
const useRoutesStore = defineStore('app', {
  state: (): RouteState => {
    return {
      allNavList: {
        yqmmpro: {
          icon_h:
            'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-yqmm-light.svg',
          icon: 'https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon-yqmm-gray.svg',
          label: '情报中心',
          path: '/yqmmpro',
          children: [...customer, ...project, ...mining, ...business],
        },
      },
      asideList: [],
    }
  },
  actions: {
    getAsideList(module: keyof NavList) {
      setTimeout(() => {
        let data = this.allNavList[module] && this.allNavList[module].children
      }, 500)
    },
  },
  getters: {
    sideList: state => {
      return state.allNavList
    },
    asideList: state => {
      return state.asideList
    },
  }
})
export default useRoutesStore