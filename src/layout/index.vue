<template>
  <div id="layout">
    <!-- 顶部导航 -->
    <HeaderBar></HeaderBar>
    <!-- 1级主体内容 -->
    <div id="main">
      <!-- 侧边导航 -->
      <AsideBar></AsideBar>
      <div id="container">
        <!-- 全局tab页签 -->
        <TagsView></TagsView>
        <div id="sub-view" class="sub-view" :style="{ height: `${subViewH}px` }">
          <!-- 2级主体内容 -->
          <AppMain></AppMain>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import HeaderBar from './components/HeaderBar.vue'
import AsideBar from './components/AsideBar.vue'
import TagsView from './components/TagsView.vue'
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    HeaderBar,
    AsideBar,
    TagsView,
    AppMain,
  },
  setup() {
    let navW = ref<number>(0)
    let subViewH = ref(0)
    function changeSideBar(navW: number) {
      navW = navW
      resize()
    }
    function resize() {
      let clientH = document.body.clientHeight
      navW.value = navW.value || document.getElementById('nav')?.offsetWidth || 0
      subViewH.value = clientH - 110
    }
    useEventListener(window, 'resize', () => {
      resize()
    })
    onMounted(() => {
      resize()
    })

    return {
      navW,
      subViewH,
      changeSideBar
    }
  }
}
</script>

<style lang="less" scoped>
.badge {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #ddd;
  display: inline-block;
}

#layout {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  #main {
    height: calc(100vh - 60px);
    display: flex;
    background: #e3e5e6;

    #container {
      flex: 1;
      display: flex;
      flex-direction: column;

      .sub-view {
        flex: 1;
        margin: 10px 10px 0 10px;
      }
    }
  }
}
</style>
