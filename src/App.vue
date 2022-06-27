<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/index'
const appStore = useAppStore()
console.log(appStore.pageSize)
</script>
<template>
  <div>
    <h1>我是根节点</h1>
    <p>{{ appStore.pageSize }}</p>
    <RouterView></RouterView>
  </div>
</template>

<style lang="css">
</style>
