import { defineStore } from "pinia"
const useAppStore = defineStore('app', {
  state: () => {
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
  actions: {
    // 侧导航是否折叠
    toggleSideBar(val: boolean) {
      this.sideBarCollapsed = val
    },
    // 设置表格大小
    setTableSize(val: string) {
      this.tableSize = val
    },
    // 设置表格高度
    setTableHeight(val: number) {
      this.tableHeight = val
    },
    // 设置表格宽度
    setTableWidth(val: number) {
      this.tableWidth = val
    },
    // 设置表格pageSize
    setPageSize(val: number) {
      this.pageSize = val
    },
    // 全局侧拉框中的组件列表
    setDrawerList(val: []) {
      this.drawerList = val
    },
    /**设置侧拉狂加载 */
    setDrawerLayoutLoading(val: { flag: boolean }) {
      this.drawerLayoutLoading = val.flag
    },
  },
  getters: {
    sideBarCollapsed: state => {
      return state.sideBarCollapsed
    },
    tableSize: state => {
      return state.tableSize
    },
    tableHeight: state => {
      return state.tableHeight
    },
    tableWidth: state => {
      return state.tableWidth
    },
    pageSize: state => {
      return state.pageSize
    },
    drawerList: state => {
      return state.drawerList
    },
    tableOffset: () => {
      /**分页高度 */
      const paginationHeight = 53
      /**表格的表头高度 */
      const tableHeaderHeight = 40
      const offset = paginationHeight + tableHeaderHeight
      return offset
    },
    drawerLayoutLoading: state => {
      return state.drawerLayoutLoading
    },
  }
})
export default useAppStore