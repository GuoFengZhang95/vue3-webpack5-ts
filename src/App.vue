<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import { getLoginStatus, getDistributionAuthInfo } from '@/api/index'
import { getLoginStatus } from '@/api/index'
async function checkStatus() {
  const loginRes = await getLoginStatus()
  if (loginRes.isLogin) {
  //  this._getBaseUserInfo()
  }
}
checkStatus()
</script>
<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="scss">
</style>
