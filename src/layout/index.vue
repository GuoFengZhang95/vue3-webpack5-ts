<template>
  <div id="layout">
    <!-- 顶部导航 -->
    <!-- <header-bar></header-bar> -->
    <!-- 1级主体内容 -->
    <div id="main" :style="{ height: `${mainH}px` }">
      <!-- 侧边导航 -->
      <div id="nav" :style="{ width: `${navW}px` }">
        <!-- <AsideBar :main-h="mainH" @changeSideBar="changeSideBar"></AsideBar> -->
      </div>
      <div id="container" :style="{ width: `${containerW}px` }">
        <!-- 全局tab页签 -->
        <!-- <TagsView></TagsView> -->

        <div id="sub-view" class="sub-view" :style="{ height: `${subViewH}px` }">
          <!-- 2级主体内容 -->
          <!-- <app-main></app-main> -->
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
// import HeaderBar from './components/HeaderBar.vue'
// import AsideBar from './components/AsideBar.vue'
// import TagsView from './components/TagsView.vue'
// import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    // HeaderBar,
    // AsideBar,
    // TagsView,
    // AppMain,
  },
  setup() {
    let navW = ref(0)
    let containerW = ref(0)
    let subViewH = ref(0)
    let mainH = ref(0)
    function changeSideBar(navW: number) {
      navW = navW
      resize()
    }
    function resize() {
      console.log('resize')
      let clientW = document.body.clientWidth
      let clientH = document.body.clientHeight
      navW.value = navW.value || document.getElementById('nav')?.offsetWidth || 0
      containerW.value = clientW - navW.value
      mainH.value = clientH - 60
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
      containerW,
      subViewH,
      mainH,
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
  #main {
    display: flex;
    background: #e3e5e6;
    overflow: hidden;

    #nav {
      height: 100%;
      background: #fff;
      transition: all 0.2s;
    }

    #container {
      display: flex;
      flex-direction: column;

      .sub-view {
        margin: 10px 10px 0 10px;
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }
}
</style>
