<template>
  <div class="module-home">
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SystemIndex',
  setup() {
    return {
      RouterView
    }
  }
})
</script>
