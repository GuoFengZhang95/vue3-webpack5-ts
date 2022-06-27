<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/index'
const appStore = useAppStore()
</script>
<template>
  <div>
    <h1>我是根节点</h1>
    <p>{{ appStore.pageSize }}</p>
    <a-button type="primary">按钮</a-button>
    <RouterView></RouterView>
  </div>
</template>

<style lang="css">
</style>
