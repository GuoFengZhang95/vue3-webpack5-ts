import { defineStore } from 'pinia'
import { getBaseUserInfo } from '@/api/index'
const useAppStore = defineStore('app', {
  state: () => {
    return {
      baseUserInfo: {},
      isYunfuLogin: false,
    }
  },
  actions: {
    /**设置基础用户信息 */
    async setBaseUserInfo() {
      let baseUserInfoRes = await getBaseUserInfo()
      if (baseUserInfoRes.code === '0') {
        this.baseUserInfo = baseUserInfoRes
      }
      return baseUserInfoRes
    },
    /**记录用户云蝠智能登录状态 */
    setYunfuLoginStatus(val: boolean) {
      this.isYunfuLogin = val
    },
  },
  getters: {
    baseUserInfo: state => {
      return state.baseUserInfo
    },
  }
})
export default useAppStore