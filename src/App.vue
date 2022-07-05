<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useUserStore } from './store/index'
import { getLoginStatus } from '@/api/index'
const userStore = useUserStore()
onMounted(async () => {
  const loginRes = await getLoginStatus()
  if (loginRes.isLogin) {
    const baseUserInfo = await userStore.setBaseUserInfo()
    if (baseUserInfo.code === '1') {
      useRouter().push({
        name: 'Login'
      })
    }
  }
})
</script>
<style lang="scss">
</style>
