<template>

  <div id="drawer-layout-wrp">
    <div class="drawer-layout" :class="visible ? 'show' : ''" :style="{
      height: `calc(100vh - ${topHeight}px)`,
      top: `${topHeight}px`,
    }">
      <div class="close-btn" @click="close"></div>
      <div class="main-content">
        <section class="section">
          <template v-if="dynComList.length">
            <keep-alive>
              <component :is="dynComList[dynComList.length - 1]" :id="currentCom.props.id" :key="currentCom.key"
                class="dyn-com" :style="{
                  height: `calc(100vh - ${topHeight}px)`,
                  top: `${topHeight}px`,
                }" :external-prop="currentCom.props"></component>
            </keep-alive>
          </template>
        </section>
      </div>
      <slot>
        <div>123</div>
      </slot>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'DrawerLayout',
  setup() {
    console.log('DrawerLayout appContext', getCurrentInstance()?.appContext)

    let visible = ref(false)
    let dynComList = reactive<any[]>([])
    let dynComParamList = reactive<any[]>([])
    let topHeight = ref(0)

    const currentCom = computed(() => {
      let length = dynComParamList.length
      if (length) {
        return dynComParamList[dynComParamList.length - 1]
      } else {
        return null
      }
    })

    function reload() {
      console.log('刷新当前组件')
    }
    function show(param) {
      // 动态设置侧拉框高度
      let tagViewEl = document.getElementById('tags-view-container')
      if (tagViewEl) {
        topHeight.value = 116
      } else {
        topHeight.value = 60
      }
      setTimeout(() => {
        visible.value = true
      }, 0)
      add(param)
    }
    function add(param) {
      const { options, component } = param

      options.key = new Date().getTime()
      dynComList.push(component)
      dynComParamList.push(options)
    }
    function close() {
      dynComList = []
      dynComParamList = []
      visible.value = false
    }
    function back() {
      dynComList.pop()
      dynComParamList.pop()
      if (dynComList.length === 0) {
        close()
      }
    }

    return {
      visible,
      dynComList,
      dynComParamList,
      topHeight,
      currentCom,
      reload,
      show,
      add,
      close,
      back,
    }
  }
})

</script>

<style lang="less">
#drawer-layout-wrp {
  .drawer-layout {
    position: fixed;
    z-index: 999;
    right: -100%;
    // top: 116px;
    width: calc(100vw - 500px);
    // height: calc(100vh - 116px);
    // overflow-y: auto;
    min-width: 822px;
    background: white;
    box-shadow: -10px 0px 20px 0px rgba(0, 0, 0, 0.16);

    &.show {
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      right: 0;
    }

    .main-content {
      .section {
        .dyn-com {
          overflow-y: auto;
        }
      }
    }

    .close-btn {
      position: absolute;
      left: -25px;
      top: 0px;
      width: 24px;
      height: 56px;
      opacity: 0.7;
      background: #000000;
      border-radius: 6px 0px 0px 6px;
      box-shadow: -5px 0px 6px 0px rgba(0, 0, 0, 0.16);
      cursor: pointer;

      &::before {
        position: absolute;
        content: '';
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent transparent #ffffff;
      }
    }

    .drawer-spin {
      top: 0px !important;
      margin: 0;
      padding: 0;
      width: 100%;
    }
  }
}
</style>
