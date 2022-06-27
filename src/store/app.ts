import { defineStore } from "pinia"
const useAppStore = defineStore('app', {
  state() {
    return {
      sideBarCollapsed: false,
      tableSize: 'default',
      tableHeight: 0,
      tableWidth: 0,
      pageSize: 20,
      drawerList: [],
      drawerLayoutLoading: false,
    }
  },
})
export default useAppStore