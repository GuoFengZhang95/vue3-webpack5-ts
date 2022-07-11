import { defineStore } from 'pinia'
export type TagView = {
  label: string,
  path: string
}
const useTagViewStore = defineStore('tagView', {
  state: () => {
    return {
      tabMax: 3,
      /**全部tab */
      tabList: [] as TagView[],
      /**展示tab */
      renderTab: [] as TagView[],
      /**扩展tab */
      extendTab: [] as TagView[],
    }
  },
  actions: {
    setTabMax(val: number) {
      this.tabMax = val
    },
    setTabs(val: { label: string, path: string } | undefined) {
      if (val) {
        let idx = this.tabList.findIndex(e => e.path === val.path)
        let idx2 = this.renderTab.findIndex(e => e.path === val.path)
        if (idx < 0) {
          this.tabList.push(val)
        } else {
          if (idx2 < 0) {
            this.tabList.splice(idx, 1)
            this.tabList.push(val)
          }
        }
      }
      this.renderTab =
        this.tabList.length > this.tabMax
          ? this.tabList.slice(this.tabList.length - this.tabMax)
          : this.tabList
      this.extendTab =
        this.tabList.length > this.tabMax
          ? this.tabList.slice(0, this.tabList.length - this.tabMax)
          : []
    },
    deleteTabs(val: { label: string, path: string }) {
      const idx = this.tabList.findIndex(e => e.path === val.path)
      if (idx > -1) {
        this.tabList.splice(idx, 1)
        this.renderTab = this.tabList
      }
    },
  },
  getters: {}
})
export default useTagViewStore