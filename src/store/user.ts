import { defineStore } from 'pinia'
import { getBaseUserInfo } from '@/api/index'
import type { BaseUserInfo } from '../api/types/index'
const useAppStore = defineStore('user', {
  state: () => {
    return {
      baseUserInfo: {} as BaseUserInfo,
      isYunfuLogin: false,
    }
  },
  actions: {
    /**设置基础用户信息 */
    async setBaseUserInfo() {
      let baseUserInfoRes = await getBaseUserInfo()
      if (baseUserInfoRes.code === '0') {
        this.baseUserInfo = baseUserInfoRes.data
      }
      return baseUserInfoRes
    },
    /**记录用户云蝠智能登录状态 */
    setYunfuLoginStatus(val: boolean) {
      this.isYunfuLogin = val
    },
  },
  getters: {

  }
})
export default useAppStore