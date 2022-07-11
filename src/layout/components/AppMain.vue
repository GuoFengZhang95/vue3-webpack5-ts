<template>
  <div id="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain',
})
</script>

<style lang="scss">
#app-main {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  overflow-y: auto;
}
</style>
