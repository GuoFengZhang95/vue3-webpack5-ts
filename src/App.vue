<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useUserStore } from './store/index'

const userStore = useUserStore()
userStore.setBaseUserInfo()

</script>
<style lang="scss">
</style>
