<template>
  <div>
    <!-- <h1>{{ str }}</h1> -->
    <h1>Page 404</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '404',
  setup() {
    console.log('404')
  }
})
// import { ref } from 'vue'
// const str = ref<string>('Page 404')
</script>
<style lang="scss" scoped>
</style>
