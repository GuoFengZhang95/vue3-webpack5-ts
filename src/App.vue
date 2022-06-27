<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<style lang="scss">
</style>
